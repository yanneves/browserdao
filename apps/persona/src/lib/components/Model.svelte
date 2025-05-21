<script>
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import {
    AmbientLight,
    Box3,
    Clock,
    DirectionalLight,
    LinearToneMapping,
    MeshPhongMaterial,
    MixOperation,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer,
  } from "three";
  import { OrbitControls } from "three/addons/controls/OrbitControls";
  import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

  let ref, mesh;
  let { class: classes } = $props();

  let originalVertices = [];
  let currentRandomOffsets = []; // Current active random values
  let targetRandomOffsets = []; // Target random values we're transitioning to
  let lastRandomUpdate = 0; // Time tracking for random updates

  const clock = new Clock();

  // Animation configuration
  const WAVE = {
    x: { amplitude: 0.05, frequency: 1.5, speed: 2.0 }, // X-axis wave parameters
    y: { amplitude: 0.1, frequency: 2.0, speed: 1.5 }, // Y-axis wave parameters
    z: { amplitude: 0.05, frequency: 2.5, speed: 3.0 }, // Z-axis wave parameters
  };

  // Randomness configuration
  const RANDOM = {
    enabled: true, // Toggle randomness on/off
    strength: 0.1, // How much random movement to add
    updateInterval: 3, // How often to change random values (seconds)
    transitionSpeed: 0.3, // How quickly to transition to new random values (higher = faster)
  };

  // Initialize arrays of random values
  function initializeRandomOffsets(vertexCount) {
    currentRandomOffsets = [];
    targetRandomOffsets = [];

    for (let i = 0; i < vertexCount; i++) {
      // Start with no offset
      currentRandomOffsets.push({ x: 0, y: 0, z: 0 });

      // Set initial target values
      targetRandomOffsets.push({
        x: (Math.random() - 0.5) * RANDOM.strength,
        y: (Math.random() - 0.5) * RANDOM.strength,
        z: (Math.random() - 0.5) * RANDOM.strength,
      });
    }
  }

  // Generate new target random values
  function updateTargetRandomOffsets() {
    for (let i = 0; i < targetRandomOffsets.length; i++) {
      targetRandomOffsets[i] = {
        x: (Math.random() - 0.5) * RANDOM.strength,
        y: (Math.random() - 0.5) * RANDOM.strength,
        z: (Math.random() - 0.5) * RANDOM.strength,
      };
    }
  }

  class Viewer {
    constructor(el) {
      this.el = el;

      this.state = {
        // Lights
        exposure: 0.0,
        toneMapping: LinearToneMapping,
        ambientIntensity: 0.3,
        ambientColor: "#FFFAE5",
        directIntensity: 0.8 * Math.PI,
        directColor: "#FFFAE5",

        pointSize: 1.0,
      };

      this.scene = new Scene();

      const aspect = el.clientWidth / el.clientHeight;
      this.camera = new PerspectiveCamera(45, aspect, 1, 1000);
      this.scene.add(this.camera);

      this.renderer = new WebGLRenderer({
        alpha: true,
        premultipliedAlpha: false,
      });
      this.renderer.shadowMap.enabled = true;
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(el.clientWidth, el.clientHeight);
      this.renderer.toneMapping = Number(this.state.toneMapping);
      this.renderer.toneMappingExposure = Math.pow(2, this.state.exposure);

      // Lights
      const light1 = new AmbientLight(
        this.state.ambientColor,
        this.state.ambientIntensity,
      );
      light1.intensity = this.state.ambientIntensity;
      light1.color.set(this.state.ambientColor);
      light1.name = "ambient_light";
      this.camera.add(light1);

      const light2 = new DirectionalLight(
        this.state.directColor,
        this.state.directIntensity,
      );
      light2.position.set(0.5, 0, 0.866); // ~60º
      light2.intensity = this.state.directIntensity;
      light2.color.set(this.state.directColor);
      light2.name = "main_light";
      this.camera.add(light2);

      // Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.screenSpacePanning = false;

      this.controls.enableZoom = false;
      this.controls.enablePan = false;
      this.controls.enableRotate = false;

      this.el.appendChild(this.renderer.domElement);

      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
      window.addEventListener("resize", this.resize.bind(this), false);
    }

    animate() {
      requestAnimationFrame(this.animate);

      this.controls.update();
      this.render();
    }

    render() {
      const time = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Check if it's time to update random target values
      if (RANDOM.enabled && time - lastRandomUpdate > RANDOM.updateInterval) {
        updateTargetRandomOffsets();
        lastRandomUpdate = time;
      }

      // Only animate if mesh and its geometry are loaded
      if (mesh?.geometry.attributes.position.count) {
        // Smoothly transition current random values toward target values
        if (RANDOM.enabled) {
          for (let i = 0; i < currentRandomOffsets.length; i++) {
            currentRandomOffsets[i].x +=
              (targetRandomOffsets[i].x - currentRandomOffsets[i].x) *
              RANDOM.transitionSpeed *
              delta;
            currentRandomOffsets[i].y +=
              (targetRandomOffsets[i].y - currentRandomOffsets[i].y) *
              RANDOM.transitionSpeed *
              delta;
            currentRandomOffsets[i].z +=
              (targetRandomOffsets[i].z - currentRandomOffsets[i].z) *
              RANDOM.transitionSpeed *
              delta;
          }
        }

        // Apply undulation to each vertex individually
        for (let i = 0; i < mesh.geometry.attributes.position.count; i++) {
          const originalVertexX = originalVertices.getX(i);
          const originalVertexY = originalVertices.getY(i);
          const originalVertexZ = originalVertices.getZ(i);

          // Create undulating effect with sine/cosine waves on each axis
          const waveX =
            Math.sin(time * WAVE.x.speed + originalVertexY * WAVE.x.frequency) *
            WAVE.x.amplitude;
          const waveY =
            Math.sin(time * WAVE.y.speed + originalVertexZ * WAVE.y.frequency) *
            WAVE.y.amplitude;
          const waveZ =
            Math.cos(time * WAVE.z.speed + originalVertexX * WAVE.z.frequency) *
            WAVE.z.amplitude;

          // Apply offset to original vertex position with wave motion and smoothed random component
          mesh.geometry.attributes.position.setXYZ(
            i,
            originalVertexX +
              waveX +
              (RANDOM.enabled ? currentRandomOffsets[i].x : 0),
            originalVertexY +
              waveY +
              (RANDOM.enabled ? currentRandomOffsets[i].y : 0),
            originalVertexZ +
              waveZ +
              (RANDOM.enabled ? currentRandomOffsets[i].z : 0),
          );
        }

        // Tell Three.js that vertices have changed
        mesh.geometry.attributes.position.needsUpdate = true;
      }

      this.renderer.render(this.scene, this.camera);
    }

    resize() {
      const { clientHeight, clientWidth } = this.el;

      this.camera.aspect = clientWidth / clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(clientWidth, clientHeight);
    }

    load(url) {
      return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();

        loader.load(
          url,
          (gltf) => {
            const object = gltf.scene;
            const box = new Box3().setFromObject(object);
            const size = box.getSize(new Vector3()).length();
            const center = box.getCenter(new Vector3());

            gltf.scene.traverse((child) => {
              if (child.isMesh) {
                mesh = child;
              }
            });

            // Apply texture
            mesh.material = new MeshPhongMaterial({
              color: 0xffd400, // Base gold color
              emissive: 0x222200, // Subtle glow
              specular: 0xfff6cc, // Highlight color (slightly lighter than base)
              shininess: 80, // High shininess for metallic look
              reflectivity: 0.8, // Strong but not full reflectivity
              refractionRatio: 0.88,
              wireframe: true,
              combine: MixOperation,
            });

            // Store original vertices to use as reference points during animation
            originalVertices = mesh.geometry.attributes.position.clone();

            // Initialize random offsets arrays
            initializeRandomOffsets(originalVertices.count);

            this.controls.reset();

            object.position.x -= center.x;
            object.position.y -= center.y;
            object.position.z -= center.z;

            this.controls.maxDistance = size * 10;

            this.camera.near = size / 100;
            this.camera.far = size * 100;
            this.camera.updateProjectionMatrix();

            this.camera.position.copy(center);
            this.camera.position.x -= size / 2;
            this.camera.position.y += size / 5;
            this.camera.position.z += size * 1.3375;
            this.camera.lookAt(center);

            this.controls.saveState();

            this.scene.add(object);

            resolve(gltf);
          },
          undefined,
          reject,
        );
      });
    }
  }

  onMount(async () => {
    if (browser) {
      const viewer = new Viewer(ref);
      await viewer.load("/monkey.gltf");
    }
  });
</script>

<figure bind:this={ref} class={classes}></figure>
