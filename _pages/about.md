---
permalink: /
title: "Zhuo Tao's Homepage"
lang: en
alternate_url: /zh/
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<div class="academic-intro" markdown="1">

## About Me {#about-me}

I am **Zhuo Tao**, a direct-entry Ph.D. student in Computer Science and Technology at the [Institute of Computing Technology, Chinese Academy of Sciences](http://www.ict.ac.cn/) (ICT, CAS), affiliated with the Key Laboratory of Intelligent Information Processing. I received my B.Eng. in Computer Science and Technology from Beihang University in 2022.

My research connects multimodal reasoning with video-language understanding. My published work studies question-aware visual observation for knowledge-based visual question answering, learning temporal localization from sparse supervision, and generalizing temporal localization beyond training distributions. I am also interested in large language models, autonomous agents, reinforcement learning, multimodal post-training, and vision-language models.

<span class="collaboration-note">I am always happy to discuss research ideas and potential collaborations. Please feel free to contact me by email.</span>

</div>

{% assign english_publications = site.publications | where: "lang", "en" %}
{% assign english_first_author_journals = english_publications | where: "first_author", true %}
{% assign english_equal_contribution = english_publications | where: "equal_contribution", true %}
<div class="profile-stats" aria-label="Academic profile at a glance">
  <div class="profile-stat">
    <span class="profile-stat__value">{{ english_publications.size }}</span>
    <span class="profile-stat__label">Peer-reviewed publications</span>
  </div>
  <div class="profile-stat">
    <span class="profile-stat__value">{{ english_first_author_journals.size }}</span>
    <span class="profile-stat__label">First-author journal articles</span>
  </div>
  <div class="profile-stat">
    <span class="profile-stat__value">{{ english_equal_contribution.size }}</span>
    <span class="profile-stat__label">CVPR co-first-author paper</span>
  </div>
</div>

## Research Overview

<div class="research-theme-grid">
  <article class="research-theme-card">
    <span class="research-theme-card__index">01</span>
    <h3>LLMs, Agents, and Reinforcement Learning</h3>
    <p>I am interested in agents that can reason, use tools, learn from interaction, and improve through feedback. This includes agentic reinforcement learning and multimodal post-training.</p>
  </article>
  <article class="research-theme-card">
    <span class="research-theme-card__index">02</span>
    <h3>Multimodal and Vision-Language Reasoning</h3>
    <p>My CVPR work explores question-aware captions as an interface between visual evidence and LLM reasoning, aiming to separate observation more clearly from external knowledge.</p>
  </article>
  <article class="research-theme-card">
    <span class="research-theme-card__index">03</span>
    <h3>Robust Video Understanding</h3>
    <p>My journal work studies video temporal localization under sparse point supervision and distribution shift, with an emphasis on reliable video-text alignment and boundary prediction.</p>
  </article>
</div>

## Research Interests

<ul class="research-list">
  <li>Large Language Models</li>
  <li>Autonomous Agents</li>
  <li>Reinforcement Learning</li>
  <li>Multimodal Understanding</li>
  <li>Vision-Language Models</li>
  <li>Video Temporal Localization</li>
</ul>

## Academic Journey

<div class="academic-timeline">
  <div class="academic-timeline__item">
    <span class="academic-timeline__date">2022–2028 (expected)</span>
    <h3>Ph.D. Student in Computer Science and Technology</h3>
    <p>Institute of Computing Technology, Chinese Academy of Sciences · Key Laboratory of Intelligent Information Processing</p>
  </div>
  <div class="academic-timeline__item">
    <span class="academic-timeline__date">2018–2022</span>
    <h3>B.Eng. in Computer Science and Technology</h3>
    <p>Beihang University</p>
  </div>
</div>

## Selected Project

<article class="project-highlight">
  <div class="project-highlight__heading">
    <div>
      <span class="project-highlight__date">Oct. 2023–Apr. 2024</span>
      <h3>Knowledge-Graph-Assisted Image Retrieval</h3>
    </div>
    <span class="project-highlight__label">Research &amp; Engineering</span>
  </div>
  <p>Built a two-path retrieval system for film stills and historical-event imagery: one path searches global visual appearance, while the other focuses on people and identities. Retrieved images are linked back to video segments, actor metadata, and one-hop knowledge-graph relations, making the result easier to explore and interpret.</p>
  <div class="project-highlight__stack" aria-label="Project technologies">
    <span>ResNet-50</span><span>Faiss</span><span>HNSW</span><span>YuNet</span><span>SFace</span><span>Knowledge Graph</span>
  </div>
</article>

## 🔥 Recent News

{% include news-list.html lang="en" limit=site.recent_news_count %}

<p class="section-more"><a href="/news/">All news →</a></p>

## Selected Publications

{% assign selected_publications = site.publications | where: "lang", "en" | where: "selected", true | sort: "date" | reverse %}
{% for post in selected_publications %}
  {% include publication-card.html post=post lang="en" %}
{% endfor %}

<p class="section-more"><a href="/publications/">All publications →</a></p>

## Recent Writing

I use the blog to explain the motivation and design choices behind my papers, and to record research notes, engineering practice, and lessons learned along the way.

{% assign recent_english_posts = site.posts | where: "lang", "en" %}
<div class="blog-card-grid blog-card-grid--compact">
  {% for post in recent_english_posts limit: 3 %}
    {% include blog-card.html post=post lang="en" %}
  {% endfor %}
</div>

<p class="section-more"><a href="/blog/">Visit the blog →</a></p>
