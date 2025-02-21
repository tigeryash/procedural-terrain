/* eslint-disable react/no-unknown-property */
import CustomShaderMaterial from "three-custom-shader-material";
import CustomShaderMaterialVanilla from "three-custom-shader-material/vanilla";
import * as THREE from "three";
import terrainVertexShader from "./shaders/terrain/vertex.glsl";
import terrainFragmentShader from "./shaders/terrain/fragment.glsl";
import { useEffect, useMemo, useRef } from "react";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

const Terrain = () => {
  const ref = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uPositionFrequency: new THREE.Uniform(0.2),
      uStrength: new THREE.Uniform(2),
      uWarpFrequency: new THREE.Uniform(5),
      uWarpStrength: new THREE.Uniform(0.2),
      uColorWaterDeep: new THREE.Uniform(new THREE.Color(0x002b3d)),
      uColorWaterSurface: new THREE.Uniform(new THREE.Color(0x66a8ff)),
      uColorSand: new THREE.Uniform(new THREE.Color(0xffe894)),
      uColorGrass: new THREE.Uniform(new THREE.Color(0x85d534)),
      uColorSnow: new THREE.Uniform(new THREE.Color(0xffffff)),
      uColorRock: new THREE.Uniform(new THREE.Color(0xbfbd8d)),
    }),
    []
  );
  useControls({
    uPositionFrequency: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.001,
      onChange: (value) => {
        uniforms.uPositionFrequency.value = value;
      },
    },
    uStrength: {
      value: 2,
      min: 0,
      max: 10,
      step: 0.001,
      onChange: (value) => {
        uniforms.uStrength.value = value;
      },
    },
    uWarpFrequency: {
      value: 5,
      min: 0,
      max: 10,
      step: 0.001,
      onChange: (value) => {
        uniforms.uWarpFrequency.value = value;
      },
    },
    uWarpStrength: {
      value: 0.2,
      min: 0,
      max: 1,
      step: 0.001,
      onChange: (value) => {
        uniforms.uWarpStrength.value = value;
      },
    },
    uColorWaterDeep: {
      value: "#002b3d",
      onChange: (value) => {
        uniforms.uColorWaterDeep.value = new THREE.Color(value);
      },
    },
    uColorWaterSurface: {
      value: "#66a8ff",
      onChange: (value) => {
        uniforms.uColorWaterSurface.value = new THREE.Color(value);
      },
    },
    uColorSand: {
      value: "#ffe894",
      onChange: (value) => {
        uniforms.uColorSand.value = new THREE.Color(value);
      },
    },
    uColorGrass: {
      value: "#85d534",
      onChange: (value) => {
        uniforms.uColorGrass.value = new THREE.Color(value);
      },
    },
    uColorSnow: {
      value: "#ffffff",
      onChange: (value) => {
        uniforms.uColorSnow.value = new THREE.Color(value);
      },
    },
    uColorRock: {
      value: "#bfbd8d",
      onChange: (value) => {
        uniforms.uColorRock.value = new THREE.Color(value);
      },
    },
  });

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(10, 10, 500, 500);
    geo.deleteAttribute("normal");
    geo.deleteAttribute("uv");
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  const depthMaterial = useMemo(
    () =>
      new CustomShaderMaterialVanilla({
        baseMaterial: THREE.MeshDepthMaterial,
        vertexShader: terrainVertexShader,
        uniforms: uniforms,
        depthPacking: THREE.RGBADepthPacking, //the purpose of this is to store the depth in the alpha channel of the color
      }),
    [uniforms]
  );

  useEffect(() => {
    return () => {
      // Cleanup resources when the component unmounts
      if (ref.current) {
        ref.current.geometry.dispose();
        if (Array.isArray(ref.current.material)) {
          ref.current.material.forEach((material) => material.dispose());
        } else {
          ref.current.material.dispose();
        }
      }
    };
  }, []);
  return (
    <mesh
      ref={ref}
      geometry={geometry}
      receiveShadow
      castShadow
      customDepthMaterial={depthMaterial}
    >
      <CustomShaderMaterial
        baseMaterial={THREE.MeshStandardMaterial}
        vertexShader={terrainVertexShader}
        fragmentShader={terrainFragmentShader}
        uniforms={uniforms}
        metalness={0}
        roughness={0.5}
        color={"#85d534"}
      />
    </mesh>
  );
};

export default Terrain;
