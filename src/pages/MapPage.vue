<script lang="ts">
import { defineComponent } from "vue";
import { useExperienceStore } from "@/stores/Experience";

import ChapterHeader from "@/components/headers/ChapterHeader.vue";
import HelpButton from "@/components/buttons/HelpButton.vue";
import CameraButton from "@/components/buttons/CameraButton.vue";

import * as THREE from "three";
import { PerspectiveCamera } from "three";
import { gsap } from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import checkpoints from "@/data/checkpoints";
import mapUrl from "@/assets/models/map/map.svg";
import arrowUrl from "@/assets/models/map/arrow.glb";

let pos = {
  x: 0,
  y: 0,
};

export default defineComponent({
  components: { CameraButton, HelpButton, ChapterHeader },
  data() {
    return {
      progression: 1 as number,
    };
  },
  methods: {
    getProgression(): void {
      const experienceStore = useExperienceStore();
      this.progression = experienceStore.progression;
    },
    map() {
      const sizes = {
        x: window.innerWidth,
        y: window.innerHeight,
        mapX: 12,
        mapY: 24,
        mapZ: 0.5,
      };

      const clock = new THREE.Clock();

      const scene = new THREE.Scene();
      const camera = new PerspectiveCamera(75, sizes.x / sizes.y, 0.01, 1000);

      camera.rotation.x = Math.PI / 2;
      camera.position.z = -sizes.mapZ / 2;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(sizes.x, sizes.y);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      // @ts-ignore
      this.$refs.main.appendChild(renderer.domElement);

      const map = initMap();
      let arrow: THREE.Mesh | void = initArrow();

      renderer.setClearColor(0x000000, 0);

      const points = new THREE.Group();
      for (let i = 0; i < checkpoints.length; i++) {
        points.add(initPoint(checkpoints[i]));
      }

      // Environement :
      const env = new THREE.Group();
      env.add(map);
      env.add(points);
      env.position.y = sizes.mapX;
      scene.add(env);

      const navigation = {
        currentPoint: 0,
        path: [
          {
            x: 7,
            y: 2,
          },
          {
            x: 15,
            y: -2,
          },
          {
            x: 19,
            y: -10,
          },
          {
            x: 19,
            y: -19.5,
          },
          {
            x: 44.5,
            y: -19,
          },
          {
            x: 44.5,
            y: 0,
          },
          {
            x: 74,
            y: 3,
          },
          {
            x: 80,
            y: 15,
          },
          {
            x: 82.5,
            y: 40,
          },
          {
            x: 83.5,
            y: 40,
          },
          {
            x: 83.5,
            y: 35.5,
          },
          {
            x: 97,
            y: 35.5,
          },
        ],
      };

      // Camera group :
      const camGroup = new THREE.Group();
      camGroup.add(camera);
      scene.add(camGroup);

      // Lights :
      const spotLight = new THREE.SpotLight(0xffffff, 1);
      spotLight.position.set(-1, -1, 1);
      spotLight.rotation.set(-Math.PI / 2, 0, 0);
      scene.add(spotLight);

      const light = new THREE.AmbientLight(0x404040); // soft white light
      scene.add(light);

      travelOnMap();

      // Animate :
      const animate = () => {
        window.requestAnimationFrame(animate);

        const nearest = getNearest();
        const nearestPos = getRealPosition(nearest.position);
        const dist = Math.sqrt(
          Math.abs(nearestPos.x - camera.position.x) ** 2 +
            Math.abs(nearestPos.y - camera.position.y) ** 2
        );

        gsap.to(nearest.rotation, {
          z: pos.x,
          duration: 0,
        });

        if (dist < 1 && dist > -1) {
          const angle =
            pos.x -
            Math.atan2(
              nearestPos.y - camera.position.y,
              nearestPos.x - camera.position.x
            );
          const distance = camera.position.distanceTo(nearestPos);

          arrow &&
            gsap.to(arrow.position, {
              x: distance * Math.cos(-angle),
              y: distance * Math.sin(-angle),
              z:
                -sizes.mapZ +
                0.075 +
                Math.cos(clock.getElapsedTime() * 2) * 0.01,
              duration: 0,
            });

          arrow &&
            gsap.to(arrow.rotation, {
              x: Math.PI / 2,
              y: arrow.rotation.y + 0.01,
              z: -Math.PI / 2,
              duration: 0,
            });

          nearest.children[1]?.traverse((o: any) => {
            if (o.isMesh && o?.material?.opacity !== 1) {
              gsap.to(o.material, {
                opacity: 1,
                duration: 1,
              });
            }
          });
        } else {
          points.children.forEach((p: any) => {
            p.children[1]?.traverse((o: any) => {
              if (o.isMesh && o?.material?.opacity !== 0) {
                gsap.to(o.material, {
                  opacity: 0,
                  duration: 1,
                });
              }
            });
          });

          arrow &&
            gsap.to(arrow.position, {
              x: 0,
              y: sizes.mapZ,
              z: -sizes.mapZ + 0.025 + pos.y * 0.05,
              duration: 0.1,
            });

          arrow &&
            gsap.to(arrow.rotation, {
              x: Math.PI / 2 + pos.y * 0.2,
              y:
                Math.atan2(
                  nearestPos.y - camGroup.position.y,
                  nearestPos.x - camGroup.position.x
                ) - pos.x,
              z: 0,
              duration: 0,
            });
        }

        camGroup.rotation.z = pos.x;

        renderer.render(scene, camera);
      };
      animate();

      // Events :
      window.addEventListener("resize", () => {
        sizes.x = window.innerWidth;
        sizes.y = window.innerHeight;

        camera.aspect = sizes.x / sizes.y;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.x, sizes.y);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });

      function initMap(): THREE.Mesh {
        const mapGeometry = new THREE.PlaneGeometry(sizes.mapX, sizes.mapY);
        const mapTexture = new THREE.TextureLoader().load(mapUrl);

        const mapMaterial = new THREE.MeshBasicMaterial({
          map: mapTexture,
        });

        mapMaterial.transparent = true;

        const mapMesh = new THREE.Mesh(mapGeometry, mapMaterial);

        mapMesh.position.z -= sizes.mapZ;
        return mapMesh;
      }

      function initArrow(): void {
        const loader = new GLTFLoader();
        loader.load(
          arrowUrl,
          (gltf: any) => {
            const ArrowMesh = gltf.scene.children[0];
            camGroup.add(ArrowMesh);
            ArrowMesh.scale.set(0.05, 0.05, 0.05);
            ArrowMesh.position.set(0, sizes.mapZ, -sizes.mapZ);

            arrow = ArrowMesh;
          },
          (xhr: any) => {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          (error: any) => {
            console.log("An error happened");
          }
        );
      }

      function getNearest() {
        return points.children.sort((a, b) => {
          return (
            getRealPosition(a.position).distanceTo(camera.position) -
            getRealPosition(b.position).distanceTo(camera.position)
          );
        })[0];
      }

      function getRealPosition(point: THREE.Vector3): THREE.Vector3 {
        return new THREE.Vector3(
          point.x + env.position.x,
          point.y + env.position.y,
          point.z + env.position.z
        );
      }

      function initPoint(infos = { x: 50, y: 0, model: "" }): THREE.Group {
        const scale = 0.25;
        const pointGroup = new THREE.Group();
        const pointGeometry = new THREE.OctahedronGeometry(0.2, 0);
        const pointMaterial = new THREE.MeshStandardMaterial({
          color: 0xffc31e,
          metalness: 0.5,
          roughness: 0.2,
        });
        const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);

        pointGroup.add(pointMesh);

        pointMesh.scale.set(scale / 1.5, scale / 1.5, scale);

        const loader = new GLTFLoader();
        loader.load(
          infos.model,
          (gltf: any) => {
            const painting = gltf.scene;
            pointGroup.add(painting);

            const scale = 0.1;
            painting.scale.set(scale, scale, scale);
            painting.rotation.set(Math.PI / 2, 0, 0);
            painting.position.set(0, 0, 0.25);
            painting.traverse((o: any) => {
              if (o.isMesh) {
                o.material.transparent = true;
                o.material.opacity = 0;
              }
            });
          },
          (xhr: any) => {
            // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          (error: any) => {
            console.log("An error happened");
          }
        );

        setPositionOnMap(pointGroup, infos.y, infos.x, -sizes.mapZ);

        return pointGroup;
      }

      function setPositionOnMap(
        element: THREE.Mesh | THREE.Group,
        y: number = 0,
        x: number = 0,
        z: number = -sizes.mapZ
      ) {
        element.position.set(
          (x / 100) * sizes.mapX - sizes.mapX / 2,
          (y / 100) * sizes.mapY - sizes.mapY / 2,
          z
        );
      }

      function travelOnMap() {
        setCameraPosition(
          navigation.path[navigation.currentPoint].x,
          navigation.path[navigation.currentPoint].y,
          3
        );
      }

      function setCameraPosition(x = 0, y = 0, speed = 3) {
        const currentPos = env.position;
        const newPos = {
          x: ((y + 50) / 100) * sizes.mapX - sizes.mapX / 2,
          y: ((-x + 100) / 100) * sizes.mapY - sizes.mapY / 2,
        };
        const duration =
          getSpeedIndex(new THREE.Vector3(newPos.x, newPos.y, 0), currentPos) *
          speed;

        gsap.to(env.position, {
          x: newPos.x,
          y: newPos.y,
          duration: duration,
          ease: "none",
        });

        setTimeout(() => {
          navigation.currentPoint++;
          if (navigation.currentPoint < navigation.path.length) {
            travelOnMap();
          }
        }, duration * 1000);
      }

      function getSpeedIndex(pos1: THREE.Vector3, pos2: THREE.Vector3) {
        return pos1.distanceTo(pos2);
      }
    },
    init,
  },
  mounted() {
    this.getProgression();
    this.map();
  },
});

