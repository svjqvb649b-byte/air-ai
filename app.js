const chat = document.getElementById("chat");
const input = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");
const notifyBtn = document.getElementById("notifyBtn");

const airImg = document.getElementById("airImg");
const noelImg = document.getElementById("noelImg");

let notifyOn = false;
let idleTimer;

// 表情切り替え
function setAir(face) {
  airImg.src = `images/air/air_${face}.png`;
}
function setNoel(face) {
  noelImg.src = `images/noel/noel_${face}.png`;
}

// 会話追加
function addLine(who, text) {
  const div = document.createElement("div");
  div.className = "line " + who;
  div.textContent = `${who === "air" ? "Air" : "Noel"} : ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// 送信
sendBtn.onclick = () => {
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  addLine("air", "……聞いてる。");
  setAir("think");
  setNoel("calm");

  resetIdle();
};

// 通知ON/OFF
notifyBtn.onclick = () => {
  notifyOn = !notifyOn;
  notifyBtn.textContent = `🔔 通知: ${notifyOn ? "ON" : "OFF"}`;
};

// 放置会話
function startIdleTalk() {
  addLine("noel", "……静かだね。");
  addLine("air", "……時間は流れてる。");
  setAir("soft");
  setNoel("smile");
}

function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(startIdleTalk, 15000);
}

resetIdle();
