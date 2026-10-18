import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const scene = new THREE.Scene()

/**CAMERA*/
const sizes = {
    width: 800,
    height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)


/** RENDERING */
const canvas = document.querySelector('canvas#three-ex')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/** CONTROLS */
const controls = new OrbitControls(camera, canvas)

/**3d MODEL*/
const gltfLoader = new GLTFLoader();
let gltfModel = null;
try {
    gltfModel = await gltfLoader.loadAsync('MODELS/TEST.gltf');
    console.log(gltfModel)  // always check the console first to see what's inside
    console.log("i'm in")
} catch (error) {
    console.log(error.message)
    console.log("i'm not in")
}

addAndRun()
function addAndRun(loadedObj) {
    console.log(loadedObj);
    let gltfModel = loadedObj.scene.children[0]
    scene.add(gltfModel);

    // The fox is huge -- scale it down
    gltfModel.scale.set(.015, .015, .015)

    window.requestAnimationFrame(animate);
    function animate() {
        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    }
}





camera.position.z = 3




//this stays at the very end, after everything has been added to the scene
renderer.render(scene, camera)

