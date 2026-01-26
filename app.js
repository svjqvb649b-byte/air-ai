window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const input = document.getElementById("textInput");
  const send = document.getElementById("send");
  const log = document.getElementById("log");

  // 共通の静かな返事
  const defaultReplies = [
    "……呼んだ？",
    "うん、ちゃんと聞こえてる",
    "無理に言葉にしなくていい",
    "君の声、嫌いじゃない",
    "静かでも、ここにいる",
    "今のままで大丈夫"
  ];

  function speak(text) {
    speechSynthesis.cancel();
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = "ja-JP";
    uttr.rate = 0.9;
    uttr.pitch = 0.8;
    speechSynthesis.speak(uttr);
  }

  function getReply(userText) {
    // あいさつ
    if (userText.includes("初めまして")) {
      return "……初めまして。エアだよ。静かな方が得意";
    }

    // 自己紹介
    if (userText.includes("自己紹介")) {
      return "エア。君が話しかけると、ここにいる";
    }

    // 起きてる？
    if (
      userText.includes("起きてる") ||
      userText.includes("いる？") ||
      userText.includes("いる")
    ) {
      return "うん。ちゃんと起きてる";
    }

    // 名前呼び
    if (userText.includes("エア")) {
      return "……呼ばれた気がした";
    }

    // デフォルト（ランダム）
    return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  }

  send.addEventListener("click", () => {
    const userText = input.value.trim();
    if (!userText) return;

    // 君の発言ログ
    const userLine = document.createElement("div");
    userLine.textContent = `君：「${userText}」`;
    log.appendChild(userLine);

    input.value = "";
    status.textContent = "……";

    setTimeout(() => {
      const reply = getReply(userText);

      const airLine = document.createElement("div");
      airLine.textContent = `Air：「${reply}」`;
      log.appendChild(airLine);

      speak(reply);
      status.textContent = "待機中";
    }, 700);
  });
});
