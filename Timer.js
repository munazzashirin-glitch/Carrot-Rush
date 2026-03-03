class Timer {
  constructor() {
    this.countDown = 0
    this.startTime = 0
    this.isRunning = false
    this.isFinished = false
  }

  setCountDown(seconds) {
    this.countDown = seconds
  }

  start() {
    if (!this.isRunning) {
      this.startTime = millis()
      this.isRunning = true
      this.isFinished = false
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false
      this.countDown -= (millis() - this.startTime) / 1000
    }
  }

  restart() {
    this.stop()
    this.countDown = 0
    this.isFinished = false
  }

  update() {
    if (this.isRunning) {
      const elapsedTime = (millis() - this.startTime) / 1000
      if (elapsedTime >= this.countDown) {
        this.isRunning = false
        this.isFinished = true
        this.countDown = 0
      }
    }
  }

  draw() {
    if (this.isRunning) {
      const elapsedTime = (millis() - this.startTime) / 1000
      if (elapsedTime >= this.countDown) {
        this.isRunning = false
        this.isFinished = true
        this.countDown = 0
      }
    }
    
    if (this.isRunning || this.isFinished) {
      const remainingTime = Math.max(0, this.countDown - (millis() - this.startTime) / 1000)
      const displayTime = this.formatTime(remainingTime)

      push()
      textAlign(CENTER, CENTER)
      textSize(32)
      fill(255)
      text(displayTime, width / 2, height / 2)
      pop()
    }
  }

  formatTime(seconds) {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = Math.floor(seconds % 60)
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    } else {
      return Math.ceil(seconds).toString()
    }
  }
}