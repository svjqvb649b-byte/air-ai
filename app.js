const chat = document.getElementById("chatArea");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const notifyBtn = document.getElementById("notifyBtn");

const airImg = document.getElementById("airImg");
const noelImg = document.getElementById("noelImg");

let notifyOn = false;
let lastAction = Date.now();

// ===== 立ち絵 =====
const airFaces = [
  "assets/air/normal.png",
  "assets/air/soft.png",
  "assets/air/calm.png",
  "assets/air/thinking.png",
  "assets/air/smile.png",
  "assets/air/gentle.png"
];

const noelFaces = [
  "assets/noel/normal.png",
  "assets/noel/smile.png",
  "assets/noel/calm.png",
  "assets/noel/shy.png",
  "assets/noel/thinking.png",
  "assets/noel/gentle.png"
];

airImg.src = airFaces[0];
noelImg.src = noelFaces[0];

// ===== 共通 =====
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = `message ${who}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function airSpeak(text) {
  airImg.src = random(airFaces);
  addMessage(`Air : ${text}`, "air");
}

function noelSpeak(text) {
  noelImg.src = random(noelFaces);
  addMessage(`Noel : ${text}`, "noel");
}

// ===== 入力処理 =====
function handleInput(text) {
  if (!text) return;
  lastAction = Date.now();

  addMessage(`君 : ${text}`, "you");

  // 挨拶
  if (/おはよう|こんにちは|こんばんは/.test(text)) {
    airSpeak("……聞いてる。");
    noelSpeak("いつでも話しかけて。");
    return;
  }

  // 感謝
  if (/ありがとう|感謝/.test(text)) {
    airSpeak("……問題ない。");
    noelSpeak("そう言ってもらえると嬉しい。");
    return;
  }

  // 予定
  if (/予定|明日|曜日/.test(text)) {
    airSpeak("……確認中。");
    noelSpeak("必要な予定があれば教えるよ。");
    return;
  }

  // 2人会話指示
  if (/2人で話/.test(text)) {
    startPairTalk();
    return;
  }

  airSpeak("……聞いてる。");
}

// ===== 2人会話 =====
function startPairTalk() {
  airSpeak("……少し話そう。");
  setTimeout(() => noelSpeak("うん。"), 1200);
  setTimeout(() => airSpeak("……時間は進んでる。"), 2500);
  setTimeout(() => noelSpeak("そのままでいい。"), 3800);
}

// ===== 放置会話 =====
setInterval(() => {
  if (Date.now() - lastAction > 30000) {
    airSpeak("……静かだ。");
    setTimeout(() => noelSpeak("そばにいるよ。"), 1500);
    lastAction = Date.now();
  }
}, 5000);

// ===== 通知 =====
notifyBtn.onclick = () => {
  notifyOn = !notifyOn;
  notifyBtn.textContent = notifyOn ? "🔔 通知: ON" : "🔔 通知: OFF";
};

// ===== 送信 =====
sendBtn.onclick = () => {
  handleInput(input.value.trim());
  input.value = "";
};

input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendBtn.click();
});

// ===== 初期メッセージ =====
airSpeak("……ここにいる。");
noelSpeak("いつでも話しかけて。");
