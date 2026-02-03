// ===== キャラ管理 =====
let currentCharacter = 'air';
let currentExpression = 'normal';

const characterImage = document.getElementById('characterImage');

function updateCharacterImage() {
  let path = '';

  if (currentCharacter === 'air') {
    path = `air/air_${currentExpression}.jpg`;
  } else if (currentCharacter === 'noel') {
    path = `images/noel/noel_${currentExpression}.jpg`;
  }

  characterImage.src = path;
}

function setCharacter(character) {
  currentCharacter = character;
  currentExpression = 'normal';
  updateCharacterImage();
}

function setExpression(expression) {
  currentExpression = expression;
  updateCharacterImage();
}

// ===== 音声認識 =====
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'ja-JP';
recognition.continuous = true;
recognition.interimResults = false;

// 🎧 音声認識開始 → thinking
recognition.onstart = () => {
  setExpression('thinking');
};

// 🎧 認識結果
recognition.onresult = (event) => {
  const text = event.results[event.results.length - 1][0].transcript;
  speak(text);
};

// 🎧 音声認識終了 → normal（発話が無い場合）
recognition.onend = () => {
  if (!speechSynthesis.speaking) {
    setExpression('normal');
  }
};

// ===== 音声合成 =====
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';

  // 🔊 発話開始 → smile
  utterance.onstart = () => {
    setExpression('smile');
  };

  // 🔊 発話終了 → normal
  utterance.onend = () => {
    setExpression('normal');
  };

  speechSynthesis.speak(utterance);
}

// ===== ボタン =====
document.getElementById('startBtn').addEventListener('click', () => {
  recognition.start();
});

document.getElementById('stopBtn').addEventListener('click', () => {
  recognition.stop();
  speechSynthesis.cancel();
  setExpression('normal');
});

// 初期表示
updateCharacterImage();
