/* jshint esversion: 9 */
import Phaser from 'phaser';
export default class Loading extends Phaser.Scene {
  constructor() {
    super({key: "Loading"});
}

    preload() {
        console.log('Loading assets...');

        this.load.spritesheet('marioSmall', 
            'marioSmall.png',
            { frameWidth: 16, frameHeight: 16 }
        );
        this.load.spritesheet('marioBig', 
            'marioBig.png',
            { frameWidth: 16, frameHeight: 27 }
        );

        this.load.image('pole', 'other/pole.png');
        this.load.image('flag', 'other/flag.png');

        this.load.image('brickBlock', 'block/brickBlock.png');
        this.load.image('solidBlock', 'block/solidBlock.png');
        this.load.image('mushroomRed', 'item/mushroomRed.png');
        this.load.image('mushroomGreen', 'item/mushroomGreen.png');
        this.load.image('star', 'item/star.png');
        this.load.image('flower', 'item/flower.png');

        this.load.spritesheet('goomba', 
            'enemy/goomba.png',
            { frameWidth: 16, frameHeight: 16 }
        );
        this.load.spritesheet('koopaGreen', 
            'enemy/koopaGreen.png',
            { frameWidth: 16, frameHeight: 26 }
        );
        this.load.spritesheet('koopaRed', 
            'enemy/koopaRed.png',
            { frameWidth: 16, frameHeight: 26 }
        );

        this.load.spritesheet('shellGreen', 
            'item/shellGreen.png',
            { frameWidth: 16, frameHeight: 16 }
        );

        this.load.spritesheet('coin', 
            'item/coin.png',
            { frameWidth: 16, frameHeight: 16 }
        );

        this.load.spritesheet('questionBlock', 
            'block/questionBlock.png',
            { frameWidth: 16, frameHeight: 16 }
        );

        this.load.spritesheet('noteBlock', 
            'block/noteBlock.png',
            { frameWidth: 16, frameHeight: 16 }
        );

        this.load.spritesheet('donutBlock', 
            'block/donutBlock.png',
            { frameWidth: 16, frameHeight: 16 }
        );


        // Ground Tiles
        this.load.image("tiles", "smb3ground.png");
        this.load.image("slopetiles", "arcade-slopes-16.png");

        // Scene A
        this.load.tilemapTiledJSON("map", "mapA.json");

        // Sub A
        this.load.tilemapTiledJSON("sub", "subA.json");
        
    }

    create() {

        // Registry Data
        this.registry.set('coins', 0);

        // Start Scene
        this.scene.start('SceneA');
    }

    update() {

    }
}
