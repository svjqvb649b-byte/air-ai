const airImg = document.getElementById("airImg");
const noelImg = document.getElementById("noelImg");
const log = document.getElementById("log");
const textInput = document.getElementById("textInput");

let current = "noel";
let memory = [];

const schedule = {
  "月": ["数学Ⅰ","英語コミュ","体育","言語文化","家庭基礎","音楽Ⅰ"],
  "火": ["英語コミュ","現代の国語","数学Ⅰ","保健","公共","総合"],
  "水": ["英語コミュ","科学と人間生活","言語文化","歴史総合","体育","LHR"],
  "木": ["音楽Ⅰ","科学と人間生活","情報Ⅰ","家庭基礎","体育","数学Ⅰ"],
  "金": ["公共","数学Ⅰ","英語コミュ","歴史総合","現代の国語","情報Ⅰ"]
};

function addLog(name, text) {
  log.innerHTML += `<div><b>${name}:</b> ${text}</div>`;
  log.scrollTop = log.scrollHeight;
  memory.push(text);
  if (memory.length > 6) memory.shift();
}

function setFace(who, state) {
  const img = who === "air" ? airImg : noelImg;
  img.src = `images/${who}/${who}_${state}.${who==="air"?"png":"jpg"}`;
}

function airTalk(text) {
  setFace("air","smile");
  addLog("air","……ふぁ。"+text+" まあ、悪くない判断。");
  setTimeout(()=>setFace("air","normal"),1500);
}

function noelTalk(text) {
  setFace("noel","smile");
  addLog("noel",text);
  setTimeout(()=>setFace("noel","normal"),1500);
}

function respond(input) {
  const day = new Date().getDay();
  if (input.includes("時間割")) {
    const key = ["日","月","火","水","木","金","土"][day];
    noelTalk(`今日は${key}曜日だよ。${schedule[key]?.join("、")}`);
    airTalk("今日は流れを覚えておくといい。");
    return;
  }

  if (input.match(/こんにちは|こんばんは/)) {
    noelTalk("こんにちは！今日も一緒に頑張ろ");
    airTalk("……挨拶は大事。");
    return;
  }

  noelTalk("うんうん、聞いてるよ");
  airTalk("……なるほどね");
}

document.getElementById("sendBtn").onclick = () => {
  const text = textInput.value;
  if (!text) return;
  addLog("you", text);
  textInput.value = "";
  respond(text);
};

document.getElementById("switchBtn").onclick = () => {
  current = current === "air" ? "noel" : "air";
  addLog("system", current+"に切り替えたよ");
};

document.getElementById("micBtn").onclick = () => {
  const rec = new webkitSpeechRecognition();
  rec.lang = "ja-JP";
  setFace(current,"thinking");

  rec.onresult = e => {
    const text = e.results[0][0].transcript;
    addLog("you", text);
    respond(text);
  };

  rec.onend = () => setFace(current,"normal");
  rec.start();
};

// 放置時の2人会話
setInterval(()=>{
  if (Math.random()<0.3) {
    airTalk("……少し静かすぎる。");
    noelTalk("じゃあ私が話そうか");
  }
},10000);
