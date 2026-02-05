const log = document.getElementById("log");
const input = document.getElementById("textInput");

let idleTimer = null;
let chatMode = "normal"; // normal / timetable

// ログ表示
function addLog(name, text) {
  log.innerHTML += `<div><b>${name}</b><br>${text}</div><br>`;
  log.scrollTop = log.scrollHeight;
}

// 画像切り替え
function setImage(id, src) {
  const img = document.getElementById(id);
  if (img) img.src = src;
}

// 挨拶判定
function isGreeting(text) {
  return /(おはよう|こんにちは|こんばんは|やあ|もしもし)/.test(text);
}

// 送信処理
function send() {
  const text = input.value.trim();
  if (!text) return;

  addLog("あなた", text);
  input.value = "";

  resetIdle();

  // 挨拶
  if (isGreeting(text)) {
    setImage("noelImage", "images/noel/noel_smile.jpg");
    setImage("airImage", "air/air_smile.jpg");

    setTimeout(() => {
      addLog("ノエル", "ちゃんと気づいてるよ。挨拶、うれしい。");
    }, 400);

    setTimeout(() => {
      addLog("エア", "今日も一緒にやろう。無理はしなくていいよ。");
    }, 800);

    return;
  }

  // 時間割モード
  if (text.includes("時間割")) {
    chatMode = "timetable";
    addLog("エア", "時間割だね。曜日と教科、教えて。");
    return;
  }

  if (chatMode === "timetable") {
    addLog("ノエル", "覚えたよ。あとで一緒に確認しよ。");
    chatMode = "normal";
    return;
  }

  // 雑談
  setTimeout(() => {
    addLog("ノエル", "うん、それ分かる。");
  }, 400);

  setTimeout(() => {
    addLog("エア", "話してくれてありがとう。");
  }, 800);
}

// 放置時の自動会話
function startIdleTalk() {
  const talks = [
    () => {
      setImage("airImage", "air/air_thinking.jpg");
      addLog("エア", "今は静かな時間だね。");
    },
    () => {
      setImage("noelImage", "images/noel/noel_thinking.jpg");
      addLog("ノエル", "こういう間も、嫌いじゃないよ。");
    },
    () => {
      setImage("airImage", "air/air_normal.jpg");
      setImage("noelImage", "images/noel/noel_normal.jpg");
      addLog("エア", "また話したくなったら、声かけて。");
    }
  ];

  const talk = talks[Math.floor(Math.random() * talks.length)];
  talk();
}

// 放置タイマー
function resetIdle() {
  if (idleTimer) clearTimeout(idleTimer);

  idleTimer = setTimeout(() => {
    startIdleTalk();
    resetIdle();
  }, 15000); // 15秒放置
}

// 初期化
resetIdle();
