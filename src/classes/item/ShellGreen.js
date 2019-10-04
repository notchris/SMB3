/* jshint esversion: 9 */
export default class ShellGreen extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('shellGreen');
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y);
        this.setOrigin(0);
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.x = x;
        this.y = y;
        this.dir = 'r';
        this.moving = false;
        this.obstacle = false;
        this.dead = false;

        // Animations
        scene.anims.create({
            key: 'shellMove',
            frames: scene.anims.generateFrameNumbers('shellGreen', { start: 2, end: 5 }),
            frameRate: 7,
            repeat: -1
        });

        // Collision
        scene.physics.add.collider(this, scene.ground);
        scene.physics.add.collider(this, scene.bodies);
        scene.physics.add.overlap(this, scene.enemies);

        scene.physics.add.collider(scene.player, this, (p,tile) => {
            if (this.dead) return;
            if (this.body.touching.up) {
                this.moving = !this.moving;
                this.obstacle = !this.obstacle;
                scene.player.body.setVelocityY(-400);
            } else if (this.body.blocked.left || this.body.touching.left) {
                this.dir = 'r';
                if (this.obstacle) {
                    scene.player.death();
                    this.moving = false;
                } else {
                    this.moving = true;
                    scene.time.delayedCall(200, () => {
                        this.obstacle = true;
                    }, [], scene);
                }
            } else if (this.body.blocked.right || this.body.touching.right) {
                this.dir = 'l';
                if (this.obstacle) {
                    scene.player.death();
                    this.moving = false;
                } else {
                    this.moving = true;
                    scene.time.delayedCall(200, () => {
                        this.obstacle = true;
                    }, [], scene);
                }
            }
        }, null, scene);

    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.dead) return;

        if (this.moving) {
            this.body.setVelocityX(this.dir === 'r' ? 300 : -300 );
            this.anims.play('shellMove', true);
        } else {
            this.body.setVelocityX(0);
            this.anims.stop('shellMove');
        }

        if (this.body.blocked.right  || this.body.touching.right) {
            this.dir = 'l';
        } else if (this.body.blocked.left || this.body.touching.left) {
            this.dir = 'r';
        }

    }

    move () {
        this.move = true;
    }

    stop () {
        this.move = false;
        this.body.setVelocityX(0);
    }

    death () {
        this.body.setVelocityX(0);
        this.dead = true;
        this.scene.time.delayedCall(500, () => {
            this.destroy();
        }, [], this.scene);
    }

}