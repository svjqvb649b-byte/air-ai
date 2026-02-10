// ================================
// ノエル＆エア 会話システム
// ================================

// ---- モード管理 ----
let duoTalkMode = false;

// ---- キーワード ----
const duoKeywords = [
  "2人で話して",
  "ふたりで話して",
  "ノエルも入って",
  "二人で",
  "2人とも"
];

const casualKeywords = [
  "疲れた", "つかれた", "眠い", "ねむい", "だるい",
  "おはよう", "おやすみ", "こんばんは", "こんにちは",
  "暇", "ひま", "なんとなく", "雑談"
];

// ================================
// エア（既存・完全維持）
// ================================
const airResponses = {
  tired: [
    "んー…それはしんどいね。無理しなくていいよ。",
    "そっかぁ。今日は省エネでいこ。",
    "ノエルとも話したけど、今日は休憩寄りがよさそうだね。"
  ],
  morning: [
    "おはよ。ちゃんと起きられただけでえらいよ。",
    "おはよう。まだ頭起きてない感じ？",
    "ノエルと相談したけど、今日はゆっくりスタートでいいみたい。"
  ],
  night: [
    "おやすみ。今日もよくやったよ。",
    "もう休も。続きはまた明日でいい。",
    "ノエルも『今日はここまでで正解』って言ってた。"
  ],
  free: [
    "んー、特に用事ないなら雑談しよ。",
    "こういう時間も悪くないよね。",
    "ノエルも『今は何も決めなくていい』ってさ。"
  ],
  default: [
    "そっか。まぁ、気楽にいこ。",
    "無理に話さなくてもいいよ。",
    "ノエルとちょっと相談したけど、今は流れに任せよ。"
  ]
};

function airReply(type) {
  const list = airResponses[type] || airResponses.default;
  return list[Math.floor(Math.random() * list.length)];
}

// ================================
// ノエル（表でも話す）
// ================================
const noelResponses = {
  tired: [
    "無理を続けるより、今日は回復を優先した方が良さそうだね。",
    "疲労が溜まってるなら、効率は考えなくていいよ。"
  ],
  morning: [
    "朝は調子が出るまで時間がかかるものだよ。",
    "今日はペース配分を意識しよう。"
  ],
  night: [
    "十分頑張ったと思う。休息は必要だ。",
    "睡眠は明日のパフォーマンスに直結するよ。"
  ],
  free: [
    "雑談も大事な時間だと思う。",
    "特に目的がなくても問題ないよ。"
  ],
  default: [
    "今の状態をそのまま受け止めよう。",
    "焦らなくて大丈夫だ。"
  ]
};

function noelReply(type) {
  const list = noelResponses[type] || noelResponses.default;
  return list[Math.floor(Math.random() * list.length)];
}

// ================================
// ノエルの判断（内部）
// ================================
function noelJudge(message) {
  if (message.includes("疲") || message.includes("つか")) return "tired";
  if (message.includes("おは")) return "morning";
  if (message.includes("おやすみ")) return "night";
  if (casualKeywords.some(k => message.includes(k))) return "free";
  return "default";
}

// ================================
// メイン返答
// ================================
function getResponse(userMessage) {

  // --- 2人会話モード切替 ---
  if (duoKeywords.some(k => userMessage.includes(k))) {
    duoTalkMode = true;
    return "エア「じゃあノエルも一緒に話そ。」\nノエル「了解。2人で話そう。」";
  }

  const type = noelJudge(userMessage);

  // --- 2人会話モード ---
  if (duoTalkMode) {
    const noel = noelReply(type);
    const air = airReply(type);

    return `ノエル「${noel}」\nエア「${air}」`;
  }

  // --- 通常（エアのみ） ---
  return airReply(type);
}
