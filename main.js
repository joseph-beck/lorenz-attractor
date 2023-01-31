import Scene from './src/scene'

function main() {
    const scene = new Scene();
    scene.initialize();
    scene.load();
    scene.animate();
}

main();