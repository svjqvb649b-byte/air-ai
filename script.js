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
    div.textContent = `${speaker}：${text}`;
    target.appendChild(div);
    target.scrollTop = target.scrollHeight;
  }

  /* ===== ノエル ===== */
  function noelThink(text) {
    if (text.includes("疲れた")) {
      return "今日はだいぶエネルギー使ったね。無理しない選択でいい。";
    }
    if (text.includes("眠い") || text.includes("寝る")) {
      return "今日はここで区切ろう。回復を優先して。";
    }
    if (text.includes("テスト")) {
      return "テストお疲れさま。向き合った事実はちゃんと残ってる。";
    }
    if (text.includes("おはよう")) {
      return "おはよう。今日はゆっくり立ち上がろう。";
    }
    if (text.includes("おやすみ")) {
      return "おやすみ。今日を終えるにはいいタイミングだ。";
    }
    return "うん、その話題いいね。少し整理しながら考えよう。";
  }

  /* ===== エア（シエスタ寄り） ===== */
  function airThink(text) {
    if (text.includes("疲れた")) {
      return "それはもう十分やったってことだよ。今日は省エネで。";
    }
    if (text.includes("眠い") || text.includes("寝る")) {
      return "んー…それはもう寝よって合図だと思う。";
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
    return "まあまあ、今は深く考えなくていいんじゃない？";
  }

  /* ===== 掛け合い用 ===== */
  function kaiwaSequence() {
    if (!kaiwaMode) return;

    setTimeout(() => {
      addLog(noelLog, "ノエル", "少し静かな時間だね。");
      addLog(airLog, "エア", "こういう間、嫌いじゃないよ。");

      setTimeout(() => {
        addLog(noelLog, "ノエル", "考えすぎないのも、大事だ。");
        addLog(airLog, "エア", "でしょ。今日はそれでいい。");
      }, 1200);
    }, 800);
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

    addLog(noelLog, "あなた", text);
    addLog(airLog, "あなた", text);

    // 掛け合いモード切替
    if (text.includes("掛け合い")) {
      kaiwaMode = true;
      addLog(noelLog, "ノエル", "了解。少し二人で話そう。");
      addLog(airLog, "エア", "じゃあ任せて。");
      kaiwaSequence();
    } else if (text.includes("やめ")) {
      kaiwaMode = false;
      addLog(noelLog, "ノエル", "掛け合いモードを終了するね。");
      addLog(airLog, "エア", "また気が向いたら呼んで。");
    } else {
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
