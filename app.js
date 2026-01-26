window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const input  = document.getElementById("textInput");
  const send   = document.getElementById("send");
  const log    = document.getElementById("log");

  /* =========================
     記憶（AI連携前提）
  ========================= */

  const memory = {
    short: {
      lastUserText: "",
      lastAirReply: "",
      lastTalkTime: 0
    },
    stats: {
      talkCount: 0,
      sleepyCount: 0,
      thanksCount: 0,
      nightTalkCount: 0
    },
    context: {
      timeZone: ""
    }
  };

  /* =========================
     会話データ
  ========================= */

  const talks = [
    {
      keys: ["初めて", "はじめまして"],
      replies: [
        "……初めて、だね",
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
     音声
  ========================= */

  function speak(text) {
    speechSynthesis.cancel();
    const uttr = new SpeechSynthesisUtterance(text);
    uttr.lang = "ja-JP";
    uttr.rate = 0.9;
    uttr.pitch = 0.8;
    speechSynthesis.speak(uttr);
  }

  /* =========================
     記憶更新
  ========================= */

  function updateMemory(userText, reply) {
    memory.short.lastUserText = userText;
    memory.short.lastAirReply = reply;
    memory.short.lastTalkTime = Date.now();

    memory.stats.talkCount++;

    if (userText.includes("眠")) memory.stats.sleepyCount++;
    if (userText.includes("ありがとう")) memory.stats.thanksCount++;

    const hour = new Date().getHours();
    if (hour >= 22 || hour <= 4) {
      memory.stats.nightTalkCount++;
      memory.context.timeZone = "night";
    } else {
      memory.context.timeZone = "day";
    }
  }

  /* =========================
     返信ロジック
  ========================= */

  function getReply(userText) {
    // 記憶ベースの反応（優先）
    if (memory.stats.sleepyCount >= 3) {
      return "……最近、眠いって言葉が多い";
    }

    if (
      memory.context.timeZone === "night" &&
      memory.stats.nightTalkCount >= 2
    ) {
      return "夜に、よく呼ばれるね";
    }

    // 通常会話
    for (const talk of talks) {
      for (const key of talk.keys) {
        if (userText.includes(key)) {
          const r = talk.replies;
          return r[Math.floor(Math.random() * r.length)];
        }
      }
    }

    // デフォルト
    return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  }

  /* =========================
     送信処理
  ========================= */

  send.addEventListener("click", () => {
    const userText = input.value.trim();
    if (!userText) return;

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
      updateMemory(userText, reply);

      status.textContent = "待機中";
    }, 700);
  });
});
