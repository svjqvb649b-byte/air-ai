document.addEventListener("DOMContentLoaded", () => {
  const noelLog = document.getElementById("noelLog");
  const airLog = document.getElementById("airLog");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  /* ===== 表示共通 ===== */
  function addLog(target, speaker, text) {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = `${speaker}：${text}`;
    target.appendChild(div);
    target.scrollTop = target.scrollHeight;
  }

  /* ===== ノエル：整理・判断役 ===== */
  function noelThink(text) {
    if (text.includes("疲れた")) {
      return "今日は相当エネルギー使ったみたいだね。無理しない判断が一番だよ。";
    }
    if (text.includes("眠い") || text.includes("寝る")) {
      return "睡眠は一番の回復手段だ。今日はここで区切ろう。";
    }
    if (text.includes("テスト")) {
      return "テストお疲れさま。結果より、ちゃんと向き合ったことが大事だよ。";
    }
    if (text.includes("おはよう")) {
      return "おはよう。今日は無理にペースを上げなくていい。";
    }
    if (text.includes("おやすみ")) {
      return "おやすみ。今日を終えるにはちょうどいいタイミングだね。";
    }
    return "うん、その話題いいね。少し整理しながら考えよう。";
  }

  /* ===== エア：シエスタ寄り相棒 ===== */
  function airThink(text) {
    if (text.includes("疲れた")) {
      return "それはもう十分やった証拠だよ。今日は省エネでいこ。";
    }
    if (text.includes("眠い") || text.includes("寝る")) {
      return "んー…それはもう寝よって合図だと思う。";
    }
    if (text.includes("テスト")) {
      return "テストかぁ。とりあえず終わったなら今日は勝ちでしょ。";
    }
    if (text.includes("おはよう")) {
      return "おはよ。起きただけで今日は合格だよ。";
    }
    if (text.includes("おやすみ")) {
      return "おやすみ。今日はここまでで十分。";
    }
    return "まあまあ、今は深く考えなくていいんじゃない？";
  }

  /* ===== 相談して返す ===== */
  function consultAndReply(text) {
    const noelReply = noelThink(text);
    const airReply = airThink(text);

    addLog(noelLog, "ノエル", noelReply);
    addLog(airLog, "エア", airReply);
  }

  /* ===== 送信処理 ===== */
  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // ユーザー入力を両方に表示
    addLog(noelLog, "あなた", text);
    addLog(airLog, "あなた", text);

    consultAndReply(text);
    userInput.value = "";
  }

  /* ===== イベント ===== */
  sendBtn.addEventListener("click", sendMessage);

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});
