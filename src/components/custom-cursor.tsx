
"use client";
import AnimatedCursor from "react-animated-cursor";

export default function AnimatedCursorWrapper() {
  return <AnimatedCursor
  innerSize={15}
  outerSize={15}
  color='72, 77, 225'
  outerAlpha={0.2}
  innerScale={0.7}
  outerScale={2}
  innerStyle={{
    backgroundColor: '#484DE1'
  }}
  outerStyle={{
    backgroundColor: '#FFFFFF',
  }}
  clickables={[
    'a',
    'input[type="text"]',
    'input[type="email"]',
    'input[type="number"]',
    'input[type="submit"]',
    'input[type="image"]',
    'label[for]',
    'select',
    'textarea',
    'button',
    '.link'
  ]}
/>
}