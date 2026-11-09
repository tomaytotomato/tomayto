(function matrixRain() {
    var canvas = document.querySelector('.matrix-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>{}[]|/?!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var fontSize = 14;
    var cols, drops;
    var lastDraw = 0;
    var interval = 50; // ~20fps — classic Matrix pace

    function resize() {
        var parent = canvas.parentElement;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        cols = Math.floor(canvas.width / fontSize);
        drops = [];
        for (var i = 0; i < cols; i++) {
            drops[i] = Math.floor(Math.random() * -50);
        }
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw(ts) {
        requestAnimationFrame(draw);
        if (ts - lastDraw < interval) return;
        lastDraw = ts;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px "Courier New", monospace';

        for (var i = 0; i < cols; i++) {
            var y = drops[i] * fontSize;
            if (y < 0) { drops[i]++; continue; }

            var char = chars[Math.floor(Math.random() * chars.length)];

            // Bright white-green head
            ctx.fillStyle = '#ccffcc';
            ctx.fillText(char, i * fontSize, y);

            // Green body one step behind
            if (drops[i] > 1) {
                ctx.fillStyle = '#00ff41';
                ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, (drops[i] - 1) * fontSize);
            }

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = Math.floor(Math.random() * -30);
            }
            drops[i]++;
        }
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
})();
