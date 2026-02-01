const canvas = document.getElementById("starfield");
const context = canvas.getContext("2d");

// ---------- CANVAS FIX (CRITICAL FOR MOBILE) ----------
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ---------- STAR SETUP ----------
const stars = 500;
const colorrange = [0, 60, 240];
const starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        hue: colorrange[getRandom(0, colorrange.length - 1)],
        sat: getRandom(50, 100),
        opacity: Math.random()
    });
}

// ---------- ANIMATION STATE ----------
let frameNumber = 0;
let opacity = 0;
let secondOpacity = 0;
let thirdOpacity = 0;

const SAFE_MARGIN = window.innerWidth < 600 ? 40 : 0;

function clamp(v) {
    return Math.max(0, Math.min(1, v));
}

// ---------- STAR DRAW ----------
function drawStars() {
    for (const star of starArray) {
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
        context.fill();
    }
}

function updateStars() {
    for (const star of starArray) {
        if (Math.random() > 0.99) {
            star.opacity = Math.random();
        }
    }
}

// ---------- TEXT HELPERS ----------
function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, i) => {
        context.fillText(line, x, y + i * (fontSize + lineHeight));
    });
}

// ---------- TEXT DRAW ----------
function drawText() {
    const fontSize = Math.min(30, window.innerWidth / 24);
    const lineHeight = 8;

    context.font = `${fontSize}px "Comic Sans MS", cursive, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.shadowColor = "rgba(45,45,255,1)";
    context.shadowBlur = window.innerWidth < 600 ? 4 : 8;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - SAFE_MARGIN;

    if (frameNumber < 250) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("everyday I cannot believe how lucky I am", cx, cy);
        opacity = clamp(opacity + 0.01);
    }

    if (frameNumber >= 250 && frameNumber < 500) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("everyday I cannot believe how lucky I am", cx, cy);
        opacity = clamp(opacity - 0.01);
    }

    if (frameNumber === 500) opacity = 0;

    if (frameNumber > 500 && frameNumber < 1000) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        window.innerWidth < 600
            ? drawTextWithLineBreaks(
                  ["amongst trillions and trillions of stars,", "over billions of years"],
                  cx,
                  cy,
                  fontSize,
                  lineHeight
              )
            : context.fillText(
                  "amongst trillions and trillions of stars, over billions of years",
                  cx,
                  cy
              );
        opacity = clamp(frameNumber < 750 ? opacity + 0.01 : opacity - 0.01);
    }

    if (frameNumber === 1000) opacity = 0;

    if (frameNumber > 1000 && frameNumber < 1500) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText(
            "to be alive, and to get to spend this life with you",
            cx,
            cy
        );
        opacity = clamp(frameNumber < 1250 ? opacity + 0.01 : opacity - 0.01);
    }

    if (frameNumber === 1500) opacity = 0;

    if (frameNumber > 1500 && frameNumber < 2000) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", cx, cy);
        opacity = clamp(frameNumber < 1750 ? opacity + 0.01 : opacity - 0.01);
    }

    if (frameNumber === 2000) opacity = 0;

    if (frameNumber > 2000 && frameNumber < 2500) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        window.innerWidth < 600
            ? drawTextWithLineBreaks(
                  ["and yet here I am to get the impossible", "chance to get to know you"],
                  cx,
                  cy,
                  fontSize,
                  lineHeight
              )
            : context.fillText(
                  "and yet here I am to get the impossible chance to get to know you",
                  cx,
                  cy
              );
        opacity = clamp(frameNumber < 2250 ? opacity + 0.01 : opacity - 0.01);
    }

    if (frameNumber === 2500) opacity = 0;

    if (frameNumber > 2500) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        window.innerWidth < 600
            ? drawTextWithLineBreaks(
                  ["I love you so much Pri❤️, more than",
                   "all the time and space in the universe can contain"],
                  cx,
                  cy,
                  fontSize,
                  lineHeight
              )
            : context.fillText(
                  "I love you so much Pri❤️, more than all the time and space in the universe can contain",
                  cx,
                  cy
              );
        opacity = clamp(opacity + 0.01);
    }

    if (frameNumber >= 2750) {
        context.fillStyle = `rgba(45,45,255,${secondOpacity})`;
        context.fillText(
            "and I can't wait to spend all the time in the world to share that love with you!",
            cx,
            cy + 60
        );
        secondOpacity = clamp(secondOpacity + 0.01);
    }

    if (frameNumber >= 3000) {
        context.fillStyle = `rgba(45,45,255,${thirdOpacity})`;
        context.fillText(
            "Will you make me the happiest man on Earth and be my Valentine? 🥹🥹🥹🥹",
            cx,
            cy + 120
        );
        thirdOpacity = clamp(thirdOpacity + 0.01);
    }

    context.shadowBlur = 0;
}

// ---------- MAIN LOOP ----------
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    updateStars();
    drawText();

    frameNumber++;
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
