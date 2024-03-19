import { ShaderMaterial } from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform vec3 hoverColor;
uniform sampler2D map;
void main() {
    vec4 color = texture2D(map, vUv);
    if (color.a < 0.5) discard;
    if (hoverColor != vec3(0.0)) {
        gl_FragColor = vec4(hoverColor, 1.0);
    } else {
        gl_FragColor = color;
    }
}
`;

export const HoverShaderMaterial = {
    uniforms: {
        map: { value: null },
        hoverColor: { value: new THREE.Color(0xcccccc) }
    },
    vertexShader,
    fragmentShader
};