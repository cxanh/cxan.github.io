// 美化设置
(function() {
    let winbox = null;

    function toggleSettings() {
        if (!winbox) {
            createSettingsWindow();
        }
        winbox.toggle();
    }

    function createSettingsWindow() {
        // 加载 Winbox 库
        if (!window.WinBox) {
            const script = document.createElement('script');
            script.src = 'https://cdn1.tianli0.top/gh/nextapps-de/winbox/dist/winbox.bundle.min.js';
            script.onload = () => {
                initSettings();
            };
            document.head.appendChild(script);
        } else {
            initSettings();
        }
    }

    function initSettings() {
        winbox = new WinBox({
            title: '美化设置',
            width: 400,
            height: 300,
            x: 'center',
            y: 'center',
            border: 0,
            html: `
                <div class="settings-container">
                    <div class="settings-section">
                        <h3>主题设置</h3>
                        <button onclick="switchTheme('light')">浅色模式</button>
                        <button onclick="switchTheme('dark')">深色模式</button>
                    </div>
                    <div class="settings-section">
                        <h3>特效设置</h3>
                        <label>
                            <input type="checkbox" id="toggle-universe" checked onchange="toggleEffect('universe')">
                            星空特效
                        </label>
                        <label>
                            <input type="checkbox" id="toggle-snow" onchange="toggleEffect('snow')">
                            雪花特效
                        </label>
                        <label>
                            <input type="checkbox" id="toggle-heart" checked onchange="toggleEffect('heart')">
                            点击心形
                        </label>
                    </div>
                    <div class="settings-section">
                        <h3>其他设置</h3>
                        <label>
                            <input type="checkbox" id="toggle-neko" checked onchange="toggleEffect('neko')">
                            小猫咪滚动条
                        </label>
                    </div>
                </div>
            `,
            onclose: () => {
                winbox = null;
            }
        });

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .settings-container {
                padding: 20px;
            }
            .settings-section {
                margin-bottom: 20px;
            }
            .settings-section h3 {
                margin: 0 0 10px 0;
                font-size: 16px;
                color: #333;
            }
            .settings-section button {
                margin: 5px;
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                background: #1890ff;
                color: white;
                cursor: pointer;
            }
            .settings-section button:hover {
                background: #40a9ff;
            }
            .settings-section label {
                display: block;
                margin: 8px 0;
                cursor: pointer;
            }
            .settings-section input[type="checkbox"] {
                margin-right: 8px;
            }
        `;
        document.head.appendChild(style);
    }

    // 全局函数
    window.toggleWinbox = toggleSettings;

    window.switchTheme = function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // 保存到本地存储
        localStorage.setItem('theme', theme);
    };

    window.toggleEffect = function(effect) {
        const checkbox = document.getElementById(`toggle-${effect}`);
        if (!checkbox) return;

        const enabled = checkbox.checked;

        switch (effect) {
            case 'universe':
                const universe = document.getElementById('universe');
                if (universe) {
                    universe.style.display = enabled ? 'block' : 'none';
                }
                break;
            case 'snow':
                const snow = document.getElementById('snow');
                if (snow) {
                    snow.style.display = enabled ? 'block' : 'none';
                }
                break;
            case 'heart':
                const heartScript = document.querySelector('script[id="click-heart"]');
                if (heartScript) {
                    heartScript.disabled = !enabled;
                }
                break;
            case 'neko':
                const neko = document.getElementById('neko');
                if (neko) {
                    neko.style.display = enabled ? 'block' : 'none';
                }
                break;
        }

        // 保存到本地存储
        localStorage.setItem(`effect-${effect}`, enabled);
    };

    // 加载保存的设置
    function loadSettings() {
        // 加载主题
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }

        // 加载特效设置
        const effects = ['universe', 'snow', 'heart', 'neko'];
        effects.forEach(effect => {
            const savedEffect = localStorage.getItem(`effect-${effect}`);
            if (savedEffect !== null) {
                setTimeout(() => {
                    window.toggleEffect(effect);
                    const checkbox = document.getElementById(`toggle-${effect}`);
                    if (checkbox) {
                        checkbox.checked = savedEffect === 'true';
                    }
                }, 100);
            }
        });
    }

    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSettings);
    } else {
        loadSettings();
    }
})();