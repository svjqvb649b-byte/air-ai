window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const input = document.getElementById("textInput");
  const send = document.getElementById("send");
  const log = document.getElementById("log");

  /* =========================
     記憶（ローカル）
  ========================= */
  const memory = {
    short: {
      lastUserText: "",
      lastSpeaker: "air", // air / noel / user
      lastTalkTime: Date.now()
    },
    schedule: {
      monday: "学校（1〜6限）",
      tuesday: "学校",
      wednesday: "学校",
      thursday: "学校",
      friday: "学校",
      saturday: "休み",
      sunday: "休み",
      tomorrow: "未登録"
    }
  };

  /* =========================
     共通表示
  ========================= */
  function addLine(speaker, text) {
    const div = document.createElement("div");
    div.className = speaker;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    memory.short.lastSpeaker = speaker;
  }

  function air(text) {
    addLine("air", `Air : ${text}`);
  }

  function noel(text) {
    addLine("noel", `Noel : ${text}`);
  }

  function user(text) {
    addLine("user", `君 : ${text}`);
  }

  /* =========================
     挨拶・雑談判定
  ========================= */
  function isGreeting(text) {
    return /(おはよう|こんにちは|こんばんは)/.test(text);
  }

  function isChat(text) {
    return /(元気|どう|暇|調子)/.test(text);
  }

  /* =========================
     予定判定（★修正ポイント）
  ========================= */
  function getSchedule(text) {
    if (/月曜/.test(text)) return memory.schedule.monday;
    if (/火曜/.test(text)) return memory.schedule.tuesday;
    if (/水曜/.test(text)) return memory.schedule.wednesday;
    if (/木曜/.test(text)) return memory.schedule.thursday;
    if (/金曜/.test(text)) return memory.schedule.friday;
    if (/土曜/.test(text)) return memory.schedule.saturday;
    if (/日曜/.test(text)) return memory.schedule.sunday;
    if (/明日/.test(text)) return memory.schedule.tomorrow;
    return null;
  }

  /* =========================
     ユーザー入力処理
  ========================= */
  function handleUser(text) {
    memory.short.lastTalkTime = Date.now();
    user(text);

    // 挨拶
    if (isGreeting(text)) {
      air("……うん、聞こえてる。");
      noel("ちゃんと反応するよ。");
      return;
    }

    // 予定
    const schedule = getSchedule(text);
    if (schedule) {
      air(`……${schedule}だよ。`);
      noel("忘れなくてえらいね。");
      return;
    }

    // 雑談
    if (isChat(text)) {
      air("……無理しなくていい。");
      noel("少し話せたらそれで十分。");
      return;
    }

    // 何でもない入力
    air("……うん、聞いてる。");
  }

  /* =========================
     自動2人会話（沈黙）
  ========================= */
  function autoTalk() {
    const now = Date.now();
    if (now - memory.short.lastTalkTime < 6000) return;

    if (memory.short.lastSpeaker === "air") {
      noel("今日はここまででもいいよ。");
    } else {
      air("……無事に終わった。それでいい。");
    }
  }

  setInterval(autoTalk, 2000);

  /* =========================
     イベント
  ========================= */
  send.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    handleUser(text);
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") send.click();
  });

  /* =========================
     初期メッセージ
  ========================= */
  air("……ここにいる。");
  noel("いつでも話しかけて。");
});
