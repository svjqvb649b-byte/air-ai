// ========================
// 状態管理
// ========================
let talkMode = "user"; // "user" or "ai"
let currentSpeaker = "noel";
let aiTimer = null;

// ========================
// 会話データ
// ========================
const replies = {
  default: [
    "うん、それ分かる。",
    "そうなんだ。",
    "なるほどね。",
    "それ、ちょっと面白いね。",
    "もう少し聞いてもいい？"
  ],
  air: [
    "ありがとう。",
    "話してくれて嬉しい。",
    "大丈夫だよ。",
    "無理しなくていい。"
  ],
  noel: [
    "うん、問題ないよ。",
    "私はそう思う。",
    "ちゃんと聞いてる。",
    "それでいいと思う。"
  ]
};

// ========================
// メッセージ表示
// ========================
function addMessage(name, text) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.textContent = `${name}: ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ========================
// ランダム返信
// ========================
function getReply(speaker) {
  const list = replies[speaker] || replies.default;
  return list[Math.floor(Math.random() * list.length)];
}

// ========================
// ユーザー → ノエル
// ========================
function sendUserMessage() {
  if (talkMode !== "user") return;

  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("あなた", text);
  input.value = "";

  const reply = getReply("noel");
  addMessage("ノエル", reply);
}

// ========================
// AI同士会話 開始
// ========================
function startAiTalk() {
  talkMode = "ai";
  currentSpeaker = "noel";
  aiTurn();
}

// ========================
// AI同士会話 停止
// ========================
function stopAiTalk() {
  talkMode = "user";
  clearTimeout(aiTimer);
}

// ========================
// AI同士会話 本体
// ========================
function aiTurn() {
  if (talkMode !== "ai") return;

  const speakerName =
    currentSpeaker === "noel" ? "ノエル" : "エア";

  const reply = getReply(currentSpeaker);
  addMessage(speakerName, reply);

  // 話者交代
  currentSpeaker = currentSpeaker === "noel" ? "air" : "noel";

  // 次の発言
  aiTimer = setTimeout(aiTurn, 1500);
}
