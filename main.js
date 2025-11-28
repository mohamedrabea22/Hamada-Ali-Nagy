const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const speakBtn = document.getElementById("speakBtn");

let voices = [];

function loadVoicesProperly() {
    return new Promise(resolve => {
        let voicesLoaded = speechSynthesis.getVoices();

        if (voicesLoaded.length !== 0) {
            resolve(voicesLoaded);
        } else {
            speechSynthesis.onvoiceschanged = () => {
                voicesLoaded = speechSynthesis.getVoices();
                resolve(voicesLoaded);
            };
        }
    });
}

async function populateVoices() {
    voices = await loadVoicesProperly();

    voiceSelect.innerHTML = "";

    voices.forEach(voice => {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    // اختيار صوت عربي تلقائي
    const arVoice = voices.find(v => v.lang.toLowerCase().startsWith("ar"));
    if (arVoice) {
        voiceSelect.value = arVoice.name;
    }
}

populateVoices();

// تشغيل الصوت
function speakText() {
    const text = textInput.value.trim();
    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);
    const selected = voices.find(v => v.name === voiceSelect.value);
    if (selected) utter.voice = selected;

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
}

speakBtn.addEventListener("click", speakText);
