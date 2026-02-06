const messages = document.getElementById("messages");
const input = document.getElementById("userInput");
const noelImg = document.getElementById("noelImg");
const airImg = document.getElementById("airImg");

let twoTalk = false;

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
    addMessage("ノエル", "うん、分かったよ。");
    addMessage("エア", "……了解");
    return;
  }

  respond(text);
}

function respond(text) {
  // 挨拶
  if (text.includes("おはよう")) {
    noelImg.src = "noel_happy.png";
    airImg.src = "air_normal.png";
    addMessage("ノエル", "おはよう！今日も一緒に頑張ろう");
    addMessage("エア", "……朝だね");
    return;
  }

  if (text.includes("おやすみ")) {
    noelImg.src = "noel_sleep.png";
    airImg.src = "air_calm.png";
    addMessage("ノエル", "おやすみ。無理しないでね");
    addMessage("エア", "……ゆっくり休んで");
    return;
  }

  // 時間割サポート
  if (text.includes("時間割")) {
    addMessage("ノエル", "今日はどの教科があるの？");
    addMessage("エア", "……準備、確認しよう");
    return;
  }

  // 雑談
  const noelLines = [
    "なるほどね",
    "それ、分かるよ",
    "無理しなくていいからね"
  ];
  const airLines = [
    "……問題ない",
    "……悪くない",
    "……静かでいい"
  ];

  addMessage("ノエル", noelLines[Math.floor(Math.random()*noelLines.length)]);
  addMessage("エア", airLines[Math.floor(Math.random()*airLines.length)]);
}
