class intro {
  constructor() {
    this.x = 0;
    this.y = 0;
    
    this.width = 0;
    this.height = 0;
    
    this.img = null;
  }

  display() {
    if(this.img != null) {
      image(this.img, 0,0, this.width, this.height);
    }
  }
  
  
  async setImage(imagePath) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Create a p5.js compatible image
        const p5Img = createImage(img.width, img.height);
        p5Img.drawingContext.drawImage(img, 0, 0);
        this.img = p5Img;
        this.width = img.width;
        this.height = img.height;
        resolve();
      };
      img.onerror = reject;
      img.src = imagePath;
      
    });
  }
}
