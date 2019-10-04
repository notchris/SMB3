/* jshint esversion: 9 */
export default class DonutBlock extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('donutBlock');
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(x, y);
        this.setOrigin(0);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.x = x;
        this.y = y;
        this.activated = false;

        // Animations
        scene.anims.create({
            key: 'donutBlockAnimA',
            frames: scene.anims.generateFrameNumbers('donutBlock', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key: 'donutBlockAnimB',
            frames: scene.anims.generateFrameNumbers('donutBlock', { start: 1, end: 1 }),
            frameRate: 4,
            repeat: -1
        });


        // Collision
        scene.physics.add.collider(scene.player, this, (p,tile) => {
            if (this.body.touching.up) {
                this.activated = true;
                scene.time.delayedCall(2000, () => {
                    this.body.setImmovable(true);
                    this.body.allowGravity = true;
                    scene.time.delayedCall(2000, () => {
                        this.destroy()
                    })
                }, [], scene);
            }
        }, null, scene);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (!this.activated){
            this.anims.play('donutBlockAnimA', true);
        } else {
            this.anims.stop('donutBlockAnimA');
            this.anims.play('donutBlockAnimB', true);
        }
        
    }
    update () {
    }

}