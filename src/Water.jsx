/* eslint-disable react/no-unknown-property */

const Water = () => {
  return (
    <mesh position-y={-0.1} rotation-x={-Math.PI / 2}>
      <meshPhysicalMaterial transmission={1} roughness={0.3} />
      <planeGeometry args={[10, 10, 1, 1]} />
    </mesh>
  );
};

export default Water;
