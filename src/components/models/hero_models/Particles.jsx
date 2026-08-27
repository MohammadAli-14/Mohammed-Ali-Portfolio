import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";

const Particles = ({ count = 80 }) => {
  const mesh = useRef();

  const { particles, positions } = useMemo(() => {
    const temp = [];
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = Math.random() * 10 + 5;
      const z = (Math.random() - 0.5) * 10;
      temp.push({
        speed: 0.005 + Math.random() * 0.002,
      });
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return { particles: temp, positions: pos };
  }, [count]);

  useFrame(() => {
    if (!mesh.current || !mesh.current.geometry) return;
    const posArr = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      let y = posArr[i * 3 + 1];
      y -= particles[i].speed;
      if (y < -2) y = Math.random() * 10 + 5;
      posArr[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.04}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;
