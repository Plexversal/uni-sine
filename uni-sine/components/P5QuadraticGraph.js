import Link from 'next/link'
import React, { useEffect, useState, } from "react"
import dynamic from 'next/dynamic'
import styles from '../styles/Page.module.css'

// this Sketch function is required to allow client side rendering only as window will not be present server side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

function P5Graph(props) {
  let a, b, c

  const [funcA, setFuncA] = useState(a) 
  const [funcB, setFuncB] = useState(b)
  const [funcC, setFuncC] = useState(c)


  let width = 500;
  let height = 500;
  const setup = (p5, canvasParentRef) => {

    p5.createCanvas(500, 500).parent(canvasParentRef)
    p5.stroke('#000000')

  };

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
    for (var x = 0; x < width / 25; x++) {
      p5.strokeWeight(0.1)
      p5.line(x * 25, 0, x * 25, height)
      p5.strokeWeight(0.1)
      p5.line(0, x * 25, width, x * 25)
    }

    p5.translate(width / 2, height / 2)
    p5.scale(1, -1)
    p5.fill('#fff')
    p5.fill('#900')

    a = parseFloat(document.getElementById('function-a')?.value ?? props.a ?? 1)
    b = parseFloat(document.getElementById('function-b')?.value ?? props.b ?? 0)
    c = parseFloat(document.getElementById('function-c')?.value ?? props.c ?? 0)

    // potential performance issue due to function being exeucted in draw function
    setFuncA(a)
    setFuncB(b)
    setFuncC(c)

    // x = (-b +- sqrt(b^2 - 4ac)) / 2a 
    let xInterceptPos = (-b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)
    let xInterceptNeg = (-b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)


    p5.strokeWeight(3)
    p5.noFill()
    p5.beginShape()
    p5.stroke('#06A')
    //console.log(b*25 + c)
    //console.log(typeof(c))
    for (let x = 10; x > -10; x -= 0.1) {
      let yquad = (a * Math.pow(x, 2)) + (b * x) + c
      let ycubic = (a * Math.pow(x, 3)) + (b * Math.pow(x, 2)) + (c * x) + 4
      let yabs = (a * Math.abs(x)) + (b * x) + c
      let yrad = (a * (Math.sqrt(x))) + (b * x) + c
      let ylin = b*x + c
      let ysin = (a * Math.pow(Math.sin(x), 1))
      

      p5.vertex(x * 25, yquad * 25)
    }
    
    p5.endShape() 
    p5.stroke('#dd000066')
    for (let x = 10; x > -10; x -= 0.5) {
      let ylin = -b/(2*a)
      p5.ellipse(ylin * 25, x * 25, 1)
    }

    p5.stroke('#a00')
    p5.fill('#a00')

    if(props?.showIntercepts){
      p5.ellipse(xInterceptNeg*25, 0, 4) // x intercept using quadratic formula
      p5.ellipse(xInterceptPos*25, 0, 4)// x intercept using quadratic formula
      p5.ellipse(0, c*25, 4) // y intercept x=0, y=c becuase a*0^2 + b*0 = c
      p5.ellipse((-(b))/(2*a) * 25, ((a * Math.pow((-(b))/(2*a), 2)) + (b * (-(b))/(2*a)) + c) * 25, 4) // min/max
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

    p5.pop();
    
  };

  return (<><br></br><div className={styles['p5-container']}>
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
    {props?.showFunction ? <p>Parsed function: <strong>y = {Math.sign(funcA) == 0 ?  `` : <>{funcA}x<sup>2</sup></>} {Math.sign(funcB) == 0 ? `` : funcB >= 0 ? `${funcA == 0 ? `` : `+`} ${funcB}x`:`- ${Math.abs(funcB)}x`} {Math.sign(funcC) == 0 ? `${funcB == 0 ? funcA == 0 ? funcC : `` : ``}` : funcC > 0 ? `${funcB == 0 ? funcA == 0 ? funcC : `+ ${funcC}` : `+ ${funcC}`}` : `- ${Math.abs(funcC)}`}</strong></p> : <></>}
 
  </div>

    <Sketch setup={setup} draw={draw} />
  </div><br></br></>)


}

export default P5Graph
