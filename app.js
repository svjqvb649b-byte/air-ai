document.addEventListener("DOMContentLoaded", () => {
const statusEl = document.getElementById("status");
const logEl = document.getElementById("log");
const tapBtn = document.getElementById("tap");

let recognition;
let listening = false;
let conversationMode = false;
let called = false;
function log(text) {
  const p = document.createElement("p");
  p.textContent = text;
  logEl.appendChild(p);
  logEl.scrollTop = logEl.scrollHeight;
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
utter.pitch = 0.85; // 少し低め（シエスタ風）
utter.rate = 0.9;   // ゆっくり

  speechSynthesis.speak(utter);
}
// ==== シエスタ返事セット ====
const siestaReplies = {
  call: [
    "……呼んだの？",
    "ええ。ここにいる。",
    "今、あなたの声がした。"
  ],
  listen: [
    "……それで、どうしたの。",
    "大丈夫。ちゃんと聞いてる。",
    "落ち着いて。順番に話して。"
  ]
};

function randomReply(type) {
  const list = siestaReplies[type];
  return list[Math.floor(Math.random() * list.length)];
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
  recognition.interimResults = true;

  recognition.onstart = () => {
    listening = true;
    statusEl.textContent = "待機中（エアって呼んで）";
  };
  recognition.start();

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
const text = result[0].transcript;
const isInterim = !result.isFinal;
    log("👂 " + text);

if (
  !called &&
  (
    text.includes("エ") ||
    text.includes("え") ||
    text.toLowerCase().includes("a")
  )
) {
  conversationMode = true;
  called = true;
  respond(randomReply("call"));
  return;
}

if (conversationMode && !isInterim) {
  respond(randomReply("listen"));
  called = false; // ← ★これを追加
}

  //recognition.onend = () => {
    //if (listening) recognition.start();
//};


function respond(text) {
log(text);
  speak(text);
}

tapBtn.addEventListener("click", () => {
  alert("タップされた");
});
