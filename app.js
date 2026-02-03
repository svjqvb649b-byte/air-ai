const log = document.getElementById("log");
const input = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");
const talkBtn = document.getElementById("talkBtn");
const airImage = document.getElementById("airImage");

const airImages = {
  normal: "air/air_normal.jpg",
  smile: "air/air_smile.jpg",
  thinking: "air/air_thinking.jpg"
};

let shortMemory = [];
let autoChatTimer = null;

function addLog(text) {
  log.innerHTML += text + "<br>";
  log.scrollTop = log.scrollHeight;
}

function respond(userText) {
  shortMemory.push(userText);
  if (shortMemory.length > 5) shortMemory.shift();

  airImage.src = airImages.thinking;

  setTimeout(() => {
    airImage.src = airImages.smile;

    if (/おはよう|こんにちは|こんばんは/.test(userText)) {
      addLog("air：おはよう。今日も無理はしないように。");
      addLog("noel：おはよう！今日も一緒にがんばろ！");
    } else if (/時間割|授業/.test(userText)) {
      addLog("air：今日の授業、曜日と教科を確認しよう。");
      addLog("noel：メモしておくと安心だね。");
    } else {
      addLog("noel：うんうん、そうだね。");
      addLog("air：……なるほど。悪くない判断だと思う。");
    }

    airImage.src = airImages.normal;
  }, 800);
}

sendBtn.onclick = () => {
  if (!input.value) return;
  addLog("you：" + input.value);
  respond(input.value);
  input.value = "";
};

talkBtn.onclick = () => {
  const rec = new webkitSpeechRecognition();
  rec.lang = "ja-JP";
  airImage.src = airImages.thinking;

  rec.onresult = e => {
    const text = e.results[0][0].transcript;
    addLog("you：" + text);
    respond(text);
  };

  rec.start();
};

function startAutoChat() {
  autoChatTimer = setInterval(() => {
    addLog("noel：ちょっと静かだね。");
    addLog("air：……考える時間も必要だ。");
  }, 30000);
}

startAutoChat();
