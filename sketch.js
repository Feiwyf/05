let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 建立全螢幕畫布
  background(255, 182, 193); // 設定背景顏色為淡粉色 (RGB: 255, 182, 193)

  // 初始化攝影機
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素
}

function draw() {
  background(255, 182, 193); // 確保背景保持淡粉色

  // 計算影像顯示位置，讓影像置中
  let x = (windowWidth - capture.width) / 2;
  let y = (windowHeight - capture.height) / 2;

  // 翻轉畫布
  push(); // 儲存當前畫布狀態
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, x, y, capture.width, capture.height); // 繪製翻轉後的影像
  pop(); // 恢復畫布狀態
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
}
