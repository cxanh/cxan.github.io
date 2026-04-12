// 页脚开站时间计时
(function() {
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        #workboard {
            text-align: center;
            padding: 10px 0;
            color: var(--text-color);
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);

    function updateRuntime() {
        const startDate = new Date('2022/08/09 00:00:00');
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const runtimeStr = `本站已安全运行 ${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;

        // 查找并更新 workboard 元素
        const workboard = document.getElementById('workboard');
        if (workboard) {
            workboard.textContent = runtimeStr;
        }
    }

    // 每秒更新一次
    setInterval(updateRuntime, 1000);

    // 立即执行一次
    updateRuntime();
})();