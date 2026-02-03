let current = "air";
let memory = [];
let autoTalkTimer = null;

const airImg = document.getElementById("airImg");
const noelImg = document.getElementById("noelImg");
const log = document.getElementById("log");
const input = document.getElementById("textInput");

const faces = {
  air: {
    normal: "images/air/air_normal.jpg",
    smile: "images/air/air_smile.jpg",
    thinking: "images/air/air_thinking.jpg"
  },
  noel: {
    normal: "images/noel/noel_normal.jpg",
    smile: "images/noel/noel_smile.jpg",
    thinking: "images/noel/noel_thinking.jpg"
  }
};

function setFace(who, face) {
  (who === "air" ? airImg : noelImg).src = faces[who][face];
}

function addLog(who, text) {
  log.innerHTML += `<div>${who} : ${text}</div>`;
  log.scrollTop = log.scrollHeight;
}

function speak(who, text) {
  setFace(who, "smile");
  addLog(who, text);
  setTimeout(() => setFace(who, "normal"), 1200);
}

function respond(userText) {
  memory.push(userText);
  if (memory.length > 5) memory.shift();

  setFace(current, "thinking");
  setTimeout(() => {
    const reply = current === "air"
      ? "……それ、ちょっと面白いね"
      : "ふふ、そういう考え方もあるよ";

    speak(current, reply);
  }, 800);
}

document.getElementById("sendBtn").onclick = () => {
  if (!input.value) return;
  addLog("あなた", input.value);
  respond(input.value);
  input.value = "";
};

document.getElementById("switchBtn").onclick = () => {
  current = current === "air" ? "noel" : "air";
  addLog("system", `${current}に切り替えたよ`);
};

document.getElementById("micBtn").onclick = () => {
  const rec = new webkitSpeechRecognition();
  rec.lang = "ja-JP";
  rec.start();

  setFace(current, "thinking");

  rec.onresult = e => {
    const text = e.results[0][0].transcript;
    addLog("あなた", text);
    respond(text);
  };
};

// 2人だけの自動雑談
function autoTalk() {
  const a = ["air", "noel"];
  let i = 0;
  autoTalkTimer = setInterval(() => {
    const who = a[i % 2];
    speak(who, who === "air" ? "……静かだね" : "でも、落ち着くね");
    i++;
  }, 7000);
}

autoTalk();
