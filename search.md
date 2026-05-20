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
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        position: relative;
    }
    .search-input-wrapper {
        width: 100%;
        display: block;
    }
    #searchInput {
        width: 100%;
        padding: 16px 20px;
        font-size: 17px;
        font-family: inherit;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: var(--entry);
        color: var(--primary);
        display: block;
        box-sizing: border-box;
        height: 56px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.01);
        transition: all 0.2s ease;
    }
    #searchInput:focus {
        border-color: var(--accent);
        outline: none;
        box-shadow: 0 0 0 3px rgba(100, 100, 255, 0.15);
    }
    .local-search-entry {
        padding: 20px;
        background: var(--entry);
        border: 1px solid var(--border);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        position: relative;
        margin-bottom: 16px;
        transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .local-search-entry:hover {
        transform: translateY(-2px);
        border-color: var(--accent);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.03);
    }
    .local-search-entry-header {
        display: block;
    }
    .local-search-title {
        font-size: 1.3rem;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-weight: 700;
        line-height: 1.3;
        color: var(--primary);
        text-decoration: none;
        display: block;
        transition: color 0.2s;
    }
    .local-search-entry:hover .local-search-title {
        color: var(--accent);
    }
    .local-search-meta {
        font-size: 0.85rem;
        color: var(--secondary);
        display: flex;
        align-items: center;
        gap: 8px;
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
