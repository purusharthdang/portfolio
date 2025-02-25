import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useTypewriter } from '@/hooks/use-typewriter';

// TODO: Replace with your profile data
const SUMMARY = "I’m a frontend engineer who builds scalable apps, and can balance speed to market with clean, maintainable code through smart architecture and refactoring. I prioritize user needs, team collaboration, and engineering best practices to create seamless digital experiences.";

function FloatingLaptop() {
  const laptop = useRef<THREE.Group>(null);
  const screenImage = useTexture('/assets/profile.jpg');
  const { viewport } = useThree();

  const responsiveScale = Math.min(1, viewport.width / 5);


  useFrame((state) => {
    if (laptop.current) {
      laptop.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      laptop.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  const createKeys = () => {
    const keys = [];
    const keySize = 0.15;
    const gap = 0.02;
    const rows = 4;
    const keysPerRow = [11, 10, 11, 10]; // Number of keys in each row

    for (let row = 0; row < rows; row++) {
      const rowOffset = (row * (keySize + gap));
      const numKeys = keysPerRow[row];
      const rowWidth = numKeys * (keySize + gap);
      const startX = -rowWidth / 2 + (row * keySize * 0.3); // Offset each row slightly

      for (let col = 0; col < numKeys; col++) {
        const x = 0.05 + startX + col * (keySize + gap);
        keys.push(
          <mesh
            key={`key-${row}-${col}`}
            position={[x, 0.05, -0.4 + rowOffset]}
            castShadow
          >
            <boxGeometry args={[keySize, 0.05, keySize]} />
            <meshStandardMaterial color="#6B5544" metalness={0.5} roughness={0.5} />
          </mesh>
        );
      }
    }
    return keys;
  };

  screenImage.anisotropy = 50

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={laptop} scale={responsiveScale}>
        {/* Laptop base with keyboard */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2, 0.1, 1.5]} />
          <meshStandardMaterial color="#8B7355" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Keyboard keys */}
        {createKeys()}

        {/* Trackpad */}
        <mesh position={[0, 0.06, 0.4]} castShadow>
          <boxGeometry args={[0.8, 0.02, 0.4]} />
          <meshStandardMaterial color="#6B5544" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Laptop screen */}
        <mesh position={[0, 0.6, -0.75]} rotation={[Math.PI * 0.1, 0, 0]} castShadow>
          <boxGeometry args={[2, 1.2, 0.1]} />
          <meshStandardMaterial color="#8B7355" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Screen content */}
        <mesh position={[0, 0.6, -0.69]} rotation={[Math.PI * 0.1, 0, 0]}>
          <planeGeometry args={[1.8, 1]} />
          <meshStandardMaterial map={screenImage} emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}


function FloatingCode() {
  const codeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (codeRef.current) {
      codeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, 0, 0]}>
      <group ref={codeRef}>
        <Text
          position={[0, 1.75, -1]}
          fontSize={0.4}
          color="#8B7355"
          anchorX="center"
          anchorY="middle"
        >
          {'</>'}
        </Text>
      </group>
    </Float>
  );
}

function FloatingText() {
  const text = useTypewriter(SUMMARY);
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 5);

  return (
    <Text
      scale={scale}
      position={[0, 2.25, 0]}
      fontSize={0.12}
      color="#8B7355"
      maxWidth={4.5}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}

function FloatingResume() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture("/assets/PurusharthResume_Frontend.jpg");
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const { viewport } = useThree();

  const responsiveScale = Math.min(1.75, viewport.width / 6);


  // Animate rotation and floating effect
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.9;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });

  // Function to download resume
  const handleDownload = () => {
    if (!isDownloaded) {
      const link = document.createElement("a");
      link.href = '/assets/PurusharthResume_Frontend.pdf';
      link.download = "PurusharthResume_Frontend.pdf";
      link.click();
      setIsDownloaded(true);
    }
  };

  texture.anisotropy = 50

  return (
    <mesh ref={meshRef} onClick={handleDownload} scale={responsiveScale} position={[-2, 0, 0.5]}>
      <planeGeometry args={[0.75, 1]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

function FloatingCoffee() {
  const coffee = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coffee.current) {
      coffee.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.5} floatIntensity={0.5} position={[2, 0, 0]}>
      <group ref={coffee}>
        {/* Coffee cup */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI * 0.1, 0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.2, 0.4, 32]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
        {/* Steam particles */}
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i} position={[
            (Math.random() - 0.2) * 5,
            (Math.random() - 0.2) * 5,
            (Math.random() - 0.2) * 5
          ]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#8B7355" opacity={0.5} transparent />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export function Scene() {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <FloatingLaptop />
      <FloatingCode />
      <FloatingCoffee />
      <FloatingText />
      <FloatingResume />
    </>
  );
}