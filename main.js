const textInput = document.getElementById("textInput");
const voiceType = document.getElementById("voiceType");
const speakBtn = document.getElementById("speakBtn");
const downloadBtn = document.getElementById("downloadBtn");

const rateSlider = document.getElementById("rate");
const pitchSlider = document.getElementById("pitch");
const wave = document.getElementById("wave");
const ctx = wave.getContext("2d");

let isPlaying = false;

// رسم موجة الصوت
function drawWave() {
    if (!isPlaying) return;

    ctx.clearRect(0, 0, wave.width, wave.height);

    const time = Date.now() / 200;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#4c85ff";

    for (let x = 0; x < wave.width; x++) {
        const y = wave.height / 2 + Math.sin(x * 0.05 + time) * 20;
        ctx.lineTo(x, y);
    }

    ctx.stroke();
    requestAnimationFrame(drawWave);
}

speakBtn.onclick = () => {
    const text = textInput.value.trim();
    if (!text) return;

    isPlaying = true;
    drawWave();

    ArabicTTS({
        text: text,
        voice: voiceType.value,
        rate: rateSlider.value,
        pitch: pitchSlider.value,
        volume: 1,
        callback: () => {
            isPlaying = false;
        }
    });
};

// حفظ الصوت
downloadBtn.onclick = async () => {
    const text = textInput.value.trim();
    if (!text) return;

    const audioUrl = await ArabicTTS({
        text: text,
        voice: voiceType.value,
        rate: rateSlider.value,
        pitch: pitchSlider.value,
        download: true
    });

    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "tts-arabic.mp3";
    a.click();
};
