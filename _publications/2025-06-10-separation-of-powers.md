---
title: "Separation of Powers: On Segregating Knowledge from Observation in LLM-enabled Knowledge-based Visual Question Answering"
collection: publications
category: conferences
lang: en
selected: true
equal_contribution: true
permalink: /publication/2025-separation-of-powers/
alternate_url: /zh/publication/2025-separation-of-powers/
date: 2025-06-10
venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)"
venue_short: "CVPR"
method: "QACap"
research_area: "Visual reasoning"
teaser: "/images/blog/qacap-overview-en.svg"
teaser_alt: "Conceptual overview of QACap: question-aware visual evidence is passed to an LLM for knowledge reasoning."
authors: 'Zhen Yang*, <strong>Zhuo Tao*</strong>, Qi Chen, Liang Li, Yuankai Qi, Anton van den Hengel, and Qingming Huang'
note: "* Equal contribution"
summary: "Question-aware captions isolate visual evidence, giving an LLM a focused interface for knowledge-based visual question answering."
paperurl: "https://openaccess.thecvf.com/content/CVPR2025/papers/Yang_Separation_of_Powers_On_Segregating_Knowledge_from_Observation_in_LLM-enabled_CVPR_2025_paper.pdf"
doiurl: "https://doi.org/10.1109/CVPR52734.2025.02305"
dblpurl: "https://dblp.org/rec/conf/cvpr/YangT00QHH25"
blogurl: "/blog/qacap-explained/"
citation: 'Zhen Yang*, <strong>Zhuo Tao*</strong>, Qi Chen, Liang Li, Yuankai Qi, Anton van den Hengel, and Qingming Huang. &quot;Separation of Powers: On Segregating Knowledge from Observation in LLM-enabled Knowledge-based Visual Question Answering.&quot; <i>CVPR</i>, 2025.'
---

<div class="publication-detail-meta">
  <p class="publication-authors">{{ page.authors }}</p>
  <p class="publication-venue">{{ page.venue }}, 2025 · {{ page.note }}</p>
  <div class="publication-links">
    <a href="{{ page.paperurl }}">Paper</a>
    {% if page.doiurl != page.paperurl %}<a href="{{ page.doiurl }}">DOI</a>{% endif %}
    <a href="{{ page.dblpurl }}">DBLP</a>
    <a href="{{ page.blogurl | relative_url }}">Research note</a>
  </div>
</div>

We propose **QACap**, a question-aware captioner that uses the question to identify relevant visual evidence before an LLM performs knowledge-based reasoning. The method improves the alignment between visual observation and external knowledge in knowledge-based visual question answering.

<figure class="paper-figure publication-detail-figure">
  <img src="{{ page.teaser | relative_url }}" alt="{{ page.teaser_alt | escape }}" width="1200" height="675" loading="lazy" decoding="async">
  <figcaption>Conceptual overview. Read the research note for a guided explanation of the method.</figcaption>
</figure>
