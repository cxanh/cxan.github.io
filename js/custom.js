// 随机文章跳转
function randomPost() {
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
}

// 将函数添加到全局作用域
window.randomPost = randomPost;