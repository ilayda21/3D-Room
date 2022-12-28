import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default class Camera {
  constructor(sizes, scene, canvas) {
    this.sizes = sizes;
    this.scene = scene;
    this.canvas = canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControl();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      100
    );

    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.z = 5;
  }

  createOrthographicCamera() {
    this.frustrum = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -100,
      100
    );

    this.scene.add(this.orthographicCamera);

    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  setOrbitControl() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.updateProjectionMatrix();

    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
  }

  update() {
    this.controls.update();
  }
}