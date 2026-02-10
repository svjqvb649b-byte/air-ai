const noelLog = document.getElementById("noelLog");
const airLog = document.getElementById("airLog");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// 送信処理
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // ユーザー入力をノエル側に表示
  const userMsg = document.createElement("div");
  userMsg.textContent = text;
  noelLog.appendChild(userMsg);

  // エア側にも同じ内容を表示（※ロジックは変更しない）
  const airMsg = document.createElement("div");
  airMsg.textContent = text;
  airLog.appendChild(airMsg);

  userInput.value = "";
}

// ボタン
sendBtn.addEventListener("click", sendMessage);

// Enterキー
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
