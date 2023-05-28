import React, { useEffect, useState, } from "react"
import dynamic from 'next/dynamic'
import styles from '../../styles/Page.module.css'
import calcStyles from "../../styles/Calculators.module.css";

import LoadingIcon from "../page-construction/LoadingIcon";
import startCheckout from "../page-construction/StartCheckout";
// this Sketch function is required to allow client side rendering only as window will not be present server side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

function P5Graph(props) {
  const [userData, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [noPremium, setNoPremium] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/auth0/auth0-user`);
        const data = await response.json();
        if (!data) {
          setIsLoading(false);
         return;

        }
        setUser(data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  const checkPremium = () => {
    if(!props.custom) return
    setNoPremium(true);
  };
  // props = showIntercepts, showControls, showFunction, a, b, c
  let b, c
  let [windowWidth, setWindowWidth] = useState(500)
  let [pixelScale, setPixelScale] = useState(25)

  const [funcB, setFuncB] = useState(b)
  const [funcC, setFuncC] = useState(c)

  let width = windowWidth
  let height = windowWidth
  const setup = (p5, canvasParentRef) => {

    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.stroke('#000000')

  };
  useEffect(() => {
    return resizeCheck()
  }, [])
  function onChnageB() {
    setFuncB(document.getElementById('function-b').value)
  }
  function onChnageC() {
    setFuncC(document.getElementById('function-c').value)
  }

  const resizeCheck = () => {
    if (window.innerWidth < 625) {
      setWindowWidth(250)
      setPixelScale(12.5)
    
    } else {
      setWindowWidth(500)
      setPixelScale(25)
    }
  }


  const draw = (p5) => {

    p5.background('#FFF');
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
    for (var x = 0; x < width / pixelScale; x++) {
      p5.strokeWeight(0.1)
      p5.line(x * pixelScale, 0, x * pixelScale, height)
      p5.strokeWeight(0.1)
      p5.line(0, x * pixelScale, width, x * pixelScale)
    }

    p5.translate(width / 2, height / 2)
    p5.scale(1, -1)
    p5.fill('#fff')
    p5.fill('#900')

    b = props.custom ? parseFloat(document.getElementById('function-b')?.value) : null ?? props.b ?? 0
    c = props.custom ? parseFloat(document.getElementById('function-c')?.value) : null ?? props.c ?? 0

    // potential performance issue due to function being exeucted in draw function
    setFuncB(b)
    setFuncC(c)


    p5.strokeWeight(3)
    p5.noFill()
    p5.beginShape()
    p5.stroke('#06A')
    for (let x = 10; x > -10; x -= 0.1) {
      let ylin = b*x + c
      p5.vertex(x * pixelScale, ylin * pixelScale)
    }
    
    p5.endShape() 
    p5.stroke('#a00')
    p5.fill('#a00')

      if (props?.showIntercepts) {
        p5.ellipse(0, c * pixelScale, 4) // y intercept x=0, y=c becuase a*0^2 + b*0 = c
        p5.ellipse((-c/b)*pixelScale, 0, 4) 

      }


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
    p5.text(`Intercepts:`, -220, -230)
    p5.text(`(0, ${c.toFixed(2)})`, -220, -210)
    p5.text(`(${(-c/b).toFixed(2)}, 0)`, -220, -190)
    p5.pop();
  };
  const windowResized = (p5) => {
    resizeCheck()

    p5.resizeCanvas(width, height);
  }
  return (<>{
    isLoading ? <LoadingIcon /> : 
    <><br></br><div onClick={userData?.app_metadata?.is_premium ? null : checkPremium} className={styles['p5-container']}>
                {noPremium ? (
              <div className={calcStyles["no-premium-overlay"]}>
                <h1>You need premium to use this feature</h1>
                <button onClick={startCheckout}>Buy Premium</button>
              </div>
            ) : (
              <></>
            )}
  <div className={styles['p5-sketch-details']}>
    {props.showControls ?     <div className={styles['p5-selection-range']}>
      <div>
        <input id='function-b' type="range" min="-50" max="50" onChange={onChnageB}></input>
        <div id='function-b-label'>M = {funcB}</div>
      </div>
      <div>
        <input id='function-c' type="range" min="-20" max="20" onChange={onChnageC}></input>
        <div id='function-c-label'>B = {funcC}</div>
      </div>
    </div> : <></>}
    {props?.showFunction ? <p className='exclude-fast-read'>
        <strong>
              y =&nbsp;
              {Math.sign(funcB) == 0 ? (funcC != 0 ? `` : `0`) :
                funcB >= 0 ?
                  <>{funcB}x</>:
                  <>-{Math.abs(funcB)}x</>}
              {Math.sign(funcC) == 0 ? `` :
                funcC >= 0 ?
                  `${funcB == 0 ? `` : ` + `} ${funcC}` :
                  ` - ${Math.abs(funcC)}`}
            </strong>
        </p> : <></>}
 
  </div>

    <Sketch setup={setup} draw={draw} 
          windowResized={windowResized}
          />
  </div><br></br></>
  }</>)


}

export default P5Graph
