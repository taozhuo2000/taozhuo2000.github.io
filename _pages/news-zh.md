---
layout: archive
permalink: /zh/news/
title: "动态"
lang: zh
alternate_url: /news/
author_profile: true
---

{% assign chinese_news = site.news | where: "lang", "zh" | sort: "date" | reverse | group_by_exp: "item", "item.date | date: '%Y'" %}
{% for year_group in chinese_news %}

## {{ year_group.name }}

<ul class="news-list">
  {% for news_item in year_group.items %}
    <li>
      <span class="news-list__date">{{ news_item.date | date: "%Y-%m" }}</span>
      <span class="news-list__content">{{ news_item.excerpt | markdownify | remove: "<p>" | remove: "</p>" }}</span>
    </li>
  {% endfor %}
</ul>
{% endfor %}
