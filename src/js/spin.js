const wheel = document.getElementById('wheel');
const startBtn = document.getElementById('startBtn');

let isSpinning = false;
let currentRotation = 0;

const spinAmounts = [
    1805, 2275, 6735, 2853, 4005,
    2244, 6825, 2880, 3500, 1920,
    3000, 2600, 3100, 2700, 3400,
    2200, 3600, 2500, 3300, 2900
];

const GREEN_START = 345;
const GREEN_END = 15;

const plannedGreens = [0, 2, 4, 7, 10, 13, 16, 19];

let lastWasGreen = false;
let spinIndex = 0;

startBtn.addEventListener('click', () => {
    if (isSpinning) return;

    isSpinning = true;
    startBtn.disabled = true;

    const idx = spinIndex % spinAmounts.length;
    let spinAmount = spinAmounts[idx];
    let finalDeg = (currentRotation + spinAmount) % 360;

    let shouldBeGreen = plannedGreens.includes(idx) && !lastWasGreen;

    if (shouldBeGreen) {
        if (!(finalDeg >= GREEN_START || finalDeg <= GREEN_END)) {
            let extra = (GREEN_START - finalDeg + 360) % 360;
            spinAmount += extra;
            finalDeg = (currentRotation + spinAmount) % 360;
        }
    } else {
        if (finalDeg >= GREEN_START || finalDeg <= GREEN_END) {
            spinAmount += 30;
            finalDeg = (currentRotation + spinAmount) % 360;
        }
    }

    currentRotation += spinAmount;

    wheel.style.transition = "transform 2.5s ease-out";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        const landedGreen = (currentRotation % 360 >= GREEN_START || currentRotation % 360 <= GREEN_END);

        console.log(
            `Spin ${spinIndex + 1}: ${landedGreen ? "YEŞİL" : "BEYAZ"} → Derece: ${currentRotation % 360}`
        );

        lastWasGreen = landedGreen;
        spinIndex++;

        isSpinning = false;
        startBtn.disabled = false;
    }, 3000);
});
const socket = new WebSocket("ws://10.16.138.158:8081");

socket.onmessage = (msg) => {
    if(msg.data === "spin") {
        startBtn.click();
    }
};