#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

varying vec3 Normal;
varying vec3 Position;

uniform float u_time;

void main(){
  gl_FragColor=vec4(u_time,u_time,u_time,1.);
}