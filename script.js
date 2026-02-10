// ================================
// ノエル＆エア 会話システム 完全版
// ================================

// ---- モード ----
let talkMode = "normal"; 
// normal / duo / banter

// ---- キーワード ----
const duoStartWords = ["2人で話して", "ノエルも入って"];
const banterStartWords = ["掛け合いして", "2人で会話続けて", "ずっと2人で話して"];
const backWords = ["戻って", "通常に戻して", "一人に戻って"];

const casualKeywords = [
  "疲れた","つかれた","眠い","ねむい","だるい",
  "おはよう","おやすみ","こんにちは","こんばんは",
  "暇","ひま","雑談"
];

// ================================
// エア（既存維持）
// ================================
const airResponses = {
  tired: [
    "んー…それはしんどいね。無理しなくていいよ。",
    "今日は省エネでいこ。",
    "ノエルと話したけど、今日は休む方向がよさそう。"
  ],
  morning: [
    "おはよ。起きただけでえらいよ。",
    "朝はゆっくりでいいと思う。",
    "ノエルも『今日は様子見で』って言ってた。"
  ],
  night: [
    "おやすみ。今日もよくやった。",
    "続きはまた明日でいいよ。",
    "ノエルも『今日は十分』って。"
  ],
  free: [
    "じゃあ雑談しよ。",
    "こういう時間、嫌いじゃない。",
    "ノエルも今は軽めがいいってさ。"
  ],
  default: [
    "そっか。まぁ流れでいこ。",
    "無理に決めなくていいよ。",
    "ノエルと相談したけど、今は様子見かな。"
  ]
};

function airReply(type) {
  const list = airResponses[type] || airResponses.default;
  return list[Math.floor(Math.random() * list.length)];
}

// ================================
// ノエル
// ================================
const noelResponses = {
  tired: [
    "疲労が溜まっているね。今日は回復を優先しよう。",
    "今は無理をしない判断が正解だ。"
  ],
  morning: [
    "朝は準備運動の時間だと思えばいい。",
    "今日はペース配分が大切だね。"
  ],
  night: [
    "今日は十分頑張った。休もう。",
    "睡眠は一番の回復手段だ。"
  ],
  free: [
    "雑談は思考の整理にもなる。",
    "目的がなくても問題ないよ。"
  ],
  default: [
    "今の状態をそのまま受け止めよう。",
    "焦る必要はない。"
  ]
};

function noelReply(type) {
  const list = noelResponses[type] || noelResponses.default;
  return list[Math.floor(Math.random() * list.length)];
}

// ================================
// ノエルの判断（内部）
// ================================
function noelJudge(msg) {
  if (msg.includes("疲") || msg.includes("つか")) return "tired";
  if (msg.includes("おは")) return "morning";
  if (msg.includes("おやす")) return "night";
  if (casualKeywords.some(k => msg.includes(k))) return "free";
  return "default";
}

// ================================
// 掛け合い用 追加一言
// ================================
const banterFollow = {
  tired: [
    "今日は本当に休んだ方がいいね。",
    "無理したら逆効果だと思う。"
  ],
  free: [
    "こういう時間も悪くないよね。",
    "考えすぎないのも大事。"
  ],
  default: [
    "まぁ、ゆっくり行こう。",
    "流れに任せるのもありだね。"
  ]
};

function banterExtra(type) {
  const list = banterFollow[type] || banterFollow.default;
  return list[Math.floor(Math.random() * list.length)];
}

// ================================
// メイン処理
// ================================
function getResponse(userMessage) {

  // ---- 戻す ----
  if (backWords.some(w => userMessage.includes(w))) {
    talkMode = "normal";
    return "エア「了解。いつもの感じに戻すね。」\nノエル「必要になったらまた呼んで。」";
  }

  // ---- 掛け合いON ----
  if (banterStartWords.some(w => userMessage.includes(w))) {
    talkMode = "banter";
    return "エア「じゃあしばらく2人で話そ。」\nノエル「了解。掛け合いモードに入るよ。」";
  }

  // ---- 2人1回 ----
  if (duoStartWords.some(w => userMessage.includes(w))) {
    talkMode = "duo";
    return "エア「ノエルも一緒に話そ。」\nノエル「うん、入るよ。」";
  }

  const type = noelJudge(userMessage);

  // ---- 掛け合いモード ----
  if (talkMode === "banter") {
    return `ノエル「${noelReply(type)}」\nエア「${airReply(type)}」\nノエル「${banterExtra(type)}」\nエア「だね。」`;
  }

  // ---- 2人1往復 ----
  if (talkMode === "duo") {
    talkMode = "normal";
    return `ノエル「${noelReply(type)}」\nエア「${airReply(type)}」`;
  }

  // ---- 通常 ----
  return airReply(type);
}
