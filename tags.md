---
layout: page
title: Tags
permalink: /tags/
---

<ul class="terms-tags">
{% for tag in site.tags %}
  <li>
    <a href="#{{ tag[0] | slugify }}">
      {{ tag[0] }} <sup><strong><sup>{{ tag[1].size }}</sup></strong></sup>
    </a>
  </li>
{% endfor %}
</ul>

{% for tag in site.tags %}
  <h3 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h3>
  <ul class="recent-posts">
    {% for post in tag[1] %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <span class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</span>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
