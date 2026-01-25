window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const button = document.getElementById("tap");

  // シエスタ風ボイス
  const voices = [
    "……呼んだ？",
    "ん……今の、君の声？",
    "静かに話して。ちゃんと聞いてる",
    "大丈夫。ここにいる",
    "ふぅ……急がなくていいよ"
  ];

  function speak(text) {
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = "ja-JP";
    uttr.rate = 0.9;
    uttr.pitch = 0.8;
    speechSynthesis.speak(uttr);
  }

  // 音声認識（聞く耳）
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.lang = "ja-JP";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const userVoice = event.results[0][0].transcript;
    console.log("聞こえた声:", userVoice);

    const reply =
      voices[Math.floor(Math.random() * voices.length)];

    speak(reply);
    status.innerText = "待機中";
  };

  recognition.onerror = () => {
    status.innerText = "待機中";
  };

  button.addEventListener("click", () => {
    status.innerText = "起動中…";

    // 先に一言しゃべる（Safari対策）
    speak("……聞いてるよ");

    // 少し遅らせて聞き始める
    setTimeout(() => {
      recognition.start();
    }, 500);
  });
});
