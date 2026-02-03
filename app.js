// ===============================
// キャラ管理
// ===============================
let currentCharacter = "air";
let currentExpression = "normal";
const characterImage = document.getElementById("characterImage");

function updateCharacterImage() {
  const path =
    currentCharacter === "air"
      ? `air/air_${currentExpression}.jpg`
      : `images/noel/noel_${currentExpression}.jpg`;
  characterImage.src = path;
}

function setCharacter(c) {
  currentCharacter = c;
  currentExpression = "normal";
  updateCharacterImage();
}

function setExpression(e) {
  currentExpression = e;
  updateCharacterImage();
}

// ===============================
// 音声認識
// ===============================
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "ja-JP";
recognition.continuous = true;

let lastUserAction = Date.now();
let idleTimer = null;
let duoTalkTimer = null;

recognition.onstart = () => {
  lastUserAction = Date.now();
  setExpression("thinking");
  stopDuoTalk();
};

recognition.onresult = (e) => {
  lastUserAction = Date.now();
  const text = e.results[e.results.length - 1][0].transcript;
  handleUserText(text);
};

recognition.onend = () => {
  if (!speechSynthesis.speaking) {
    setExpression("normal");
  }
};

// ===============================
// 音声合成
// ===============================
function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";

  u.onstart = () => setExpression("smile");
  u.onend = () => setExpression("normal");

  speechSynthesis.speak(u);
}

// ===============================
// ユーザー発話処理
// ===============================
function handleUserText(text) {
  // ---- 挨拶 ----
  if (
    text.includes("おはよう") ||
    text.includes("こんにちは") ||
    text.includes("こんばんは") ||
    text.includes("おやすみ")
  ) {
    duoConsult(
      "挨拶だから明るく返そう",
      "安心する感じがいいね",
      "うん、声かけてくれてありがとう。今日はどんな感じ？"
    );
    return;
  }

  // ---- 時間割 ----
  if (
    text.includes("授業") ||
    text.includes("時間割") ||
    text.includes("何時間目")
  ) {
    duoConsult(
      "状況整理しよう",
      "落ち着いて伝えたい",
      "次の授業を一緒に確認しよっか。今どこまで進んでる？"
    );
    return;
  }

  // ---- 雑談ワード ----
  if (
    text.includes("暇") ||
    text.includes("疲れた") ||
    text.includes("どう思う") ||
    text.includes("楽しい") ||
    text.includes("つらい")
  ) {
    duoConsult(
      "共感したほうがよさそう",
      "寄り添う感じがいいね",
      "そっか。無理しなくていいよ。少し話そうか。"
    );
    return;
  }

  // ---- その他（なんとなく話しかけた時） ----
  duoConsult(
    "どう返すのがいいかな",
    "優しく拾いたいね",
    "うん、聞いてるよ。続き教えて。"
  );
}

// ===============================
// 2人で裏相談 → 返答
// ===============================
function duoConsult(airThought, noelThought, finalAnswer) {
  setExpression("thinking");

  setTimeout(() => {
    currentCharacter = "air";
    updateCharacterImage();
    console.log("Air:", airThought);
  }, 500);

  setTimeout(() => {
    currentCharacter = "noel";
    updateCharacterImage();
    console.log("Noel:", noelThought);
  }, 1200);

  setTimeout(() => {
    currentCharacter = "air";
    updateCharacterImage();
    speak(finalAnswer);
  }, 2000);
}

// ===============================
// 放置で2人だけ会話
// ===============================
function startIdleWatch() {
  idleTimer = setInterval(() => {
    if (Date.now() - lastUserAction > 15000) {
      startDuoTalk();
    }
  }, 3000);
}

function startDuoTalk() {
  if (duoTalkTimer) return;

  duoTalkTimer = setInterval(() => {
    duoConsult(
      "静かだね",
      "そっと見守ろう",
      "少し休憩してもいいかもね"
    );
  }, 12000);
}

function stopDuoTalk() {
  if (duoTalkTimer) {
    clearInterval(duoTalkTimer);
    duoTalkTimer = null;
  }
}

// ===============================
// ボタン
// ===============================
document.getElementById("startBtn").onclick = () => {
  recognition.start();
};

document.getElementById("stopBtn").onclick = () => {
  recognition.stop();
  speechSynthesis.cancel();
  setExpression("normal");
};

// 初期化
updateCharacterImage();
startIdleWatch();
