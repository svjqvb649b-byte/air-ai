// ===============================
// 既存の音声・PWA処理（仮）
// ===============================
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    console.log("音声認識スタート（既存処理）");
  });
}

if (stopBtn) {
  stopBtn.addEventListener("click", () => {
    console.log("音声認識ストップ（既存処理）");
  });
}

// ===============================
// キャラ画像管理（追加機能）
// ===============================
let currentCharacter = "air";
let currentExpression = "normal";

const characterImages = {
  air: {
    normal: "air/air_normal.jpg",
    smile: "air/air_smile.jpg",
    thinking: "air/air_thinking.jpg"
  },
  noel: {
    normal: "images/noel/noel_normal.jpg",
    smile: "images/noel/noel_smile.jpg",
    thinking: "images/noel/noel_thinking.jpg"
  }
};

// キャラ切り替え
function setCharacter(character) {
  currentCharacter = character;
  updateCharacterImage();
}

// 表情切り替え
function setExpression(expression) {
  currentExpression = expression;
  updateCharacterImage();
}

// 画像更新
function updateCharacterImage() {
  const img = document.getElementById("character-image");
  img.src = characterImages[currentCharacter][currentExpression];
}
