import glsl from "glslify";


// vertex shader
/*glsl*/
export const vert = glsl`
varying vec3 vNormal;
void main() 
{
    vNormal = normalize( normalMatrix * normal );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
  `
// fragment shader
/*glsl*/
export const frag = glsl`
varying vec3 vNormal;
void main() 
{
	float intensity = pow( 0.7 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 3.0 ); 
    gl_FragColor = vec4( .5, .5, .50, .3 ) * intensity;
}`


