let current = "noel";
let memory = [];
let idleTimer = null;

const airImage = document.getElementById("airImage");
const noelImage = document.getElementById("noelImage");
const log = document.getElementById("log");
const input = document.getElementById("textInput");

function addLog(text) {
  log.innerHTML += text + "<br>";
  log.scrollTop = log.scrollHeight;
}

function setImage(character, state) {
  const img = character === "air" ? airImage : noelImage;
  img.src = `images/${character}/${character}_${state}.jpg`;
}

function reply(from, text) {
  addLog(`${from}：${text}`);
}

function airTalk(msg = "") {
  setImage("air", "thinking");
  setTimeout(() => {
    setImage("air", "smile");
    reply("air", "……なるほど。悪くない判断だと思う。");
    setImage("air", "normal");
  }, 800);
}

function noelTalk(msg = "") {
  setImage("noel", "thinking");
  setTimeout(() => {
    setImage("noel", "smile");
    reply("noel", "うんうん、そうだね。");
    setImage("noel", "normal");
  }, 800);
}

function duoChat() {
  airTalk();
  setTimeout(() => noelTalk(), 1200);
}

function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    addLog("（エアとノエルが話し始めた）");
    duoChat();
  }, 10000);
}

document.getElementById("sendBtn").onclick = () => {
  const text = input.value.trim();
  if (!text) return;
  addLog(`あなた：${text}`);
  memory.push(text);
  input.value = "";

  if (current === "air") airTalk(text);
  else noelTalk(text);

  resetIdle();
};

document.getElementById("switchBtn").onclick = () => {
  current = current === "air" ? "noel" : "air";
  addLog(`${current}に切り替えたよ`);
};

document.getElementById("talkBtn").onclick = () => {
  if (current === "air") airTalk();
  else noelTalk();
  resetIdle();
};

resetIdle();
