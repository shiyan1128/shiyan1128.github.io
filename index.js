window.onload = () => {
        draw()
        function draw() {
            /* 定义滑块的大小 */
            let l = 30
            /* 可移动距离 */
            let d = 210
            /* 定义半径 */
            let r = 5
            /* 滑块的实际长度 */
            let ll = l + r * 2
            /* canvas的长度 */
            let w = 250
            /* canvas的高度 */
            let h = 150
            /* 当前渲染的x和y开始坐标 */
            let x
            let y
            /* 加的大小 */
            let ad = 15
            /* 存储保存的数据 */
            let imageData = ''
            const canvas = document.getElementById('canvas')
            const ctx = canvas.getContext('2d')
            ctx.name = "first"
            const img = new Image(250, 150)
            img.src = './backgroud.png'
            img.onload = () => {
                resetPosition()
                const canvas2 = document.createElement('canvas')
                canvas2.width = ll
                canvas2.height = h
                canvas2.className = "cvs2"
                document.body.querySelector('.container').appendChild(canvas2)
                const cvs2 = document.querySelector('.cvs2')
                const ctx2 = cvs2.getContext('2d')
                ctx2.name = "second"
                const pi = Math.PI
                drawCycle(ctx, x, y, ad, pi, "fill", img)
                ctx.drawImage(img, 0, 0, w, h)
                ctx2.putImageData(imageData, 0, y - 2 * r + 1)
                drawCycle(ctx2, 0, y, ad, pi, "fill", img)
                /* 拿到我的slider */
                let dot = document.querySelector('.dot')
                let spanEl = document.querySelector('.text')
                let pro = document.querySelector('.progress')
                let result = document.querySelector('.result')
                let isDown = false
                let currentX = 0
                let moveW = 0
                let maxW = 210
                let finalX = x - r / 2
                dot.addEventListener('mousedown', (e) => {
                    isDown = true
                    currentX = e.pageX
                    spanEl.textContent = ''
                })
                dot.addEventListener('mousemove', (e) => {
                    if (isDown) {
                        moveW = e.pageX - currentX
                        if (moveW < maxW) {
                            dot.style.left = `${moveW}px`
                            cvs2.style.left = `${moveW}px`
                            pro.style.width = `${moveW}px`
                        }
                    }
                })
                dot.addEventListener('mouseup', (e) => {
                    isDown = false

                    if (moveW > finalX && moveW < finalX + r) {
                        console.log(moveW, finalX + l)
                        console.log('识别成功')
                        dot.style.border = '1px solid #52ccba'
                        dot.style.backgroundColor = "#52ccba"
                        dot.textContent = "√"
                        result.textContent = "验证成功"

                    } else {
                        console.log('验证失败')
                        pro.classList.add('error')
                        dot.style.border = '1px solid #e83c4b'
                        dot.style.backgroundColor = "#e83c4b"
                        dot.textContent = "×"
                        result.textContent = "验证失败"
                    }
                })
            }
            /*  2 - 5 = 2 + (0-3) */
            function randomNumber(start, end) {
                return Math.round(Math.random() * (end - start) + start)
            }
            function resetPosition() {
                x = randomNumber(ll, w - ll)
                y = randomNumber(r * 2, h - ll)
                console.log(x, y)
            }
            function drawBack(ctx, img, w, h) {
                ctx.drawImage(img, 0, 0, w, h)
            }
            function drawCycle(ctx, x, y, ad, pi, operation, img) {
                if (ctx.name == "first") {
                    ctx.drawImage(img, 0, 0, w, h)
                    imageData = ctx.getImageData(x, y - 2 * r + 1, ll, ll)
                    ctx.clearRect(0, 0, w, h)
                } else {
                    ctx.globalCompositeOperation = "destination-in"
                }
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.lineTo(x + ad, y)
                ctx.arc(x + ad + 1 / 2, y - r + 2, r, 0, 2 * pi)
                ctx.lineTo(x + ad + 1 / 2, y)
                ctx.lineTo(x + ad + 1, y)
                ctx.lineTo(x + 2 * ad + 1, y)
                ctx.lineTo(x + 2 * ad + 1, y + ad)
                ctx.arc(x + 2 * ad + r - 2, y + ad + 1 / 2, r, 0, 2 * pi)
                ctx.lineTo(x + 2 * ad, y + ad + 1 / 2)
                ctx.lineTo(x + 2 * ad, y + ad + 1)
                ctx.lineTo(x + 2 * ad, y + 2 * ad + 1)
                ctx.lineTo(x, y + 2 * ad + 1)
                ctx.fill()
                ctx.globalCompositeOperation = "xor"
                ctx.beginPath()
                ctx.arc(x + ad + 1 / 2, y + 2 * ad + 1, r, pi, 2 * pi)
                ctx.fill()
                ctx.beginPath()
                ctx.arc(x, y + ad + 1 / 2, r, 1.5 * pi, 0.5 * pi)
                ctx.fill()
            }
        }
    }