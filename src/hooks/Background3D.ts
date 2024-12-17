import * as THREE from "three";

export default function use3DBackground(ip_port) {

// 场景
const scene = new THREE.Scene();
// 相机
const camera = new THREE.PerspectiveCamera(
  435,
  window.innerWidth / window.innerHeight,
  0.06,
  1000
);
camera.position.set(0, 0, 5.5);

// 渲染器
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight*1.08);
document.body.appendChild(renderer.domElement);

// 加载纹理
const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load("/assets/cat.jpg");
// const depthTexture = textureLoader.load("/assets/cat_depth.jpg");

const texture = textureLoader.load(ip_port + '/image/static/background3.jpg');
const depthTexture = textureLoader.load(ip_port + '/image/static/background3.jpg');

// 创建平面
const geometry = new THREE.PlaneGeometry(19.2, 12);
// const material = new THREE.MeshBasicMaterial({ map: texture });
// 鼠标坐标
const mouse = new THREE.Vector2();

// 着色器材质
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: texture },
    uDepthTexture: { value: depthTexture },
    uMouse: { value: mouse },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform sampler2D uDepthTexture;
    uniform vec2 uMouse;
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vec4 color = texture2D(uTexture, vUv);
      vec4 depth = texture2D(uDepthTexture, vUv);
      float depthValue = depth.r;
      float x = vUv.x + (uMouse.x+sin(uTime))*0.01*depthValue;
      float y = vUv.y + (uMouse.y+cos(uTime))*0.01*depthValue;
      vec4 newColor = texture2D(uTexture, vec2(x, y));
      gl_FragColor = newColor;
    }
  `,
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// 渲染
requestAnimationFrame(function animate() {
  material.uniforms.uMouse.value = mouse;
  material.uniforms.uTime.value = performance.now() / 1000;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
});

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

}