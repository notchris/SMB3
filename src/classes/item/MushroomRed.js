/* jshint esversion: 9 */
export default class MushroomRed extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('mushroomRed');
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y);
        this.setOrigin(0);
        this.x = x;
        this.y = y;
        this.moving = false;
        this.dir = Math.random() >= 0.5 ? 'l': 'r';
        this.speed = 100;
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.mushroomUp = null;
        this.created = false;

        // Tweens
        this.mushroomUp = scene.tweens.add({
            targets: this,
            y: this.y - 16,
            ease: 'Linear',
            duration: 500,
            yoyo: false,
            repeat: 0,
            paused: true,
            created: false,
            onComplete: () => {
                this.created = true;
            }
        });


        // Collision
        scene.physics.add.collider(this, scene.ground);
        
        scene.physics.add.overlap(scene.player, this, (p,tile) => {
            this.destroy();
            scene.player.grow();
        }, null, scene);

        scene.time.delayedCall(2000, () => {
            if (this.body){
                scene.physics.add.collider(this, scene.bodies);
                this.body.setImmovable(false);
                this.body.allowGravity = true;
                this.moving = true;
            }
        });

    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        if (this.moving) {
            this.body.setVelocityX(this.dir === 'r' ? this.speed : -this.speed );
        } else {
            if (!this.created) this.mushroomUp.play();
            this.body.setVelocityX(0);
        }

        if (this.body.blocked.right  || this.body.touching.right) {
            this.dir = 'l';
        } else if (this.body.blocked.left || this.body.touching.left) {
            this.dir = 'r';
        }

    }

}