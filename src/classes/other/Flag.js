/* jshint esversion: 9 */
export default class Flag extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('pole');
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y - 134);
        this.setOrigin(0);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.x = x;
        this.y = y - 134;
        
        // Flag
        this.flag = scene.add.sprite(x + 7, y - (134 - 16), 'flag');

        // Collision
        scene.physics.add.overlap(scene.player, this, (p,tile) => {
            this.flagUp.play();
            scene.physics.world.pause();
        }, null, scene);

        // Tweens
        this.flagUp = scene.tweens.add({
            targets: this.flag,
            y: this.flag.y + 134 - 16,
            ease: 'Linear',
            duration: 1500,
            yoyo: false,
            repeat: 0,
            paused: true,
            onComplete: () => {
                console.log('complete');
                this.flagUp.pause();
            }
        });

    }

    created () {


    }
    preUpdate (time, delta) {
        super.preUpdate(time, delta);
    }

}