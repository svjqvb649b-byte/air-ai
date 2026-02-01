window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const input = document.getElementById("textInput");
  const send = document.getElementById("send");
  const log = document.getElementById("log");

  /* =========================
     記憶
  ========================= */
  const memory = {
    short: {
      lastUserText: "",
      lastTalkTime: Date.now()
    },

    schedule: {
      monday: [
        "1限：国語",
        "2限：数学",
        "3限：英語",
        "4限：理科",
        "5限：体育",
        "6限：社会"
      ],
      tuesday: [
        "1限：数学",
        "2限：英語",
        "3限：音楽",
        "4限：理科",
        "5限：国語"
      ],
      wednesday: [
        "1限：社会",
        "2限：数学",
        "3限：英語",
        "4限：美術",
        "5限：体育"
      ],
      thursday: [
        "1限：理科",
        "2限：国語",
        "3限：数学",
        "4限：英語",
        "5限：家庭科"
      ],
      friday: [
        "1限：英語",
        "2限：社会",
        "3限：数学",
        "4限：理科",
        "5限：総合"
      ],
      saturday: ["今日は休みだよ"],
      sunday: ["今日は休みだよ"]
    }
  };

  /* =========================
     表示
  ========================= */
  function addLine(name, text) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${name}：</strong>${text}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  /* =========================
     曜日変換
  ========================= */
  function getDayKey(text) {
    if (text.includes("月")) return "monday";
    if (text.includes("火")) return "tuesday";
    if (text.includes("水")) return "wednesday";
    if (text.includes("木")) return "thursday";
    if (text.includes("金")) return "friday";
    if (text.includes("土")) return "saturday";
    if (text.includes("日")) return "sunday";
    return null;
  }

  function todayKey() {
    const d = new Date().getDay();
    return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][d];
  }

  /* =========================
     Air（シエスタ風）
  ========================= */
  function airReply(text) {
    // 挨拶
    if (/おはよう/.test(text)) return "……おはよう。今日も、無理しないで。";
    if (/こんにちは/.test(text)) return "……こんにちは。ちゃんと来たんだね。";
    if (/こんばんは/.test(text)) return "……こんばんは。静かな時間。";

    // 時間割
    if (/予定|時間割/.test(text)) {
      const key = getDayKey(text) || todayKey();
      const list = memory.schedule[key];
      return "……" + list.join("、");
    }

    // 雑談
    if (/ありがとう/.test(text)) return "……うん。役に立てたなら、それでいい。";
    if (/疲れた/.test(text)) return "……少し、休んで。頑張りすぎ。";

    return "……大丈夫。";
  }

  /* =========================
     Noel（そのまま）
  ========================= */
  function noelReply(text) {
    if (/おはよう/.test(text)) return "おはよう！今日も話せてうれしいよ";
    if (/こんにちは/.test(text)) return "こんにちは！";
    if (/こんばんは/.test(text)) return "こんばんは。今日も一日おつかれさま";

    if (/予定|時間割/.test(text)) {
      const key = getDayKey(text) || todayKey();
      return "今日はね、" + memory.schedule[key].join("、だよ");
    }

    return "いつでも話しかけてね";
  }

  /* =========================
     自動会話（無言時）
  ========================= */
  setInterval(() => {
    if (Date.now() - memory.short.lastTalkTime > 30000) {
      addLine("Air", "……ここにいる。");
      setTimeout(() => {
        addLine("Noel", "いつでも話しかけて。");
      }, 1200);
      memory.short.lastTalkTime = Date.now();
    }
  }, 5000);

  /* =========================
     送信
  ========================= */
  send.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    addLine("君", text);
    memory.short.lastTalkTime = Date.now();

    setTimeout(() => {
      addLine("Air", airReply(text));
    }, 500);

    setTimeout(() => {
      addLine("Noel", noelReply(text));
    }, 1100);

    input.value = "";
  });

  input.addEventListener("keypress", e => {
    if (e.key === "Enter") send.click();
  });
});
