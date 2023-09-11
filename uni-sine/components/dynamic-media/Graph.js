import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/Page.module.css";
import * as math from 'mathjs';
import { debounce } from 'lodash';
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

function P5Graph(props) {

  const [debouncedEquation, setDebouncedEquation] = useState(props.equation);

  useEffect(() => {
    const debouncedUpdate = debounce(() => {
      setDebouncedEquation(props.equation);
    }, 600); 
    debouncedUpdate();
    return () => {
      debouncedUpdate.cancel();
    };
  }, [props.equation]);

  let [windowWidth, setWindowWidth] = useState(350);
  let [pixelScale, setPixelScale] = useState(10);
  let [invalidEquation, setInvalidEquation] = useState(false);
  let width = windowWidth;
  let height = windowWidth;
  let maxY = -Infinity;
  let minY = Infinity;
  useEffect(() => {
    setInvalidEquation(false);
  }, [debouncedEquation]);
  
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(windowWidth, windowWidth).parent(canvasParentRef);
    p5.stroke("#000000");
  };

  const draw = (p5) => {
    p5.background("#FFF");
    p5.stroke("black");

    // Axis

    function axis() {
      p5.strokeWeight(1);
      p5.line(width / 2, height, width / 2, 0);
      p5.strokeWeight(1);
      p5.line(0, height / 2, width, height / 2);
    }

    axis();

    // bg lines
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const linesToDraw = Math.ceil(width / pixelScale);
    
    for (let x = -Math.floor(linesToDraw / 2); x <= Math.ceil(linesToDraw / 2); x++) {
    
        p5.strokeWeight(0.1);
    
        const xPos = x * pixelScale + halfWidth;
        p5.line(xPos, 0, xPos, height);
    
        const yPos = x * pixelScale + halfHeight;
        p5.line(0, yPos, width, yPos);
    }
    
    

    p5.translate(width / 2, height / 2);
    p5.scale(1, -1);

    p5.strokeWeight(3);
    p5.stroke("#a00");
    p5.fill("#a00");

    p5.push();
    p5.scale(1, -1); // reverse the global flip
    p5.strokeWeight(1);
    p5.textStyle(p5.NORMAL);
    p5.textSize(12);

    // draw graph

    p5.push()
    p5.scale(1, -1)

    p5.beginShape();
    p5.stroke("#06A");
    p5.strokeWeight(2);
    p5.noFill()
    const xLimit = 56
    for (let x = xLimit; x > -xLimit; x -= 0.1) {
        try {

            let y = math.evaluate(debouncedEquation, { x: x});
            if (Math.abs(y) < 100) {
              if (y > maxY) maxY = y;
              if (y < minY) minY = y;
          }
            p5.vertex(x * pixelScale, y * pixelScale);

        } catch (error) {
            setInvalidEquation(true);
            break
        }
    }

    p5.endShape();
    const canvasBoundary = height / 2;
    const extremeYThreshold = canvasBoundary / 2; 
    const marginFactor = 0.8;
    let requiredPixelScaleForMaxY = maxY > extremeYThreshold ? Infinity : (canvasBoundary * marginFactor) / maxY;
    let requiredPixelScaleForMinY = Math.abs(minY) > extremeYThreshold ? Infinity : (canvasBoundary * marginFactor) / Math.abs(minY);
    const requiredPixelScale = Math.min(requiredPixelScaleForMaxY, requiredPixelScaleForMinY);
    setPixelScale(Math.max(10, (requiredPixelScale > 25 ? 25 : requiredPixelScale)));

    p5.pop()

    
    const originalPixelScale = 25;
    const baseInterval = 5;
    const halvings = Math.log2(originalPixelScale / pixelScale);
    const unroundedInterval = baseInterval + baseInterval * halvings;
    const interval = Math.round(unroundedInterval / 5) * 5;
    
    for (let t = -interval; t < interval * 2; t += interval) {
        p5.stroke("#000");
        p5.fill("#000");
        p5.text(t, pixelScale * t - interval, 15);
        p5.text(t, 3, pixelScale * -t + interval);
    }
    

    p5.pop();
  };

  return (
    <>
    <br></br>
        {invalidEquation ? <h3>Invalid equation</h3> : 
                  <div className={styles["p5-container"]}>
                  <Sketch setup={setup} draw={draw}  />
                </div>
        }
    </>
  );
}

export default P5Graph;
