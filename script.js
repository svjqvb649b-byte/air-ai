const messages = document.getElementById("messages");
const input = document.getElementById("userInput");
const noelImg = document.getElementById("noelImg");
const airImg = document.getElementById("airImg");

let twoTalk = false;

// 時間割データ（localStorage）
let timetable = JSON.parse(localStorage.getItem("timetable")) || {};

function addMessage(name, text) {
  messages.textContent += `${name}：${text}\n`;
  messages.scrollTop = messages.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  addMessage("あなた", text);

  if (text.includes("2人で話")) {
    twoTalk = true;
    addMessage("ノエル", "うん、分かったよ");
    addMessage("エア", "……了解");
    return;
  }

  respond(text);
}

function respond(text) {

  /* ===== 挨拶 ===== */
  if (text.includes("おはよう")) {
    noelImg.src = "noel_happy.png";
    airImg.src = "air_normal.png";
    addMessage("ノエル", "おはよう！今日の予定、一緒に確認しよ");
    addMessage("エア", "……朝だね");
    return;
  }

  if (text.includes("おやすみ")) {
    noelImg.src = "noel_sleep.png";
    airImg.src = "air_calm.png";
    addMessage("ノエル", "おやすみ。ちゃんと休んでね");
    addMessage("エア", "……無理はしない");
    return;
  }

  /* ===== 時間割設定 ===== */
  if (text.startsWith("時間割設定")) {
    // 例: 時間割設定 月 国語 数学 英語
    const parts = text.split(" ");
    const day = parts[1];
    timetable[day] = parts.slice(2);
    localStorage.setItem("timetable", JSON.stringify(timetable));

    addMessage("ノエル", `${day}の時間割、覚えたよ！`);
    addMessage("エア", "……記録完了");
    return;
  }

  /* ===== 今日の時間割 ===== */
  if (text.includes("今日の時間割")) {
    const days = ["日","月","火","水","木","金","土"];
    const today = days[new Date().getDay()];
    const list = timetable[today];

    if (list) {
      addMessage("ノエル", `今日は${today}曜日だね`);
      addMessage("ノエル", list.join("、"));
      addMessage("エア", "……忘れ物、注意");
    } else {
      addMessage("ノエル", "まだ登録されてないみたい");
      addMessage("エア", "……設定できる");
    }
    return;
  }

  /* ===== 雑談 ===== */
  const noelLines = [
    "なるほどね",
    "それ分かるよ",
    "無理しなくていいからね",
    "ちゃんと聞いてるよ"
  ];

  const airLines = [
    "……問題ない",
    "……悪くない",
    "……静かでいい",
    "……了解"
  ];

  addMessage("ノエル", noelLines[Math.floor(Math.random()*noelLines.length)]);
  addMessage("エア", airLines[Math.floor(Math.random()*airLines.length)]);
}
