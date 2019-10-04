/* jshint esversion: 9 */
export default class Star extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('star');
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y);
        this.setOrigin(0);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.x = x;
        this.y = y;

        // Collision
        scene.physics.add.overlap(scene.player, this, (p,tile) => {
            this.destroy();
        }, null, scene);
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);
    }

}