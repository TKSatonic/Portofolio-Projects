const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2


class Models {
constructor({position, velocity}) {
  this.position = position 
  this.velocity = velocity
  this.height = 100
}

picture() {
  c.fillStyle = 'blue'
  c.fillRect(this.position.x, this.position.y, 35, this.height)
}

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
  y: 135
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
  s: {
    pressed: false 
  }
}

let lastKey

function animation(){
  window.requestAnimationFrame(animation)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update() 
  enemy.update() 

player.velocity.x = 0


if (keys.a.pressed && lastKey === 'a') {
  player.velocity.x = -1
} if (keys.d.pressed && lastKey === 'd') {
  player.velocity.x = 1
} if (keys.w.pressed) {
  player.velocity.y = -1
} else if (keys.s.pressed) {
  player.velocity.y = 1
}

}

animation()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
    break

    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
    break

    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
    break

    case 's':
      keys.s.pressed = true
      lastKey = 's'
    break
   
  }
  console.log(event.key);
})

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

    case 's':
      keys.s.pressed = false
    break
   
  }
  console.log(event.key)
})
