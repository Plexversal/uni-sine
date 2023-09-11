import React, { useEffect, useState, } from "react"
import dynamic from 'next/dynamic'
import styles from '../../styles/Page.module.css'

// this Sketch function is required to allow client side rendering only as window will not be present server side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

function P5Graph(props) {

  let a = 0

  const [funcA, setFuncA] = useState(a) 
  let [windowWidth, setWindowWidth] = useState(500)
  let [pixelScale, setPixelScale] = useState(25)
  let [pixelScalex, setPixelScalex] = useState(100)
  let [pixelScaley, setPixelScaley] = useState(400)

  const [isReady, setIsReady] = useState(false);

  function erf(x) {

    // gauss error function approximation by Abramowitz and stegun
    return 1 - (1/Math.pow(1+(0.0705230784*x)
    +(0.0422820123*Math.pow(x, 2))
    +(0.0092705272*Math.pow(x, 3))
    +(0.0001520143*Math.pow(x, 4))
    +(0.0002765672*Math.pow(x, 5))
    +(0.0000430638*Math.pow(x, 6)), 16))
    
} 
let width = windowWidth
let height = windowWidth
  const setup = (p5, canvasParentRef) => {

    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.stroke('#000000')

  };

  function onChangeA() {
    setFuncA(document.getElementById('function-a').value)
    document.getElementById('function-text').value = document.getElementById('function-a').value

  }

  function onChangeText() {
    setFuncA(document.getElementById('function-text').value)
  }

  function enforceMinMax() {

    let el = document.getElementById('function-text')
    if (el.value != "") {
      if (parseInt(el.value) < parseInt(el.min)) {
        el.value = el.min;
      }
      if (parseInt(el.value) > parseInt(el.max)) {
        el.value = el.max;
      }
    }
  }
  useEffect(() => {
    resizeCheck()
    setIsReady(true);
  }, [])

  const resizeCheck = () => {
    
    if (window.innerWidth < 625) {
      setWindowWidth(350)
      setPixelScale(12.5)
      setPixelScalex(50)
      setPixelScaley(200)
    } else {
      setWindowWidth(500)
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

    // area under normal distribution curve

    let sigma = 1
    let mu = 0

    p5.beginShape()
    p5.stroke('#ffffff')
    p5.fill('#ADD8E6');
    for (let x = funcA; x > -10; x -= 0.1) {
      let ynormal = (1/(sigma*Math.sqrt(2*Math.PI)))*Math.pow(Math.E, (-(1/2))*Math.pow(((x-mu)/sigma), 2))
      p5.vertex(x * pixelScalex, ynormal * pixelScaley)
      
    }
    p5.vertex(funcA*pixelScalex, 1)
    p5.vertex(funcA*pixelScalex, (1/(sigma*Math.sqrt(2*Math.PI)))*Math.pow(Math.E, (-(1/2))*Math.pow(((funcA-mu)/sigma), 2))*pixelScaley)
    p5.endShape()

    // normal distribution curve

    p5.strokeWeight(3)
    p5.noFill()
    p5.beginShape()
    p5.stroke('#06A')
    for (let x = 10; x > -10; x -= 0.1) {
      let ynormal = (1/(sigma*Math.sqrt(2*Math.PI)))*Math.pow(Math.E, (-(1/2))*Math.pow(((x-mu)/sigma), 2))

      p5.vertex(x * pixelScalex, ynormal * pixelScaley)
      
    }
    
    p5.endShape() 

    p5.stroke('#a00')
    p5.fill('#a00')

    
    p5.push();
    p5.scale(1, -1); // reverse the global flip
    p5.strokeWeight(1);
    p5.textStyle(p5.NORMAL)
    p5.textSize(12);
    for (let t = -5; t < 5; t += 1) {
      p5.stroke('#000')
      p5.fill('#000')
      p5.text(t, pixelScalex * t -5, 15);
      //p5.text(t, 3, 200 * -t + 5);

    }
    const absoluteX = width * -220 / 500; // x = width * (x value at 500) / 500
    const absoluteY1 = height * -220 / 500; // y = height * (y value at 500) / 500
    const absoluteY2 = height * -190 / 500; // y = height * (y value at 500) / 500

    p5.textSize(18);
    p5.stroke('#000')
    p5.fill('#000')
    p5.text(`\u03BC = 0`, absoluteX, absoluteY1)
    p5.text(`\u03C3 = 1`, absoluteX, absoluteY2)
    
    p5.pop();
    
  };
  const windowResized = (p5) => {
    resizeCheck()

    p5.resizeCanvas(width, height);
  }
  return (
    <><br></br><div className={styles['p5-container']}>
  <div className={styles['p5-sketch-details']}>
    {props.showControls ? <div className={styles['p5-selection-range']}>
      <div>
        <input placeholder='X' value={funcA} id='function-a' type="range" step="0.0001" min="-3" max="3" onChange={onChangeA}></input>
        <div id='function-a-label'>{<input id='function-text' step="0.05" min="-99" max="99" value={funcA} onKeyDown={enforceMinMax} onChange={onChangeText}></input>}</div>
      </div>
    </div> : <></>}
    {props?.showFunction ? <p className='exclude-fast-read'>P(X &#60; {funcA}) (area) = <strong>{
    
      funcA < 0 ?  ((-erf(-(funcA/Math.sqrt(2)))+1)/2).toFixed(7) : ((erf((funcA/Math.sqrt(2)))+1)/2).toFixed(7)
    
    }</strong></p> : <></>}
 
  </div>

    {
      isReady && <Sketch setup={setup} draw={draw} windowResized={windowResized}/>
    }
  </div><br></br></>
  )


}

export default P5Graph
