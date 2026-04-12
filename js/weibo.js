// 微博热搜（占位版本）
(function() {
    const weiboConfig = {
        api: '', // 需要配置第三方API
        maxItems: 10
    };

    const hotTags = {
        '爆': { color: '#ff4d4f' },
        '热': { color: '#ff7a45' },
        '沸': { color: '#ffc53d' },
        '新': { color: '#73d13d' },
        '荐': { color: '#40a9ff' },
        '音': { color: '#9254de' },
        '影': { color: '#f759ab' },
        '剧': { color: '#13c2c2' },
        '综': { color: '#52c41a' }
    };

    // 模拟数据（无API时使用）
    const mockData = [
        { tag: '热', title: '今日科技新闻', url: '#' },
        { tag: '新', title: '新功能上线', url: '#' },
        { tag: '荐', title: '热门话题讨论', url: '#' },
        { tag: '沸', title: '社会热点事件', url: '#' }
    ];

    function createWeiboWidget(data) {
        if (!data || data.length === 0) return;

        const widget = document.createElement('div');
        widget.id = 'weibo-hot';
        widget.className = 'card-widget card-weibo';

        const header = document.createElement('div');
        header.className = 'item-headline';
        header.innerHTML = '<i class="fas fa-fire"></i><span>微博热搜</span>';

        const list = document.createElement('div');
        list.className = 'weibo-list';

        data.forEach((item, index) => {
            const listItem = document.createElement('div');
            listItem.className = 'weibo-item';

            const rank = document.createElement('span');
            rank.className = 'weibo-rank';
            rank.textContent = index + 1;

            const tag = document.createElement('span');
            tag.className = 'weibo-tag';
            tag.textContent = item.tag;
            if (hotTags[item.tag]) {
                tag.style.backgroundColor = hotTags[item.tag].color;
            }

            const title = document.createElement('a');
            title.className = 'weibo-title';
            title.href = item.url;
            title.textContent = item.title;
            title.target = '_blank';

            listItem.appendChild(rank);
            listItem.appendChild(tag);
            listItem.appendChild(title);
            list.appendChild(listItem);
        });

        widget.appendChild(header);
        widget.appendChild(list);

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .card-weibo {
                padding: 20px;
                background: var(--card-bg);
                border-radius: 12px;
                margin-bottom: 20px;
            }
            .weibo-list {
                margin-top: 10px;
            }
            .weibo-item {
                display: flex;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid var(--border-color);
            }
            .weibo-item:last-child {
                border-bottom: none;
            }
            .weibo-rank {
                width: 24px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                background: var(--text-bg);
                border-radius: 4px;
                margin-right: 8px;
                font-size: 12px;
                color: var(--text-color);
            }
            .weibo-rank:nth-child(1) {
                background: #ff4d4f;
                color: white;
            }
            .weibo-rank:nth-child(2) {
                background: #ff7a45;
                color: white;
            }
            .weibo-rank:nth-child(3) {
                background: #ffc53d;
                color: white;
            }
            .weibo-tag {
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                color: white;
                margin-right: 8px;
            }
            .weibo-title {
                flex: 1;
                color: var(--text-color);
                text-decoration: none;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .weibo-title:hover {
                color: var(--primary-color);
            }
        `;
        document.head.appendChild(style);

        return widget;
    }

    function loadWeiboHot() {
        const aside = document.querySelector('.aside-content');
        if (!aside) return;

        // 如果没有配置API，使用模拟数据
        if (!weiboConfig.api) {
            console.log('微博热搜API未配置，使用模拟数据');
            const widget = createWeiboWidget(mockData);
            if (widget) {
                aside.insertBefore(widget, aside.firstChild);
            }
            return;
        }

        // 如果配置了API，尝试加载真实数据
        fetch(weiboConfig.api)
            .then(response => response.json())
            .then(data => {
                const widget = createWeiboWidget(data.slice(0, weiboConfig.maxItems));
                if (widget) {
                    aside.insertBefore(widget, aside.firstChild);
                }
            })
            .catch(error => {
                console.error('加载微博热搜失败:', error);
                const widget = createWeiboWidget(mockData);
                if (widget) {
                    aside.insertBefore(widget, aside.firstChild);
                }
            });
    }

    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadWeiboHot);
    } else {
        loadWeiboHot();
    }
})();