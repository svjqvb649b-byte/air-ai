const log = document.getElementById("log");
const input = document.getElementById("textInput");

function addLog(name, text) {
  const div = document.createElement("div");
  div.classList.add("message");

  if (name === "ノエル") div.classList.add("noel");
  else if (name === "エア") div.classList.add("air");
  else div.classList.add("you");

  div.innerHTML = `<div class="name">${name}</div>${text}`;
  log.appendChild(div);
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
    addLog("エア", "左右分割、いい感じだね。");
  }, 900);

  input.value = "";
}
