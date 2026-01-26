window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const input = document.getElementById("textInput");
  const send = document.getElementById("send");
  const log = document.getElementById("log");

  // シエスタ風・内容に依存しない返事
  const replies = [
    "……呼んだ？",
    "うん、ちゃんと聞こえてる",
    "無理に言葉にしなくていい",
    "君の声、嫌いじゃない",
    "静かでも、ここにいる",
    "今のままで大丈夫"
  ];

  function speak(text) {
    speechSynthesis.cancel(); // ← ★ここに追加
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = "ja-JP";
    uttr.rate = 0.9;
    uttr.pitch = 0.8;
    speechSynthesis.speak(uttr);
  }

  send.addEventListener("click", () => {
    const userText = input.value.trim();
    if (!userText) return;

    // ログ表示（君の言葉）
    const userLine = document.createElement("div");
    userLine.textContent = "君：「" + userText + "」";
    log.appendChild(userLine);

    input.value = "";
    status.textContent = "……";

    setTimeout(() => {
      const msg = replies[Math.floor(Math.random() * replies.length)];

      const airLine = document.createElement("div");
      airLine.textContent = "Air：「" + msg + "」";
      log.appendChild(airLine);

      speak(msg);
      status.textContent = "待機中";
    }, 800);
  });
});
