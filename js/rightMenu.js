// 右键菜单系统
(function() {
    const rm = {};

    // 右键菜单功能
    rm.hideRightMenu = function() {
        const rightMenu = document.getElementById('rightMenu');
        if (rightMenu) {
            rightMenu.style.display = 'none';
            rm.mask && rm.mask.style.display && (rm.mask.style.display = 'none');
        }
    };

    rm.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    rm.copySelect = function() {
        try {
            const text = window.getSelection().toString();
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    btf.snackbarShow('复制成功');
                });
            }
        } catch (e) {
            console.error('复制失败:', e);
        }
    };

    rm.open = function() {
        const url = window.getSelection().toString();
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            window.open(url, '_blank');
        }
    };

    rm.openWithNewTab = function() {
        const url = window.getSelection().toString();
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            window.open(url, '_blank');
        }
    };

    rm.copyLink = function() {
        try {
            const url = window.getSelection().toString();
            if (url) {
                navigator.clipboard.writeText(url).then(() => {
                    btf.snackbarShow('链接已复制');
                });
            }
        } catch (e) {
            console.error('复制链接失败:', e);
        }
    };

    rm.saveAs = function() {
        const img = document.querySelector('img');
        if (img) {
            const a = document.createElement('a');
            a.href = img.src;
            a.download = img.src.split('/').pop();
            a.click();
        }
    };

    rm.fullScreen = function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    rm.copyWordsLink = function() {
        try {
            navigator.clipboard.writeText(window.location.href).then(() => {
                btf.snackbarShow('链接已复制');
            });
        } catch (e) {
            console.error('复制链接失败:', e);
        }
    };

    // 暴露到全局
    window.rmf = rm;
    window.rm = rm;

    // 初始化右键菜单
    document.addEventListener('contextmenu', function(e) {
        // 如果是文本选择或图片，不显示自定义右键菜单
        if (window.getSelection().toString() || e.target.tagName === 'IMG') {
            return;
        }

        e.preventDefault();
        const rightMenu = document.getElementById('rightMenu');
        if (rightMenu) {
            rightMenu.style.display = 'block';
            rightMenu.style.top = e.clientY + 'px';
            rightMenu.style.left = e.clientX + 'px';
        }
    });

    // 点击其他地方关闭右键菜单
    document.addEventListener('click', function(e) {
        const rightMenu = document.getElementById('rightMenu');
        if (rightMenu && !rightMenu.contains(e.target)) {
            rightMenu.style.display = 'none';
        }
    });

    // 添加随机文章功能（如果还没有）
    if (!window.randomPost) {
        window.randomPost = function() {
            fetch('/baidusitemap.xml')
                .then(response => response.text())
                .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                .then(data => {
                    const posts = Array.from(data.querySelectorAll('url loc'));
                    if (posts.length === 0) return;
                    const currentUrl = window.location.href;
                    let randomPostUrl;
                    do {
                        randomPostUrl = posts[Math.floor(Math.random() * posts.length)].textContent;
                    } while (randomPostUrl === currentUrl && posts.length > 1);
                    if (randomPostUrl) {
                        window.location.href = randomPostUrl;
                    }
                })
                .catch(error => console.error('Failed to load sitemap:', error));
        };
    }
})();