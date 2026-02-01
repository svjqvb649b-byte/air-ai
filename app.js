window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("textInput");
  const send = document.getElementById("send");
  const log = document.getElementById("log");

  /* ========= ログ表示 ========= */
  function addLog(name, text) {
    const p = document.createElement("p");
    p.innerHTML = `<span class="${name}">${name} :</span> ${text}`;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
  }

  /* ========= 時間割 ========= */
  const schedule = {
    "月": ["国語", "数学", "英語", "理科", "社会", "体育"],
    "火": ["数学", "英語", "国語", "理科", "音楽", "美術"],
    "水": ["社会", "数学", "英語", "国語", "技術"],
    "木": ["英語", "理科", "数学", "社会", "体育"],
    "金": ["国語", "数学", "英語", "総合"]
  };

  /* ========= 授業時間 ========= */
  const classTimes = [
    { name: "1限目", start: 8 * 60 + 50 },
    { name: "2限目", start: 9 * 60 + 50 },
    { name: "3限目", start: 10 * 60 + 50 },
    { name: "4限目", start: 12 * 60 + 50 },
    { name: "5限目", start: 14 * 60 + 25 },
    { name: "6限目", start: 15 * 60 + 15 }
  ];

  /* ========= 日付補助 ========= */
  function getTodayKey(offset = 0) {
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return days[d.getDay()];
  }

  /* ========= 予定表示 ========= */
  function showSchedule(dayKey) {
    if (!schedule[dayKey]) {
      addLog("Noel", "その日は授業がないよ。");
      return;
    }
    addLog("Noel", `${dayKey}曜日の予定だよ。`);
    schedule[dayKey].forEach((sub, i) => {
      addLog("Air", `……${i + 1}限目は ${sub}`);
    });
  }

  /* ========= 次の授業 ========= */
  function showNextClass() {
    const now = new Date();
    const time = now.getHours() * 60 + now.getMinutes();

    for (let c of classTimes) {
      if (time < c.start) {
        addLog("Air", `……次は ${c.name}。`);
        return;
      }
    }
    addLog("Noel", "今日はもう授業は終わってるよ。");
  }

  /* ========= 2人雑談 ========= */
  function startAirNoelTalk() {
    const talks = [
      ["Air", "……今日はよく頑張った。"],
      ["Noel", "うん、ちゃんとやりきったね。"],
      ["Air", "……それだけで十分。"],
      ["Noel", "今日は合格だよ。"]
    ];

    let i = 0;
    const timer = setInterval(() => {
      if (i >= talks.length) {
        clearInterval(timer);
        return;
      }
      addLog(talks[i][0], talks[i][1]);
      i++;
    }, 2500);
  }

  /* ========= メイン処理 ========= */
  send.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    addLog("君", text);
    input.value = "";

    /* --- 挨拶 --- */
    if (text.includes("おはよう")) {
      addLog("Air", "……おはよう。");
      addLog("Noel", "今日も無理しなくていいよ。");
      return;
    }
    if (text.includes("こんにちは")) {
      addLog("Air", "……こんにちは。");
      addLog("Noel", "調子どう？");
      return;
    }
    if (text.includes("こんばんは")) {
      addLog("Air", "……こんばんは。今日はどんな一日だった？");
      addLog("Noel", "ここまでお疲れさま。");
      return;
    }

    /* --- 予定 --- */
    if (text.includes("明日")) {
      showSchedule(getTodayKey(1));
      return;
    }
    if (text.includes("今日")) {
      showSchedule(getTodayKey(0));
      return;
    }
    if (text.includes("月")) { showSchedule("月"); return; }
    if (text.includes("火")) { showSchedule("火"); return; }
    if (text.includes("水")) { showSchedule("水"); return; }
    if (text.includes("木")) { showSchedule("木"); return; }
    if (text.includes("金")) { showSchedule("金"); return; }

    /* --- 次は何限 --- */
    if (text.includes("次は何限")) {
      showNextClass();
      return;
    }

    /* --- 雑談開始 --- */
    if (
      text.includes("雑談") ||
      text.includes("2人で") ||
      text.includes("話して")
    ) {
      addLog("Noel", "じゃあ少し話そうか。");
      startAirNoelTalk();
      return;
    }

    /* --- デフォルト --- */
    addLog("Air", "……うん、聞いてる。");
  });

  /* ========= 起動メッセージ ========= */
  addLog("Air", "……ここにいる。");
  addLog("Noel", "いつでも話しかけて。");
});
