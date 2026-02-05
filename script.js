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
// ユーザー入力
// ========================
function sendUserMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  // ★ ユーザーが喋ったらAI会話は止まる
  stopAiTalk();

  addMessage("あなた", text);
  input.value = "";

  // ★ AI同士会話を指示する言葉
  if (
    text.includes("2人で話して") ||
    text.includes("二人で話して") ||
    text.includes("会話して")
  ) {
    addMessage("ノエル", "うん、分かった。エアと話すね。");
    startAiTalk();
    return;
  }

  // 通常会話
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

  aiTimer = setTimeout(aiTurn, 1500);
}
