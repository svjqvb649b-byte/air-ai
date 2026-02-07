const messages = document.getElementById("messages");
const input = document.getElementById("userInput");

let duoTalking = false;
let duoTimer = null;

function addMessage(who, text) {
  const div = document.createElement("div");
  div.className = "msg";
  div.textContent = `${who}：${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  duoTalking = false;
  clearInterval(duoTimer);

  addMessage("あなた", text);
  input.value = "";

  respond(text);
}

/* =========================
   反応辞書
========================= */

const tiredWords = [
  "疲れ", "しんど", "眠い", "だる", "きつい", "つかれた",
  "やる気ない", "限界", "もう無理"
];

const tiredResponsesNoel = [
  "それはきつかったね",
  "無理しなくていいよ",
  "今日はよく頑張ったと思う",
  "少し休もっか",
  "ちゃんと話してくれてありがとう"
];

const tiredResponsesAir = [
  "……無理は非効率",
  "……休息は必要",
  "……今は止まっていい",
  "……エネルギー低下を確認",
  "……静かにする？"
];

const greetMorning = ["おはよう"];
const greetNight = ["おやすみ", "眠る"];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =========================
   メイン反応処理
========================= */

function respond(text) {
  // 挨拶
  if (greetMorning.some(w => text.includes(w))) {
    addMessage("ノエル", "おはよう！今日も来てくれて嬉しいよ");
    addMessage("エア", "……おはよう");
    return;
  }

  if (greetNight.some(w => text.includes(w))) {
    addMessage("ノエル", "おやすみ。ちゃんと休んでね");
    addMessage("エア", "……良い休息を");
    return;
  }

  // 疲れ系雑談
  if (tiredWords.some(w => text.includes(w))) {
    addMessage("ノエル", random(tiredResponsesNoel));
    addMessage("エア", random(tiredResponsesAir));
    return;
  }

  // 2人会話開始
  if (text.includes("2人で話して")) {
    startDuo();
    return;
  }

  // 通常雑談
  addMessage("ノエル", "うん、聞いてるよ");
  addMessage("エア", "……問題ない");
}

/* =========================
   2人会話
========================= */

const duoLines = [
  ["ノエル", "今日は静かだね"],
  ["エア", "……落ち着いている"],
  ["ノエル", "こういう時間も悪くないよね"],
  ["エア", "……同意"],
  ["ノエル", "そばにいるって感じ"],
  ["エア", "……それで十分"]
];

function startDuo() {
  duoTalking = true;
  let i = 0;

  duoTimer = setInterval(() => {
    if (!duoTalking) return;
    const [who, line] = duoLines[i % duoLines.length];
    addMessage(who, line);
    i++;
  }, 2500);
}
