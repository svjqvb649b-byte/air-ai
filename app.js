// =====================
// キャラ・画像管理
// =====================
let current = "air";
const log = document.getElementById("log");

function setFace(char, state) {
  document.getElementById(char).src =
    `images/${char}/${char}_${state}.${char === "air" ? "png" : "jpg"}`;
}

// =====================
// 短期記憶（直近5件）
// =====================
const shortMemory = [];

function remember(text) {
  shortMemory.push(text);
  if (shortMemory.length > 5) shortMemory.shift();
}

// =====================
// 時間割（変更済み）
// =====================
const timetable = {
  月曜: ["数学Ⅰ","英語コミュⅠ","体育","言語文化","家庭基礎","音楽Ⅰ"],
  火曜: ["英語コミュⅠ","現代の国語","数学Ⅰ","保健","公共","総合"],
  水曜: ["英語コミュⅠ","科学と人間生活","言語文化","歴史総合","体育","LHR"],
  木曜: ["音楽Ⅰ","科学と人間生活","情報Ⅰ","家庭基礎","体育","数学Ⅰ"],
  金曜: ["公共","数学Ⅰ","英語コミュⅠ","歴史総合","現代の国語","情報Ⅰ"]
};

// =====================
// 発話
// =====================
function speak(text, char) {
  setFace(char, "smile");
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ja-JP";
  u.onend = () => setFace(char, "normal");
  speechSynthesis.speak(u);
  log.innerHTML += `<div>${char}：${text}</div>`;
}

// =====================
// シエスタ風エア台詞
// =====================
function airTalk(text) {
  const lines = [
    "……ふむ",
    "無理はしなくていい",
    "考える価値はある",
    "まあ、悪くない",
    "眠いけど、聞いてる"
  ];
  return lines[Math.floor(Math.random() * lines.length)] + "。 " + text;
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
  remember(text);
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
    speak(airTalk("挨拶だね"), "air");
    return;
  }

  // 時間割
  if (/何限|授業/.test(text)) {
    const p = text.match(/[1-6]/)?.[0];
    if (p && timetable[day]) {
      speak(
        airTalk(`${day}の${p}限は${timetable[day][p-1]}`),
        "air"
      );
      return;
    }
  }

  // 雑談トリガー（2人会話）
  if (/雑談|二人で|話して/.test(text)) {
    duoChat(text);
    return;
  }

  // 通常相談
  speak(airTalk("ノエル、どう思う？"), "air");
  setTimeout(() => {
    speak("うん、流れ的には大丈夫そうだよ", "noel");
  }, 1200);
}

// =====================
// 2人だけの雑談
// =====================
function duoChat(topic) {
  speak(airTalk(`さっき「${topic}」って言ってた`), "air");
  setTimeout(() => {
    speak("ちょっと考えさせられる話題だね", "noel");
  }, 1200);
  setTimeout(() => {
    speak(airTalk("まあ、急がなくていい"), "air");
  }, 2400);
}

// =====================
// 放置時会話（維持）
// =====================
let idleTimer;
function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    speak(airTalk("少し静かだね"), "air");
    setTimeout(() => {
      speak("一緒にいるだけでもいいよ", "noel");
    }, 1500);
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
