import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface Props {
  color: string;
}

const Pokemon3D = ({ color }: Props) => {
  return (
    <Canvas style={{ height: 200 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} />
      <mesh rotation={[0.4, 0.4, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
};

export default Pokemon3D;
