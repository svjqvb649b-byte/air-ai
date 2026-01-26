window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const button = document.getElementById("tap");

  // シエスタ風ボイス
  const replies = [
    "……呼んだ？",
    "ふぅ……今の声、聞こえた",
    "無理に喋らなくていい",
    "君の声、嫌いじゃない",
    "静かでも、ちゃんといる"
  ];

  function speak(text) {
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = "ja-JP";
    uttr.rate = 0.9;
    uttr.pitch = 0.8;
    speechSynthesis.speak(uttr);
  }

  // 音声認識
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "ja-JP";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    status.textContent = "……";
  };

  recognition.onresult = () => {
    const msg = replies[Math.floor(Math.random() * replies.length)];
    speak(msg);
    status.textContent = "待機中";
  };

  recognition.onerror = () => {
    status.textContent = "待機中";
  };

  button.addEventListener("click", () => {
    recognition.start();
  });
});
