---
layout: single
title: "Let Vision Observe and LLMs Reason: QACap Explained"
lang: en
alternate_url: /zh/blog/qacap-explained/
permalink: /blog/qacap-explained/
date: 2026-07-11 01:00:00 +0800
excerpt: "A guided tour of our CVPR 2025 work on QACap, which separates question-aware visual evidence from the world knowledge and reasoning of an LLM."
categories: [Research Notes]
tags: [KBVQA, VQA, LLM, Multimodal Learning, QACap]
header:
  teaser: /images/blog/qacap-overview-en.svg
teaser_alt: "QACap separates question-aware visual evidence from LLM knowledge and reasoning"
toc: true
toc_sticky: true
---

<figure class="paper-figure">
  <img src="/images/blog/qacap-overview-en.svg" alt="An original schematic of QACap: an image and a question are converted into question-aware visual evidence before an LLM applies knowledge and reasoning to produce an answer." loading="eager">
  <figcaption>An original overview of the separation-of-powers idea behind QACap.</figcaption>
</figure>

Knowledge-based visual question answering (KBVQA) looks simple on the surface: provide an image, ask a question, and expect an answer. In practice, it combines two very different responsibilities. A system must first determine what can actually be observed in the image, and then connect that evidence to knowledge that may not appear in the pixels at all.

Our CVPR 2025 paper, **“Separation of Powers: On Segregating Knowledge from Observation in LLM-enabled Knowledge-based Visual Question Answering,”** studies how to draw a cleaner boundary between these responsibilities. The central idea is straightforward: **let a visual module report question-relevant evidence, and let a language model contribute world knowledge and reasoning.**

> A useful perceptual module should be task-conditioned but evidence-bounded: it should focus on what the current question needs without silently taking over the reasoning task.

## Paper at a glance

