// 站长唠叨（占位版本）
(function() {
    const ispeakConfig = {
        api: '', // 需要配置第三方API，例如：https://kkapi.fomal.cc/api/ispeak?author=6319fedef46fae97dcfa5ee2&page=
        maxItems: 5
    };

    // 模拟数据（无API时使用）
    const mockData = [
        { content: '今天天气真不错', date: '2024-04-12 10:00:00' },
        { content: '开始新的一天吧！', date: '2024-04-11 08:30:00' },
        { content: '技术更新中...', date: '2024-04-10 15:20:00' }
    ];

    function createIspeakWidget(data) {
        if (!data || data.length === 0) return;

        const widget = document.createElement('div');
        widget.id = 'ispeak';
        widget.className = 'card-widget card-ispeak';

        const header = document.createElement('div');
        header.className = 'item-headline';
        header.innerHTML = '<i class="fas fa-comment-dots"></i><span>站长唠叨</span>';

        const list = document.createElement('div');
        list.className = 'ispeak-list';

        data.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'ispeak-item';

            const content = document.createElement('div');
            content.className = 'ispeak-content';
            content.textContent = item.content;

            const meta = document.createElement('div');
            meta.className = 'ispeak-meta';
            meta.textContent = item.date;

            listItem.appendChild(content);
            listItem.appendChild(meta);
            list.appendChild(listItem);
        });

        widget.appendChild(header);
        widget.appendChild(list);

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .card-ispeak {
                padding: 20px;
                background: var(--card-bg);
                border-radius: 12px;
                margin-bottom: 20px;
            }
            .ispeak-list {
                margin-top: 10px;
            }
            .ispeak-item {
                padding: 12px 0;
                border-bottom: 1px solid var(--border-color);
            }
            .ispeak-item:last-child {
                border-bottom: none;
            }
            .ispeak-content {
                font-size: 14px;
                color: var(--text-color);
                line-height: 1.6;
                margin-bottom: 6px;
            }
            .ispeak-meta {
                font-size: 12px;
                color: var(--text-secondary);
            }
        `;
        document.head.appendChild(style);

        return widget;
    }

    function loadIspeak() {
        const aside = document.querySelector('.aside-content');
        if (!aside) return;

        // 如果没有配置API，使用模拟数据
        if (!ispeakConfig.api) {
            console.log('站长唠叨API未配置，使用模拟数据');
            const widget = createIspeakWidget(mockData);
            if (widget) {
                aside.insertBefore(widget, aside.firstChild);
            }
            return;
        }

        // 如果配置了API，尝试加载真实数据
        fetch(ispeakConfig.api + '1')
            .then(response => response.json())
            .then(data => {
                const widget = createIspeakWidget(data.slice(0, ispeakConfig.maxItems));
                if (widget) {
                    aside.insertBefore(widget, aside.firstChild);
                }
            })
            .catch(error => {
                console.error('加载站长唠叨失败:', error);
                const widget = createIspeakWidget(mockData);
                if (widget) {
                    aside.insertBefore(widget, aside.firstChild);
                }
            });
    }

    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadIspeak);
    } else {
        loadIspeak();
    }
})();