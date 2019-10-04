/* jshint esversion: 9 */

import MushroomRed from '../item/MushroomRed';

export default class QuestionBlock extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('questionBlock');
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

        // Animations
        scene.anims.create({
            key: 'questionBlockAnim',
            frames: scene.anims.generateFrameNumbers('questionBlock', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
        scene.anims.create({
            key: 'questionBlockDisabled',
            frames: scene.anims.generateFrameNumbers('questionBlock', { start: 4, end: 4 }),
            frameRate: 1,
            repeat: -1
        });

        // Collision
        scene.physics.add.collider(scene.player, this, (p,tile) => {
            if (this.body.touching.down && !this.disabled) {
                this.disabled = true;
                scene.bodies.push(new MushroomRed(this.scene,this.x,this.y));
            }
        }, null, scene);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (!this.disabled){
            this.anims.play('questionBlockAnim', true);
        } else {
            this.anims.stop('questionBlockAnim');
            this.anims.play('questionBlockDisabled', true);
        }

    }

}