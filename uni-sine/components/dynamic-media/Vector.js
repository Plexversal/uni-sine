
import React, { useEffect, useState, } from "react"
import dynamic from 'next/dynamic'

// this Sketch function is required to allow client side rendering only as window will not be present server side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

function P5Vectors(props) {

  let [windowWidth, setWindowWidth] = useState(350)
  let [pixelScale, setPixelScale] = useState(25)

  let width = windowWidth
  let height = windowWidth
  let point1x = parseFloat(props.mag * Math.cos(props.dir)) || 0
  let point1y = parseFloat(props.mag * Math.sin(props.dir)) || 0

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.stroke('#000000')

  };

  const draw = (p5) => {

    // bg and outline
    p5.background('#FFF');
    p5.noFill()
    p5.strokeWeight(6)
  
  
    p5.stroke('black')
    
      // Axis

    function axis() {
      p5.strokeWeight(0.5)
      p5.line(width / 2, height, width / 2, 0)
      p5.strokeWeight(0.5)
      p5.line(0, height / 2, width, height / 2)

    }

    axis()
    // BG lines

    for (var x = 0; x < width / pixelScale; x++) {
      p5.strokeWeight(0.1)
      p5.line(x * pixelScale, 0, x * pixelScale, height)
      p5.strokeWeight(0.1)
      p5.line(0, x * pixelScale, width, x * pixelScale)
    }
  
    p5.translate(width / 2, height / 2)
    p5.scale(1, -1)
    p5.fill('#900')

    const drawArrowHead = (p5, x, y, angle) => {
      const arrowSize = 10;
      p5.push();
      p5.translate(x, y);
      p5.rotate(angle);
      p5.beginShape();
      p5.vertex(0, 0);
      p5.vertex(-arrowSize, arrowSize / 2);
      p5.vertex(0, 0);
      p5.vertex(-arrowSize, -arrowSize / 2);
      p5.endShape(p5.CLOSE);
      p5.pop();
    };
    
    p5.strokeWeight(2); 
    p5.stroke('#ec9c33')
    let userVector = p5.createVector(point1x, point1y)
    p5.line(0, 0, userVector.x * pixelScale, userVector.y * pixelScale);
    drawArrowHead(
      p5,
      userVector.x * pixelScale,
      userVector.y * pixelScale,
      userVector.heading()
    );
    

    p5.push();
    p5.scale(1, -1); // reverse the global flip
    p5.strokeWeight(1);
    p5.textStyle(p5.NORMAL)
    p5.textSize(12);

    for (let t = -5; t < 10; t += 5) {
      p5.stroke('#000')
      p5.fill('#000')
      p5.text(t, pixelScale * t -5, 15);
      p5.text(t, 3, pixelScale * -t + 5);

    }
  
    p5.strokeWeight(0);
    p5.textSize(14);
    p5.stroke('#000')
    p5.fill('#000')


    p5.pop();
  };

  return (<>
      <Sketch setup={setup}
        draw={draw}
      />
    </>
  )
}

export default P5Vectors
