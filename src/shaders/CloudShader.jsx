
// vertex shader
/*glsl*/
export const vert = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
// fragment shader
/*glsl*/
export const frag = `uniform sampler2D tClouds;
  uniform float uv_xOffset;
  void main() {
    float cloudsMapValue = texture2D(tClouds, vec2(vMapUv.x - uv_xOffset, vMapUv.y)).r;
    diffuseColor.rgb *= max(1.0 - cloudsMapValue, 0.2 );
  }`


