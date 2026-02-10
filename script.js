// ===============================
// 共通ログ表示
// ===============================
function addLog(logId, speaker, text) {
  const log = document.getElementById(logId);
  const div = document.createElement("div");
  div.className = "message";
  div.textContent = `${speaker}：${text}`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

// ===============================
// 入力タイプ判定
// ===============================
function detectType(text) {
  if (text.includes("疲れ")) return "tired";
  if (text.includes("眠")) return "night";
  if (text.includes("おは")) return "morning";
  if (text.includes("雑談")) return "free";
  return "default";
}

// ===============================
// ノエル（思考・まとめ役）
// ===============================
const noelResponses = {
  tired: [
    "疲労が溜まっているね。今日は回復を優先しよう。",
    "今日は無理をしない判断が正解だよ。"
  ],
  morning: [
    "朝は準備運動の時間だと思えばいい。",
    "今日はペース配分が大切だね。"
  ],
  night: [
    "今日は十分頑張った。休もう。",
    "睡眠は一番の回復手段だよ。"
  ],
  free: [
    "雑談は思考の整理にもなる。",
    "目的がなくても問題ないよ。"
  ],
  default: [
    "今の状態をそのまま受け止めよう。",
    "焦る必要はない。"
  ]
};

function noelReply(type) {
  const list = noelResponses[type] || noelResponses.default;
  return list[Math.floor(Math.random() * list.length)];
}

// ===============================
// エア（雑談・相棒・シエスタ風）
// ===============================
const airResponses = {
  tired: [
    "んー…それはしんどいね。今日は無理しない日でいいと思う。",
    "今日は省エネ運転でいこ。ちゃんと休むのも作戦だし。",
    "ノエルとも話したけど、今日は回復優先がよさそう。"
  ],
  morning: [
    "おはよ。起きただけで今日はもう半分成功だよ。",
    "朝から全力出さなくていいって思う。",
    "ノエルも『今日は様子見で』って言ってた。"
  ],
  night: [
    "もう夜かぁ…。今日はここまでで十分じゃない？",
    "よくやったよ。続きは明日の自分に任せよ。",
    "ノエルも『今日は合格』ってさ。"
  ],
  free: [
    "じゃあ少し雑談しよ。こういう時間、悪くない。",
    "今は考えなくていい話題でもいいんじゃない？",
    "ノエルも『軽めでいい』って言ってたし。"
  ],
  default: [
    "そっかぁ。まぁ流れに任せよ。",
    "今すぐ決めなくていいよ。",
    "ノエルと相談したけど、今は様子見かな。"
  ]
};

function airReply(type) {
  const list = airResponses[type] || airResponses.default;
  return list[Math.floor(Math.random() * list.length)];
}

// ===============================
// メイン：相談して返す
// ===============================
function consultAndReply(userText) {
  const type = detectType(userText);

  const noelText = noelReply(type);
  const airText = airReply(type);

  addLog("noelLog", "ノエル", noelText);
  addLog("airLog", "エア", airText);
}

// ===============================
// 掛け合いモード
// ===============================
let banterTimer = null;

function startBanter() {
  stopBanter();
  banterTimer = setInterval(() => {
    const type = "free";
    addLog("noelLog", "ノエル", noelReply(type));
    addLog("airLog", "エア", airReply(type));
  }, 3500);
}

function stopBanter() {
  if (banterTimer) {
    clearInterval(banterTimer);
    banterTimer = null;
  }
}

// ===============================
// 送信処理（ボタン不具合対策）
// ===============================
window.sendMessage = function () {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addLog("userLog", "あなた", text);

  if (text.includes("2人で話して") || text.includes("掛け合い")) {
    startBanter();
  } else {
    stopBanter();
    consultAndReply(text);
  }

  input.value = "";
};

// ===============================
// Enterキー対応（スマホ・PC両対応）
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
