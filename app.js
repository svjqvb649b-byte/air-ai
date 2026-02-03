// =====================
// キャラ設定
// =====================
let current = "air";
const airImg = document.getElementById("air");
const noelImg = document.getElementById("noel");
const log = document.getElementById("log");

function setFace(char, state) {
  document.getElementById(char).src =
    `images/${char}/${char}_${state}.${char === "air" ? "png" : "jpg"}`;
}

// =====================
// 時間割（画像と完全一致）
// =====================
const timetable = {
  月曜: [
    "数学Ⅰ",
    "英語コミュⅠ",
    "体育",
    "言語文化",
    "家庭基礎",
    "音楽Ⅰ"
  ],
  火曜: [
    "英語コミュⅠ",
    "現代の国語",
    "数学Ⅰ",
    "保健",
    "公共",
    "総合"
  ],
  水曜: [
    "英語コミュⅠ",
    "科学と人間生活",
    "言語文化",
    "歴史総合",
    "体育",
    "LHR"
  ],
  木曜: [
    "音楽Ⅰ",
    "科学と人間生活",
    "情報Ⅰ",
    "家庭基礎",
    "体育",
    "数学Ⅰ"
  ],
  金曜: [
    "公共",
    "数学Ⅰ",
    "英語コミュⅠ",
    "歴史総合",
    "現代の国語",
    "情報Ⅰ"
  ]
};

// =====================
// 発話
// =====================
function speak(text, char) {
  setFace(char, "smile");
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = "ja-JP";
  uttr.onend = () => setFace(char, "normal");
  speechSynthesis.speak(uttr);
  log.innerHTML += `<div>${text}</div>`;
}

// =====================
// 音声認識
// =====================
const rec = new webkitSpeechRecognition();
rec.lang = "ja-JP";
rec.onstart = () => setFace(current, "thinking");
rec.onend = () => setFace(current, "normal");

rec.onresult = e => {
  const text = e.results[0][0].transcript;
  handleInput(text);
};

// =====================
// 入力処理
// =====================
function handleInput(text) {
  const now = new Date();
  const day = ["日曜","月曜","火曜","水曜","木曜","金曜","土曜"][now.getDay()];

  // 挨拶
  if (/おはよう|こんにちは|こんばんは/.test(text)) {
    speak("……ん。挨拶は大事。ちゃんと返す。", "air");
    return;
  }

  // 時間割質問
  if (/何限|授業/.test(text)) {
    const period = text.match(/[1-6]/)?.[0];
    if (period && timetable[day]) {
      speak(
        `今日は${day}。${period}限は「${timetable[day][period-1]}」。`,
        "air"
      );
      return;
    }
  }

  // 雑談
  if (/暇|つかれた/.test(text)) {
    speak("……無理はしない方がいい。休むのも才能。", "air");
    return;
  }

  // 2人で相談
  speak("……ノエル、どう思う？", "air");
  setTimeout(() => {
    speak("うん、今の状況なら大丈夫そうだよ", "noel");
  }, 1200);
}

// =====================
// 放置時 会話
// =====================
let idleTimer;
function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    speak("……最近、頑張りすぎじゃない？", "air");
    setTimeout(() => speak("少し休憩しよ？", "noel"), 1500);
  }, 20000);
}

// =====================
// ボタン
// =====================
document.getElementById("micBtn").onclick = () => {
  rec.start();
  resetIdle();
};

document.getElementById("switchBtn").onclick = () => {
  current = current === "air" ? "noel" : "air";
  speak(`${current}に切り替えたよ`, current);
};
