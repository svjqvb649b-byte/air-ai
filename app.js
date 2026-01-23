const statusEl = document.getElementById("status");
const logEl = document.getElementById("log");
const tapBtn = document.getElementById("tap");

let recognition;
let listening = false;
let conversationMode = false;

function log(text) {
  const p = document.createElement("p");
  p.textContent = text;
  logEl.appendChild(p);
  logEl.scrollTop = logEl.scrollHeight;
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  utter.pitch = 1.2;
  utter.rate = 1;
  speechSynthesis.speak(utter);
}

function startRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    statusEl.textContent = "音声認識非対応";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "ja-JP";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = () => {
    listening = true;
    statusEl.textContent = "待機中（エアって呼んで）";
  };

  recognition.onresult = (event) => {
    const text = event.results[event.results.length - 1][0].transcript.trim();
    log("👂 " + text);

    if (text.includes("エア")) {
      conversationMode = true;
      respond("呼んだ？どうしたの。");
      return;
    }

    if (conversationMode) {
      respond("うん、ちゃんと聞いてるよ。");
    }
  };

  recognition.onend = () => {
    if (listening) recognition.start();
  };

  recognition.start();
}

function respond(text) {
  log("🤖 " + text);
  speak(text);
}

tapBtn.addEventListener("click", () => {
  if (!listening) {
    startRecognition();
    respond("起動したよ。");
  }
});
