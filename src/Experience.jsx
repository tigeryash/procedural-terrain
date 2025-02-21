/* eslint-disable react/no-unknown-property */
import { Base, Geometry, Subtraction } from "@react-three/csg";
import { Environment, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Terrain from "./Terrain";
import bg from "./static/spruit_sunrise.hdr";
import Water from "./Water";

function Experience() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls />
      <Environment
        background
        files={bg}
        backgroundIntensity={0.3}
        backgroundBlurriness={0.5}
      />

      <mesh castShadow receiveShadow>
        <meshStandardMaterial color={"#ffffff"} roughness={0.3} metalness={0} />
        <Geometry>
          <Base>
            <boxGeometry args={[11, 2, 11]} />
          </Base>
          <Subtraction>
            <boxGeometry args={[10, 2.1, 10]} />
          </Subtraction>
        </Geometry>
        <Water />
        <Terrain />
      </mesh>

      <directionalLight
        position={[6.25, 3, 4]}
        intensity={2.6}
        color={"#ffffff"}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-camera-near={0.1}
      />
      <ambientLight intensity={0.3} />
    </>
  );
}

export default Experience;
