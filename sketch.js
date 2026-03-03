//I did take help of ai with the classes and overall sketch since my game had some extra features.
var restartButton;
var sceneGame;
var sceneIntro;
var currentScene;

var finalScore = 0;
var finalTime = 0;
var highScore = 0;

// End screen images
var endPageImg;
var restartBtnImg;
var endCarrotImg;

// Tracks restart button
var endScreen = { btnX: 0, btnY: 0, btnW: 0, btnH: 0 };

function preload() {
  endPageImg = loadImage("endpage.png");
  restartBtnImg = loadImage("restartbutton.png");
  endCarrotImg = loadImage("carrot.png");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CORNER);

  sceneIntro = new intro();
  sceneIntro.setImage("startpagebg.png");

  sceneGame = new game();

  restartButton = new Button(width / 2, 625);
  restartButton.setImage("startbutton.png");
  restartButton.addListener(startGame);

  currentScene = "intro";
}

function startGame() {
  sceneGame.activate();
  currentScene = "game";
}

function draw() {
  background(250);

  if (currentScene == "intro") {
    sceneIntro.display();
    restartButton.draw();
  }

  if (currentScene == "game") {
    sceneGame.display();
  }

  if (currentScene == "end") {
    drawEndScreen();
  }
}

function drawEndScreen() {
  //end page img
  image(endPageImg, 0, 0, width, height);

  let cx = width / 2; // 400

  // Carrots Collected Score
  push();
  imageMode(CENTER);
  image(endCarrotImg, cx - 95, 248, 40, 40); // carrot icon left of label
  textAlign(LEFT, CENTER);
  textSize(26);
  fill(255);
  noStroke();
  textStyle(NORMAL);
  text("Carrots Collected", cx - 70, 248);

  // Score
  textAlign(CENTER, CENTER);
  textSize(46);
  fill("#F79393");
  textStyle(BOLD);
  text(finalScore, cx, 308);
  pop();

  // Survival Time
  push();
  textAlign(LEFT, CENTER);
  textSize(26);
  fill(255);
  noStroke();
  textStyle(NORMAL);
  text("⏱  Survival Time", cx - 95, 385);

  let m = floor(finalTime / 60);
  let s = floor(finalTime % 60);
  let timeStr = nf(m, 2) + ":" + nf(s, 2);

  textAlign(CENTER, CENTER);
  textSize(46);
  fill("#F79393");
  textStyle(BOLD);
  text(timeStr, cx, 445);
  pop();

  // High Score
  if (finalScore > highScore) highScore = finalScore;
  push();
  textAlign(LEFT, CENTER);
  textSize(26);
  fill(255);
  noStroke();
  textStyle(NORMAL);
  text("🏆  High Score", cx - 95, 518);

  textAlign(CENTER, CENTER);
  textSize(46);
  fill("#F79393");
  textStyle(BOLD);
  text(highScore, cx, 578);
  pop();

  // Restart Button
  let btnW = 190;
  let btnH = 60;
  let btnX = cx - btnW / 2;
  let btnY = 638;

  push();
  imageMode(CORNER);
  image(restartBtnImg, btnX, btnY, btnW, btnH);
  pop();

  // mousepressed click detection
  endScreen.btnX = btnX;
  endScreen.btnY = btnY;
  endScreen.btnW = btnW;
  endScreen.btnH = btnH;
}

// Restart button click
function mousePressed() {
  if (currentScene === "end") {
    if (
      mouseX > endScreen.btnX &&
      mouseX < endScreen.btnX + endScreen.btnW &&
      mouseY > endScreen.btnY &&
      mouseY < endScreen.btnY + endScreen.btnH
    ) {
      doRestart();
    }
  }
}

function doRestart() {
  // Disable old player so bunny image element is removed
  if (sceneGame && sceneGame.player) {
    sceneGame.deactivate();
  }
  // Reset end screen tracking values
  finalScore = 0;
  finalTime = 0;
  // Fresh game, activate immediately
  sceneGame = new game();
  sceneGame.activate();
  currentScene = "game";
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("week3-assignment-jpg");
  }
  if (key === "r" || key === "R") {
    if (currentScene === "end" || currentScene === "game") {
      doRestart();
    }
  }
}
