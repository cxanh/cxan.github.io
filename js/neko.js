// 小猫咪滚动条
(function() {
    const nekoConfig = {
        nekoImg: 'https://bu.dusays.com/2022/07/20/62d812db74be9.png',
        hoverMsg: '春天啦~',
        bgcolor: 'rgb(0 0 0 / .5)',
        borderRadius: '2em',
        zoom: 0.9,
        right: '55.6px'
    };

    function initNeko() {
        // 只在桌面端显示
        if (window.innerWidth <= 992) return;

        const neko = document.createElement('div');
        neko.id = 'neko';

        const nekoImg = document.createElement('img');
        nekoImg.src = nekoConfig.nekoImg;
        nekoImg.alt = 'Neko';

        const nekoMsg = document.createElement('div');
        nekoMsg.className = 'neko-msg';
        nekoMsg.textContent = nekoConfig.hoverMsg;

        neko.appendChild(nekoImg);
        neko.appendChild(nekoMsg);

        neko.style.cssText = `
            position: fixed;
            right: ${nekoConfig.right};
            bottom: 0;
            width: 100px;
            height: 100px;
            z-index: 9998;
            cursor: pointer;
            transform: scale(${nekoConfig.zoom});
            transition: transform 0.3s ease;
        `;

        nekoImg.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
        `;

        nekoMsg.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: ${nekoConfig.bgcolor};
            color: white;
            padding: 5px 10px;
            border-radius: ${nekoConfig.borderRadius};
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // 悬停效果
        neko.addEventListener('mouseenter', () => {
            nekoMsg.style.opacity = '1';
            neko.style.transform = `scale(${nekoConfig.zoom * 1.1})`;
        });

        neko.addEventListener('mouseleave', () => {
            nekoMsg.style.opacity = '0';
            neko.style.transform = `scale(${nekoConfig.zoom})`;
        });

        // 点击回到顶部
        neko.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.body.appendChild(neko);
    }

    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNeko);
    } else {
        initNeko();
    }
})();