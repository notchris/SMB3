/* jshint esversion: 9 */
export default class Coin extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('coin');
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y);
        this.setOrigin(0);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.x = x;
        this.y = y;

        // Animations
        scene.anims.create({
            key: 'coin',
            frames: scene.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        // Collision
        scene.physics.add.overlap(scene.player, this, (p,tile) => {
            this.destroy();
            scene.coins++;
            scene.ui.addCoin(scene.coins);
        }, null, scene);
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);
        this.anims.play('coin', true);
    }

}