function init() {
  if (!window.DeviceOrientationEvent) {
    alert("device orientation not available on your device");
    return;
  }

  const deviceOrientationPermission = () => {
    return new Promise((resolve, reject) => {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission === "function"
      ) {
        (
          (
            DeviceOrientationEvent as any
          ).requestPermission() as Promise<PermissionState>
        )
          .then((permissionState) => {
            if (permissionState === "granted") {
              resolve("granted");
            }
          })
          .catch(reject);
      } else {
        if (navigator.userAgent.indexOf("Mobile") === -1) {
          reject("Not a mobile device");
        }
        resolve("granted"); // we suppose it's automatically granted (android)
      }
    });
  };

  deviceOrientationPermission()
    .then((result) => {
      if (result === "granted") {
        alert("si c bueno");
        window.addEventListener("deviceorientation", (event) => {
          const rotateDegrees = event.alpha; // alpha: rotation around z-axis
          const frontToBack = event.beta; // beta: front back motion
          pos = {
            ...pos,
            x: ((rotateDegrees || 0) * Math.PI) / 180,
            y: ((frontToBack || 0) * Math.PI) / 180,
          };
        });
      }
    })
    .catch((err) => {
      alert(err.toString());
    });
}
</script>

<template>
  <header>
    <ChapterHeader />
    <HelpButton class="help" />
    <p @click="init" class="light">
      Œuvres trouvés : <span class="bold">{{ progression }}/6</span>
    </p>
  </header>
  <main ref="main"></main>
  <footer>
    <CameraButton class="camera" size="3x" />
  </footer>
</template>

<style lang="scss" scoped>
header {
  z-index: 2000;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 64px 48px 8vh;
  gap: 64px;
  background: var(--gradient-black-down);

  .help {
    z-index: 3;
    position: absolute;
    top: 24px;
    right: 24px;
  }
}

footer {
  width: 100%;
  z-index: 100;
  .camera {
    z-index: 3;
    position: absolute;
    bottom: 80px;
    right: 32px;
  }
}
</style>
