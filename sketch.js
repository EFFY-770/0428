let capture;
let overlayGraphics;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  background('#bde0fe'); // 柔和的背景色

  // 初始化攝影機捕捉
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide();

  // 初始化createGraphics
  overlayGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  overlayGraphics.background(0); // 黑色背景
}

function draw() {
  background('#bde0fe'); // 柔和的背景色

  // 更新 overlayGraphics 的內容
  overlayGraphics.background(0); // 黑色背景
  for (let x = 0; x < overlayGraphics.width; x += 20) {
    for (let y = 0; y < overlayGraphics.height; y += 20) {
      // 從 capture 中取樣顏色
      let col = capture.get(x, y);

      // 調整顏色的亮度，讓配色更柔和
      let r = red(col) * 0.8 + 50;
      let g = green(col) * 0.8 + 50;
      let b = blue(col) * 0.8 + 50;

      overlayGraphics.fill(r, g, b);
      overlayGraphics.noStroke();
      overlayGraphics.ellipse(x + 10, y + 10, 15, 15); // 圓形大小為 15
    }
  }

  // 顯示 createGraphics 內容在視訊下方
  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(overlayGraphics, 0, 0);
  pop();

  // 水平翻轉攝影機畫面並顯示在最上層
  push();
  translate(width / 2, height / 2);
  scale(-1, 1); // 水平翻轉
  imageMode(CENTER);
  image(capture, 0, 0, windowWidth * 0.8, windowHeight * 0.8);
  pop();
}

function windowResized() {
  // 當視窗大小改變時調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 調整 createGraphics 大小
  overlayGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  overlayGraphics.background(0); // 黑色背景
}
