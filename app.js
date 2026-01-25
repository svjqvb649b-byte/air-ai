window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const button = document.getElementById("tap");

  const voices = [
    "……呼んだ？",
    "ふぁ……今ちょっと眠い",
    "急がなくていいよ",
    "君の声、嫌いじゃない",
    "静かにしてくれるなら話すけど"
  ];

  function speak(text) {
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = "ja-JP";
    uttr.rate = 0.9;
    uttr.pitch = 0.8;
    speechSynthesis.speak(uttr);
  }

  button.addEventListener("click", () => {
    const msg = voices[Math.floor(Math.random() * voices.length)];
    speak(msg);
  });
});
