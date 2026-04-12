// 欢迎信息（简化版，不依赖外部API）
(function() {
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 6) return '夜深了，注意休息';
        if (hour < 9) return '早上好';
        if (hour < 12) return '上午好';
        if (hour < 14) return '中午好';
        if (hour < 18) return '下午好';
        if (hour < 22) return '晚上好';
        return '夜深了';
    }

    function showWelcome() {
        const welcome = document.getElementById('welcome-info');
        if (welcome) {
            const greeting = getGreeting();
            const date = new Date();
            const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

            welcome.innerHTML = `
                <div class="welcome-greeting">${greeting}</div>
                <div class="welcome-date">${dateStr}</div>
                <div class="welcome-message">欢迎来到空中之阁</div>
            `;

            welcome.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.9);
                padding: 20px 40px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                z-index: 9999;
                text-align: center;
                animation: fadeInOut 3s ease-in-out forwards;
            `;

            // 添加淡入淡出动画
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                    10% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                }
                .welcome-greeting {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    color: #333;
                }
                .welcome-date {
                    font-size: 16px;
                    color: #666;
                    margin-bottom: 5px;
                }
                .welcome-message {
                    font-size: 14px;
                    color: #999;
                }
            `;
            document.head.appendChild(style);

            // 3秒后移除
            setTimeout(() => {
                welcome.remove();
            }, 3000);
        }
    }

    // 添加欢迎信息元素
    function addWelcomeElement() {
        if (!document.getElementById('welcome-info')) {
            const welcomeDiv = document.createElement('div');
            welcomeDiv.id = 'welcome-info';
            document.body.appendChild(welcomeDiv);
        }
    }

    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            addWelcomeElement();
            showWelcome();
        });
    } else {
        addWelcomeElement();
        showWelcome();
    }
})();