import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import "../css/CarSimulation.css";

const CarSimulation = () => {
  const mountRef = useRef(null);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const [cameraMode, setCameraMode] = useState('first-person');
  
  // Store camera mode in a ref for access in animation loop
  const cameraModeRef = useRef(cameraMode);
  
  // Update the ref whenever cameraMode changes
  useEffect(() => {
    cameraModeRef.current = cameraMode;
  }, [cameraMode]);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.FogExp2(0x87CEEB, 0.002);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // Road
    const roadGeometry = new THREE.PlaneGeometry(100, 1000);
    const roadMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      roughness: 0.8
    });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.y = -0.5;
    road.receiveShadow = true;
    scene.add(road);

    // Road markings
    const lineCount = 50;
    const lineGeometry = new THREE.PlaneGeometry(1, 10);
    const lineMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const lineMeshes = [];
    
    for (let i = 0; i < lineCount; i++) {
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.rotation.x = -Math.PI / 2;
      line.position.set(0, -0.45, i * -20);
      line.receiveShadow = true;
      lineMeshes.push(line);
      scene.add(line);
    }

    // Car variables
    let car = null;
    let wheels = [];
    const carState = {
      speed: 0,
      maxSpeed: 100,
      acceleration: 0.2,
      deceleration: 0.3,
      turnSpeed: 1.2,
      wheelTurnAngle: 0,
      movingForward: true
    };

    // Camera variables
    const thirdPersonOffset = new THREE.Vector3(0, 2, 5);
    const cameraTarget = new THREE.Vector3();
    let lastCameraMode = cameraModeRef.current;

    // Load car model
    const loader = new GLTFLoader();
    loader.load(
      '/models/car.glb',
      (gltf) => {
        car = gltf.scene;
        car.scale.set(1, 1, 1);
        car.position.set(0, 0, 0);
        
        car.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.frustumCulled = true;
            
            if (child.material) {
              child.material.roughness = 0.8;
              child.material.metalness = 0.2;
            }
            
            if (child.name.includes('wheel') || child.name.includes('tire')) {
              wheels.push(child);
            }
          }
        });

        scene.add(car);
      },
      undefined,
      (error) => {
        console.error('Error loading car model:', error);
        const carBody = new THREE.Mesh(
          new THREE.BoxGeometry(3, 1.5, 5),
          new THREE.MeshStandardMaterial({ color: 0xff0000 })
        );
        carBody.position.y = 0.75;
        
        const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 8);
        const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        
        for (let i = 0; i < 4; i++) {
          const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
          wheel.rotation.z = Math.PI / 2;
          wheel.position.x = i < 2 ? -1.5 : 1.5;
          wheel.position.y = 0.3;
          wheel.position.z = i % 2 === 0 ? -2 : 2;
          wheels.push(wheel);
          carBody.add(wheel);
        }
        
        car = carBody;
        scene.add(car);
      }
    );

    // Environment
    const treeCount = 10;
    const treeGeometry = new THREE.ConeGeometry(1, 3, 4);
    const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 4);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

    for (let i = 0; i < treeCount; i++) {
      const tree = new THREE.Group();
      const leaves = new THREE.Mesh(treeGeometry, treeMaterial);
      leaves.position.y = 2;
      leaves.castShadow = true;
      
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = 0.5;
      trunk.castShadow = true;
      
      tree.add(leaves);
      tree.add(trunk);
      tree.position.x = (Math.random() - 0.5) * 80;
      tree.position.z = -Math.random() * 200;
      scene.add(tree);
    }

    // Controls
    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      KeyC: false
    };

    const handleKeyDown = (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
        e.preventDefault();
        
        if (e.key === 'KeyC' && !e.repeat) {
          setCameraMode(prev => {
            const newMode = prev === 'first-person' ? 'third-person' : 'first-person';
            return newMode;
          });
        }
      }
    };

    const handleKeyUp = (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Animation loop
    const animate = (time) => {
      requestRef.current = requestAnimationFrame(animate);
      
      if (previousTimeRef.current !== undefined) {
        const delta = Math.min((time - previousTimeRef.current) / 1000, 0.1);
        previousTimeRef.current = time;

        if (car) {
          // Handle immediate camera mode changes
          if (cameraModeRef.current !== lastCameraMode) {
            lastCameraMode = cameraModeRef.current;
            
            // Reset camera position when switching modes
            if (lastCameraMode === 'first-person') {
              camera.position.copy(car.position);
              camera.position.y += 1.5;
              camera.rotation.copy(car.rotation);
            } else {
              const carDirection = new THREE.Vector3();
              car.getWorldDirection(carDirection);
              camera.position.copy(car.position)
                .add(new THREE.Vector3(0, thirdPersonOffset.y, 0))
                .add(carDirection.clone().multiplyScalar(-thirdPersonOffset.z));
              cameraTarget.copy(car.position).add(carDirection.multiplyScalar(10));
              camera.lookAt(cameraTarget);
            }
          }

          // Speed control
          if (keys.ArrowUp) {
            carState.speed = THREE.MathUtils.lerp(carState.speed, carState.maxSpeed, carState.acceleration * delta);
          } else if (keys.ArrowDown) {
            carState.speed = THREE.MathUtils.lerp(carState.speed, -carState.maxSpeed * 0.5, carState.acceleration * delta);
          } else {
            carState.speed = THREE.MathUtils.lerp(carState.speed, 0, carState.deceleration * delta);
          }

          carState.movingForward = carState.speed >= 0;

          // Steering
          if (Math.abs(carState.speed) > 0.01) {
            if (keys.ArrowLeft) {
              car.rotation.y += carState.turnSpeed * (carState.movingForward ? 1 : -1) * Math.abs(carState.speed) * delta;
              carState.wheelTurnAngle = Math.min(carState.wheelTurnAngle + 0.05 * delta, 0.5);
            } else if (keys.ArrowRight) {
              car.rotation.y -= carState.turnSpeed * (carState.movingForward ? 1 : -1) * Math.abs(carState.speed) * delta;
              carState.wheelTurnAngle = Math.max(carState.wheelTurnAngle - 0.05 * delta, -0.5);
            } else {
              carState.wheelTurnAngle = THREE.MathUtils.lerp(carState.wheelTurnAngle, 0, 0.1 * delta);
            }
          }

          // Movement
          const forwardVector = new THREE.Vector3();
          car.getWorldDirection(forwardVector);
          car.position.add(forwardVector.multiplyScalar(-carState.speed * delta * 60));

          // Wheel animation
          wheels.forEach((wheel, index) => {
            if (index < 2) {
              wheel.rotation.y = carState.wheelTurnAngle;
            }
            wheel.rotation.x -= carState.speed * 2 * delta * 60;
          });

          // Camera update based on mode
          if (lastCameraMode === 'first-person') {
            // First-person camera
            camera.position.copy(car.position);
            camera.position.y += 1.5;
            camera.rotation.copy(car.rotation);
          } else {
            // Third-person camera
            const carDirection = new THREE.Vector3();
            car.getWorldDirection(carDirection);
            
            const desiredPosition = car.position.clone()
              .add(new THREE.Vector3(0, thirdPersonOffset.y, 0))
              .add(carDirection.clone().multiplyScalar(-thirdPersonOffset.z));
            
            camera.position.lerp(desiredPosition, 5 * delta);
            
            cameraTarget.copy(car.position)
              .add(carDirection.multiplyScalar(10));
            camera.lookAt(cameraTarget);
          }

          // Update road markings
          if (car.position.z < lineMeshes[0].position.z - 20) {
            const line = lineMeshes.shift();
            line.position.z = lineMeshes[lineMeshes.length - 1].position.z + 20;
            lineMeshes.push(line);
          }
        }
      } else {
        previousTimeRef.current = time;
      }

      renderer.render(scene, camera);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [cameraMode]);

  return (
    <div className="relative h-screen w-full">
      <h1 className="absolute top-4 left-0 right-0 text-center text-3xl text-white z-10">
        Car Simulation
      </h1>
      <div 
        ref={mountRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute bottom-4 left-0 right-0 text-center text-white z-10">
        Use arrow keys to drive: ↑ accelerate, ↓ brake, ← → steer
        <br />
        Press 'C' to toggle camera view (Current: {cameraMode.replace('-', ' ')})
      </div>
    </div>
  );
};

export default CarSimulation;