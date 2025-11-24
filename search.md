---
layout: page
title: Search
permalink: /search/
---

<div id="searchbox">
    <div class="search-input-wrapper">
        <input id="searchInput" autofocus placeholder="Search ↵" aria-label="search" type="search" autocomplete="off">
    </div>
    <div id="local-search-results" aria-label="search results"></div>
</div>

<style>
    #searchbox {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        position: relative;
    }
    .search-input-wrapper {
        width: 100%;
        display: block;
    }
    #searchInput {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid var(--border, #ccc);
        border-radius: 4px;
        background: var(--entry, #fff);
        color: var(--primary, #000);
        display: block;
        box-sizing: border-box;
        height: 50px;
    }
    .local-search-entry {
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border, #eee);
        display: flex;
        flex-direction: column;
        gap: 5px;
        position: relative; /* Ensure local context if needed */
    }
    .local-search-entry:last-child {
        border-bottom: none;
    }
    .local-search-entry-header {
        display: block;
        margin-bottom: 5px;
    }
    .local-search-title {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1.3;
        color: var(--primary, #000);
        text-decoration: none;
        display: block;
        position: static !important; /* Force static positioning */
    }
    .local-search-meta {
        font-size: 0.9rem;
        color: var(--secondary, #666);
        display: block;
        line-height: 1.2;
    }
</style>

<script>
    (function() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('local-search-results');
        let posts = [];

        // Fetch the search index
        fetch('{{ "/search.json" | relative_url }}')
            .then(response => response.json())
            .then(data => {
                posts = data;
            })
            .catch(error => console.error('Error fetching search index:', error));

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            searchResults.innerHTML = '';

            if (query.length < 2) return;

            const filteredPosts = posts.filter(post => {
                return post.title.toLowerCase().includes(query) ||
                       post.tags.toLowerCase().includes(query) ||
                       post.content.toLowerCase().includes(query);
            });

            filteredPosts.forEach(post => {
                const entry = document.createElement('div');
                entry.className = 'local-search-entry';
                entry.innerHTML = `
                    <div class="local-search-entry-header">
                        <a href="${post.url}" class="local-search-title">${post.title}</a>
                    </div>
                    <div class="local-search-meta">
                        <span>${post.date}</span>
                        ${post.tags ? ` • <span>${post.tags}</span>` : ''}
                    </div>
                `;
                searchResults.appendChild(entry);
            });
        });
    })();
</script>
