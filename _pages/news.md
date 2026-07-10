---
layout: archive
permalink: /news/
title: "News"
lang: en
alternate_url: /zh/news/
author_profile: true
---

{% assign english_news = site.news | where: "lang", "en" | sort: "date" | reverse | group_by_exp: "item", "item.date | date: '%Y'" %}
{% for year_group in english_news %}

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
