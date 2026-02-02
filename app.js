// ====== 状態 ======
let notifyOn = false;
let lastUserAction = Date.now();
let autoTalkTimer = null;

// ====== DOM ======
const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const notifyBtn = document.getElementById("notifyToggle");

// ====== 時間割 ======
const timetable = {
  1: ["国語", "数学", "英語", "理科", "社会"],   // 月
  2: ["数学", "英語", "社会", "理科", "体育"], // 火
  3: ["英語", "国語", "数学", "音楽", "技術"], // 水
  4: ["理科", "社会", "英語", "数学", "美術"], // 木
  5: ["国語", "数学", "英語", "総合", "HR"]   // 金
};

// ====== 時間判定 ======
function getNowClass() {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const day = now.getDay(); // 1〜5

  const timeTable = [
    { start: 8 * 60 + 50, end: 9 * 60 + 40 },
    { start: 9 * 60 + 50, end: 10 * 60 + 40 },
    { start: 10 * 60 + 50, end: 11 * 60 + 40 },
    { start: 13 * 60, end: 13 * 60 + 50 },
    { start: 14 * 60, end: 14 * 60 + 50 }
  ];

  const nowMin = hour * 60 + min;

  for (let i = 0; i < timeTable.length; i++) {
    if (nowMin >= timeTable[i].start && nowMin <= timeTable[i].end) {
      return { period: i + 1, day };
    }
  }
  return null;
}

// ====== 授業サポート ======
function classSupport() {
  const info = getNowClass();
  if (!info || !timetable[info.day]) return;

  const subject = timetable[info.day][info.period - 1];
  if (!subject) return;

  addChat(`Air：今は${info.period}限。${subject}だ。要点を意識して。`);
  addChat(`Noel：大丈夫、少しずつでいいよ。集中できてる？`);
}

// ====== チャット ======
function addChat(text) {
  const p = document.createElement("p");
  p.textContent = text;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}

// ====== 放置2人会話 ======
function startAutoTalk() {
  if (autoTalkTimer) clearInterval(autoTalkTimer);

  autoTalkTimer = setInterval(() => {
    const idle = Date.now() - lastUserAction;
    if (idle > 30000) {
      addChat("Air：……静かだな。");
      addChat("Noel：無理してないかな。戻ってきたら声かけてね。");
    }
  }, 10000);
}

// ====== 入力処理 ======
sendBtn.onclick = () => {
  if (!input.value) return;
  lastUserAction = Date.now();

  const text = input.value;
  addChat(`あなた：${text}`);

  if (text.includes("おは")) {
    addChat("Noel：おはよう。今日も一緒にいこ。");
  } else if (text.includes("ありがとう")) {
    addChat("Air：……どういたしまして。");
  } else {
    addChat("Noel：うん、聞いてるよ。");
  }

  input.value = "";
};

// ====== 通知 ======
notifyBtn.onclick = () => {
  notifyOn = !notifyOn;
  notifyBtn.textContent = `🔔 通知: ${notifyOn ? "ON" : "OFF"}`;
};

// ====== 初期動作 ======
addChat("Air：……ここにいる。");
addChat("Noel：いつでも話しかけて。");

startAutoTalk();
setInterval(classSupport, 60000);
