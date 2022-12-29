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
    this.perspectiveCamera.position.z = 12;
    this.perspectiveCamera.position.x = 29;
    this.perspectiveCamera.position.y = 14;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );

    this.orthographicCamera.position.y = 3.5;
    this.orthographicCamera.position.z = 5;
    this.orthographicCamera.rotation.x = -Math.PI / 6;

    this.scene.add(this.orthographicCamera);

    // this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    // const size = 20;
    // const divisions = 20;
    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);
  }

  setOrbitControl() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;
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
    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update();
    // this.helper.position.copy(this.orthographicCamera.position);
    // this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
