const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");
const notifyBtn = document.getElementById("notifyBtn");

let notifyOn = false;
let lastAction = Date.now();

function add(name, text, cls) {
  const div = document.createElement("div");
  div.className = `line ${cls}`;
  div.textContent = `${name} : ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function air(text) { add("Air", text, "air"); }
function noel(text) { add("Noel", text, "noel"); }
function you(text) { add("君", text, "you"); }

air("……ここにいる。");
noel("いつでも話しかけて。");

notifyBtn.onclick = () => {
  notifyOn = !notifyOn;
  notifyBtn.textContent = notifyOn ? "🔔 通知: ON" : "🔔 通知: OFF";
};

send.onclick = handle;
input.onkeydown = e => e.key === "Enter" && handle();

function handle() {
  const text = input.value.trim();
  if (!text) return;
  you(text);
  input.value = "";
  lastAction = Date.now();
  respond(text);
}

function respond(t) {
  if (/おはよう|こんにちは|こんばんは/.test(t)) {
    air("……聞いてる。");
    noel("挨拶ありがとう。");
    return;
  }

  if (/ありがとう|感謝/.test(t)) {
    noel("どういたしまして。");
    air("……大丈夫そう。");
    return;
  }

  if (/授業|勉強/.test(t)) {
    noel("どの教科？要点まとめるよ。");
    air("……集中できそう。");
    return;
  }

  if (/予定|明日|火曜日/.test(t)) {
    air("……予定を整理しよう。");
    noel("必要なら一緒に確認するよ。");
    return;
  }

  air("……聞いてる。");
}

setInterval(() => {
  if (Date.now() - lastAction > 15000) {
    air("……静かだ。");
    noel("少し話そうか。");
    air("……落ち着く。");
    lastAction = Date.now();
  }
}, 5000);
