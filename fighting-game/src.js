const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
/*all of the above is to do with the background 
(canvas and setting up the proportions properly) */
const gravity = 0.7
//object speed when falling without help

class Models {
constructor({position, velocity}) {
  this.position = position 
  this.velocity = velocity
  this.height = 100
  this.lastKey
}
//Character Models created via the Class attribute
picture() {
  c.fillStyle = 'blue'
  c.fillRect(this.position.x, this.position.y, 35, this.height)
}
//the above lines will be run whenever picture() is called
update() {
  this.picture()
  
  this.position.x += this.velocity.x
  this.position.y += this.velocity.y
  

  if (this.position.y + this.height + this.velocity.y >= canvas.height) {
    this.velocity.y = 0
  }
  else
  this.velocity.y += gravity
  }
}

const player = new Models({
  position: {
  x: 0,
  y: 0
},
velocity: {
  x: 0,
  y: 0
}
})
const enemy = new Models({
 position: {
  x: 450,
  y: 476
 },
 velocity: {
  x: 0,
  y: 0
}
})
console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false 
  },
  w: {
    pressed: false
  },
  ArrowRight:
  {
    pressed: false
  },
  ArrowLeft:
  {
    pressed: false
  },
  ArrowUp:
  {
    pressed: false
  }
}

function animation(){ 
  //defines a function named animation that can be called
  window.requestAnimationFrame(animation)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update() 
  enemy.update() 

player.velocity.x = 0
enemy.velocity.x = 0
/* Above code makes it so that the models don't move left or right on
their own, makes the canvas black and requestAnimationFrame(animation)
passes through the animation argument to tell the browser that we wish 
to perform an animation */

// Player 1's movement
if (keys.a.pressed && player.lastKey === 'a') {
  player.velocity.x = -5
} if (keys.d.pressed && player.lastKey === 'd') {
  player.velocity.x = 5
} if (keys.w.pressed) {
  player.velocity.y = -10
}
// Player 2's movement (Or AI if made)
if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
  enemy.velocity.x = -5
} if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
  enemy.velocity.x = 5
} if (keys.ArrowUp.pressed) {
  enemy.velocity.y = -10
}

}

animation() //calls in the animation function
//tracks when the key is pressed and gives a method for each key below
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
    break

    case 'a':
      keys.a.pressed = true
      player.lastKey = 'a'
    break

    case 'w':
      keys.w.pressed = true
      player.lastKey = 'w'
    break

    case 'ArrowUp':
      keys.ArrowUp.pressed = true
      enemy.lastKey = 'ArrowUp'
    break

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true
      enemy.lastKey = 'ArrowLeft'
    break

    case 'ArrowRight':
      keys.ArrowRight.pressed = true
      enemy.lastKey = 'ArrowRight'
    break
    
   
  }
})

// Tracks when the keys are released
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
    break

    case 'a':
      keys.a.pressed = false
    break

    case 'w':
      keys.w.pressed = false
    break

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
    break

    case 'ArrowRight':
      keys.ArrowRight.pressed = false
    break
   
    case 'ArrowUp':
      keys.ArrowUp.pressed = false
    break
  }
})