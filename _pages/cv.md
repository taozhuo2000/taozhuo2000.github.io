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

- GPA: 3.81/4.0, top 5%
- Key Laboratory of Intelligent Information Processing
- Graduate Academic Scholarship, University of Chinese Academy of Sciences, 2022-2025

**Beihang University**<br>
B.Eng. in Computer Science and Technology, Sep. 2018 - Jun. 2022

- GPA: 3.84/4.0, top 10%

Research Interests
======

- Large Language Models and Vision-Language Models
- Autonomous Agents and Agentic Reinforcement Learning
- Multimodal Understanding, Reasoning, and Post-training
- Video Understanding and Temporal Localization

Publications
======

{% assign cv_publications = site.publications | where: "lang", "en" | sort: "date" | reverse %}
{% for post in cv_publications %}
  {% include publication-card.html post=post lang="en" %}
{% endfor %}

Technical Skills
======

- **Programming and ML:** Python, PyTorch
- **Training and Inference:** DeepSpeed, vLLM, verl, distributed training, model post-training, and inference optimization
- **Research:** literature review, method reproduction, experimental design, result analysis, and academic writing

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
