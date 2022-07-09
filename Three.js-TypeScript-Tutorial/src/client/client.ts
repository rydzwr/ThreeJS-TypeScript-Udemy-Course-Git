import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0xffff,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

var xSpeed = 0.0002;
var ySpeed = 0.0002;

function detectKeys(){
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event: { which: any }) {
        var keyCode = event.which;
        if (keyCode == 87) {
            cube.rotation.y += ySpeed;
        } else if (keyCode == 83) {
            cube.rotation.y -= ySpeed;
        } else if (keyCode == 65) {
            cube.rotation.x -= xSpeed;
        } else if (keyCode == 68) {
            cube.rotation.x += xSpeed;
        } else if (keyCode == 32) {
            cube.rotation.set(0, 0, 0);
        }
    };
}

const stats = Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder("CUBE");
const cameraFolder = gui.addFolder("CAMERA");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cameraFolder.add(camera.position, "x", 0, 10);
cameraFolder.add(camera.position, "y", 0, 10);
cameraFolder.add(camera.position, "z", 0, 10);
function animate() {
    requestAnimationFrame(animate)

    detectKeys();

    cube.rotation.x += xSpeed
    cube.rotation.y += ySpeed

    render()
    stats.update();
}

function render() {
    renderer.render(scene, camera)
}

animate()