const log = document.getElementById("log");
const input = document.getElementById("textInput");

function addLog(name, text) {
  log.innerHTML += `<div><b>${name}:</b> ${text}</div>`;
  log.scrollTop = log.scrollHeight;
}

function send() {
  const text = input.value.trim();
  if (!text) return;

  addLog("あなた", text);

  setTimeout(() => {
    addLog("ノエル", "ちゃんと一緒にいるよ。");
  }, 500);

  setTimeout(() => {
    addLog("エア", "ふたり表示、いい感じだね。");
  }, 900);

  input.value = "";
}
