---
title: "Separation of Powers: On Segregating Knowledge from Observation in LLM-enabled Knowledge-based Visual Question Answering"
collection: publications
category: conferences
lang: zh
selected: true
equal_contribution: true
permalink: /zh/publication/2025-separation-of-powers/
alternate_url: /publication/2025-separation-of-powers/
date: 2025-06-10
venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)"
venue_short: "CVPR"
method: "QACap"
research_area: "视觉推理"
teaser: "/images/blog/qacap-overview-zh.svg"
teaser_alt: "QACap 概念示意：提取与问题相关的视觉证据，再交由大语言模型完成知识推理。"
authors: 'Zhen Yang*, <strong>Zhuo Tao*</strong>, Qi Chen, Liang Li, Yuankai Qi, Anton van den Hengel, and Qingming Huang'
note: "* 共同一作"
summary: "以问题感知图像描述提取相关视觉证据，为大语言模型的知识推理提供清晰的视觉接口。"
paperurl: "https://openaccess.thecvf.com/content/CVPR2025/papers/Yang_Separation_of_Powers_On_Segregating_Knowledge_from_Observation_in_LLM-enabled_CVPR_2025_paper.pdf"
doiurl: "https://doi.org/10.1109/CVPR52734.2025.02305"
dblpurl: "https://dblp.org/rec/conf/cvpr/YangT00QHH25"
blogurl: "/zh/blog/qacap-explained/"
citation: 'Zhen Yang*, <strong>Zhuo Tao*</strong>, Qi Chen, Liang Li, Yuankai Qi, Anton van den Hengel, and Qingming Huang. &quot;Separation of Powers: On Segregating Knowledge from Observation in LLM-enabled Knowledge-based Visual Question Answering.&quot; <i>CVPR</i>, 2025.'
---

<div class="publication-detail-meta">
  <p class="publication-authors">{{ page.authors }}</p>
  <p class="publication-venue">{{ page.venue }}，2025 · {{ page.note }}</p>
  <div class="publication-links">
    <a href="{{ page.paperurl }}">论文</a>
    {% if page.doiurl != page.paperurl %}<a href="{{ page.doiurl }}">DOI</a>{% endif %}
    <a href="{{ page.dblpurl }}">DBLP</a>
    <a href="{{ page.blogurl | relative_url }}">论文导读</a>
  </div>
</div>

我们提出问题感知图像描述框架 **QACap**，利用问题引导模型识别相关视觉证据，再由大语言模型完成知识推理，从而改善知识型视觉问答中视觉观察与外部知识之间的对齐。

<figure class="paper-figure publication-detail-figure">
  <img src="{{ page.teaser | relative_url }}" alt="{{ page.teaser_alt | escape }}" width="1200" height="675" loading="lazy" decoding="async">
  <figcaption>方法概念示意。论文导读中提供了更完整的方法解读。</figcaption>
</figure>
