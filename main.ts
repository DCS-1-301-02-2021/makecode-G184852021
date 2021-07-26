scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    1 1 1 . . . 1 . . . . . . . . .
    . . 5 5 . . 1 . . . . . . . . .
    . . 5 5 . . 1 . . . . . . . . .
    2 2 5 5 5 5 1 5 5 5 . . . . . .
    4 2 5 5 5 5 1 5 5 5 9 9 9 9 . .
    2 4 5 5 5 5 1 5 5 5 9 9 9 9 . .
    2 2 5 5 5 5 1 5 5 5 . . . . . .
    . . 5 5 . . 1 . . . . . . . . .
    . . 5 5 . . 1 . . . . . . . . .
    1 1 1 . . . 1 . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 200, 200)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            2 2 . . . . . . . . . . . . . .
            2 2 1 1 1 1 1 1 1 1 1 2 1 1 . .
            2 2 . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(img`
        . . . . . . . . . . . . . . 2 .
        . . . . . . . . . . . . . 2 2 .
        . . . . . . . . . . . . 2 2 4 .
        . . . . . . . . . . . 2 2 4 4 .
        . . . . . . . . . 2 2 2 4 4 4 .
        . . . . . . . . 2 2 1 1 4 4 4 .
        . . . . . . . 2 2 4 4 4 4 4 4 .
        2 2 2 2 2 2 2 2 4 4 4 4 4 4 4 .
        . . . . . . . 4 4 4 4 4 4 4 4 .
        . . . . . . . . 4 4 4 4 4 4 4 .
        . . . . . . . . . 4 4 4 4 4 4 .
        . . . . . . . . . . . 4 4 4 4 .
        . . . . . . . . . . . . 4 4 4 .
        . . . . . . . . . . . . . 4 4 .
        . . . . . . . . . . . . . . 4 .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
