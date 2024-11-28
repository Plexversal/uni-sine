import React from "react";

const Cross = () => {


    
    return (
        <svg height='50px' width='50px' viewBox="-30 -30 160 160">
            <path d="M 50,50 m -70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                stroke="rgb(255, 0, 0)" 
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
                    dur="1s"
                    fill="freeze"
                    repeatCount="0"
                />
            </path>
            <path d="M 10 10 L 90 90"
                stroke="rgb(255, 0, 0)" 
                strokeWidth="8"
                fill="none"
                strokeDasharray="113.137"
                strokeDashoffset="113.137"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from="113.137"
                    to="0"
                    begin="0.2s"  // Start after the circle animation
                    dur="0.2s"
                    fill="freeze"
                />
            </path>
            <path d="M 90 10 L 10 90"
                stroke="rgb(255, 0, 0)" 
                strokeWidth="8"
                fill="none"
                strokeDasharray="113.137"
                strokeDashoffset="113.137"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from="113.137"
                    to="0"
                    begin="0.6s"  // Start after the first line finishes
                    dur="0.2s"
                    fill="freeze"
                />
            </path>
        </svg>
    );
};

export default Cross;
