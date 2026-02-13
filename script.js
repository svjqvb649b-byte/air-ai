document.addEventListener("DOMContentLoaded", () => {

  const noelLog = document.getElementById("noelLog");
  const airLog = document.getElementById("airLog");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  let kaiwaMode = false; // 掛け合いモードON/OFF

  /* ===== 共通表示 ===== */
  function addLog(target, speaker, text) {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = `${speaker}: ${text}`;
    target.appendChild(div);
    target.scrollTop = target.scrollHeight;
  }

  /* ===== 感謝判定 ===== */
  function isThankYou(text) {
    const words = ["ありがとう", "有難う", "サンキュー", "thanks", "thx", "感謝"];
    const lower = text.toLowerCase();
    return words.some(w => lower.includes(w));
  }

  /* ===== ノエル ===== */
  function noelThink(text) {

    if (text.includes("疲れた")) {
      return "今日はだいぶエネルギー使ったね。無理しないで。";
    }

    if (text.includes("眠い") || text.includes("寝る")) {
      return "今日はここで区切ろう。回復を優先して。";
    }

    if (text.includes("テスト")) {
      return "テストお疲れさま。向き合った事実はちゃんと価値がある。";
    }

    if (text.includes("おはよう")) {
      return "おはよう。今日はゆっくり立ち上がろう。";
    }

    if (text.includes("おやすみ")) {
      return "おやすみ。今日を終えるにはいいタイミングだね。";
    }

    if (isThankYou(text)) {
      return "そう言ってもらえるのが一番嬉しい。こちらこそありがとう。";
    }

    return "うん、その話題いいね。少し整理しながら考えよう。";
  }

  /* ===== エア（シエスタ風に調整） ===== */
  function airThink(text) {

    if (text.includes("疲れた")) {
      return "それは分かりきったことだよ。今日は十分やった。";
    }

    if (text.includes("眠い") || text.includes("寝る")) {
      return "んー…それはもう寝ろって合図だと思う。";
    }

    if (text.includes("テスト")) {
      return "終わったなら今日は勝ちでしょ。細かいことは明日。";
    }

    if (text.includes("おはよう")) {
      return "おはよ。起きただけで今日は合格。";
    }

    if (text.includes("おやすみ")) {
      return "おやすみ。今日はここまでで十分。";
    }

    // ⭐ シエスタ風 感謝対応
    if (isThankYou(text)) {
      return "……ふふ。律儀だね。でも嫌いじゃないよ。";
    }

    return "まあまあ、今は深く考えなくていいんじゃない？";
  }

  /* ===== 掛け合い用 ===== */
  function kaiwaSequence() {
    if (!kaiwaMode) return;

    setTimeout(() => {
      addLog(noelLog, "ノエル", "少し静かな時間も必要だよ。");
      addLog(airLog, "エア", "こういう間、嫌いじゃない。");

      setTimeout(() => {
        addLog(noelLog, "ノエル", "考えすぎないでいい。");
        addLog(airLog, "エア", "でしょ。今日はもう十分。");
      }, 1200);

    }, 800);
  }

  /* ===== 相談して返す ===== */
  function consultAndReply(text) {

    const noelReply = noelThink(text);
    const airReply = airThink(text);

    addLog(noelLog, "ノエル", noelReply);
    addLog(airLog, "エア", airReply);

    // ⭐ 感謝時の掛け合い（シエスタ風微調整）
    if (isThankYou(text)) {
      setTimeout(() => {
        addLog(noelLog, "ノエル", "ちゃんと伝えてくれる人は信頼できる。");
        addLog(airLog, "エア", "感謝を口にできるのは、案外強さだよ。");

        setTimeout(() => {
          addLog(noelLog, "ノエル", "これからも一緒に整えていこう。");
          addLog(airLog, "エア", "……まあ、君なら悪くない相棒だ。");
        }, 1200);
      }, 900);
    }
  }

  /* ===== 送信処理 ===== */
  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addLog(noelLog, "あなた", text);
    addLog(airLog, "あなた", text);

    if (text.includes("掛け合い")) {
      kaiwaMode = true;
      addLog(noelLog, "ノエル", "了解。少し二人で話そう。");
      addLog(airLog, "エア", "任せて。少し付き合うよ。");
      kaiwaSequence();
    } 
    else if (text.includes("やめ")) {
      kaiwaMode = false;
      addLog(noelLog, "ノエル", "掛け合いモードを終了するね。");
      addLog(airLog, "エア", "また気が向いたら呼んで。");
    } 
    else {
      consultAndReply(text);
    }

    userInput.value = "";
  }

  /* ===== イベント ===== */
  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

});
