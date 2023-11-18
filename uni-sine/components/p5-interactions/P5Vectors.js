
import React, { useEffect, useState, } from "react"
import dynamic from 'next/dynamic'
import styles from '../../styles/Page.module.css'

// this Sketch function is required to allow client side rendering only as window will not be present server side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

function P5Vectors(props) {
  
  let [windowWidth, setWindowWidth] = useState(500)
  let [pixelScale, setPixelScale] = useState(25)
  const [isReady, setIsReady] = useState(false);

  let movePoint1 = false
  let width = windowWidth
  let height = windowWidth
  let point1x = props.point1x || 5
  let point1y = props.point1y || 5
  let showBubbles = true
  let selectRadius = 30
  let increase = false


  const setup = (p5, canvasParentRef) => {
    
    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.stroke('#000000')
  };
  
  useEffect(() => {
    resizeCheck()
    setIsReady(true);
  }, [])

  const resizeCheck = () => {
    
    if (window.innerWidth < 625) {
      setWindowWidth(350)
      setPixelScale(12.5)
    
    } else {
      setWindowWidth(500)
      setPixelScale(25)
    }
  }


  const draw = (p5) => {

    // bg and outline
    p5.background('#FFF');
    p5.noFill()
    p5.strokeWeight(6)
    p5.stroke('#303030')
    p5.rect(0, 0, width, height)
  
  
    p5.stroke('black')
    
      // Axis

    function axis() {
      p5.strokeWeight(2)
      p5.line(width / 2, height, width / 2, 0)
      p5.strokeWeight(2)
      p5.line(0, height / 2, width, height / 2)

    }

    axis()


    // BG lines
    if(!document.getElementById('hideAxis').checked){
    for (var x = 0; x < width / pixelScale; x++) {
      p5.strokeWeight(0.1)
      p5.line(x * pixelScale, 0, x * pixelScale, height)
      p5.strokeWeight(0.1)
      p5.line(0, x * pixelScale, width, x * pixelScale)
    }
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
    
    
    if (increase == true) selectRadius += 0.2;
    if (increase == false) selectRadius -= 0.2;
    if (selectRadius >= 30) increase = false;
    if (selectRadius <= 20) increase = true;
    if (showBubbles == true) {
      
      p5.noFill()
      p5.stroke('#ec9c33')
      p5.ellipse(point1x * pixelScale, point1y * pixelScale, selectRadius)

      p5.push()
      p5.strokeWeight(1);
      p5.scale(1, -1);
      p5.textStyle(p5.BOLD)
      p5.textSize(17);
      p5.noStroke()
      p5.fill('#ec9c33') 
      p5.text('Click to drag', (point1x * pixelScale) - 50, -(point1y * pixelScale) - 25)
      p5.pop()
    }
    p5.push();
    p5.scale(1, -1); // reverse the global flip
    p5.strokeWeight(1);
    p5.textStyle(p5.NORMAL)
    p5.textSize(12);
    if(!document.getElementById('hideAxis').checked){
    for (let t = -5; t < 10; t += 5) {
      p5.stroke('#000')
      p5.fill('#000')
      p5.text(t, pixelScale * t -5, 15);
      p5.text(t, 3, pixelScale * -t + 5);

    }
  }

    const absoluteX = width * -220 / 500; // x = width * (x value at 500) / 500
    const absoluteY1 = height * -230 / 500; // y = height * (y value at 500) / 500
    const absoluteY2 = height * -210 / 500;
    const absoluteY3 = height * -190 / 500;
  
    p5.strokeWeight(0);
    p5.textSize(14);
    p5.stroke('#000')
    p5.fill('#000')
    p5.text(`Magnitude: ${!document.getElementById('hideMag')?.checked ? (userVector.mag().toFixed(2)) : `****`}`, absoluteX, absoluteY1);
    p5.text(`Direction: ${!document.getElementById('hideDir')?.checked ? (document.getElementById('degrees')?.checked ? (userVector.heading() * (180/Math.PI)).toFixed(2) : userVector.heading().toFixed(2)) : `****`}`, absoluteX, absoluteY2);
    p5.text(`a = i: ${!document.getElementById('hideAxis')?.checked ? point1x : `****`}, j: ${!document.getElementById('hideAxis')?.checked ? point1y : `****`}`, absoluteX, absoluteY3);
    

    p5.pop();
  };
  const windowResized = (p5) => {
    resizeCheck()

    p5.resizeCanvas(width, height);
  }
  const mousePressed = (p5) => {
    const mouseXTransformed = p5.mouseX - width / 2;
    const mouseYTransformed = height / 2 - p5.mouseY;
  
    if (
      mouseXTransformed >= point1x * pixelScale - 15 &&
      mouseXTransformed <= point1x * pixelScale + 15 &&
      mouseYTransformed >= point1y * pixelScale - 15 &&
      mouseYTransformed <= point1y * pixelScale + 15
    ) {
      movePoint1 = true;
    }
  }

  const mouseDragged = (p5) => {
    if (
      movePoint1 == true &&
      p5.mouseY > 20 &&
      p5.mouseY < height - 20 &&
      p5.mouseX > 20 &&
      p5.mouseX < width - 20
    ) {
      point1x = (p5.mouseX - width / 2) / pixelScale;
      point1y = (height / 2 - p5.mouseY) / pixelScale;
      showBubbles = false

    }
  }

  const mouseReleased = (p5) => {
    movePoint1 = false
  }

  const randomise = () => {
    showBubbles = false

    point1x = (Math.random() * 18 - 9).toFixed(2);
    point1y = (Math.random() * 18 - 9).toFixed(2);

    let valuesToShow = Math.round(Math.random() * 3)

    if (valuesToShow === 0) {
      document.getElementById('hideDir').checked = false
      document.getElementById('hideMag').checked = false
      document.getElementById('hideAxis').checked = true

    } else if (valuesToShow === 1) {
      document.getElementById('hideDir').checked = true
      document.getElementById('hideMag').checked = false
      document.getElementById('hideAxis').checked = false
    } else if (valuesToShow === 2) {
      document.getElementById('hideDir').checked = false
      document.getElementById('hideMag').checked = true
      document.getElementById('hideAxis').checked = false
    } else if (valuesToShow === 3) {
      document.getElementById('hideDir').checked = true
      document.getElementById('hideMag').checked = true
      document.getElementById('hideAxis').checked = false
    }
  }

  return ( <><br></br><div className={styles['p5-container']}>
                                
            <div className={styles['p5-options']} style={{ width: width }}>
              <div className={styles['misc-options']}>
                <button className={styles['button-input']} id='randomise-btn' type="button" name="randomise" onClick={randomise}>Random Problem</button>
                <div className={styles['checkbox-container']}>
                  <div>Degrees</div>
                  <div>
                    <input className={styles['input-switch']} type="checkbox" id="degrees" />
                    <label className={styles['input-switch-label']} htmlFor="degrees">Toggle</label>
                  </div>
                </div>
              </div>

              <div className={styles['selections-container']} id='angle-container'>
                <div className={styles['checkbox-container']}>
                  <div>Hide Magnitude</div>
                  <input className={styles['input-switch']} type="checkbox" id="hideMag" />
                  <label className={styles['input-switch-label']} htmlFor="hideMag">Toggle</label>
                </div>
                <div className={styles['checkbox-container']}>
                  <div>Hide Direction</div>
                  <input className={styles['input-switch']} type="checkbox" id="hideDir" />
                  <label className={styles['input-switch-label']} htmlFor="hideDir">Toggle</label>
                </div>
                <div className={styles['checkbox-container']}>
                  <div>Hide Axis Values</div>
                  <input className={styles['input-switch']} type="checkbox" id="hideAxis" />
                  <label className={styles['input-switch-label']} htmlFor="hideAxis">Toggle</label>
                </div>
  
              </div>
  
  
  
            </div>
  
      {
        isReady && <Sketch setup={setup}
        draw={draw}
        windowResized={windowResized}
        mousePressed={mousePressed }
        mouseDragged={mouseDragged }
        mouseReleased={mouseReleased}
      />
      }
    </div><br></br></>
  )


}

export default P5Vectors
