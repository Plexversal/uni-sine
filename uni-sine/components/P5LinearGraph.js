import Link from 'next/link'
import React, { useEffect, useState, } from "react"
import dynamic from 'next/dynamic'

// this Sketch function is required to allow client side rendering only as window will not be present server side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
  })

function P5Graph() {


    const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(500, 500).parent(canvasParentRef);
        p5.stroke('#000000')        
	};
    
    const draw = (p5) => {
		// NOTE: Do not use setState in the draw function or in functions that are executed
		// in the draw function...
		// please use normal variables or class properties for these purposes


        // plotting a point is originX or Y + (25*amount)
		p5.background('#eee');
        p5.stroke('black')

        function axis() {
            p5.strokeWeight(2)
            p5.line(250, 500, 250, 0)
            p5.strokeWeight(2)
            p5.line(0, 250, 500, 250)

        }

        axis()

        for(var x=0; x < p5.canvas.width / 25; x++) {
            p5.strokeWeight(0.1)
            p5.line(x*25, 0, x*25, p5.canvas.height)
            p5.strokeWeight(0.1)
            p5.line(0, x*25, p5.canvas.width, x*25)
        }

        // y = x + 5
        let pointm = -1
        let pointb = 7
        let originX = (p5.canvas.width / 2)
        let originY = (p5.canvas.height / 2)

        function linear(x1, y1, x2, y2) {

            let p1 = p5.createVector(x1, y1);
            let p2 = p5.createVector(x2, y2);
        
            let dia_len = p5.createVector(window.innerWidth, window.innerHeight).mag();
            let dir_v = p5.createVector(p2.x - p1.x, p2.y - p1.y).setMag(dia_len)
            let lp1 = p5.createVector(p1.x + dir_v.x, p1.y + dir_v.y)
            let lp2 = p5.createVector(p1.x - dir_v.x, p1.y - dir_v.y)

            p5.strokeWeight(2)
            p5.stroke('lightblue')
            p5.line(lp1.x, lp1.y, lp2.x, lp2.y);
        }

        linear(originX, originY-(25*pointb), originX+(25*((pointb < 0 ? Math.abs(pointb) : -Math.abs(pointb))/pointm)), originY)

        p5.strokeWeight(1)
        p5.fill('#000000')
        p5.ellipse(originX, originY-(25*pointb), 7)
        p5.ellipse(originX+(25*((pointb < 0 ? Math.abs(pointb) : -Math.abs(pointb))/pointm)), originY, 7)


	};

    return (<>
        <Sketch setup={setup} draw={draw} />
    </>)

    
  }

export default P5Graph