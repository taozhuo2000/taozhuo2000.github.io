---
layout: single
title: "让视觉负责观察，让大模型负责思考：QACap 论文导读"
lang: zh
alternate_url: /blog/qacap-explained/
permalink: /zh/blog/qacap-explained/
date: 2026-07-11 01:00:00 +0800
excerpt: "介绍我们的 CVPR 2025 工作 QACap：如何将与问题相关的视觉证据，同大语言模型的世界知识与推理能力分离开来。"
categories: [科研笔记]
tags: [知识型视觉问答, 大语言模型, 多模态学习, 视觉语言模型, QACap]
header:
  teaser: /images/blog/qacap-overview-zh.svg
teaser_alt: "QACap 将问题感知的视觉证据与大语言模型的知识推理分开"
toc: true
toc_sticky: true
---

<figure class="paper-figure">
  <img src="/images/blog/qacap-overview-zh.svg" alt="QACap 原创示意图：图像与问题先被转换为问题感知的视觉证据，再由大语言模型结合知识和推理生成答案。" loading="eager">
  <figcaption>QACap“权力分立”思想的原创概览图。</figcaption>
</figure>

知识型视觉问答（Knowledge-based Visual Question Answering，KBVQA）表面上是一个简单流程：给出一张图，提出一个问题，然后得到答案。但它实际上把两种性质不同的能力放在了一起：系统既要判断图像中究竟能看到什么，也要利用像素之外的世界知识完成推理。

我们在 CVPR 2025 论文 **《Separation of Powers: On Segregating Knowledge from Observation in LLM-enabled Knowledge-based Visual Question Answering》** 中，研究了如何为这两种能力划定更清晰的职责边界。核心思想可以概括为：**让视觉模块提供与问题相关的可观察证据，让语言模型负责世界知识与推理。**

> 一个好的感知模块应当既面向任务，又受证据边界约束：它需要关注当前问题真正需要的信息，但不应悄悄替代上层模型完成推理。

## 论文信息

