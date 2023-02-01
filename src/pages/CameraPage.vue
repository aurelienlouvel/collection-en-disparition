<script lang="ts">
import { defineComponent } from "vue";
import { useExperienceStore } from "@/stores/Experience";
import * as THREE from "three";
import {
  ArMarkerControls,
  ArToolkitContext,
  ArToolkitSource,
} from "@ar-js-org/ar.js/three.js/build/ar-threex";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

import BackButton from "@/components/buttons/BackButton.vue";
import HelpButton from "@/components/buttons/HelpButton.vue";
import TwoLinesDecoration from "@/components/decorations/TwoLinesDecoration.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";

import artworks from "@/data/artworks";
import markerPattern from "@/assets/ar/patt.hiro";
import cameraParameters from "@/assets/ar/camera_para.dat";

export default defineComponent({
  name: "CameraPage",
  components: { BaseButton, TwoLinesDecoration, HelpButton, BackButton },
  data() {
    return {
      progression: 0,
      artworks: artworks,
      mesh: {},
      raf: 0 as number,
      // clicklistener: as void;
      isCollected: false,
    };
  },
  methods: {
    getProgression() {
      const experienceStore = useExperienceStore();
      this.progression = experienceStore.progression;
    },
    transition() {
      this.isCollected = true;
    },
    progress() {
      const experienceStore = useExperienceStore();
      if (!experienceStore.completed) {
        experienceStore.progress();
        if (experienceStore.progression === 5) {
          experienceStore.progress();
        }
        experienceStore.setCompleted();
      }
    },
  },
  mounted() {
    this.getProgression();

    const container = this.$refs.canvas as any;
    const video = this.$refs.video as any;

    //THREE JS
    const scene = new THREE.Scene();

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 4);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const clock = new THREE.Clock();
    let deltaTime = 0;
    let totalTime = 0;

    //AR JS

    const arToolkitSource = new ArToolkitSource({
      sourceType: "webcam",
    });

    arToolkitSource.init(function onReady() {
      video.appendChild(document.getElementById("arjs-video"));
    });

    const arToolkitContext = new ArToolkitContext({
      cameraParametersUrl: cameraParameters,
      detectionMode: "mono",
      canvasWidth: container.clientWidth,
      canvasHeight: container.clientHeight,
      imageSmoothingEnabled: true,
    });

    arToolkitContext.init(function onCompleted() {
      const canvas = arToolkitContext.arController.canvas;
      canvas.style.zIndex = 4;
      container.appendChild(canvas);
      arToolkitContext.arController.orientation = "portrait";
    });

    //MARKER

    const markerRoot = new THREE.Group();
    markerRoot.scale.set(0.5, 0.5, 0.5);
    scene.add(markerRoot);
    let markerControls = new ArMarkerControls(arToolkitContext, markerRoot, {
      type: "pattern",
      patternUrl: markerPattern,
      changeMatrixMode: "modelViewMatrix",
      smooth: true,
      smoothCount: 5,
      smoothTolerance: 0.01,
      smoothThreshold: 2,
    });

    //MODEL

    let loader = new GLTFLoader();
    loader.load(this.artworks[this.progression].model, function (gltf) {
      markerRoot.add(gltf.scene);
    });

    function update() {
      if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
      }
    }

    function render() {
      renderer.render(scene, camera);
    }

    const animate = () => {
      this.raf = requestAnimationFrame(animate);
      deltaTime = clock.getDelta();
      totalTime += deltaTime;
      update();
      render();
    };

    window.addEventListener("click", () => {
      this.transition();
      let mesh = markerRoot.children[0];
      scene.add(mesh);
      mesh.scale.set(0.8, 0.8, 0.8);
      const tl = gsap.timeline();
      tl.to(mesh.position, {
        duration: 2,
        y: 0,
        x: 0,
        z: 0,
        ease: "power2.out",
      })
        .to(mesh.rotation, {
          duration: 2,
          y: 0,
          x: 0,
          z: 0,
          ease: "power2.out",
          delay: -2,
        })
        .to(document.getElementById("arjs-video"), {
          duration: 1,
          opacity: 0,
          ease: "power2.out",
          delay: 0,
        })
        .to(document.getElementById("artwork"), {
          duration: 1,
          opacity: 1,
          ease: "power2.out",
          delay: 0,
        });
    });
    animate();
  },
  unmounted() {
    cancelAnimationFrame(this.raf);
  },
});
</script>

<template>
  <header>
    <BackButton v-if="!isCollected" class="back" />
    <HelpButton class="help" />
  </header>
  <main>
    <div class="experience">
      <div ref="video" class="video"></div>
      <div ref="canvas" class="canvas"></div>
    </div>
    <div
      v-show="isCollected"
      id="artwork"
      :class="{ active: isCollected }"
      class="artwork"
    >
      <div class="model">
        <h1 class="styled">{{ artworks[progression].decoration }}</h1>
      </div>
      <div class="title">
        <h3>{{ artworks[progression].title }}</h3>
        <TwoLinesDecoration class="decoration" />
      </div>
      <p class="large">{{ artworks[progression].artist }}</p>
      <p class="light">{{ artworks[progression].moment }}</p>
    </div>
  </main>
  <footer>
    <BaseButton
      v-show="isCollected"
      :class="{ active: isCollected }"
      class="base-button"
      icon="book"
      page="/story"
      text="Continuer l’histoire"
      @click="progress"
    />
  </footer>
</template>

<style lang="scss" scoped>
header {
  .back {
    z-index: 3;
    position: absolute;
    top: 80px;
    left: 24px;
  }

  .help {
    z-index: 3;
    position: absolute;
    top: 24px;
    right: 24px;
  }
}

main {
  width: 100%;
  height: 100%;

  .experience {
    width: 100%;
    height: 100%;

    div {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }

  .artwork {
    z-index: 6;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    padding: 80px 24px 32px;
    height: 100%;
    width: 100%;

    .model {
      width: 100%;
      height: calc(var(--vh) * 42);
      display: flex;
      justify-content: center;

      .styled {
        position: absolute;
        bottom: 32px;
        transform: rotate(-15deg);
        z-index: 1000;
      }
    }

    .title {
      position: relative;
      z-index: 10;
      padding: 8px 0;

      .decoration {
        left: 28ch;
      }
    }
  }
}

footer {
  width: 100%;

  .base-button {
    z-index: 8;
    position: absolute;
    bottom: 48px;
    right: 32px;
  }
}
</style>
