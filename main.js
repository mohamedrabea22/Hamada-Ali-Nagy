const textInput = document.getElementById("textInput");
const voiceType = document.getElementById("voiceType");
const speakBtn = document.getElementById("speakBtn");
const downloadBtn = document.getElementById("downloadBtn");

const rateSlider = document.getElementById("rate");
const pitchSlider = document.getElementById("pitch");

const wave = document.getElementById("wave");
const ctx = wave.getContext("2d");

let isPlaying = false;

function drawWave() {
    if(!isPlaying) return;
    ctx.clearRect(0,0,wave.width,wave.height);
    const time = Date.now()/200;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#4c85ff";
    for(let x=0;x<wave.width;x++){
        const y = wave.height/2 + Math.sin(x*0.05 + time)*20;
        ctx.lineTo(x,y);
    }
    ctx.stroke();
    requestAnimationFrame(drawWave);
}

// استخدام مفتاحك الشخصي
const ELEVENLABS_API_KEY = "sk_84eb1dc55d9f0ab3ee14ff39ad15092ba544666a347e1b98";

// أصوات مثال عربي (يمكنك تغييره لاحقًا)
const voices = {
    male: "pNInz6obpgDQGcFmaJgB",
    female: "ErXwobaYiN019PkySvjV"
};

async function generateTTS(download=false){
    const text = textInput.value.trim();
    if(!text) return;

    const selectedVoice = voiceType.value === "male" ? voices.male : voices.female;

    isPlaying = true;
    drawWave();

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "xi-api-key": ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
            text: text
        })
    });

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);

    if(download){
        const a = document.createElement("a");
        a.href = audioUrl;
        a.download = "tts-arabic.mp3";
        a.click();
    } else {
        const audio = new Audio(audioUrl);
        audio.onended = ()=> isPlaying=false;
        audio.play();
    }
}

speakBtn.onclick = ()=> generateTTS(false);
downloadBtn.onclick = ()=> generateTTS(true);
