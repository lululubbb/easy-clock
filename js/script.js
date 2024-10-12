function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const dayOfWeek = now.toLocaleDateString('zh-CN', { weekday: 'long' });
    const date = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const time = now.toLocaleTimeString('zh-CN', { hour12: false });

    const hourHand = document.querySelector('.hand.hour');
    const minuteHand = document.querySelector('.hand.minute');
    const secondHand = document.querySelector('.hand.second');

    const hourDeg = (hours % 12) * 30 + minutes / 2;
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;

    document.getElementById('time').innerText = time;
    document.getElementById('date').innerText = `${date} ${dayOfWeek}`;
}

// 将数字按圆周分布
function positionNumbers() {
    const numbers = document.querySelectorAll('.number');
    const angleIncrement = 360 / numbers.length;

    numbers.forEach((number, index) => {
        const angle = index * angleIncrement;
        // 计算旋转角度，使数字保持水平
        const rotateAngle = -angle;

        // 使用两个 transform 属性：一个是旋转到圆周上的位置，另一个是使数字保持水平
        number.style.transform = `rotate(${angle}deg) translateY(-123px) rotate(${rotateAngle}deg)`;
    });
}


function createScaleMarks() {
    const scaleContainer = document.getElementById('scale');

    // 生成短刻度线和长刻度线
    for (let i = 0; i < 60; i++) {
        const scaleMark = document.createElement('div');
        scaleMark.classList.add('scale-mark');
        
        // 长刻度线 (每5个刻度，也就是 60 / 12，每隔30度生成长刻度)
        if (i % 5 === 0) {
            scaleMark.classList.add('long');
        } else {
            scaleMark.classList.add('short');
        }

        // 每个刻度旋转 6 度
        const rotation = i * 6;
        // scaleMark.style.transform = `rotate(${rotation}deg)`;
        scaleMark.style.transform = `rotate(${rotation}deg) translateY(-135px)`;
        // 将刻度线添加到表盘容器中
        scaleContainer.appendChild(scaleMark);
    }
}

positionNumbers();
createScaleMarks();
setInterval(updateClock, 1000);
updateClock(); // Initial call
