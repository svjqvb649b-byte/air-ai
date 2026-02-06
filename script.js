const messages = document.getElementById("messages");
const input = document.getElementById("userInput");

let twoTalkMode = false;

function addMessage(text) {
  messages.textContent += text + "\n";
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage("あなた : " + userText);
  input.value = "";

  // モード切替
  if (userText.includes("2人で話して")) {
    twoTalkMode = true;
    addMessage("ノエル : うん、分かったよ");
    addMessage("エア : ……了解");
    return;
  }

  // 通常反応（エアも必ず返す）
  if (twoTalkMode) {
    setTimeout(() => {
      addMessage("ノエル : なるほどね");
    }, 400);

    setTimeout(() => {
      addMessage("エア : ……問題ない");
    }, 900);
  } else {
    setTimeout(() => {
      addMessage("ノエル : 聞いてるよ");
    }, 400);

    setTimeout(() => {
      addMessage("エア : ……そう");
    }, 900);
  }
}
