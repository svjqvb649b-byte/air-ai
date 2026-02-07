const messages = document.getElementById("messages");
const input = document.getElementById("userInput");

let duoMode = false;

function addMessage(who, text) {
  messages.innerHTML += `${who}：${text}<br>`;
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage("あなた", text);
  input.value = "";

  if (text.includes("2人で話して")) {
    duoMode = true;
    addMessage("ノエル", "うん、分かったよ");
    addMessage("エア", "……了解");
    return;
  }

  if (duoMode) {
    addMessage("ノエル", respondNoel(text));
    addMessage("エア", respondAir(text));
  } else {
    addMessage("ノエル", respondNoel(text));
  }
}

function respondNoel(text) {
  if (text.includes("おはよう")) return "おはよう！無理しなくていいからね";
  if (text.includes("おやすみ")) return "うん、おやすみ";
  if (text.includes("疲れ")) return "そっか…少し休もう";
  return "なるほどね";
}

function respondAir(text) {
  if (text.includes("おはよう")) return "……おはよう";
  if (text.includes("おやすみ")) return "……了解";
  if (text.includes("疲れ")) return "……無理は不要";
  return "……問題ない";
}
