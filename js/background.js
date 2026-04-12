// 背景元素初始化
(function() {
    function initBackground() {
        // 检查是否已存在 #web_bg 元素
        if (!document.getElementById('web_bg')) {
            const webBg = document.createElement('div');
            webBg.id = 'web_bg';
            document.body.appendChild(webBg);
        }
    }

    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackground);
    } else {
        initBackground();
    }
})();