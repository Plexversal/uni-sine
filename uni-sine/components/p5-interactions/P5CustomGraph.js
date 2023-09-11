import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/Page.module.css";
import * as math from "mathjs";
import { debounce } from "lodash";
import MathJaxContent from '../page-construction/MathJaxContent'
import GraphWorker from '../../workers/graphWorker.worker.js'
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

function P5Graph(props) {
  const [equation, setEquation] = useState(""); // <-- Local state for user input
  const [debouncedEquation, setDebouncedEquation] = useState("");
  const isFirstRender = useRef(true);
  const workerRef = useRef(null);
  const [graphData, setGraphData] = useState([]);
  const [maxY, setMaxY] = useState(-Infinity);
  const [minY, setMinY] = useState(Infinity);
  const [presetvalues , setPresetValues] = useState({
    a: 1,
    b: 2,
    c: -1,
    d: 1,

  });
  const [xIntercepts, setXIntercepts] = useState(null);
  const [yIntercept, setYIntercept] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const presets = {
    cubic: ['a', 'b', 'c', 'd'],
    quadratic: ['a', 'b', 'c'],
    log: ['a', 'b', 'c'],
    linear: ['a', 'b']
  };
  let [pixelScale, setPixelScale] = useState(10);
  let [invalidEquation, setInvalidEquation] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);

  const signed = (num) => (num < 0 ? `${num}`: `+ ${num}`);

  useEffect(() => {
    if(props.preset == 'cubic') {
      setEquation(`${presetvalues.a}x^3 ${signed(presetvalues.b)}x^2 ${signed(presetvalues.c)}x ${signed(presetvalues.d)}`)
    } else if(props.preset == 'quadratic') {
      setEquation(`${presetvalues.a}x^2 ${signed(presetvalues.b)}x ${signed(presetvalues.c)}`)
    } else if(props.preset == 'log') {
      setEquation(`${presetvalues.a}log(x) ${(presetvalues.c)}`)
    } else if(props.preset == 'linear') {
      setEquation(`${presetvalues.a}x ${signed(presetvalues.b)}`)
    }
  }, [presetvalues]);
 
  useEffect(() => {

    // if existing worker is running, terminate it
    if (workerRef.current) {
      workerRef.current.terminate();
  }
    workerRef.current = new GraphWorker() // <-- Create new worker
  
    workerRef.current.onmessage = (event) => {
      const { results, maxY: workerMaxY, minY: workerMinY, error, xIntercepts, yIntercept } = event.data;
      
      if (error) {
        setInvalidEquation(true);
      } else if (results) {
        // This is the plotting data message
        setGraphData(results);
        setMaxY(workerMaxY);
        setMinY(workerMinY);
      } else if (xIntercepts || yIntercept) {
        // This is the intercepts message
        setXIntercepts(xIntercepts);
        setYIntercept(yIntercept);
      }
    };
  
    return () => {
      workerRef.current.terminate();
    };
  }, [equation]);
  


  useEffect(() => {
    if (isFirstRender.current) {
      setDebouncedEquation(equation);
      isFirstRender.current = false;
      return;
    }

    const debouncedUpdate = debounce(() => {
      setDebouncedEquation(equation);
    }, 600);

    debouncedUpdate();

    return () => {
      debouncedUpdate.cancel();
    };
  }, [equation]);

  const convertToLatex = (equation) => {
    try {
        return math.parse(equation).toTex({parenthesis: 'keep', implicit: 'hide'});
    } catch (err) {
        return "";
    }
};

  useEffect(() => { // handle scroll event
    const handleActiveScroll = (event) => {
      handleScroll(event);
    };

    const canvasContainer = document.getElementById("p5-canvas"); 
    if (canvasContainer) {
      canvasContainer.addEventListener("wheel", handleActiveScroll, {
        passive: false,
      });
      return () => {
        canvasContainer.removeEventListener("wheel", handleActiveScroll);
      };
    }
  }, [pixelScale, debouncedEquation]);

  useEffect(() => {
    setInvalidEquation(false);
  }, [debouncedEquation]);



  const handleScroll = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let newPixelScale = event.deltaY < 0 ? pixelScale * 1.1 : pixelScale * 0.9;
    newPixelScale = Math.max(5, newPixelScale);
    newPixelScale = Math.min(35, newPixelScale);

    setPixelScale(newPixelScale);
  };

  useEffect(() => {


    const xLimit = 150;
    workerRef.current.postMessage({ equation: debouncedEquation, xLimit });

    const canvasBoundary = height / 2;
    const extremeYThreshold = canvasBoundary / 2;
    const marginFactor = 0.8;
    let requiredPixelScaleForMaxY =
      maxY > extremeYThreshold
        ? Infinity
        : (canvasBoundary * marginFactor) / maxY;
    let requiredPixelScaleForMinY =
      Math.abs(minY) > extremeYThreshold
        ? Infinity
        : (canvasBoundary * marginFactor) / Math.abs(minY);
    const requiredPixelScale = Math.min(
      requiredPixelScaleForMaxY,
      requiredPixelScaleForMinY
    );

    setPixelScale(
      Math.max(5, requiredPixelScale > 35 ? 35 : requiredPixelScale)
    );
  }, [debouncedEquation]);

  useEffect(() => {
     resizeCheck();
     setIsReady(true);
  }, []);

  const resizeCheck = () => {
    if (window.innerWidth < 625) {
      setWidth(350)
      setHeight(350)
    } else {
      setWidth(500)
      setHeight(500)
    }
  };
  
  const windowResized = (p5) => {
    resizeCheck();

    p5.resizeCanvas(width, height);
  };



  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
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

    for (
      let x = -Math.floor(linesToDraw / 2);
      x <= Math.ceil(linesToDraw / 2);
      x++
    ) {
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
    p5.scale(1, -1); 
    p5.strokeWeight(1);
    p5.textStyle(p5.NORMAL);
    p5.textSize(12);

    // draw graph
    p5.push();
    p5.scale(1, -1);

    p5.beginShape();
    p5.stroke("#06A");
    p5.strokeWeight(2);
    p5.noFill();
    for (let i = 0; i < graphData.length; i++) {
      const { x, y } = graphData[i];
      p5.vertex(x * pixelScale, y * pixelScale);
    }

    p5.endShape();

    p5.pop();

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
        <div className={styles["p5-container"]}>

      <div className={styles['p5-sketch-details']}>
        <div className={styles['p5-options-container']}>
      <div className={styles['p5-selection-range']}>
        {props.preset && presets[props.preset] ? (
          presets[props.preset].map(key => (
            <input
              key={key}
              step={0.001}
              value={presetvalues[key]}
              onChange={(e) => setPresetValues({ ...presetvalues, [key]: e.target.value })}
              placeholder={key.toUpperCase()}
            />
          ))
        ) : (
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="Enter equation here, e.g: x^2"
            maxLength={100}
          />
        )}
      </div>
      
      <MathJaxContent content={`$$ y = ${convertToLatex(equation)} $$`} />

      <button onClick={() => {showMore ? setShowMore(false) : setShowMore(true)}} className={styles['show-more-btn']}> {showMore ? <BsFillCaretUpFill /> :  <BsFillCaretDownFill />} Show Intecepts (x &lt; 35, y &lt; 35)</button>
          {
            showMore && (
              <div className={styles['intercepts']}>
                <p><strong>Y intercept = </strong>{yIntercept}</p>
                <p><strong>X intecepts = </strong>{Array.isArray(xIntercepts) ? xIntercepts.map(x => x).sort((a, b) => a-b).join(', ') : xIntercepts}</p>
              </div>
            )
          }
          </div>
          <span id="p5-canvas">
      {invalidEquation ? (
        <h3>Invalid equation</h3>
      ) : (<>
      {isReady && <Sketch setup={setup} draw={draw} windowResized={windowResized}/>}
      </>
      )}
      </span>
      </div>
      </div>

    </>
  );
}

export default P5Graph;
