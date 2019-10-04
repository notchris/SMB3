/* jshint esversion: 9 */

import Player from '../classes/Player.js';
import Portal from '../classes/Portal.js';
import Flag from '../classes/other/Flag.js';

import Goomba from '../classes/enemy/Goomba.js';
import KoopaGreen from '../classes/enemy/Koopa.js';
import Coin from '../classes/item/Coin.js';

import QuestionBlock from '../classes/block/QuestionBlock.js';
import BrickBlock from '../classes/block/BrickBlock.js';
import SolidBlock from '../classes/block/SolidBlock.js';
import NoteBlock from '../classes/block/NoteBlock.js';
import DonutBlock from '../classes/block/DonutBlock.js';

import UI from './UI.js';

export default class SubA extends Phaser.Scene {
    constructor() {
        super({key: "SubA"});
    }

    preload() {

    }

    init (data) {
      this.player = null;
      this.cursors = null;
      this.map = null;

      this.clock = 0;

      this.ui = null;
      this.death = null;
      
      this.ground = null;
      this.bodies = [];
      this.enemies = [];
      this.pipes = [];
      this.coins = 0;
    }

    create() {
        this.cameras.main.setBounds(0, 0, 100 * 16, 27 * 16);
        this.physics.world.setBounds(0, 0, 100 * 16, 27 * 16);

        // Load UI
        this.ui = this.scene.add('UI',UI,true, {
            timelimit: 180
        });

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Make Tileset
        this.map = this.make.tilemap({key:'sub'});
        let tileset = this.map.addTilesetImage('smb3', 'tiles');

        this.slopeMap = this.make.tilemap({key:'slopes'});
        let slopeTileset  = this.map.addTilesetImage('slopes', 'slopetiles');


        // Background Objects
        let bg = this.map.createStaticLayer("Background", tileset,0,0);
        
        // Ground
        this.ground = this.map.createStaticLayer("Ground", tileset,0,0);
        this.ground.setCollisionByProperty({ collides: true });

        // Player
        this.player = new Player(this, 100,300);

        // Solid Blocks
        let solidBlocks = this.map.createDynamicLayer("SolidBlocks", tileset,0,0);
        solidBlocks.setCollisionByProperty({ collides: true });
        solidBlocks.forEachTile((tile) => {
            if (tile.properties.solidBlock) {
                let block = new SolidBlock(this,tile.x *16,tile.y * 16);
                this.bodies.push(block);
                solidBlocks.removeTileAt(tile.x, tile.y);
            }
        });

        // Donut Blocks
        let donutBlocks = this.map.createDynamicLayer("DonutBlocks", tileset,0,0);
        donutBlocks.setCollisionByProperty({ collides: true });
        donutBlocks.forEachTile((tile) => {
            if (tile.properties.donutBlock) {
                let block = new DonutBlock(this,tile.x *16,tile.y * 16);
                this.bodies.push(block);
                donutBlocks.removeTileAt(tile.x, tile.y);
            }
        });

        // Question Blocks
        let questionBlocks = this.map.createDynamicLayer("QuestionBlocks", tileset,0,0);
        questionBlocks.setCollisionByProperty({ collides: true });
        questionBlocks.forEachTile((tile) => {
            if (tile.properties.questionBlock) {
                let block = new QuestionBlock(this,tile.x *16,tile.y * 16);
                this.bodies.push(block);
                questionBlocks.removeTileAt(tile.x, tile.y);
            }
        });

        // Note Blocks
        let noteBlocks = this.map.createDynamicLayer("NoteBlocks", tileset,0,0);
        noteBlocks.setCollisionByProperty({ collides: true });
        noteBlocks.forEachTile((tile) => {
            if (tile.properties.noteBlock) {
                let block = new NoteBlock(this,tile.x *16,tile.y * 16);
                this.bodies.push(block);
                noteBlocks.removeTileAt(tile.x, tile.y);
            }
        });

        // Brick Blocks
        let brickBlocks = this.map.createDynamicLayer("BrickBlocks", tileset,0,0);
        brickBlocks.setCollisionByProperty({ collides: true });
        brickBlocks.forEachTile((tile) => {
            if (tile.properties.brickBlock) {
                let block = new BrickBlock(this,tile.x *16,tile.y * 16);
                this.bodies.push(block);
                brickBlocks.removeTileAt(tile.x, tile.y);
            }
        });

        // Pipes
        this.pipes = this.map.createDynamicLayer("Pipes", tileset,0,0);
        this.pipes.setCollisionByProperty({ collides: true });


        // Coins
        let coins = this.map.createDynamicLayer("Coins", tileset,0,0);
        coins.forEachTile((tile) => {
            if (tile.properties.coin) {
                let c = new Coin(this,tile.x *16,tile.y * 16);
                coins.removeTileAt(tile.x, tile.y);
            }
        });

        // Portals
        this.map.filterObjects('Portals', (p) => {
            console.log(p);
            new Portal(this,p.x,p.y,p.width,p.height);
        });

        // Flag
        this.map.filterObjects('Flag', (f) => {
            console.log(f);
            new Flag(this,f.x,f.y);
        });

        // Add Player Tile Collisions
        this.physics.add.collider(this.player, [this.ground,this.pipes]);

        // Camera
        this.cameras.main.setBackgroundColor('#9bfbf0');
        this.cameras.main.startFollow(this.player);

        // Start Scene / UI
        this.scene.bringToTop();
        this.scene.bringToTop('UI');
        this.cameras.main.fadeIn(1000);
    }

    update() {
        if (this.player.dead) {

            this.physics.world.pause();
            
        }
    }
}
