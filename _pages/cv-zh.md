---
layout: archive
title: "个人简历"
permalink: /zh/cv/
lang: zh
alternate_url: /cv/
author_profile: true
redirect_from:
  - /zh/resume
---

教育经历
======

**中国科学院计算技术研究所**<br>
计算机科学与技术专业直博生，2022 年 9 月至今，预计 2028 年毕业

- 中科院计算所智能信息处理重点实验室

**北京航空航天大学**<br>
计算机科学与技术专业工学学士，2018 年 9 月至 2022 年 6 月

研究概况
======

我的研究涵盖多模态推理、视觉语言理解与视频时序定位。已发表工作包括面向知识型视觉问答的问题感知图像描述方法 QACap、基于点监督协同时间一致性学习的 COTEL，以及面向分布外视频时序定位的动态时刻查询重校准方法 DQR-DETR。更广泛的研究兴趣包括大语言模型、自主智能体、强化学习与多模态后训练。

研究方向
======

- 大语言模型与视觉语言模型
- 自主智能体与智能体强化学习
- 多模态理解、推理与模型后训练
- 视频理解与时序定位

项目经历
======

**基于知识图谱的图像检索系统**，2023 年 10 月至 2024 年 4 月

- 面向影视剧照与历史事件图像，构建结合全局视觉匹配与人物中心检索的双路径检索流程。
- 使用 ResNet-50、Faiss 与 HNSW 实现可扩展检索，并结合 YuNet 与 SFace 完成人脸检测和身份匹配。
- 将检索结果与视频片段、演员信息及知识图谱一跳关系进行关联，为结果补充语义上下文与可解释信息。

论文发表
======

{% assign cv_publications = site.publications | where: "lang", "zh" | sort: "date" | reverse %}
{% for post in cv_publications %}
  {% include publication-card.html post=post lang="zh" %}
{% endfor %}

技术能力
======

- **编程与机器学习：** 具有 Python 与 PyTorch 实践经验
- **训练与推理：** 具有 DeepSpeed、vLLM、verl、分布式训练、大模型后训练与推理优化经验
- **科研流程：** 论文阅读、方法复现、实验设计、结果分析与英文学术写作

荣誉奖励
======

- 中国科学院大学研究生学业奖学金，2022-2025
- 第十二届全国大学生数学竞赛一等奖
- 第十二届蓝桥杯 Python 程序设计省赛一等奖

联系方式
======

- 邮箱：[taozhuo2000@outlook.com](mailto:taozhuo2000@outlook.com)
- [Google Scholar](https://scholar.google.com/citations?user=smobxJAAAAAJ&hl=en)
- [ORCID](https://orcid.org/0009-0006-6358-7613)
- [GitHub](https://github.com/taozhuo2000)
