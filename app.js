window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("tap");

  // 話し方（シエスタ風）
  const replies = [
    "……呼んだ？",
    "ふぁ……今ちょっと眠い",
    "急がなくていいよ",
    "君の声、ちゃんと聞こえてる",
    "静かに話してくれるなら、続けてもいい"
  ];

  function speak(text) {
    speechSynthesis.cancel(); // 安定用
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
  recognition.continuous = true;

  recognition.onresult = () => {
    const msg =
      replies[Math.floor(Math.random() * replies.length)];
    speak(msg);
  };

  // 起動ボタン
  button.addEventListener("click", () => {
    recognition.start();
    speak("……起きたよ");
  });
});
