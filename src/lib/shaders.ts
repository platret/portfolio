export const vertex = `
attribute vec2 uv;
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const fragment = `
precision highp float;
uniform sampler2D tMap;
uniform float uVelocity;
uniform float uHover;
uniform vec2 uMouse;
uniform float uPlaneAspect;
uniform float uImageAspect;
varying vec2 vUv;

vec2 cover(vec2 uv) {
  float r = uImageAspect / uPlaneAspect;
  if (r < 1.0) {
    uv.y = 0.5 + (uv.y - 0.5) * r;
  } else {
    uv.x = 0.5 + (uv.x - 0.5) / r;
  }
  return uv;
}

void main() {
  vec2 d = vUv - uMouse;
  vec2 da = vec2(d.x * uPlaneAspect, d.y);
  float r = length(da);
  float bulge = uHover * 0.14 * exp(-r * r * 10.0);
  vec2 warped = vUv - d * bulge;
  vec2 smear = vec2(0.0, uVelocity * 0.05);
  vec3 col = vec3(0.0);
  for (int i = 0; i < 10; i++) {
    float t = float(i) / 9.0 - 0.5;
    col += texture2D(tMap, cover(warped + smear * t)).rgb;
  }
  col /= 10.0;
  gl_FragColor = vec4(col, 1.0);
}
`
