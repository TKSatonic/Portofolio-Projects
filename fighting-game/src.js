const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)
/*all of the above is to do with the background 
(canvas and setting up the proportions properly) */
const gravity = 0.8
//object speed when falling without help
//Character Models created via the Class attribute
class Models {
  constructor({ position, velocity, colour = 'purple', offset }) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 350
    this.lastKey
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      offset,
      width: 100,
      height: 50,
    }
    this.colour = colour
    this.isAttacking
    this.health = 100
  }

  picture() {
    c.fillStyle = this.colour
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    //atack box that only activates when the attack argument is called/true
    if (this.isAttacking) {
      c.fillStyle = 'green'
      c.fillRect(this.attackBox.position.x, this.attackBox.position.y,
        this.attackBox.width, this.attackBox.height)
    }
  }


  //the above lines will be run whenever picture() is called
  update() {
    this.picture()
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x
    this.attackBox.position.y = this.position.y
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
    } else
      this.velocity.y += gravity
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
  }
}

const player = new Models({
  position: {
    x: 100,
    y: 224
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset:
  {
    x: 0,
    y: 0
  }
})
const enemy = new Models({
  position: {
    x: 850,
    y: 224
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: -50,
    y: 0
  },
  colour: 'red'
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

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width
    >= rectangle2.position.x && rectangle1.attackBox.position.x
    <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height
    >= rectangle2.position.y && rectangle1.attackBox.position.y
    <= rectangle2.position.y + rectangle2.height
  )
}

function animation() {
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

 /*
 Making sure the hitboxes work, 
 hitboxes are rectangular and need to collide with the models to work
 */
 if (
  rectangularCollision({
    rectangle1: player,
    rectangle2: enemy
  }) &&
  player.isAttacking
) {
  player.isAttacking = false
  enemy.health -= 20
  document.querySelector('#enemyhealth').style.width = enemy.health + '%'
  
}
if (
  rectangularCollision({
    rectangle1: enemy,
    rectangle2: player
  }) &&
  enemy.isAttacking
) {
  enemy.isAttacking = false
  player.health -=20
  document.querySelector('#playerhealth').style.width = player.health + '%'
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
    case 's':
      player.attack()
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
    case 'ArrowDown':
      enemy.attack()
      break
  }
})

// Tracks when the keys are released and then changes to false
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