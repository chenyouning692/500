// Hand Pose Painting with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let painting;
let px = 0;
let py = 0;
let targetX, targetY; // 目標點座標
let score = 0; // 玩家得分
let timer = 60; // 遊戲時間（秒）

function preload() {
  // Initialize HandPose model without flipped video input
  handPose = ml5.handPose(video, { flipped: false }, modelReady);
}

function modelReady() {
  console.log("HandPose model loaded!");
  handPose.on('predict', gotHands); // Listen for predictions
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);

  // Create an off-screen graphics buffer for painting
  painting = createGraphics(640, 480);
  painting.clear();

  // Capture video without flipping
  video = createCapture(VIDEO, { flipped: false });
  video.hide();

  // 初始化目標點
  generateTarget();

  // 設定計時器
  setInterval(() => {
    if (timer > 0) timer--;
  }, 1000);
}

function draw() {
  // 顯示攝影機影像
  image(video, 0, 0);

  // 確保至少一隻手被偵測到
  if (hands.length > 0) {
    let hand = hands[0]; // 偵測到的第一隻手
    let index = hand.landmarks[8]; // 食指尖端座標

    if (index) {
      let x = index[0]; // 食指的 x 座標
      let y = index[1]; // 食指的 y 座標

      // 在食指位置生成紅點S     fill(255, 0, 0); // 紅色
      noStroke();
      ellipse(x, y, 20, 20); // 根據食指座標繪製紅點
    }
  }

  // 繪製玩家得分與剩餘時間
  fill(255);
  textSize(24);
  text(`Score: ${score}`, 10, 30);
  text(`Time: ${timer}s`, 10, 60);

  // 遊戲結束邏輯
  if (timer === 0) {
    noLoop(); // 停止繪製
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`Game Over! Your Score: ${score}`, width / 2, height / 2);
  }
}

// 隨機生成目標點
function generateTarget() {
  targetX = random(20, width - 20);
  targetY = random(20, height - 20);
}

// Add a form to the HTML
const formHTML = `
<form>
  <label for="username">Username:</label>
  <input type="text" id="username" name="username">
</form>
`;
document.body.insertAdjacentHTML('beforeend', formHTML);
