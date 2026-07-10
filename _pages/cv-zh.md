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

- GPA：3.81/4.0，专业前 5%
- 中科院计算所智能信息处理重点实验室
- 中国科学院大学研究生学业奖学金，2022-2025

**北京航空航天大学**<br>
计算机科学与技术专业工学学士，2018 年 9 月至 2022 年 6 月

- GPA：3.84/4.0，专业前 10%

研究方向
======

- 大语言模型与视觉语言模型
- 自主智能体与智能体强化学习
- 多模态理解、推理与模型后训练
- 视频理解与时序定位

论文发表
======

{% assign cv_publications = site.publications | where: "lang", "zh" | sort: "date" | reverse %}
{% for post in cv_publications %}
  {% include publication-card.html post=post lang="zh" %}
{% endfor %}

技术能力
======

- **编程与机器学习：** Python、PyTorch
- **训练与推理：** DeepSpeed、vLLM、verl、分布式训练、大模型后训练与推理优化
- **科研能力：** 论文阅读、方法复现、实验设计、结果分析与英文学术写作

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
