---
layout: archive
title: "Sitemap / 网站地图"
permalink: /sitemap/
author_profile: true
---

{% include base_path %}

A list of all pages and publications on this site. An [XML version]({{ base_path }}/sitemap.xml) is also available.

本站页面与论文列表。另提供可供搜索引擎读取的 [XML 版本]({{ base_path }}/sitemap.xml)。

<h2>Pages / 页面</h2>
{% for post in site.pages %}
  {% include archive-single.html %}
{% endfor %}

{% capture written_label %}'None'{% endcapture %}

{% for collection in site.collections %}
{% unless collection.output == false or collection.label == "posts" %}
  {% capture label %}{{ collection.label }}{% endcapture %}
  {% if label != written_label %}
  <h2>{{ label }}</h2>
  {% capture written_label %}{{ label }}{% endcapture %}
  {% endif %}
{% endunless %}
{% for post in collection.docs %}
  {% unless collection.output == false or collection.label == "posts" %}
  {% include archive-single.html %}
  {% endunless %}
{% endfor %}
{% endfor %}
