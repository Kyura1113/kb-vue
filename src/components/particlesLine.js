let canvas
let ctx
let animation
let maximumPossibleDistance
// let centerX
// let centerY
let mousePositionX
let mousePositionY
let mouseElement
// let isRunnig
let objects = []

let options = {
  particlesNumber: 300, //粒子数量
  initialSize: 2,
  moveLimit: 50,
  durationMin: 1250,
  durationMax: 1500,
  drawConnections: true, //粒子连接
  mouseInteractionDistance: 150,
  mouseGravity: false, //粒子是否向鼠标点聚集
  drawMouseConnections: false, //粒子连接鼠标位置
  drawMouseAroundConnections: true, //鼠标位置粒子相互连接(不含鼠标点)
}

function initAnimation(){
  canvas = document.getElementById('particles-line')
  ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  maximumPossibleDistance = 150//Math.round(Math.sqrt((canvas.width * canvas.width) + (canvas.height * canvas.height)))

  // centerX = Math.floor(canvas.width / 2)
  // centerY = Math.floor(canvas.height / 2)

  objects.length = 0
  clearCanvas()
  createParticles()
}

function createParticles(){
  mouseElement = new MouseParticles(0, 0, options.initialSize, getRandomColor())
  for(let i=0; i< options.particlesNumber; i++){
    let randomX = Math.floor((Math.random() * window.innerWidth))
    let randomY = Math.floor((Math.random() * window.innerHeight))
    let particle = new Particle(randomX, randomY, options.initialSize, getRandomColor())
    particle.calculateVector()
    objects.push(particle)
  }
}

function Particle(positionX, positionY, size, color){
  this.positionX = positionX
  this.positionY = positionY
  this.size = size
  this.duration = Math.floor(Math.random() * options.durationMax) + options.durationMin
  this.limit = options.moveLimit
  this.timer = 0
  this.color = color

  Particle.prototype.animateTo = function (x, y){
    let duration = this.duration
    this.positionX = this.animatePosition(x, this.positionX, duration)
    this.positionY = this.animatePosition(y, this.positionY, duration)
    if(this.timer === this.duration){
      this.calculateVector()
      this.timer = 0
    }else{
      this.timer++
    }
  }

  Particle.prototype.animatePosition = (newPosition, currentPosition, duration) => {
    let step = Math.abs(newPosition - currentPosition) / duration
    return newPosition > currentPosition ? currentPosition + step : currentPosition - step
  }

  //计算矢量
  Particle.prototype.calculateVector = function(){
    let newPosition = {}
    let distance

    if((typeof distance === "undefined") || (distance > this.limit)){
      newPosition.positionX =  Math.floor(Math.random() * innerWidth)
      newPosition.positionY =  Math.floor(Math.random() * innerHeight)
      //distance = getDistance(this, newPosition)
    }
    this.vectorX = newPosition.positionX
    this.vectorY = newPosition.positionY
  }

  Particle.prototype.updateColor = function(){
    this.color = getRandomColor()
  }

  Particle.prototype.handleInteraction = function(){
    if(!options.drawConnections) return
    let elements = []
    let distanceToElement = maximumPossibleDistance
    for(let i in objects){
      let obj = objects[i]
      let distance = getDistance(this, obj)
      if((distance < distanceToElement) && (obj !== this)){
        distanceToElement = distance
        elements.push(obj)
      }
    }
    for(let j in elements){
      let element = elements[j]
      ctx.beginPath()
      ctx.moveTo(this.positionX + this.size/2, this.positionY + this.size/2)
      ctx.lineTo(element.positionX + element.size * 0.5, element.positionY + element.size * 0.5)
      ctx.strokeStyle = this.color
      ctx.stroke()
    }
  }

  Particle.prototype.updateAnimation = function(){
    this.animateTo(this.vectorX, this.vectorY)
    ctx.fillStyle = this.color
    ctx.fillRect(this.positionX, this.positionY, this.size, this.size)
  }
}

function MouseParticles(positionX, positionY, size, color){
  this.positionX = mousePositionX
  this.positionY = mousePositionY
  this.size = size
  this.color = color

  MouseParticles.prototype.handleInteraction = function(){
    if(options.mouseInteractionDistance === 0) return
    let elements = []
    //let distanceToElement = maximumPossibleDistance
    for(let i in objects){
      let obj = objects[i]
      let distance = getDistance(this, obj)
      if((distance < options.mouseInteractionDistance) && (obj !== this)){
        if(options.drawMouseAroundConnections){
          obj.handleInteraction()
        }else{
          elements.push(obj)
        }
      }
    }
    for(let j in elements){
      if(options.drawMouseConnections){
        let element = elements[j]
        ctx.beginPath()
        ctx.moveTo(this.positionX, this.positionY)
        ctx.lineTo(element.positionX + element.size * 0.5, element.positionY + element.size * 0.5)
        ctx.strokeStyle = this.color
        ctx.stroke()
      }
      if(options.mouseGravity){
        elements[j].vectorX = this.positionX
        elements[j].vectorY = this.positionY
      }
    }
  }

  MouseParticles.prototype.updateAnimation = function(){
    this.positionX = mousePositionX
    this.positionY = mousePositionY
    this.handleInteraction()
  }

}

function getDistance(element1, element2) {
    let difX = Math.round(Math.abs(element1.positionX - element2.positionX));
    let difY = Math.round(Math.abs(element1.positionY - element2.positionY));
    return Math.round(Math.sqrt((difX * difX) + (difY * difY)));
}

function clearCanvas(){
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
}

function stopAnimation(){
  window.cancelAnimationFrame(animation)
  //isRunnig = false
}

function updatePosition(){
  for(let i in objects){
    objects[i].updateAnimation()
  }
  mouseElement.updateAnimation()
}

function getRandomColor(){
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  let opacity = Math.abs(Math.random() * 2 - 1).toFixed(1)
  return "rgba("+ r +","+ g +","+ b +","+ opacity+")"
}

let requestAnimationFrame = window.requestAnimationFrame || function(callback){
 window.setTimeout(callback, 1000/60)
}

window.onmousemove = function(e){
  mousePositionX = e.clientX
  mousePositionY = e.clientY
}

window.addEventListener("resize", function(){
  initAnimation();
}, false);

function auto(){
   requestAnimationFrame(auto)
   clearCanvas()
   updatePosition()
   //isRunnig = true
}

export default {
  initAnimation, auto, stopAnimation
}
