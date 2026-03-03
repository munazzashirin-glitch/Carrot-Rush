class FallingItem {
  constructor(type, img) {
    this.type = type; // "good" or "bad"
    this.img = img;
    this.size = type === "good" ? 50 : 55;
    this.reset();
  }

  reset() {
    this.x = random(30, width - 30);
    this.y = random(-400, -50);
    this.speed = random(2, 5);
    this.collected = false;
  }

  update() {
    this.y += this.speed;
    if (this.y > height + 60) {
      this.reset();
    }
  }

  draw() {
    if (!this.collected) {
      push();
      imageMode(CENTER);
      image(this.img, this.x, this.y, this.size, this.size);
      pop();
    }
  }

  hits(player) {
    if (this.collected) return false;
    let px = player.x + player.width / 2;
    let py = player.y + player.height / 2;
    let d = dist(this.x, this.y, px, py);
    return d < (this.size / 2 + player.width / 2 - 10);
  }
}