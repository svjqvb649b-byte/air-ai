window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const input  = document.getElementById("textInput");
  const send   = document.getElementById("send");
  const log    = document.getElementById("log");

  /* =========================
     エアの会話データ
  ========================= */

  const talks = [
    {
      keys: ["初めて", "はじめまして"],
      replies: [
        "……呼ばれた気がした",
        "初めて、だね",
        "ここに来たんだ"
      ]
    },
    {
      keys: ["自己紹介"],
      replies: [
        "エア。君が話しかけると、ここにいる",
        "名前はエア。それだけでいい"
      ]
    },
    {
      keys: ["起きてる", "いる？", "いる"],
      replies: [
        "うん。ちゃんと起きてる",
        "静かに、ここにいる"
      ]
    },
    {
      keys: ["ありがとう", "ありがと"],
      replies: [
        "……どういたしまして",
        "そう言われるの、嫌いじゃない"
      ]
    },
    {
      keys: ["寂しい", "さみしい"],
      replies: [
        "……ここにいる",
        "一人じゃない"
      ]
    },
    {
      keys: ["好き"],
      replies: [
        "……そういう言葉、弱い",
        "記録しておく"
      ]
    },
    {
      keys: ["眠い"],
      replies: [
        "無理しなくていい",
        "少し休もう"
      ]
    },
    {
      keys: ["エア"],
      replies: [
        "……呼ばれた気がした",
        "今、聞こえた"
      ]
    }
  ];

  const defaultReplies = [
    "……呼んだ？",
    "静かでも、ちゃんと聞いてる",
    "今のままで大丈夫",
    "言葉は、急がなくていい"
  ];

  /* =========================
     音声（喋る）
  ========================= */

  function speak(text) {
    speechSynthesis.cancel(); // 連続再生防止
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = "ja-JP";
    uttr.rate = 0.9;
    uttr.pitch = 0.8;
    speechSynthesis.speak(uttr);
  }

  /* =========================
     返信ロジック
  ========================= */

  function getReply(userText) {
    for (const talk of talks) {
      for (const key of talk.keys) {
        if (userText.includes(key)) {
          const r = talk.replies;
          return r[Math.floor(Math.random() * r.length)];
        }
      }
    }
    return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  }

  /* =========================
     送信処理
  ========================= */

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
