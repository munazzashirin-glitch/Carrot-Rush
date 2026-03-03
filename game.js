//did take help of ai here
class game {
  constructor() {
    // Background 
    this.bgImg = loadImage("skybg.png");

    // Load images once 
    this.carrotImg    = loadImage("carrot.png");
    this.heartImg     = loadImage("heart.png");
    this.bananaImg    = loadImage("banana.png");
    this.bottleImg    = loadImage("bottle.png");
    this.fishboneImg  = loadImage("fishbone.png");

    this.badImgs = [this.bananaImg, this.bottleImg, this.fishboneImg];

    // Player 
    this.player = new Player("bunny.png", width / 2 - 55, height - 160);
    this.player.setSize(110, 110);
    this.player.setSpeed(6);
    this.player.disable();

    // Falling Items 
    this.items = [];
    for (let i = 0; i < 8; i++) {
      let item = new FallingItem("good", this.carrotImg);
      //start positions so they don't all appear at once
      item.y = random(-800, -50);
      this.items.push(item);
    }
    for (let i = 0; i < 9; i++) {
      let badImg = this.badImgs[floor(random(this.badImgs.length))];
      let item = new FallingItem("bad", badImg);
      item.y = random(-800, -50);
      this.items.push(item);
    }

    // State 
    this.score     = 0;
    this.lives     = 3;
    this.gameOver  = false;
    this.started   = false;

    // timer
    this.timer = new Timer();
    this.timer.setCountDown(60);
  }

  // Call this when switching TO game scene
  activate() {
    this.player.enable();
    this.timer.start();
    this.started = true;
  }

  // Call this when leaving game scene
  deactivate() {
    this.player.disable();
  }

  display() {
    // Background
    if (this.bgImg) {
      image(this.bgImg, 0, 0, width, height);
    } else {
      background("#87CEEB");
    }

    // Trigger end
    if (this.gameOver) {
      finalScore    = this.score;
      finalTime     = this.getElapsedTime();
      this.deactivate();
      currentScene  = "end";
      return;
    }

    // Update timer
    this.timer.update();
    if (this.timer.isFinished || this.lives <= 0) {
      this.gameOver = true;
      return;
    }

    // Falling items
    for (let item of this.items) {
      item.update();
      item.draw();

      if (item.hits(this.player)) {
        if (item.type === "good") {
          this.score++;
        } else {
          this.lives = max(0, this.lives - 1);
        }
        item.reset();
        item.y = random(-400, -50);
      }
    }

    // Player
    this.player.draw();

    // UI 
    this.drawScore();
    this.drawHearts();
    this.drawTimer();
  }

  drawScore() {
    push();
    imageMode(CORNER);
    image(this.carrotImg, 16, 12, 42, 42);
    textAlign(LEFT, CENTER);
    textSize(34);
    fill("#2e7d32");
    stroke(255);
    strokeWeight(4);
    textStyle(BOLD);
    text(this.score, 68, 34);
    pop();
  }

  drawHearts() {
    push();
    imageMode(CORNER);
    let heartSize = 44;
    let gap       = 10;
    let startX    = width - 3 * (heartSize + gap) - 10;

    for (let i = 0; i < 3; i++) {
      let hx = startX + i * (heartSize + gap);
      let hy = 10;
      if (i < this.lives) {
        // Full heart — bright red tint
        tint(220, 50, 50, 255);
      } else {
        // Lost heart — faded/hollow look
        tint(200, 200, 200, 90);
      }
      image(this.heartImg, hx, hy, heartSize, heartSize);
    }
    noTint();
    pop();
  }

  drawTimer() {
    push();
    const elapsed   = this.timer.isRunning
      ? (millis() - this.timer.startTime) / 1000
      : 0;
    const remaining = max(0, this.timer.countDown - elapsed);

    // Format as 00:00
    const m   = floor(remaining / 60);
    const s   = ceil(remaining % 60);
    const str = nf(m, 2) + ":" + nf(s === 60 ? 59 : s, 2);

    textAlign(LEFT, BOTTOM);
    textSize(38);
    fill("#FFD700");
    stroke("#7a5200");
    strokeWeight(4);
    textStyle(BOLD);
    text(str, 18, height - 14);
    pop();
  }

  getElapsedTime() {
    if (!this.timer.startTime) return 0;
    return min(60, (millis() - this.timer.startTime) / 1000);
  }

  getScore() {
    return this.score;
  }
}