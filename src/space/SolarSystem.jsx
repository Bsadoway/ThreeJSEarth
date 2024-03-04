import { Sphere } from "@react-three/drei";

export default function CreateSolarSystem(props) {
    return (
        <>
            {/* Temporary Sun */}
            <Sphere args={[60, 64, 64]} position={[0, 0, props.astronomicalConversion]} receiveShadow={false}>
            </Sphere>
            {/* Mercury */}
            <Sphere args={[props.earthSize * .333, 64, 64]} position={[0, 0, props.astronomicalConversion * .61]}>
            </Sphere>
            {/* Venus */}
            <Sphere  args={[props.earthSize * .85, 64, 64]} position={[0, 0, props.astronomicalConversion * .3]}>
            </Sphere>
            {/* Mars */}
            <Sphere  args={[props.earthSize * .5, 64, 64]} position={[0, 0, props.astronomicalConversion * -.51]}>
            </Sphere>

        </>
    )
}