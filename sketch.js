let capture;
let videoGraphics;
let topVideoGraphics; // 用於顯示在上方的 Graphics 物件

function setup() {
  createCanvas(windowWidth, windowHeight); // 建立全螢幕畫布
  background(255, 182, 193); // 設定背景顏色為淡粉色 (RGB: 255, 182, 193)

  // 初始化攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 建立 Graphics 物件來繪製視訊畫面
  videoGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  topVideoGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8); // 用於顯示在上方的畫面
}

function draw() {
  background(255, 182, 193); // 確保背景保持淡粉色

  // 在 Graphics 物件上繪製攝影機影像，並進行水平翻轉
  videoGraphics.push();
  videoGraphics.translate(videoGraphics.width, 0); // 將原點移到右側
  videoGraphics.scale(-1, 1); // 水平翻轉
  videoGraphics.image(capture, 0, 0, videoGraphics.width, videoGraphics.height);
  videoGraphics.pop();

  // 在 topVideoGraphics 上繪製圓形，背景設為黑色
  topVideoGraphics.background(0); // 設定背景為黑色
  for (let x = 0; x < topVideoGraphics.width; x += 20) {
    for (let y = 0; y < topVideoGraphics.height; y += 20) {
      // 從 capture 中取樣顏色
      let col = capture.get(x, y);
      topVideoGraphics.fill(col); // 設定圓形顏色
      topVideoGraphics.noStroke();
      topVideoGraphics.ellipse(x + 10, y + 10, 15, 15); // 繪製圓形，置於單位格中心
    }
  }

  // 計算影像顯示位置，讓影像置中
  let x = (windowWidth - videoGraphics.width) / 2;
  let y = (windowHeight - videoGraphics.height) / 2;

  // 顯示 Graphics 物件的內容，兩者重疊
  image(videoGraphics, x, y, videoGraphics.width, videoGraphics.height); // 顯示在畫面中間
  image(topVideoGraphics, x, y, topVideoGraphics.width, topVideoGraphics.height); // 顯示在相同位置
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
  videoGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8); // 更新 Graphics 大小
  topVideoGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8); // 更新上方 Graphics 大小
}
