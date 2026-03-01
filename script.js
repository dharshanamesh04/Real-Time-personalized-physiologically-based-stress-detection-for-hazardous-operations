/**
 * STRESS DETECTION SYSTEM - INTERFACE ENHANCEMENTS
 * This script adds a dynamic glow and smooth interaction to the UI.
 */

// 1. Create the Background Glow Element
const glow = document.createElement('div');
glow.className = 'mouse-glow';
document.body.appendChild(glow);

// 2. Track Mouse Position for the Radial Light
document.addEventListener('mousemove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});

// 3. Magnetic Button Effect
// Makes buttons feel "heavy" and interactive when hovered
const buttons = document.querySelectorAll('.learn-more-btn, .pause-btn, .nav-links a');

buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

// 4. Scroll Progress Indicator
const scrollBar = document.createElement('div');
scrollBar.className = 'scroll-progress';
document.body.appendChild(scrollBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollBar.style.width = scrolled + "%";
});
// Simulate Real-Time Data "Life"
function simulateData() {
    const hrVal = document.querySelector('.parameters-table tr:nth-child(1) td:nth-child(3)');
    const hrvVal = document.querySelector('.parameters-table tr:nth-child(2) td:nth-child(3)');
    
    if(hrVal && hrvVal) {
        setInterval(() => {
            // Subtle fluctuations to look alive
            const hr = 72 + Math.floor(Math.random() * 5);
            const hrv = 45 + Math.floor(Math.random() * 10);
            hrVal.innerHTML = `${hr} BPM`;
            hrvVal.innerHTML = `${hrv} ms`;
        }, 2000);
    }
}
simulateData();
const ctx = document.getElementById('liveChart').getContext('2d');
let chartData = Array(30).fill(70); 

const liveChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array(30).fill(''),
        datasets: [{
            label: 'Heart Rate',
            data: chartData,
            borderColor: '#00e676',
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            backgroundColor: 'rgba(0, 230, 118, 0.05)',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { min: 60, max: 90, display: false },
            x: { display: false }
        },
        plugins: { legend: { display: false } },
        animation: { duration: 0 }
    }
});

// Update the chart every 500ms
setInterval(() => {
    const newVal = 72 + Math.floor(Math.random() * 8);
    chartData.push(newVal);
    chartData.shift();
    
    document.getElementById('hr-val').innerText = newVal;
    document.getElementById('eda-val').innerText = (4.0 + Math.random()).toFixed(1);
    
    liveChart.update();
}, 500);
// Initialize ScrollReveal
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1200,
    delay: 200,
    reset: false // Set to true if you want it to animate every time you scroll up/down
});

// Apply to different elements for staggered effect
sr.reveal('.section-header', { delay: 100 });
sr.reveal('.challenge-card', { interval: 200 });
sr.reveal('.step', { origin: 'left', interval: 150 });
sr.reveal('.hud-container', { scale: 0.9, duration: 2000 });

// 3D Background Particles Generator
const container = document.getElementById('canvas-container');
for (let i = 0; i < 50; i++) {
    const node = document.createElement('div');
    node.className = 'node';
    node.style.left = Math.random() * 100 + 'vw';
    node.style.animationDelay = Math.random() * 20 + 's';
    node.style.opacity = Math.random();
    container.appendChild(node);
}
