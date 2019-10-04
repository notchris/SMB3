/* jshint esversion: 9 */

import ShellGreen from '../item/ShellGreen';

export default class KoopaGreen extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('koopaGreen');
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
        this.flipX = true;

        this.groundCollision = null;
        this.bodyCollision = null;
        this.enemyCollision = null;


        // Animations
        scene.anims.create({
            key: 'koopaMove',
            frames: scene.anims.generateFrameNumbers('koopaGreen', { start: 0, end: 1 }),
            frameRate: 3,
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
        this.anims.play('koopaMove', true);

    }

    move () {
        if (this.body.blocked.right || this.body.touching.right) {
            console.log('koopa blocked')
            this.dir = 'l';
            this.flipX= false;
        } else if (this.body.blocked.left ||  this.body.touching.left) {
            this.dir = 'r';
            this.flipX= true;
        }

        if (this.dir === 'r') {
            this.body.setVelocityX(30);
        } else if (this.dir == 'l') {
            this.body.setVelocityX(-30);
        }
        
    }

    death () {
        this.body.setVelocityX(0);
        this.dead = true;
        this.scene.time.delayedCall(50, () => {
            new ShellGreen(this.scene,this.x,this.y);
            this.destroy();
        }, [], this.scene);
    }

}