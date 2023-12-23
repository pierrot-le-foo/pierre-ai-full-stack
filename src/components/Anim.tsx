import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function Anim() {
  return (
    <Canvas
      className="w-full h-screen relative"
      camera={{ near: 0.1, far: 1000 }}
    >
      <Suspense fallback={null}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
      </Suspense>
    </Canvas>
  );
}
