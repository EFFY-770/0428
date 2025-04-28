let capture;
let overlayGraphics;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  background('#dde5b6'); // 設定背景顏色為 #dde5b6

  // 初始化攝影機捕捉
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide();

  // 初始化 createGraphics
  overlayGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  overlayGraphics.background(0); // 黑色背景
}

function draw() {
  background('#dde5b6'); // 設定背景顏色為 #dde5b6

  // 更新 overlayGraphics 的內容
  overlayGraphics.background(0); // 黑色背景
  for (let x = 0; x < overlayGraphics.width; x += 20) {
    for (let y = 0; y < overlayGraphics.height; y += 20) {
      // 從 capture 中取樣顏色
      let col = capture.get(x, y);

      // 計算灰階顏色
      let gray = (red(col) + green(col) + blue(col)) / 3;

      // 設定方框顏色（保留 G 值，R 和 B 為 0）
      let g = green(col);
      overlayGraphics.fill(0, g, 0);
      overlayGraphics.noStroke();
      overlayGraphics.rect(x + 1, y + 1, 18, 18); // 方框大小為 18

      // 設定圓的顏色為黑色
      overlayGraphics.fill(0);
      overlayGraphics.ellipse(x + 10, y + 10, 5, 5); // 圓形大小為 5
    }
  }

  // 顯示 createGraphics 內容在視訊上方
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
