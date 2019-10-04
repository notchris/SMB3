/* jshint esversion: 9 */
export default class SolidBlock extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('solidBlock');
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

        // Collision
        scene.physics.add.collider(scene.player, this, (p,tile) => {
           
        }, null, scene);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

    }
    update () {
    }

}