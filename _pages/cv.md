---
layout: archive
title: "CV"
permalink: /cv/
lang: en
alternate_url: /zh/cv/
author_profile: true
redirect_from:
  - /resume
---

Education
======

**Institute of Computing Technology, Chinese Academy of Sciences**<br>
Ph.D. Student in Computer Science and Technology, Sep. 2022 - Present (expected 2028)

- Key Laboratory of Intelligent Information Processing

**Beihang University**<br>
B.Eng. in Computer Science and Technology, Sep. 2018 - Jun. 2022

Research Profile
======

My research spans multimodal reasoning, vision-language understanding, and video temporal localization. My published work includes question-aware captioning for knowledge-based visual question answering (QACap), collaborative temporal consistency learning from point supervision (COTEL), and dynamic moment-query recalibration for out-of-distribution temporal localization (DQR-DETR). My broader interests include large language models, autonomous agents, reinforcement learning, and multimodal post-training.

Research Interests
======

- Large Language Models and Vision-Language Models
- Autonomous Agents and Agentic Reinforcement Learning
- Multimodal Understanding, Reasoning, and Post-training
- Video Understanding and Temporal Localization

Selected Project
======

**Knowledge-Graph-Assisted Image Retrieval System**, Oct. 2023 - Apr. 2024

- Built a two-path retrieval pipeline combining global visual matching with person-centric search for film stills and historical-event imagery.
- Used ResNet-50, Faiss, and HNSW for scalable retrieval, together with YuNet and SFace for face detection and identity matching.
- Connected retrieval results with video segments, actor information, and one-hop knowledge-graph relations to provide additional semantic context and interpretability.

Publications
======

{% assign cv_publications = site.publications | where: "lang", "en" | sort: "date" | reverse %}
{% for post in cv_publications %}
  {% include publication-card.html post=post lang="en" %}
{% endfor %}

Technical Skills
======

- **Programming and machine learning:** experience with Python and PyTorch
- **Training and inference:** experience with DeepSpeed, vLLM, verl, distributed training, model post-training, and inference optimization
- **Research workflow:** literature review, method reproduction, experimental design, result analysis, and academic writing

Honors and Awards
======

- Graduate Academic Scholarship, University of Chinese Academy of Sciences, 2022-2025
- First Prize, 12th Chinese Mathematics Competitions for College Students
- First Prize (Provincial), 12th Lanqiao Cup Python Programming Competition

Contact
======

- Email: [taozhuo2000@outlook.com](mailto:taozhuo2000@outlook.com)
- [Google Scholar](https://scholar.google.com/citations?user=smobxJAAAAAJ&hl=en)
- [ORCID](https://orcid.org/0009-0006-6358-7613)
- [GitHub](https://github.com/taozhuo2000)
