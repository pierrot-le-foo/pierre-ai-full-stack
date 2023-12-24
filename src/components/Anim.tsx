import { KoiFish } from "@/models/KoiFish";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

export default function Anim() {
  const [isRotating, setIsRotating] = useState(false);

  return (
    <Canvas
      className={`relative bg-white ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
      camera={{ near: 0.1, far: 1000 }}
      style={{
        width: 200,
        height: 200,
        cursor: isRotating ? "grabbing" : "grab",
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 0, 5]} intensity={0} />
        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#000000"
          intensity={1}
        />

        <KoiFish isRotating={isRotating} setIsRotating={setIsRotating} />
      </Suspense>
    </Canvas>
  );
}
