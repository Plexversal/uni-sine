import Link from 'next/link'
import React, { useEffect, useState, } from "react"
import dynamic from 'next/dynamic'
import styles from '../../styles/Page.module.css'
import calcStyles from "../../styles/Calculators.module.css";
import { useUserContext } from '../../contexts/UserContext';
import LoadingIcon from "../page-construction/LoadingIcon";

// this Sketch function is required to allow client side rendering only as window will not be present server side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

function P5Graph(props) {
  const { user, isLoading } = useUserContext();
  const [noPremium, setNoPremium] = useState(false);

  const checkPremium = () => {
    if(!props.custom) return
    setNoPremium(true);
  };
  // props = showIntercepts, showControls, showFunction, a, b, c
  let a, b, c

  const [funcA, setFuncA] = useState(a) 
  const [funcB, setFuncB] = useState(b)
  const [funcC, setFuncC] = useState(c)

  let [windowWidth, setWindowWidth] = useState(500)
  let [pixelScale, setPixelScale] = useState(25)
  
  let width = windowWidth
  let height = windowWidth
  const setup = (p5, canvasParentRef) => {

    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.stroke('#000000')

  };
  useEffect(() => {
    return resizeCheck()
  }, [])


  const resizeCheck = () => {
    if (window.innerWidth < 625) {
      setWindowWidth(250)
      setPixelScale(12.5)
    
    } else {
      setWindowWidth(500)
      setPixelScale(25)
    }
  }

  function onChnageA() {
    setFuncA(document.getElementById('function-a').value)
  }
  function onChnageB() {
    setFuncB(document.getElementById('function-b').value)
  }
  function onChnageC() {
    setFuncC(document.getElementById('function-c').value)
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

    a = props.custom ? parseFloat(document.getElementById('function-a')?.value) : null ?? props.a ?? 1
    b = props.custom ? parseFloat(document.getElementById('function-b')?.value) : null ?? props.b ?? 0
    c = props.custom ? parseFloat(document.getElementById('function-c')?.value) : null ?? props.c ?? 0

    // potential performance issue due to function being exeucted in draw function
    setFuncA(a)
    setFuncB(b)
    setFuncC(c)

    // x = (-b +- sqrt(b^2 - 4ac)) / 2a 
    let xInterceptPos = (-b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)
    let xInterceptNeg = (-b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)


    p5.strokeWeight(3)
    p5.noFill()

    if(!props.noLine){
    p5.beginShape()
    p5.stroke('#06A')

    for (let x = 10; x > -10; x -= 0.1) {
      //let yquad = (a * Math.pow(x, 2)) + (b * x) + c
      let yquad = (a * Math.pow(x, 2)) + (b * x) + c
    
      p5.vertex(x * pixelScale, yquad * pixelScale)
    }
    p5.endShape() 
  }

    // symmetry line
    p5.stroke('#dd000066')
    if(props.showSymmetry){
    for (let x = 10; x > -10; x -= 0.5) {
      let ylin = -b/(2*a)
      p5.ellipse(ylin * pixelScale, x * pixelScale, 1)
    }
  }
    p5.stroke('#a00')
    p5.fill('#a00')

    if(props?.showIntercepts){
      p5.ellipse(xInterceptNeg*pixelScale, 0, 4) // x intercept using quadratic formula
      p5.ellipse(xInterceptPos*pixelScale, 0, 4)// x intercept using quadratic formula
      p5.ellipse(0, c*pixelScale, 4) // y intercept x=0, y=c becuase a*0^2 + b*0 = c
      p5.ellipse((-(b))/(2*a) * pixelScale, ((a * Math.pow((-(b))/(2*a), 2)) + (b * (-(b))/(2*a)) + c) * pixelScale, 4) // min/max
    }

    
    p5.push();
    p5.scale(1, -1); // reverse the global flip
    p5.strokeWeight(1);
    p5.textStyle(p5.NORMAL)
    p5.textSize(12);
    
    for (let t = -5; t < 10; t += 5) {
      p5.stroke('#000')
      p5.fill('#000')
      p5.text(t, 25 * t -5, 15);
      p5.text(t, 3, 25 * -t + 5);

    }
    p5.strokeWeight(0);
    p5.textSize(14);
    p5.stroke('#000')
    p5.fill('#000')
    p5.text(`x-intercepts`, -220, -230)

    p5.text(`(${xInterceptNeg.toFixed(2)}, 0)`, -220, -210)
    p5.text(`(${xInterceptPos.toFixed(2)}, 0)`, -220, -190)
    p5.pop();
    
  };
  const windowResized = (p5) => {
    resizeCheck()

    p5.resizeCanvas(width, height);
  }
  return (<>
  {
    isLoading ? <LoadingIcon /> : <><br></br><div onClick={user?.app_metadata?.is_premium ? null : checkPremium} className={styles['p5-container']}>

      <div className={styles['p5-sketch-details']}>
      {props.showControls ?     <div className={styles['p5-selection-range']}>
        <div>
          <input id='function-a' type="range" min="-20" max="20" onChange={onChnageA}></input>
          <div id='function-a-label'>A = {funcA}</div>
        </div>
        <div>
          <input id='function-b' type="range" min="-50" max="50" onChange={onChnageB}></input>
          <div id='function-b-label'>B = {funcB}</div>
        </div>
        <div>
          <input id='function-c' type="range" min="-20" max="20" onChange={onChnageC}></input>
          <div id='function-c-label'>C = {funcC}</div>
        </div>
      </div> : <></>}
      {props?.showFunction ? <p className='exclude-fast-read'><strong>y = {Math.sign(funcA) == 0 ?  `` : <>{funcA}x<sup>2</sup></>} {Math.sign(funcB) == 0 ? `` : funcB >= 0 ? `${funcA == 0 ? `` : `+`} ${funcB}x`:`- ${Math.abs(funcB)}x`} {Math.sign(funcC) == 0 ? `${funcB == 0 ? funcA == 0 ? funcC : `` : ``}` : funcC > 0 ? `${funcB == 0 ? funcA == 0 ? funcC : `+ ${funcC}` : `+ ${funcC}`}` : `- ${Math.abs(funcC)}`}</strong></p> : <></>}
   
    </div>
  
      <Sketch setup={setup} draw={draw} windowResized={windowResized}/>
    </div><br></br></>
  }</>)


}

export default P5Graph
