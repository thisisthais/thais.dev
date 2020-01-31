#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;

vec2 random2(vec2 st){
  st=vec2(dot(st,vec2(127.1,311.7)),dot(st,vec2(269.5,183.3)));
  return-1.+2.*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st){
  vec2 i=floor(st);
  vec2 f=fract(st);
  
  vec2 u=f*f*(3.-2.*f);
  
  return mix(mix(dot(random2(i+vec2(0.,0.)),f-vec2(0.,0.)),
  dot(random2(i+vec2(1.,0.)),f-vec2(1.,0.)),u.x),
  mix(dot(random2(i+vec2(0.,1.)),f-vec2(0.,1.)),
  dot(random2(i+vec2(1.,1.)),f-vec2(1.,1.)),u.x),u.y);
}

float circle(in vec2 _st,in float _radius){
  vec2 l=_st-vec2(.5);
  return 1.-smoothstep(_radius-(_radius*.01),
  _radius+(_radius*.01),
  dot(l,l)*4.);
}

vec2 rotate2D(vec2 _st,float _angle){
  _st-=.5;
  _st=mat2(cos(_angle),-sin(_angle),
  sin(_angle),cos(_angle))*_st;
  _st+=.5;
  return _st;
}

// Almost Identity by Inigo Quilez - iq
// https://www.iquilezles.org/www/articles/functions/functions.htm
float almostIdentity(float x,float n){
  return sqrt(x*x+n);
}

// Exponential Impulse by Inigo Quilez - iq
// https://www.iquilezles.org/www/articles/functions/functions.htm
float expImpulse(float k,float x){
  float h=k*x;
  return h*exp(1.-h);
}

// Cubic Pulse by Inigo Quilez - iq
// https://www.iquilezles.org/www/articles/functions/functions.htm
float cubicPulse(float c,float w,float x){
  x=abs(x-c);
  if(x>w)return 0.;
  x/=w;
  return 1.-x*x*(3.-2.*x);
}

// Some useful functions
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}

//
// Description : GLSL 2D simplex noise function
//      Author : Ian McEwan, Ashima Arts
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License :
//  Copyright (C) 2011 Ashima Arts. All rights reserved.
//  Distributed under the MIT License. See LICENSE file.
//  https://github.com/ashima/webgl-noise
//
float snoise(vec2 v){
  
  // Precompute values for skewed triangular grid
  const vec4 C=vec4(.211324865405187,
    // (3.0-sqrt(3.0))/6.0
    .366025403784439,
    // 0.5*(sqrt(3.0)-1.0)
    -.577350269189626,
    // -1.0 + 2.0 * C.x
  .024390243902439);
  // 1.0 / 41.0
  
  // First corner (x0)
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  
  // Other two corners (x1, x2)
  vec2 i1=vec2(0.);
  i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec2 x1=x0.xy+C.xx-i1;
  vec2 x2=x0.xy+C.zz;
  
  // Do some permutations to avoid
  // truncation effects in permutation
  i=mod289(i);
  vec3 p=permute(
    permute(i.y+vec3(0.,i1.y,1.))
    +i.x+vec3(0.,i1.x,1.));
    
    vec3 m=max(.5-vec3(
        dot(x0,x0),
        dot(x1,x1),
        dot(x2,x2)
      ),0.);
      
      m=m*m;
      m=m*m;
      
      // Gradients:
      //  41 pts uniformly over a line, mapped onto a diamond
      //  The ring size 17*17 = 289 is close to a multiple
      //      of 41 (41*7 = 287)
      
      vec3 x=2.*fract(p*C.www)-1.;
      vec3 h=abs(x)-.5;
      vec3 ox=floor(x+.5);
      vec3 a0=x-ox;
      
      // Normalise gradients implicitly by scaling m
      // Approximation of: m *= inversesqrt(a0*a0 + h*h);
      m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
      
      // Compute final noise value at P
      vec3 g=vec3(0.);
      g.x=a0.x*x0.x+h.x*x0.y;
      g.yz=a0.yz*vec2(x1.x,x2.x)+h.yz*vec2(x1.y,x2.y);
      return 130.*dot(m,g);
    }
    
    void main(void){
      vec2 st=gl_FragCoord.xy/u_resolution.yy;
      vec3 color=vec3(0.);
      float t=abs(1.-sin(u_time))*10.;
      
      float circleFreq=30.;
      float circleAmpl=5.;
      float circleShapeNoise=noise(st*circleFreq)/circleAmpl;
      
      // lots of different ways for circle to grow/contract
      // float circleRadius=abs(sin(u_time/2.));
      // float circleRadius=almostIdentity(sin(u_time/2.),.1)-.3;
      // float circleRadius=min(1.-expImpulse(sin(u_time/2.),2.),.5);
      float circleRadius=cubicPulse(.08,1.2,sin(u_time/PI))/1.5;
      
      float circle=circle(st+circleShapeNoise,circleRadius);
      color+=circle;
      
      vec2 startRotation=rotate2D(st,mod(u_time,2.*PI));
      float circleStars=smoothstep(.35,.37,noise(startRotation*200.));
      color*=circleStars;
      
      t=abs(1.-sin(u_time*.2))*5.+2.;
      // try snoise
      st+=noise(st*5.)*t;
      
      float splatterFreq=10.;
      float blackSplatter=smoothstep(.15,.17,noise(st*splatterFreq+10.));
      color=mix(color,vec3(blackSplatter),1.-circle);
      
      gl_FragColor=vec4(color,1.);
    }