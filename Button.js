class Button {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.image = null;
    this.scale = 1;
    this.listeners = [];
    this.isPressed = false;
    this.isEnabled = true;
    this.opacity = 255; // Full opacity by default

    // Add event listeners
    this.addEventListeners();
  }
  
  async setImage(imagePath) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Create a p5.js compatible image
        const p5Img = createImage(img.width, img.height);
        p5Img.drawingContext.drawImage(img, 0, 0);

        this.image = p5Img;
        this.width = img.width;
        this.height = img.height;
        resolve();
      };
      img.onerror = reject;
      img.src = imagePath;
    });
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  isMouseOver() {
    return (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + (this.width / 2) * this.scale &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + (this.height / 2) * this.scale
    );
  }
  handlePress() {
    if (this.isEnabled && this.isMouseOver()) {
      this.isPressed = true;
      this.scale = 0.9;
    }
  }

  handleRelease() {
    if (this.isEnabled && this.isPressed) {
      this.isPressed = false;
      this.scale = 1;
      if (this.isMouseOver()) {
        this.dispatch();
      }
    }
  }

  dispatch() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  draw() {
    push();
    translate(this.x, this.y);
    scale(this.scale);
    if (this.image) {
      tint(255, this.opacity); // Apply opacity
      imageMode(CENTER);
      image(this.image, 0, 0);
    } else {
      rectMode(CENTER);
      fill(255, this.opacity);
      rect(0, 0, this.width, this.height);
    }
    pop();
  }
  enable() {
    this.isEnabled = true;
    this.opacity = 255;
    this.addEventListeners();
  }

  disable() {
    this.isEnabled = false;
    this.opacity = 100; // 90% opacity (255 * 0.9 ≈ 229)
    this.removeEventListeners();
  }

  addEventListeners() {
    this.handlePress = this.handlePress.bind(this);
    this.handleRelease = this.handleRelease.bind(this);

    // Mouse events
    window.addEventListener("mousedown", this.handlePress);
    window.addEventListener("mouseup", this.handleRelease);

    // Touch events
    window.addEventListener("touchstart", this.handlePress);
    window.addEventListener("touchend", this.handleRelease);
  }

  removeEventListeners() {
    // Mouse events
    window.removeEventListener("mousedown", this.handlePress);
    window.removeEventListener("mouseup", this.handleRelease);

    // Touch events
    window.removeEventListener("touchstart", this.handlePress);
    window.removeEventListener("touchend", this.handleRelease);
  }
}