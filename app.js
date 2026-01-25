window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const button = document.getElementById("tap");

  let running = false;

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    speechSynthesis.speak(u);
  };

  button.addEventListener("click", () => {
    running = !running;

    if (running) {
      status.textContent = "起動中…";
      speak("こんにちは。エアです。");
    } else {
      status.textContent = "停止しました";
      speak("停止します。");
    }
  });
});
