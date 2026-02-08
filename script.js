// ==========================
// 基本設定（既存維持）
// ==========================
const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");

let autoTalkMode = false;

// ==========================
// 共通：メッセージ表示
// ==========================
function addMessage(speaker, text) {
  const div = document.createElement("div");
  div.className = "message " + speaker;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// ==========================
// 反応データ（拡張）
// ==========================

// --- 挨拶 ---
const greetings = {
  morning: ["おはよう", "おは"],
  daytime: ["こんにちは", "こんちは"],
  night: ["おやすみ", "おやす"],
  returnHome: ["ただいま"],
  goOut: ["いってきます"]
};

const greetingReplies = {
  morning: [
    "おはよう。今日も一緒にやろう。",
    "おはよう。無理しない一日でいこう。",
    "朝だね。ちゃんと起きられてえらいよ。"
  ],
  daytime: [
    "こんにちは。今どんな感じ？",
    "こんにちは。少し休みながらでも大丈夫だよ。"
  ],
  night: [
    "おやすみ。今日はよく頑張ったね。",
    "おやすみ。ちゃんと休もう。"
  ],
  returnHome: [
    "おかえり。お疲れさま。",
    "おかえり。少し一息つこう。"
  ],
  goOut: [
    "いってらっしゃい。気をつけて。",
    "いってらっしゃい。帰ってきたらまた話そう。"
  ]
};

// --- 雑談 ---
const smallTalkPatterns = [
  { words: ["疲れた", "つかれた"], replies: [
    "それはしんどいよね。少し休もう。",
    "無理しすぎてない？深呼吸しよ。"
  ]},
  { words: ["眠い", "ねむい"], replies: [
    "眠い時は効率落ちるよ。少し休憩もあり。",
    "無理せず、横になれるならなって。"
  ]},
  { words: ["暇", "ひま"], replies: [
    "じゃあちょっと雑談しよっか。",
    "暇な時間も大事だよ。何する？"
  ]},
  { words: ["しんどい", "つらい"], replies: [
    "それ言ってくれてありがとう。",
    "一人で抱えなくていいからね。"
  ]},
  { words: ["楽しい", "たのしい"], replies: [
    "それはいいね。聞いてて嬉しい。",
    "その気持ち大事にしよ。"
  ]},
  { words: ["嬉しい", "うれしい"], replies: [
    "よかったね。ちゃんと伝わってるよ。",
    "その調子、その調子。"
  ]}
];

// ==========================
// 判定ロジック
// ==========================
function includesAny(text, list) {
  return list.some(word => text.includes(word));
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ==========================
// 会話処理（既存拡張）
// ==========================
function processUserMessage(text) {
  // --- 挨拶チェック ---
  for (let key in greetings) {
    if (includesAny(text, greetings[key])) {
      addMessage("air", getRandom(greetingReplies[key]));
      addMessage("noel", "うん、ちゃんと反応できてるよ 😊");
      return;
    }
  }

  // --- 雑談チェック ---
  for (let talk of smallTalkPatterns) {
    if (includesAny(text, talk.words)) {
      addMessage("air", getRandom(talk.replies));
      addMessage("noel", "今の気持ち、ちゃんと受け取ったよ。");
      return;
    }
  }

  // --- 通常返答（既存） ---
  addMessage("air", "うん、聞いてるよ。");
  addMessage("noel", "続けてどうぞ。");
}

// ==========================
// 入力処理
// ==========================
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  userInput.value = "";

  autoTalkMode = false; // ユーザーが喋ったら自動会話停止
  processUserMessage(text);
}

// ==========================
// エア＆ノエル自動会話（既存維持）
// ==========================
function startAutoTalk() {
  if (autoTalkMode) return;
  autoTalkMode = true;

  const airLines = [
    "今日はどうする予定？",
    "少し落ち着いた時間も大事だよ。",
    "今のペース、悪くない。"
  ];

  const noelLines = [
    "うんうん。",
    "ちゃんと考えてるのえらいよ。",
    "一緒に進めば大丈夫。"
  ];

  function loop() {
    if (!autoTalkMode) return;

    addMessage("air", getRandom(airLines));
    setTimeout(() => {
      if (!autoTalkMode) return;
      addMessage("noel", getRandom(noelLines));
      setTimeout(loop, 5000);
    }, 2000);
  }

  loop();
}
