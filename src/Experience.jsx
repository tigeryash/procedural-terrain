/* eslint-disable react/no-unknown-property */
import { Environment, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls />
      <Environment
        background
        preset="city"
        backgroundIntensity={1}
        environmentIntensity={0.6}
        resolution={2048}
      />

      <mesh position={[0, -5, 5]} receiveShadow>
        <boxGeometry args={[15, 15, 0]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <directionalLight
        position={[0.25, 2, -2.25]}
        intensity={2.6}
        color={"#ffffff"}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={15}
      />
      <ambientLight intensity={0.3} />
    </>
  );
}

export default Experience;
