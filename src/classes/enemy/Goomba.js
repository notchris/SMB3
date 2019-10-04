/* jshint esversion: 9 */
export default class Goomba extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('goomba');
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y);
        this.setOrigin(0);
        this.body.setBounce(0);
        this.body.setCollideWorldBounds(true);
        this.x = x;
        this.y = y;
        this.dead = false;
        this.dir = 'r';


        // Animations
        scene.anims.create({
            key: 'goombaMove',
            frames: scene.anims.generateFrameNumbers('goomba', { start: 0, end: 1 }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: 'goombaDeath',
            frames: scene.anims.generateFrameNumbers('goomba', { start: 2, end: 2 }),
            frameRate: 7,
            repeat: -1
        });

        // Collision
        this.groundCollision = scene.physics.add.collider(this, scene.ground);
        this.bodyCollision = scene.physics.add.collider(this, scene.bodies);
        this.enemyCollision = scene.physics.add.collider(this, scene.enemies);
        
        scene.physics.add.collider(scene.player, this, (p,tile) => {
            if (this.dead) return;
            if (this.body.touching.up) {
                this.death();
                scene.player.body.setVelocityY(-400);
            } else {
                scene.player.death();
            }
        }, null, scene);

    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.dead) return;
        this.move();
        this.anims.play('goombaMove', true);

    }

    move () {
        if (this.body.blocked.right ||  this.body.touching.right) {
            this.dir = 'l';
        } else if (this.body.blocked.left ||  this.body.touching.left) {
            this.dir = 'r';
        }

        if (this.dir === 'r') {
            this.body.setVelocityX(40);
        } else if (this.dir == 'l') {
            this.body.setVelocityX(-40);
        }
        
    }

    death () {
        this.anims.play('goombaDeath', true);
        this.body.setVelocityX(0);
        this.dead = true;
        this.enemyCollision.destroy();
        this.bodyCollision.destroy();
        this.scene.time.delayedCall(200, () => {
            this.destroy();
        }, [], this.scene);
    }

}