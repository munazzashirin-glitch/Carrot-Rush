class Player {
  constructor(_gifPath, _x, _y, _w = 0, _h = 0) {
    this.x = _x;
    this.y = _y;
    this.width = _w;
    this.height = _h;
    this.speed = 5;
    this.image = null;
    this.enabled = false;
    this.keys = {
      ArrowRight: false,
      ArrowLeft: false,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.setImage(_gifPath);
    this.enable();
  }

 
  getCanvasRect() {
    let c = document.querySelector("canvas");
    return c ? c.getBoundingClientRect() : { left: 0, top: 0, width: width, height: height, x: 0, y: 0 };
  }

  setImage(gifPath) {
    if (this.image) {
      this.image.remove();
    }
    this.image = createImg(gifPath, "");
    this.image.style("position", "fixed"); // ← fixed instead of absolute
    this.image.style("pointer-events", "none");
    this.image.style("z-index", "10");
    if (this.width && this.height) {
      this.setSize(this.width, this.height);
    }
  }

  setSize(w, h) {
    this.width = w;
    this.height = h;
    if (this.image) {
      this.image.size(w, h);
    }
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this._updateImagePosition();
  }

  
  _updateImagePosition() {
    if (!this.image) return;
    let rect = this.getCanvasRect();
   
    let scaleX = rect.width / width;
    let scaleY = rect.height / height;
    let screenX = rect.left + this.x * scaleX;
    let screenY = rect.top  + this.y * scaleY;
    this.image.position(screenX, screenY);
   
    this.image.size(this.width * scaleX, this.height * scaleY);
  }

  enable() {
    if (!this.enabled) {
      window.addEventListener("keydown", this.handleKeyDown);
      window.addEventListener("keyup", this.handleKeyUp);
      this.enabled = true;
      this.image.show();
    }
  }

  disable() {
    if (this.enabled) {
      window.removeEventListener("keydown", this.handleKeyDown);
      window.removeEventListener("keyup", this.handleKeyUp);
      this.enabled = false;
      this.image.hide();
    }
  }

  handleKeyDown(event) {
    if (this.keys.hasOwnProperty(event.key)) {
      this.keys[event.key] = true;
      event.preventDefault();
    }
  }

  handleKeyUp(event) {
    if (this.keys.hasOwnProperty(event.key)) {
      this.keys[event.key] = false;
      event.preventDefault();
    }
  }

  update() {
    if (!this.enabled) return;

    // Clamp movement to canvas logical bounds (0 to width)
    if (this.keys.ArrowRight) {
      this.x += this.speed;
      if (this.x >= width - this.width) this.x = width - this.width;
    }
    if (this.keys.ArrowLeft) {
      this.x -= this.speed;
      if (this.x <= 0) this.x = 0;
    }

    this._updateImagePosition();
  }

  draw() {
    if (this.image && this.enabled) {
      this.update();
    }
  }
}