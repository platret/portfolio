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
  vec2 uv = cover(vUv);
  float v = uVelocity;
  float split = v * 0.035;
  float smear = abs(v) * 0.12;
  vec3 col = vec3(0.0);
  for (int i = 0; i < 16; i++) {
    float t = (float(i) / 15.0 - 0.5) * smear;
    col.r += texture2D(tMap, uv + vec2(t + split, 0.0)).r;
    col.g += texture2D(tMap, uv + vec2(t, 0.0)).g;
    col.b += texture2D(tMap, uv + vec2(t - split, 0.0)).b;
  }
  col /= 16.0;
  gl_FragColor = vec4(col, 1.0);
}
`
