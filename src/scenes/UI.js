/* jshint esversion: 9 */

export default class UI extends Phaser.Scene {
    constructor() {
        super({key: "UI"});
    }

    preload() {
        
    }

    init (data) {
        this.clock = 0;
        this.timelimit = data.timelimit;
        this.coinText = null;
    }

    create() {
        this.coinText = this.add.text(16,16, 'Coins: '+0,{ fontFamily: "Arial Black", fontSize: 12, color: "#000000" , align: 'left'});
        this.clockText = this.add.text(16,32, 'Time: '+this.clock,{ fontFamily: "Arial Black", fontSize: 12, color: "#000000" , align: 'left'});
    }

    addCoin (count) {
        this.coinText.setText('Coins: ' + count);
    }

    update() {
        if (this.timelimit - this.clock === 0) return;
        this.clock = Math.trunc(this.sys.game.loop.time / 1000);
        this.clockText.setText('Time: '+ (this.timelimit - this.clock));
    }
}
