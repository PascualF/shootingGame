const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d') 

canvas.width = innerWidth //window.innerWidth
canvas.height = innerHeight // window.innerHeight


//creates the player
class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0

        const image = new Image()
        image.src = './img/spaceship.png'

        image.onload = () =>{
            const scale = 0.15        
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }

        

    }

    draw(){
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        
        ctx.save()
        ctx.translate(
            player.position.x + player.width / 2, 
            player.position.y + player.width / 2
        )
        ctx.rotate(this.rotation)
        ctx.translate(
            - player.position.x - player.width / 2, 
            - player.position.y - player.width / 2
        )

        ctx.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height)
        ctx.restore()
    }

    // updates 
    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

class Projectile {
    //position of projectiles are dynamic, so we pass it as an argument
    constructor({position, velocity}){
        this.position = position 
        this.velocity = velocity

        this.radius = 3
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

}

const player = new Player()
const projectiles = [] //this will help to create more than 1 projectectiles
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    },
}

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0){
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
            
        } else {
            projectile.update()
        }
    })

    if (keys.a.pressed && player.position.x >= 0){
        player.velocity.x = -5
        player.rotation = -0.15
    } else if(keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 5
        player.rotation = 0.15
    }else {
        player.velocity.x = 0
        player.rotation = 0
    }

    
}

animate();

// addEventListener called from window
addEventListener('keydown', ({ key }) =>{
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = true
            break
        case 'd':
            console.log('right')
            keys.d.pressed = true
            break
        case ' ':
            console.log('shoot')
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }))
            console.log(projectiles)
            break
    }
})

addEventListener('keyup', ({ key }) =>{
    switch (key) {
        case 'a':
            //console.log('left')
            keys.a.pressed = false
            break
        case 'd':
            //console.log('right')
            keys.d.pressed = false
            break
        case ' ':
            //console.log('shoot')
            break
    }
})