- **Authors:** Zhen Yang<sup>*</sup>, <strong>Zhuo Tao<sup>*</sup></strong>, Qi Chen, Liang Li<sup>†</sup>, Yuankai Qi<sup>†</sup>, Anton van den Hengel, Qingming Huang
- **Venue:** IEEE/CVF Conference on Computer Vision and Pattern Recognition (**CVPR 2025**)
- **Contribution note:** * Equal contribution; † corresponding authors
- **Links:** [Open-access paper](https://openaccess.thecvf.com/content/CVPR2025/papers/Yang_Separation_of_Powers_On_Segregating_Knowledge_from_Observation_in_LLM-enabled_CVPR_2025_paper.pdf) · [CVF page](https://openaccess.thecvf.com/content/CVPR2025/html/Yang_Separation_of_Powers_On_Segregating_Knowledge_from_Observation_in_LLM-enabled_CVPR_2025_paper.html) · [DOI](https://doi.org/10.1109/CVPR52734.2025.02305)

## The problem: seeing is not the same as knowing

Traditional VQA often asks about information directly visible in an image: the color of an object, the number of people, or an activity taking place. KBVQA goes a step further. It may ask what country is associated with a landscape, what cultural practice an object suggests, or what background fact is needed to interpret a scene.

That creates two subproblems:

1. **Observation:** identify the image content that is relevant to the question.
2. **Knowledge and reasoning:** combine that content with information not directly shown in the image.

One way to use an off-the-shelf LLM is to first translate the image into a caption. This preserves the LLM's text-native knowledge and reasoning ability, and the caption provides an inspectable interface between vision and language. However, a generic caption usually describes the overall scene. It cannot anticipate the detail required by every possible question.

At the other extreme, a question-conditioned captioner may infer the final answer and place it directly in the caption. The downstream LLM then merely confirms an answer produced upstream. Observation and knowledge have become mixed together again.

## The core idea: separation of powers

QACap assigns the two stages different roles:

- **QACap is the observer.** It receives both the image and the question and produces a caption focused on relevant, visible content.
- **The LLM is the knowledge and reasoning module.** It receives the task instruction, the question-aware caption, and the original question, then generates an answer using the evidence and its internal knowledge.

The generated caption acts as an **evidence boundary**. For example, if a question asks about the legal age associated with an activity, the visual module should describe people holding drinks; it should not insert a country-specific legal age that cannot be seen. Preventing such leakage is a design objective rather than an absolute guarantee, but the boundary makes the intended responsibility of each module explicit.

The inference pipeline is therefore compact:

1. Feed an image and its question to QACap.
2. Generate a question-aware caption as textual visual evidence.
3. Build a prompt from the task instruction, caption, and question.
4. Ask an off-the-shelf LLM to produce the final answer.

This modularity also makes errors easier to inspect. If the relevant object never appears in the caption, the perceptual stage is a likely source of failure. If the evidence is correct but the conclusion is wrong, the issue is more likely to lie in knowledge or reasoning.

## How QACap works

QACap is fine-tuned from BLIP and contains three main ideas: Question-Aware Feature Distillation, Prompt-Enhanced Tuning, and Question-Aware Regional Consistency Learning.

### QAFD: finding question-relevant visual regions

**Question-Aware Feature Distillation (QAFD)** adjusts image features according to the input question.

The image is represented as visual tokens, while the question is represented as language tokens. Self-attention first contextualizes the question. Cross-attention then measures how question tokens relate to image patches. QAFD combines token-level relevance with sentence-level semantic relevance to construct weights over the visual features.

The intuition is simple: if the question asks what sport an object can be used for, the system should emphasize the object rather than unrelated buildings, people, or background texture. The output remains an image representation, but one reorganized around the information demand of the question.

### PET: telling the decoder what kind of caption to write

**Prompt-Enhanced Tuning (PET)**, adopted from PromptCap, helps the caption decoder understand that it should generate a description for a particular question rather than a generic summary of the image. The decoder receives the question prompt together with question-aware visual tokens and generates the caption autoregressively.

PET matters because feature selection alone does not guarantee that the decoder understands the role of the question. The ablations in the paper also show that the proposed components interact: adding regional consistency without first making the decoder question-aware does not automatically improve performance.

### QARCL: keeping attention consistent during training

**Question-Aware Regional Consistency Learning (QARCL)** aligns two attention maps:

- the regions emphasized while QAFD interprets the question; and
- the regions used by the decoder while generating the caption.

During training, a Jensen-Shannon divergence loss encourages these maps to agree. In other words, the regions considered important when understanding the question should also be the regions used when verbalizing the evidence. QARCL is a training-time objective; it does not add another reasoning step at inference time.

## Building question-aware training data

Question-aware captions are not available in standard KBVQA datasets, so we constructed a dataset on top of OKVQA, A-OKVQA, and FVQA. It contains **29,569 question-aware descriptions**.

For each example, GPT-4 was given the question-answer pair and the five human-written MS COCO captions associated with the image, then asked to generate three candidate descriptions. This synthesis process exposed an important risk: because the answer is included as guidance, a generated caption may inject background knowledge that is not visually observable.

The data pipeline therefore contains refinement and selection stages:

- Candidates with likely answer leakage, redundancy, verbosity, or unnatural phrasing are regenerated.
- **Helpfulness** is approximated by whether a candidate helps the downstream LLM recover the annotated answer.
- **Truthfulness** is approximated by image-caption CLIP similarity.
- Among candidates with the same high answer score, the one with the highest CLIP score is selected.

These are useful automatic proxies, not proofs of factual correctness. That distinction is important when interpreting both the dataset and the resulting model.

## What the experiments show

In the setting reported in the paper, **QACap with Claude 3.5 reaches 68.2% accuracy on the OKVQA validation set**, using captions as the image representation, zero in-context examples, and no external knowledge base.

The ablations provide a more informative picture than a single headline number:

- Question-guided feature distillation improves the baseline on OKVQA.
- Prompt-enhanced tuning is important for teaching the decoder how to use the question.
- Regional consistency is most effective when combined with that question-aware decoder behavior.
- Training with the newly constructed QACap data consistently improves the reported KBVQA results over training with PromptCap data alone.
- Question-aware captions help most in direct-answer settings; their advantage is smaller when multiple-choice options already provide strong answer cues.

The paper also evaluates several LLMs and shows that the best language model depends on the dataset and answer format. QACap should therefore be understood as a replaceable visual interface, not as a claim that one particular LLM is universally optimal.

## How this connects to my research trajectory

This work is an important step in my exploration of the interface between **multimodal perception and large language models**. The research question is broader than KBVQA: when a visual model, retrieval system, or agent tool passes information to an LLM, what should that interface contain, and where should one module's responsibility end?

QACap suggests three principles that continue to matter in VLM and agent research:

1. **Condition tools on the goal.** Generic outputs often omit the detail required by the current task.
2. **Keep evidence separate from inference.** A tool should expose what it observed rather than conceal an unsupported conclusion inside its output.
3. **Design interfaces for inspection and replacement.** Textual evidence makes it easier to diagnose failures and to swap the downstream reasoning model as LLMs improve.

This perspective is especially relevant to agents. A capable agent is not merely a collection of powerful models; it also needs well-defined contracts between perception, tools, memory, and reasoning.

## Limitations and open questions

The separation is useful, but it does not remove the hard problems:

- **Caption bottleneck:** information omitted by QACap cannot be recovered by the LLM.
- **Residual leakage:** question conditioning and synthetic supervision can still encourage a caption to imply or reveal an answer.
- **Synthetic-data dependence:** GPT-4 generation may introduce model-specific bias and makes exact reproduction sensitive to model and API versions.
- **Proxy evaluation:** answer matching and CLIP similarity do not replace human verification of helpfulness and factual grounding.
- **Unattributed knowledge:** an LLM's internal knowledge may be stale or incorrect and does not provide an explicit source.
- **Domain coverage:** the experiments focus on established KBVQA benchmarks built largely on MS COCO imagery; broader visual domains remain to be tested.
- **LLM sensitivity:** results vary across language models, prompts, datasets, and answer formats.

These limitations point toward several natural extensions: evidence with explicit provenance, uncertainty-aware captions, richer structured visual representations, retrieval-augmented knowledge, and evaluation that distinguishes perceptual errors from reasoning errors more rigorously.

## Conclusion

QACap is not an attempt to make the visual module know everything. It is an attempt to make the handoff between seeing and knowing more precise. By generating a caption that is both question-aware and constrained toward visual evidence, the framework lets an LLM concentrate on the part it is best suited for: connecting evidence to world knowledge and reasoning over it.

For me, the broader lesson is that improving an intelligent system is often as much about **where we draw boundaries between components** as it is about making any single component larger.

## Citation

Zhen Yang<sup>*</sup>, Zhuo Tao<sup>*</sup>, Qi Chen, Liang Li, Yuankai Qi, Anton van den Hengel, and Qingming Huang. “Separation of Powers: On Segregating Knowledge from Observation in LLM-enabled Knowledge-based Visual Question Answering.” *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)*, 2025, pp. 24753-24762. (<sup>*</sup> Equal contribution.)
