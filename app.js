window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("textInput");
  const send = document.getElementById("send");
  const log = document.getElementById("log");

  /* =========================
     記憶
  ========================= */
  const memory = {
    short: {
      lastTalkTime: Date.now()
    },
    schedule: {
      monday: ["国語","数学","英語","理科","体育","社会"],
      tuesday: ["数学","英語","音楽","理科","国語"],
      wednesday: ["社会","数学","英語","美術","体育"],
      thursday: ["理科","国語","数学","英語","家庭科"],
      friday: ["英語","社会","数学","理科","総合"],
      saturday: [],
      sunday: []
    }
  };

  const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

  /* =========================
     時間設定（重要）
  ========================= */
  const periods = [
    { start: "08:50", end: "09:40" },
    { start: "09:50", end: "10:40" },
    { start: "10:50", end: "11:40" },
    { start: "12:50", end: "13:40" },
    { start: "14:25", end: "15:15" },
    { start: "15:15", end: "16:00" }
  ];

  function toMinutes(time) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  }

  function nowMinutes() {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  }

  function getNextPeriodIndex() {
    const now = nowMinutes();
    for (let i = 0; i < periods.length; i++) {
      if (now < toMinutes(periods[i].start)) {
        return i;
      }
    }
    return -1;
  }

  function getCurrentPeriodIndex() {
    const now = nowMinutes();
    for (let i = 0; i < periods.length; i++) {
      if (
        now >= toMinutes(periods[i].start) &&
        now <= toMinutes(periods[i].end)
      ) {
        return i;
      }
    }
    return -1;
  }

  /* =========================
     表示
  ========================= */
  function addLine(name, text) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${name}：</strong>${text}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  function todayKey() {
    return days[new Date().getDay()];
  }

  /* =========================
     Air（シエスタ風）
  ========================= */
  function airReply(text) {
    if (/次.*何限/.test(text)) {
      const day = todayKey();
      const list = memory.schedule[day];
      if (!list || list.length === 0) return "……今日は、授業ない。";

      const current = getCurrentPeriodIndex();
      const next = getNextPeriodIndex();

      if (current !== -1) {
        return `……次は${current + 2}限。${list[current + 1] || "もう終わり"}`;
      }

      if (next !== -1) {
        return `……次は${next + 1}限。${list[next]}`;
      }

      return "……今日は、もう終わり。";
    }

    if (/おはよう/.test(text)) return "……おはよう。";
    if (/こんにちは/.test(text)) return "……こんにちは。";
    if (/こんばんは/.test(text)) return "……こんばんは。";

    if (/予定|時間割/.test(text)) {
      const list = memory.schedule[todayKey()];
      if (!list || list.length === 0) return "……今日は休み。";
      return "……" + list.map((s,i)=>`${i+1}限:${s}`).join("、");
    }

    return "……うん。";
  }

  /* =========================
     Noel
  ========================= */
  function noelReply(text) {
    if (/次.*何限/.test(text)) {
      const day = todayKey();
      const list = memory.schedule[day];
      if (!list || list.length === 0) return "今日はお休みだよ。";

      const current = getCurrentPeriodIndex();
      const next = getNextPeriodIndex();

      if (current !== -1) {
        return list[current + 1]
          ? `次は${current + 2}限、${list[current + 1]}だよ`
          : "これで今日は最後だね";
      }

      if (next !== -1) {
        return `次は${next + 1}限、${list[next]}だよ`;
      }

      return "今日はもう授業終わりだよ";
    }

    if (/おはよう/.test(text)) return "おはよう！";
    if (/こんにちは/.test(text)) return "こんにちは";
    if (/こんばんは/.test(text)) return "こんばんは";

    return "続けていいよ";
  }

  /* =========================
     無言時の自動会話
  ========================= */
  setInterval(() => {
    if (Date.now() - memory.short.lastTalkTime > 30000) {
      addLine("Air", "……静かだね。");
      setTimeout(() => {
        addLine("Noel", "集中してるのかもね");
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

    setTimeout(() => addLine("Air", airReply(text)), 400);
    setTimeout(() => addLine("Noel", noelReply(text)), 900);

    input.value = "";
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") send.click();
  });

  /* =========================
     初期
  ========================= */
  addLine("Air", "……起動、完了。");
  addLine("Noel", "今日はどんな予定？");
});
