import React from "react";

const Checkmark = () => {
    return (
<svg height='50px' width='50px' viewBox="-30 -30 160 160">

  <path d="M 50,50 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
    stroke="rgb(6, 218, 6)" 
    strokeWidth="8"
    fill="none"
    strokeDasharray="440,440"
    strokeDashoffset="440"
    transform="rotate(90 50 50)"
  >
    <animate
      attributeName="stroke-dashoffset"
      from="440"
      to="0"
      dur="0.7s"
      fill="freeze"
      repeatCount="0"
    />
  </path>
  <path d="M10 50 L40 90 L90 10"
    stroke="rgb(6, 218, 6)" 
    strokeWidth="8"
    fill="none" 
  />

</svg>
    );
};
export default Checkmark;