import { Suspense } from "react";
import { Canvas, useLoader, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader, SphereGeometry } from "three";
import { useThree } from "@react-three/fiber";


extend({ SphereGeometry });

function Scene() {
  const texture = "/contactus/world-map2.png";
  const colorMap = useLoader(TextureLoader, texture);
  const { viewport } = useThree();

  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight />
      <mesh scale={viewport.width / 14}>
        <sphereGeometry args={[3.0, 30, 30]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  );
}

export default function Globe() {
  return (
    <div className="w-1/2 h-full absolute right-0">
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls autoRotate />
        </Suspense>
      </Canvas>
    </div>
  );
}
