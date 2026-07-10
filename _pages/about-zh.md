---
permalink: /zh/
title: "陶卓的个人主页"
lang: zh
alternate_url: /
author_profile: true
redirect_from:
  - /zh/about/
---

<div class="academic-intro" markdown="1">

## 关于我 {#about-me}

我是**陶卓**，中国科学院计算技术研究所计算机科学与技术专业直博生，所在实验室为中科院计算所智能信息处理重点实验室。

我的研究关注能够进行感知、推理、学习与行动的智能系统，主要研究方向包括大语言模型、智能体、强化学习、多模态学习与视觉语言模型。

<span class="collaboration-note">欢迎通过邮件与我交流科研问题、工程实践或探讨潜在合作。</span>

</div>

## 研究方向

<ul class="research-list">
  <li>大语言模型</li>
  <li>自主智能体</li>
  <li>强化学习</li>
  <li>多模态理解</li>
  <li>视觉语言模型</li>
  <li>视频时序定位</li>
</ul>

## 🔥 最新动态

{% include news-list.html lang="zh" limit=site.recent_news_count %}

<p class="section-more"><a href="/zh/news/">查看全部动态 →</a></p>

## 代表性论文

{% assign selected_publications = site.publications | where: "lang", "zh" | where: "selected", true | sort: "date" | reverse %}
{% for post in selected_publications %}
  {% include publication-card.html post=post lang="zh" %}
{% endfor %}

<p class="section-more"><a href="/zh/publications/">查看全部论文 →</a></p>

## 博客

我会在博客中记录科研笔记、工程实践、论文阅读以及学习和研究过程中的经验总结。

<p class="section-more"><a href="/zh/blog/">进入博客 →</a></p>
