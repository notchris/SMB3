<template>
  <div id="app">
    <div class="container">
      <canvas width="612" height="384" ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>

// Scene List
import Loading from "./scenes/Loading.js";
import SubA from "./scenes/SubA.js";
import SceneA from "./scenes/SceneA.js";

export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted () {

    let config = {
        type: Phaser.WEBGL,
        canvas: this.$refs.canvas,
        antialias: true,
        pixelArt: true,
        useTicker: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 1000 },
                debug: false
            }
        },
        width: 612,
        height: 384,
        backgroundColor: '#FFFFFF',
        scene: [Loading, SubA, SceneA],
    };

    const game = new Phaser.Game(config);
  },
  methods: {
  },
  components: {
  }
}
</script>