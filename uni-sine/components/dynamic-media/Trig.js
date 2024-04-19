import Link from 'next/link'
import React, { useEffect, useState, } from "react"
import dynamic from 'next/dynamic'
import styles from '../../styles/Page.module.css'
// this Sketch function is required to allow client side rendering only as window will not be present server side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

function P5Trig(props) {
  let [pixelScale, setPixelScale] = useState(22)
  let width = 300
  let height = 300
  let vertices = computeVertices(props.sideA, props.sideB, props.sideC);
  let point1x = props.point1x || vertices.point1x;
  let point1y = props.point1y || vertices.point1y;
  let point2x = props.point2x || vertices.point2x;
  let point2y = props.point2y || vertices.point2y;
  let point3x = props.point3x || vertices.point3x;
  let point3y = props.point3y || vertices.point3y;
  
  let A, B, C, a, b, c

  function computeVertices(a, b, c) {
    let cosC = (a*a + b*b - c*c) / (2 * a * b);
    let sinC = Math.sqrt(1 - cosC*cosC);
    let baseX = 2;  // Starting x-coordinate
    let baseY = 2;  // Starting y-coordinate

    return {
        point1x: baseX,
        point1y: baseY,
        point2x: baseX + b,
        point2y: baseY,
        point3x: baseX + a * cosC,
        point3y: baseY + a * sinC
    };
}


  const setup = (p5, canvasParentRef) => {

    p5.createCanvas(width, height).parent(canvasParentRef)
    p5.stroke('#000000')

  };

  const draw = (p5) => {

    a = p5.dist(point1x, point1y, point3x, point3y)
    b = p5.dist(point1x, point1y, point2x, point2y)
    c = p5.dist(point2x, point2y, point3x, point3y)


    A = Math.acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c))
    B = Math.acos((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c))
    C = Math.acos((Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b))

    p5.background(255);  

    p5.stroke('black')
    p5.translate(0, height)
    p5.scale(1, -1)

    p5.strokeWeight(2)

    p5.noFill()
    p5.triangle(point1x * pixelScale, point1y * pixelScale, point2x * pixelScale, point2y * pixelScale, point3x * pixelScale, point3y * pixelScale)

    p5.push();
    p5.scale(1, -1); // reverse the global flip
    p5.strokeWeight(1);
    p5.textSize(14);
    p5.noStroke()
    p5.fill('#000')

    p5.stroke('#ffffff');
    p5.strokeWeight(4);
    p5.textAlign('center');
    p5.textStyle('bold');
    p5.fill('#D96125') // side text color
    if (!(document.getElementById('hideSideA')?.checked == true && props.custom) && (props.showSidea || props.custom))
      p5.text(`a\n${props.hideSideA ? `` : parseFloat(p5.dist(point1x, point1y, point3x, point3y).toFixed(3))}`, ((point3x * pixelScale + point1x * pixelScale) / 2), -(((point3y * pixelScale + point1y * pixelScale) / 2)));
    if (!(document.getElementById('hideSideB')?.checked == true && props.custom) && (props.showSideb || props.custom)) p5.text(`b\n${props.hideSideB ? `` :parseFloat(p5.dist(point1x, point1y, point2x, point2y).toFixed(3))}`, ((point1x * pixelScale + point2x * pixelScale) / 2), -(((point1y * pixelScale + point2y * pixelScale) / 2)));
    if (!(document.getElementById('hideSideC')?.checked == true && props.custom) && (props.showSidec || props.custom)) p5.text(`c\n${props.hideSideC ? `` : parseFloat(p5.dist(point2x, point2y, point3x, point3y).toFixed(3))}`, ((point2x * pixelScale + point3x * pixelScale) / 2), -(((point2y * pixelScale + point3y * pixelScale) / 2)));

    p5.fill('#8A0D0D')  // angle text color
    if (!(document.getElementById('hideAngleA')?.checked == true && props.custom) && (props.showAngleA || props.custom)) p5.text(`A\n${props.hideAngleA ? `` : parseFloat((document.getElementById('degrees')?.checked && props.custom) ? A * (180 / Math.PI) : A).toFixed(3)}`, (point2x * pixelScale), -(point2y * pixelScale))
    if (!(document.getElementById('hideAngleB')?.checked == true && props.custom) && (props.showAngleB || props.custom)) p5.text(`B\n${props.hideAngleB ? `` : parseFloat((document.getElementById('degrees')?.checked && props.custom) ? B * (180 / Math.PI) : B).toFixed(3)}`, (point3x * pixelScale), -(point3y * pixelScale))
    if (!(document.getElementById('hideAngleC')?.checked == true && props.custom) && (props.showAngleC || props.custom)) p5.text(`C\n${props.hideAngleC ? `` : parseFloat((document.getElementById('degrees')?.checked && props.custom) ? C * (180 / Math.PI) : C).toFixed(3)}`, (point1x * pixelScale), -(point1y * pixelScale))

    p5.pop();

  };

  return (<>{
     <>
    <div className={styles['p5-container']} >
      <span id={props.custom ? styles[`custom-triangle`] : null}>
        <Sketch
          setup={setup}
          draw={draw}/></span>
    </div>
    </>
  }</>)


}

export default P5Trig
