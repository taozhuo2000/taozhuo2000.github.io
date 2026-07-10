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

I am **Zhuo Tao**, a Ph.D. student in Computer Science and Technology at the [Institute of Computing Technology, Chinese Academy of Sciences](http://www.ict.ac.cn/) (ICT, CAS), affiliated with the Key Laboratory of Intelligent Information Processing.

My research focuses on intelligent systems that can perceive, reason, learn, and act. I am especially interested in large language models, autonomous agents, reinforcement learning, multimodal learning, and vision-language models.

<span class="collaboration-note">I am always happy to discuss research ideas and potential collaborations. Please feel free to contact me by email.</span>

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

## 🔥 Recent News

{% include news-list.html lang="en" limit=site.recent_news_count %}

<p class="section-more"><a href="/news/">All news →</a></p>

## Selected Publications

{% assign selected_publications = site.publications | where: "lang", "en" | where: "selected", true | sort: "date" | reverse %}
{% for post in selected_publications %}
  {% include publication-card.html post=post lang="en" %}
{% endfor %}

<p class="section-more"><a href="/publications/">All publications →</a></p>

## Blog

I use the blog to record research notes, engineering practice, reading reflections, and lessons learned along the way.

<p class="section-more"><a href="/blog/">Visit the blog →</a></p>
