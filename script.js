const messages = document.getElementById("messages");
const input = document.getElementById("userInput");

let talkMode = "user"; // user / ai
let currentSpeaker = "noel";
let aiTimer = null;

/* ====== 共通表示 ====== */
function addMessage(name, text) {
  const div = document.createElement("div");
  div.textContent = `${name}：${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

/* ====== 会話データ ====== */

// ノエル
const noelReplies = {
  greeting: ["おはよう！","こんにちは","こんばんは"],
  smalltalk: [
    "今日はどうする？",
    "無理しすぎてない？",
    "ちょっと休憩しよっか"
  ],
  timetable: [
    "今日の時間割、確認しよっか",
    "次の授業は何時から？"
  ],
  default: [
    "うん、聞いてるよ",
    "なるほどね",
    "それいいね"
  ]
};

// エア（シエスタ風）
const airReplies = {
  greeting: [
    "……おはよう",
    "……こんにちは",
    "……こんばんは"
  ],
  smalltalk: [
    "……静かでいい",
    "……悪くない時間",
    "……眠くはない"
  ],
  timetable: [
    "……時間割は重要",
    "……次は授業"
  ],
  default: [
    "……そう",
    "……理解した",
    "……問題ない"
  ]
};

/* ====== ユーザー送信 ====== */
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("あなた", text);
  input.value = "";

  // ユーザーが話したらAI会話停止
  stopAiTalk();

  // モード切替ワード
  if (text.includes("2人で話して")) {
    startAiTalk();
    return;
  }

  respond(text);
}

/* ====== 返答判定 ====== */
function respond(text) {
  let key = "default";

  if (text.match(/おはよう|こんにちは|こんばんは/)) key = "greeting";
  if (text.includes("時間割")) key = "timetable";
  if (text.includes("暇") || text.includes("雑談")) key = "smalltalk";

  const reply = random(noelReplies[key]);
  addMessage("ノエル", reply);
}

/* ====== AI同士会話 ====== */
function startAiTalk() {
  talkMode = "ai";
  currentSpeaker = "noel";
  aiTurn();
}

function stopAiTalk() {
  talkMode = "user";
  clearTimeout(aiTimer);
}

function aiTurn() {
  if (talkMode !== "ai") return;

  const data = currentSpeaker === "noel" ? noelReplies : airReplies;
  const reply = random(data.smalltalk.concat(data.default));

  addMessage(
    currentSpeaker === "noel" ? "ノエル" : "エア",
    reply
  );

  currentSpeaker = currentSpeaker === "noel" ? "air" : "noel";

  aiTimer = setTimeout(aiTurn, 1500);
}

/* ====== ユーティリティ ====== */
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
