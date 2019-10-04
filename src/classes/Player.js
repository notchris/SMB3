/* jshint esversion: 9 */

export default class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('marioSmall');
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y);
      
        this.body.setBounce(0);
        this.body.setCollideWorldBounds(true);
        this.dir = 'r';
        this.x = x;
        this.y = y;
        this.dead = false;
        this.big = false;

        // Animations

        // Small 
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('marioSmall', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });
        scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('marioSmall', { start: 0, end: 1 }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('marioSmall', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
        scene.anims.create({
            key: 'death',
            frames: scene.anims.generateFrameNumbers('marioSmall', { start: 3, end: 3 }),
            frameRate: 1,
            repeat: -1
        });

        // Big
        scene.anims.create({
            key: 'idleBig',
            frames: scene.anims.generateFrameNumbers('marioBig', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });
        scene.anims.create({
            key: 'walkBig',
            frames: scene.anims.generateFrameNumbers('marioBig', { start: 0, end: 1 }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: 'jumpBig',
            frames: scene.anims.generateFrameNumbers('marioBig', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
        scene.anims.create({
            key: 'duck',
            frames: scene.anims.generateFrameNumbers('marioBig', { start: 3, end: 3 }),
            frameRate: 1,
            repeat: -1
        });
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.dead) return;


        if (this.scene.cursors.left.isDown) {
            this.body.setVelocityX(-160);
            this.flipX= true;
            this.dir = 'l';
            if (!this.big) {
                this.anims.play('walk', true);
            } else {
                this.anims.play('walkBig', true);
            }
        } else if (this.scene.cursors.right.isDown) {
            this.body.setVelocityX(160);
            this.flipX= false;
            this.dir = 'r';
            if (!this.big) {
                this.anims.play('walk', true);
            } else {
                this.anims.play('walkBig', true);
            }
        } else if (this.scene.cursors.down.isDown) {
            this.body.setVelocityX(0);
            if (!this.big) {
                this.anims.play('idle', true);
            } else {
                this.anims.play('duck', true);
            }
        } else {
            this.body.setVelocityX(0);
            if (!this.big) {
                this.anims.play('idle', true);
            } else {
                this.anims.play('idleBig', true);
            }
        }

        let didJump = Phaser.Input.Keyboard.JustDown(this.scene.cursors.up);
        if (didJump && this.body.blocked.down || didJump && this.body.touching.down) {
            this.body.setVelocityY(-330);
            if (!this.big) {
                this.anims.play('jump', true);
            } else {
                this.anims.play('jumpBig', true);
            }
        }
        if (!this.body.blocked.down && !this.body.touching.down){
            if (!this.big) {
                this.anims.play('jump', true);
            } else {
                this.anims.play('jumpBig', true);
            }
        }

        // Death
        if (this.y >= (this.scene.map.height * 16) - this.height ) {
            this.death();
            
        }
    }

    grow () {
        this.setTexture('marioBig');
        this.big = true;
        this.body.setSize(16, 27);
    }

    shrink () {
        this.setTexture('marioSmall');
        this.big = false;
        this.body.setSize(16, 16);
    }

    death () {
        if (this.big) {
            this.shrink();
        }
        this.anims.play('death', true);
        this.marioDeathAnim = this.scene.tweens.add({
            targets: this,
            y: this.y - 32,
            ease: 'Linear',
            duration: 200,
            yoyo: true,
            repeat: 0,
            paused: false,
            delay: 1000,
            onComplete: () => {
                console.log('ok');
            }
        });
        this.marioDeathAnim.play();
        this.dead = true;
    }

}