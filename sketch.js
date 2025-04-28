let capture;
let overlayGraphics;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  background('#bde0fe');

  // 初始化攝影機捕捉
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide();

  // 初始化createGraphics
  overlayGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  overlayGraphics.background(255, 0, 0, 100); // 半透明紅色背景
}

function draw() {
  background('#bde0fe');

  // 水平翻轉攝影機畫面並顯示
  push();
  translate(width / 2, height / 2);
  scale(-1, 1); // 水平翻轉
  imageMode(CENTER);
  image(capture, 0, 0, windowWidth * 0.8, windowHeight * 0.8);
  pop();

  // 顯示createGraphics內容在視訊上方
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(overlayGraphics, 0, 0);
  pop();
}

function windowResized() {
  // 當視窗大小改變時調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 調整createGraphics大小
  overlayGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  overlayGraphics.background(255, 0, 0, 100); // 半透明紅色背景
}
