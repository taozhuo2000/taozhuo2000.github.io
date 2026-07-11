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

我是**陶卓**，中国科学院计算技术研究所计算机科学与技术专业直博生，所在实验室为中科院计算所智能信息处理重点实验室。本科毕业于北京航空航天大学计算机科学与技术专业。

我的研究连接多模态推理与视频语言理解。已发表工作涵盖知识型视觉问答中的问题感知视觉观察、稀疏监督下的视频时序定位，以及面向训练分布之外的时序定位泛化。我也关注大语言模型、自主智能体、强化学习、多模态后训练与视觉语言模型。

<span class="collaboration-note">欢迎通过邮件与我交流科研问题、工程实践或探讨潜在合作。</span>

</div>

{% assign chinese_publications = site.publications | where: "lang", "zh" %}
{% assign chinese_first_author_journals = chinese_publications | where: "first_author", true %}
{% assign chinese_equal_contribution = chinese_publications | where: "equal_contribution", true %}
<div class="profile-stats" aria-label="学术信息概览">
  <div class="profile-stat">
    <span class="profile-stat__value">{{ chinese_publications.size }}</span>
    <span class="profile-stat__label">篇已发表论文</span>
  </div>
  <div class="profile-stat">
    <span class="profile-stat__value">{{ chinese_first_author_journals.size }}</span>
    <span class="profile-stat__label">篇第一作者期刊论文</span>
  </div>
  <div class="profile-stat">
    <span class="profile-stat__value">{{ chinese_equal_contribution.size }}</span>
    <span class="profile-stat__label">篇 CVPR 共同一作论文</span>
  </div>
</div>

## 研究概览

<div class="research-theme-grid">
  <article class="research-theme-card">
    <span class="research-theme-card__index">01</span>
    <h3>大语言模型、智能体与强化学习</h3>
    <p>我关注能够进行推理、工具使用和交互学习的智能体，包括智能体强化学习与多模态模型后训练。</p>
  </article>
  <article class="research-theme-card">
    <span class="research-theme-card__index">02</span>
    <h3>多模态与视觉语言推理</h3>
    <p>我的 CVPR 工作研究问题感知图像描述如何连接视觉证据与大语言模型推理，以更清晰地分离视觉观察和外部知识。</p>
  </article>
  <article class="research-theme-card">
    <span class="research-theme-card__index">03</span>
    <h3>鲁棒视频理解</h3>
    <p>我的期刊工作研究稀疏点监督和分布变化条件下的视频时序定位，重点关注可靠的视频文本对齐与时序边界预测。</p>
  </article>
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

## 学术经历

<div class="academic-timeline">
  <div class="academic-timeline__item">
    <span class="academic-timeline__date">2022–2028（预计）</span>
    <h3>计算机科学与技术专业直博生</h3>
    <p>中国科学院计算技术研究所 · 智能信息处理重点实验室</p>
  </div>
  <div class="academic-timeline__item">
    <span class="academic-timeline__date">2018–2022</span>
    <h3>计算机科学与技术专业工学学士</h3>
    <p>北京航空航天大学</p>
  </div>
</div>

## 代表项目

<article class="project-highlight">
  <div class="project-highlight__heading">
    <div>
      <span class="project-highlight__date">2023 年 10 月–2024 年 4 月</span>
      <h3>基于知识图谱的图像检索系统</h3>
    </div>
    <span class="project-highlight__label">研究与工程实践</span>
  </div>
  <p>面向影视剧照与历史事件图像，构建了结合全局视觉匹配与人物中心检索的双路径系统。检索结果进一步关联到视频片段、演员信息和知识图谱一跳关系，使结果不仅能够被找到，也更便于理解和探索。</p>
  <div class="project-highlight__stack" aria-label="项目技术栈">
    <span>ResNet-50</span><span>Faiss</span><span>HNSW</span><span>YuNet</span><span>SFace</span><span>知识图谱</span>
  </div>
</article>

## 🔥 最新动态

{% include news-list.html lang="zh" limit=site.recent_news_count %}

<p class="section-more"><a href="/zh/news/">查看全部动态 →</a></p>

## 代表性论文

{% assign selected_publications = site.publications | where: "lang", "zh" | where: "selected", true | sort: "date" | reverse %}
{% for post in selected_publications %}
  {% include publication-card.html post=post lang="zh" %}
{% endfor %}

<p class="section-more"><a href="/zh/publications/">查看全部论文 →</a></p>

## 近期文章

我会在博客中解释论文背后的问题、动机与方法设计，并记录科研笔记、工程实践以及研究过程中的经验总结。

{% assign recent_chinese_posts = site.posts | where: "lang", "zh" %}
<div class="blog-card-grid blog-card-grid--compact">
  {% for post in recent_chinese_posts limit: 3 %}
    {% include blog-card.html post=post lang="zh" %}
  {% endfor %}
</div>

<p class="section-more"><a href="/zh/blog/">进入博客 →</a></p>
