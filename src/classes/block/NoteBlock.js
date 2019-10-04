/* jshint esversion: 9 */
export default class NoteBlock extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('noteBlock');
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y);
        this.setOrigin(0);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.x = x;
        this.y = y;
        this.disabled = false;
        this.tween = null;

        // Animations
        scene.anims.create({
            key: 'noteBlockAnim',
            frames: scene.anims.generateFrameNumbers('noteBlock', { start: 0, end: 2 }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'noteBlockDisabled',
            frames: scene.anims.generateFrameNumbers('noteBlock', { start: 3, end: 3 }),
            frameRate: 1,
            repeat: -1
        });

        // Tweens

        this.tweenDown = scene.tweens.add({
            targets: this,
            y: this.y + 6,
            ease: 'Linear',
            duration: 100,
            yoyo: true,
            repeat: 0,
            paused: true
        });
        this.tweenUp = scene.tweens.add({
            targets: this,
            y: this.y - 4,
            ease: 'Linear',
            duration: 100,
            yoyo: true,
            repeat: 0,
            paused: true
        });

        // Collision
        scene.physics.add.collider(scene.player, this, (p,tile) => {
            if (this.body.touching.up) {
                this.tweenDown.play();
                scene.player.body.setVelocityY(-400);
            } else if (this.body.touching.down) {
                this.tweenUp.play();
            }
        }, null, scene);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (!this.disabled){
            this.anims.play('noteBlockAnim', true);
        } else {
            this.anims.stop('noteBlockAnim');
            this.anims.play('noteBlockDisabled', true);
        }
    }

}