- **作者：** Zhen Yang<sup>*</sup>、<strong>Zhuo Tao<sup>*</sup></strong>、Qi Chen、Liang Li<sup>†</sup>、Yuankai Qi<sup>†</sup>、Anton van den Hengel、Qingming Huang
- **会议：** IEEE/CVF Conference on Computer Vision and Pattern Recognition（**CVPR 2025**）
- **作者说明：** * 共同一作；† 通讯作者
- **链接：** [论文 PDF](https://openaccess.thecvf.com/content/CVPR2025/papers/Yang_Separation_of_Powers_On_Segregating_Knowledge_from_Observation_in_LLM-enabled_CVPR_2025_paper.pdf) · [CVF 页面](https://openaccess.thecvf.com/content/CVPR2025/html/Yang_Separation_of_Powers_On_Segregating_Knowledge_from_Observation_in_LLM-enabled_CVPR_2025_paper.html) · [DOI](https://doi.org/10.1109/CVPR52734.2025.02305)

## 问题：看见并不等于知道

传统 VQA 经常询问图像中可以直接观察到的信息，例如物体颜色、人数或正在发生的动作。KBVQA 则更进一步：问题可能要求系统从景观联想到国家，从某件物品联系到文化知识，或调用某条不直接存在于画面中的常识。

因此，一个 KBVQA 系统至少要完成两个子任务：

1. **观察：** 找到图像中与当前问题有关的内容。
2. **知识与推理：** 将这些视觉内容与图像之外的知识结合起来。

利用现成 LLM 的一种常见方式，是先将图像转换成 caption，再把文字交给 LLM。这样既能保留 LLM 原有的语言、知识与推理能力，也能把 caption 作为视觉与语言之间可检查的接口。但通用 caption 通常只概括整张图，无法预先知道每一个问题究竟需要什么细节。

另一个极端是：问题感知的 captioner 直接推断答案，并把答案写进 caption。这样一来，下游 LLM 只是在确认上游已经给出的结论，“视觉观察”和“知识推理”再次混在了一起。

## 核心思想：观察与知识的“权力分立”

QACap 为两个模块规定了不同职责：

- **QACap 是观察者。** 它同时接收图像和问题，输出聚焦于相关可见内容的 caption。
- **LLM 是知识与推理模块。** 它接收任务说明、问题感知 caption 和原始问题，再利用视觉证据与自身知识生成答案。

这里的 caption 构成了一条**视觉证据边界**。例如，当问题询问某项活动对应的法定年龄时，视觉模块可以描述“有人手持酒杯”，却不应该把图像中看不见的具体年龄直接写入 caption。减少这种答案泄漏是设计目标，而不是绝对保证；但清晰的边界至少明确了每个模块应该做什么。

完整推理流程非常紧凑：

1. 将图像和问题同时输入 QACap。
2. 生成问题感知 caption，作为文本形式的视觉证据。
3. 将任务说明、caption 和原始问题组成 prompt。
4. 由现成 LLM 结合证据和内部知识生成最终答案。

模块化还有一个实际好处：错误更容易定位。如果关键物体根本没有出现在 caption 中，问题更可能来自感知阶段；如果 caption 已经正确描述了证据，但最终结论错误，问题则更可能来自知识或推理阶段。

## QACap 是如何工作的

QACap 在 BLIP 基础上进行微调，主要包含三个部分：Question-Aware Feature Distillation、Prompt-Enhanced Tuning 和 Question-Aware Regional Consistency Learning。

### QAFD：寻找与问题相关的视觉区域

**Question-Aware Feature Distillation（QAFD）** 根据输入问题调整图像特征。

图像首先被表示为 visual tokens，问题则被表示为 language tokens。模型先通过 self-attention 建模问题上下文，再通过 cross-attention 计算问题 token 与图像 patch 之间的关系。QAFD 将 token 层面的相关性与句子层面的语义相关性结合起来，对视觉特征重新加权。

直观地说，如果问题询问某个物体可以用于什么运动，系统就应该重点关注这个物体，而不是无关的建筑、人物或背景纹理。QAFD 的输出仍然是视觉表示，但它已经围绕当前问题的信息需求重新组织。

### PET：告诉 decoder 应该写怎样的 caption

**Prompt-Enhanced Tuning（PET）** 来源于 PromptCap，它帮助 caption decoder 理解：当前目标不是生成一段概括整张图的通用描述，而是针对某个具体问题提供视觉信息。Decoder 接收问题提示和经过筛选的视觉 tokens，再自回归生成 caption。

PET 很重要，因为仅仅筛选视觉特征，并不能保证 decoder 真正理解问题的作用。论文消融实验也表明，各模块之间存在依赖关系：如果 decoder 尚未学会以问题为条件生成描述，单独增加区域一致性约束并不会自动带来提升。

### QARCL：让训练过程中的关注区域保持一致

**Question-Aware Regional Consistency Learning（QARCL）** 对齐两张 attention map：

- QAFD 在理解问题时重点关注的图像区域；
- Decoder 在生成 caption 时实际使用的图像区域。

训练时，模型使用 Jensen-Shannon divergence loss 鼓励两张 attention map 保持一致。换句话说，理解问题时认为重要的区域，也应当成为描述视觉证据时真正使用的区域。QARCL 只是一项训练阶段的约束，不会在推理阶段额外增加一次知识推理。

## 如何构建问题感知 caption 数据

标准 KBVQA 数据集中没有现成的问题感知 caption，因此我们在 OKVQA、A-OKVQA 和 FVQA 之上构建了一套数据，共包含 **29,569 条问题感知描述**。

对每个样本，我们向 GPT-4 提供 question-answer pair，以及该 MS COCO 图像对应的 5 条人工 caption，并生成 3 个候选描述。这个过程会带来一个关键风险：由于生成模型看到了答案，它可能把无法从图像中观察到的背景知识直接注入 caption。

因此，数据构建流程还包含 refinement 与 selection：

- 对可能存在答案泄漏、冗余、啰嗦或表达不自然的候选重新生成。
- 用候选 caption 是否能帮助下游 LLM 找回标注答案，近似衡量 **helpfulness**。
- 用图像与 caption 的 CLIP similarity，近似衡量 **truthfulness**。
- 在 answer score 同样较高的候选中，选择 CLIP score 最高的一条。

这些指标是便于大规模自动筛选的代理信号，并不等同于对事实正确性的严格证明。理解这一点，对于客观看待数据集和模型结果都很重要。

## 实验说明了什么

在论文报告的设置下，**QACap 配合 Claude 3.5 在 OKVQA validation set 上达到 68.2% accuracy**；图像以 caption 表示，不使用 in-context examples，也不依赖外部知识库。

相比单一 headline，消融实验更能说明方法为何有效：

- 问题引导的视觉特征蒸馏能够改善 OKVQA baseline。
- PET 对 decoder 正确理解并使用问题很重要。
- 区域一致性约束在与问题感知 decoder 配合时效果最好。
- 使用新构建的 QACap 数据训练，相比只使用 PromptCap 数据，在论文报告的 KBVQA 实验中带来稳定提升。
- 问题感知 caption 在 Direct Answer 设置中的帮助更明显；在 Multiple Choice 中，选项本身已经提供了较强提示，因此改进幅度较小。

论文还比较了多个 LLM，结果表明最合适的语言模型会随数据集和答案形式变化。因此，QACap 更适合被理解为一个可替换的视觉接口，而不是“某个 LLM 在所有场景中都最优”的结论。

## 它与我的研究轨迹有什么联系

这项工作是我探索**多模态感知与大语言模型接口**的重要一步。它提出的问题并不局限于 KBVQA：当视觉模型、检索系统或 Agent 工具向 LLM 传递信息时，接口中究竟应该包含什么？一个模块的职责又应当在哪里结束？

QACap 给出了三个可以继续迁移到 VLM 与 Agent 研究中的原则：

1. **工具输出应当以目标为条件。** 通用输出经常遗漏当前任务真正需要的细节。
2. **证据与推断应尽量分离。** 工具应该暴露它观察到了什么，而不是把缺乏依据的结论隐藏在输出中。
3. **接口需要便于检查和替换。** 文本化证据既便于定位错误，也允许在 LLM 能力迭代后替换下游推理模型。

这一视角对 Agent 尤其重要。一个强大的 Agent 不只是多个强模型的简单组合，它还需要为感知、工具、记忆和推理之间建立清晰的契约。

## 局限与开放问题

“权力分立”有助于理清系统结构，但并没有消除真正困难的问题：

- **Caption 信息瓶颈：** QACap 没有描述出的视觉信息，LLM 无法凭空恢复。
- **残余答案泄漏：** 问题条件和合成监督仍可能诱导 caption 暗示或直接给出答案。
- **合成数据依赖：** GPT-4 生成可能带入特定模型的偏差，精确复现也会受到模型和 API 版本影响。
- **代理指标局限：** Answer matching 与 CLIP similarity 不能替代人工对帮助性和事实依据的核验。
- **知识缺少来源：** LLM 的内部知识可能过时或错误，并且通常没有明确出处。
- **领域覆盖有限：** 实验主要基于由 MS COCO 图像构成的典型 KBVQA benchmark，更广泛视觉领域仍需验证。
- **对 LLM 敏感：** 结果会随语言模型、prompt、数据集和答案形式而变化。

这些限制也指向了自然的后续方向：带明确来源的视觉证据、不确定性感知 caption、更丰富的结构化视觉表示、结合检索的外部知识，以及能够更严格区分感知错误与推理错误的评测方法。

## 总结

QACap 并不是要让视觉模块知道所有事情，而是希望让“看见什么”与“知道什么”之间的交接更加准确。通过生成既理解问题、又尽量受视觉证据约束的 caption，系统可以让 LLM 更专注于它擅长的部分：将证据连接到世界知识，并在其上完成推理。

对我而言，这项工作的更一般启示是：一个智能系统能否继续提升，不仅取决于单个模块能否做得更大，也取决于我们是否在模块之间划出了合适的边界。

## 引用

Zhen Yang<sup>*</sup>、Zhuo Tao<sup>*</sup>、Qi Chen、Liang Li、Yuankai Qi、Anton van den Hengel、Qingming Huang. “Separation of Powers: On Segregating Knowledge from Observation in LLM-enabled Knowledge-based Visual Question Answering.” *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)*, 2025, pp. 24753-24762。（<sup>*</sup> 共同一作。）
