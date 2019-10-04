/* jshint esversion: 9 */
export default class Portal extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, w, h)
    {
        super(scene, x, y, w, h);

        // Create invisible sensor
        this.portal = scene.make.graphics();
        this.portal.fillStyle(0xFFFFFF, 0);
        this.portal.fillRect(0, 0, w, h);
        this.portal.generateTexture('portal', w, h);
        this.portal.destroy();

        this.setTexture('portal');
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y);
        this.setOrigin(0);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.x = x;
        this.y = y;
        this.setSize(w, h);

        // Animations

        // Collision
        scene.physics.add.overlap(scene.player, this, (p,tile) => {
            if (scene.player.body.touching.down && scene.cursors.down.isDown) {
                console.log('enter portal');
            }
        }, null, scene);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

    }
    update () {
    }

}