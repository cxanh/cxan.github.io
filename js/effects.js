// 背景特效系统
(function() {
    // 星空特效（暗黑模式）
    function initUniverse() {
        const canvas = document.getElementById('universe');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars = [];
        const starCount = 200;

        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speed = Math.random() * 0.5 + 0.1;
                this.opacity = Math.random();
                this.opacityChange = (Math.random() - 0.5) * 0.02;
            }

            update() {
                this.y -= this.speed;
                this.opacity += this.opacityChange;

                if (this.y < 0 || this.opacity <= 0 || this.opacity >= 1) {
                    this.reset();
                }
            }

            draw() {
                ctx.fillStyle = `rgba(226, 225, 224, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }

        function animate() {
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                stars.forEach(star => {
                    star.update();
                    star.draw();
                });
            }
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // 雪花特效
    function initSnow() {
        const canvas = document.getElementById('snow');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const snowflakes = [];
        const snowCount = 50;

        class Snowflake {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speed = Math.random() * 1 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.y += this.speed;
                this.x += Math.sin(this.y / 50) * 0.5;

                if (this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < snowCount; i++) {
            snowflakes.push(new Snowflake());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snowflakes.forEach(snow => {
                snow.update();
                snow.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // 添加 Canvas 元素
    function addCanvasElements() {
        // 星空 Canvas
        const universeCanvas = document.createElement('canvas');
        universeCanvas.id = 'universe';
        universeCanvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -1; pointer-events: none;';
        document.body.appendChild(universeCanvas);

        // 雪花 Canvas
        const snowCanvas = document.createElement('canvas');
        snowCanvas.id = 'snow';
        snowCanvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -1; pointer-events: none; display: none;';
        document.body.appendChild(snowCanvas);
    }

    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            addCanvasElements();
            initUniverse();
            initSnow();
        });
    } else {
        addCanvasElements();
        initUniverse();
        initSnow();
    }

    // 根据主题切换显示雪花
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const snowCanvas = document.getElementById('snow');
                const universeCanvas = document.getElementById('universe');
                const theme = document.documentElement.getAttribute('data-theme');

                if (snowCanvas) {
                    snowCanvas.style.display = theme === 'light' ? 'block' : 'none';
                }
                if (universeCanvas) {
                    universeCanvas.style.display = theme === 'dark' ? 'block' : 'none';
                }
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // 点击心形特效（通过 CDN 加载）
    if (document.querySelector('script[id="click-heart"]')) {
        console.log('Click heart effect already loaded');
    } else {
        const script = document.createElement('script');
        script.id = 'click-heart';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/butterfly-extsrc/1.1.3/click-heart.min.js';
        script.async = true;
        script.setAttribute('mobile', 'true');
        document.body.appendChild(script);
    }
})();