const messages = document.getElementById("messages");
const input = document.getElementById("userInput");

let duoMode = false;
let lastNoelLine = "";
let lastAirLine = "";

function addMessage(who, text) {
  messages.innerHTML += `${who}：${text}<br>`;
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("あなた", text);
  input.value = "";

  // 2人会話モードON
  if (text.includes("2人で話して")) {
    duoMode = true;
    addMessage("ノエル", "うん、分かったよ");
    addMessage("エア", "……了解");
    return;
  }

  // ノエルの返答
  const noelReply = respondNoel(text);
  lastNoelLine = noelReply;
  addMessage("ノエル", noelReply);

  if (duoMode) {
    // 少し間をあけてエアが反応
    setTimeout(() => {
      const airReply = respondAir(text, lastNoelLine);
      lastAirLine = airReply;
      addMessage("エア", airReply);

      // さらにノエルがエアに返す（確率）
      if (Math.random() < 0.6) {
        setTimeout(() => {
          const follow = followNoel(lastAirLine);
          addMessage("ノエル", follow);
        }, 700);
      }
    }, 600);
  }
}

/* ===== ノエル ===== */
function respondNoel(text) {
  if (text.includes("おはよう")) return "おはよう！今日も無理しすぎないでね";
  if (text.includes("こんばんは")) return "こんばんは。静かな時間だね";
  if (text.includes("おやすみ")) return "うん、おやすみ。また明日";
  if (text.includes("疲れ")) return "そっか…少し休もうか";

  return "そうなんだ。エアはどう思う？";
}

/* ===== エア ===== */
function respondAir(userText, noelText) {
  if (userText.includes("おはよう")) return "……おはよう。朝は嫌いじゃない";
  if (userText.includes("こんばんは")) return "……こんばんは。夜は落ち着く";
  if (userText.includes("おやすみ")) return "……了解。良い休息を";

  if (noelText.includes("どう思う")) return "……概ね同意する";
  if (noelText.includes("休もう")) return "……賛成だ";

  return "……悪くない";
}

/* ===== ノエルがエアに返す ===== */
function followNoel(airText) {
  if (airText.includes("同意")) return "だよね。私もそう思った";
  if (airText.includes("賛成")) return "ふふ、意見が合ったね";
  if (airText.includes("悪くない")) return "それなら良かった";

  return "うん、ありがとうエア";
}
