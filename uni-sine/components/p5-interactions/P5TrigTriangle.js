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


function P5Trig(props) {
  const [userData, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [noPremium, setNoPremium] = useState(false);
  const [showOptions, setShowOptions] = useState(false)

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
  let [windowWidth, setWindowWidth] = useState(500)
  let [pixelScale, setPixelScale] = useState(50)



  const resizeCheck = () => {
    if (window.innerWidth <= 510) {
      setWindowWidth(300)
      setPixelScale(25)
    } else {
      setWindowWidth(500)
      setPixelScale(35)
    }
  }
  useEffect(() => {
    resizeCheck()
  }, [])
  //let windowWidth = window.innerWidth
  let movePoint1 = false
  let movePoint2 = false
  let movePoint3 = false
  let width = windowWidth
  let height = windowWidth
  let point1x = props.point1x || 1
  let point1y = props.point1y || 1
  let point2x = props.point2x || 8.81
  let point2y = props.point2y || 1
  let point3x = props.point3x || 3
  let point3y = props.point3y || 7
  let selectRadius = 30
  let increase = false
  let showBubbles = props.custom
  let A, B, C, a, b, c
  const threshold = 0.3; // or whatever value you want
  const snapRange = 0.3; 
  const randomise = () => {
    showBubbles = false

    point1x = (Math.random() * (8 - 0.5 + 1) + 0.5).toFixed(2)
    point1y = (Math.random() * (8 - 0.5 + 1) + 0.5).toFixed(2)
    point2x = (Math.random() * (8 - 0.5 + 1) + 0.5).toFixed(2)
    point2y = (Math.random() * (8 - 0.5 + 1) + 0.5).toFixed(2)
    point3x = (Math.random() * (8 - 0.5 + 1) + 0.5).toFixed(2)
    point3y = (Math.random() * (8 - 0.5 + 1) + 0.5).toFixed(2)

    let valuesToShow = Math.round(Math.random() * 3)

    if (valuesToShow === 0) {
      document.getElementById('hideSideA').checked = true
      document.getElementById('hideSideB').checked = false
      document.getElementById('hideSideC').checked = false
      document.getElementById('hideAngleA').checked = true
      document.getElementById('hideAngleB').checked = false
      document.getElementById('hideAngleC').checked = true
    } else if (valuesToShow === 1) {
      document.getElementById('hideSideA').checked = false
      document.getElementById('hideSideB').checked = false
      document.getElementById('hideSideC').checked = true
      document.getElementById('hideAngleA').checked = true
      document.getElementById('hideAngleB').checked = true
      document.getElementById('hideAngleC').checked = false
    } else if (valuesToShow === 2) {
      document.getElementById('hideSideA').checked = false
      document.getElementById('hideSideB').checked = true
      document.getElementById('hideSideC').checked = false
      document.getElementById('hideAngleA').checked = true
      document.getElementById('hideAngleB').checked = false
      document.getElementById('hideAngleC').checked = true
    } else if (valuesToShow === 3) {
      document.getElementById('hideSideA').checked = false
      document.getElementById('hideSideB').checked = true
      document.getElementById('hideSideC').checked = false
      document.getElementById('hideAngleA').checked = false
      document.getElementById('hideAngleB').checked = true
      document.getElementById('hideAngleC').checked = true
    }
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

    p5.background('#fff');
    p5.stroke('black')
    p5.translate(0, height)
    p5.scale(1, -1)

    p5.strokeWeight(4)

    p5.noFill()
    p5.triangle(point1x * pixelScale, point1y * pixelScale, point2x * pixelScale, point2y * pixelScale, point3x * pixelScale, point3y * pixelScale)

    if (props.custom) {
      p5.noFill()
      p5.strokeWeight(6)
      p5.stroke('#303030')
      p5.rect(0, 0, width, height)
    }

    p5.strokeWeight(3)
    p5.stroke('#000')
    // corner bubbles
    if (increase == true) selectRadius += 0.2;
    if (increase == false) selectRadius -= 0.2;
    if (selectRadius >= 30) increase = false;
    if (selectRadius <= 20) increase = true;
    if (showBubbles == true) {
      p5.ellipse(point1x * pixelScale, point1y * pixelScale, selectRadius)
      p5.ellipse(point2x * pixelScale, point2y * pixelScale, selectRadius)
      p5.ellipse(point3x * pixelScale, point3y * pixelScale, selectRadius)

      p5.push()
      p5.scale(1, -1); // reverse the global flip
      p5.strokeWeight(1);
      p5.textStyle(p5.BOLD)
      p5.textSize(17);
      p5.noStroke()
      p5.fill('#000')
      p5.text('Click to drag', (point3x * pixelScale) - 50, -(point3y * pixelScale) - 25)

      p5.pop()
    }

    p5.push();
    p5.scale(1, -1); // reverse the global flip
    p5.strokeWeight(1);
    p5.textStyle(p5.BOLD)
    p5.textSize(17);
    p5.noStroke()
    p5.fill('#000')

p5.text(`Area: ${parseFloat(0.5 * a * b * Math.sin(C)).toFixed(2)}`, 20, -(height - 20))

    p5.fill('#ec9c33') // side text color
    if (!(document.getElementById('hideSideA')?.checked == true && props.custom) && (props.showSidea || props.custom))
      p5.text(`a${props.hidea ? `` : ': ' + parseFloat(p5.dist(point1x, point1y, point3x, point3y).toFixed(1))}`, ((point3x * pixelScale + point1x * pixelScale) / 2), -(((point3y * pixelScale + point1y * pixelScale) / 2)));
    if (!(document.getElementById('hideSideB')?.checked == true && props.custom) && (props.showSideb || props.custom)) p5.text(`b${props.hideb ? `` : ': ' + parseFloat(p5.dist(point1x, point1y, point2x, point2y).toFixed(1))}`, ((point1x * pixelScale + point2x * pixelScale) / 2), -(((point1y * pixelScale + point2y * pixelScale) / 2)));
    if (!(document.getElementById('hideSideC')?.checked == true && props.custom) && (props.showSidec || props.custom)) p5.text(`c${props.hidec ? `` : ': ' + parseFloat(p5.dist(point2x, point2y, point3x, point3y).toFixed(1))}`, ((point2x * pixelScale + point3x * pixelScale) / 2), -(((point2y * pixelScale + point3y * pixelScale) / 2)));

    p5.fill('#ec3333')  // angle text color
    if (!(document.getElementById('hideAngleA')?.checked == true && props.custom) && (props.showAngleA || props.custom)) p5.text(`A${props.hideA ? `` : ': ' + parseFloat((document.getElementById('degrees')?.checked && props.custom) ? A * (180 / Math.PI) : A).toFixed(1)}`, (point2x * pixelScale), -(point2y * pixelScale))
    if (!(document.getElementById('hideAngleB')?.checked == true && props.custom) && (props.showAngleB || props.custom)) p5.text(`B${props.hideB ? `` : ': ' + parseFloat((document.getElementById('degrees')?.checked && props.custom) ? B * (180 / Math.PI) : B).toFixed(1)}`, (point3x * pixelScale), -(point3y * pixelScale))
    if (!(document.getElementById('hideAngleC')?.checked == true && props.custom) && (props.showAngleC || props.custom)) p5.text(`C${props.hideC ? `` : ': ' + parseFloat((document.getElementById('degrees')?.checked && props.custom) ? C * (180 / Math.PI) : C).toFixed(1)}`, (point1x * pixelScale), -(point1y * pixelScale))



    p5.pop();
    if(props.custom) {
      for (var x = 0; x < width / pixelScale; x++) {
        p5.strokeWeight(0.1)
        p5.line(x * pixelScale, 0, x * pixelScale, height)
        p5.strokeWeight(0.1)
        p5.line(0, x * pixelScale, width, x * pixelScale)
      }
    }
  };

  const mousePressed = (p5) => {

    if (p5.mouseX >= point1x * pixelScale - 15 &&
      p5.mouseX <= point1x * pixelScale + 15 &&
      p5.mouseY >= height - point1y * pixelScale - 15 &&
      p5.mouseY <= height - point1y * pixelScale + 15) {
      movePoint1 = true
    } else if (p5.mouseX >= point2x * pixelScale - 15 &&
      p5.mouseX <= point2x * pixelScale + 15 &&
      p5.mouseY >= height - point2y * pixelScale - 15 &&
      p5.mouseY <= height - point2y * pixelScale + 15) {
      movePoint2 = true
    } else if (p5.mouseX >= point3x * pixelScale - 15 &&
      p5.mouseX <= point3x * pixelScale + 15 &&
      p5.mouseY >= height - point3y * pixelScale - 15 &&
      p5.mouseY <= height - point3y * pixelScale + 15) {
      movePoint3 = true
    }
  }

  const mouseDragged = (p5) => {
    if (!document.getElementById('disableSnapping')?.checked == true && props.custom) {
      if (movePoint1 == true && p5.mouseY < height - threshold && p5.mouseY > threshold && p5.mouseX < width - threshold && p5.mouseX > threshold) {
        point1x = p5.mouseX / pixelScale;
        point1y = (height - p5.mouseY) / pixelScale;
        showBubbles = false;
      } else if (movePoint2 == true && p5.mouseY < height - threshold && p5.mouseY > threshold && p5.mouseX < width - threshold && p5.mouseX > threshold) {
        point2x = p5.mouseX / pixelScale;
        point2y = (height - p5.mouseY) / pixelScale;
        showBubbles = false;
      } else if (movePoint3 == true && p5.mouseY < height - threshold && p5.mouseY > threshold && p5.mouseX < width - threshold && p5.mouseX > threshold) {
        point3x = p5.mouseX / pixelScale;
        point3y = (height - p5.mouseY) / pixelScale;
        showBubbles = false;
      }
    } else {
    
    if (movePoint1 == true && p5.mouseY < height - threshold && p5.mouseY > threshold && p5.mouseX < width - threshold && p5.mouseX > threshold) {
      if (Math.abs((p5.mouseX / pixelScale) - point2x) <= snapRange) {
        point1x = point2x;
      } else if (Math.abs((p5.mouseX / pixelScale) - point3x) <= snapRange) {
        point1x = point3x;
      } else {
        point1x = p5.mouseX / pixelScale;
      }
  
      if (Math.abs((height - p5.mouseY) / pixelScale - point2y) <= snapRange) {
        point1y = point2y;
      } else if (Math.abs((height - p5.mouseY) / pixelScale - point3y) <= snapRange) {
        point1y = point3y;
      } else {
        point1y = (height - p5.mouseY) / pixelScale;
      }
      showBubbles = false;
  
    } else if (movePoint2 == true && p5.mouseY < height - threshold && p5.mouseY > threshold && p5.mouseX < width - threshold && p5.mouseX > threshold) {
      if (Math.abs((p5.mouseX / pixelScale) - point1x) <= snapRange) {
        point2x = point1x;
      } else if (Math.abs((p5.mouseX / pixelScale) - point3x) <= snapRange) {
        point2x = point3x;
      } else {
        point2x = p5.mouseX / pixelScale;
      }
  
      if (Math.abs((height - p5.mouseY) / pixelScale - point1y) <= snapRange) {
        point2y = point1y;
      } else if (Math.abs((height - p5.mouseY) / pixelScale - point3y) <= snapRange) {
        point2y = point3y;
      } else {
        point2y = (height - p5.mouseY) / pixelScale;
      }
      showBubbles = false;
  
    } else if (movePoint3 == true && p5.mouseY < height - threshold && p5.mouseY > threshold && p5.mouseX < width - threshold && p5.mouseX > threshold) {
      if (Math.abs((p5.mouseX / pixelScale) - point1x) <= snapRange) {
        point3x = point1x;
      } else if (Math.abs((p5.mouseX / pixelScale) - point2x) <= snapRange) {
        point3x = point2x;
      } else {
        point3x = p5.mouseX / pixelScale;
      }
  
      if (Math.abs((height - p5.mouseY) / pixelScale - point1y) <= snapRange) {
        point3y = point1y;
      } else if (Math.abs((height - p5.mouseY) / pixelScale - point2y) <= snapRange) {
        point3y = point2y;
      } else {
        point3y = (height - p5.mouseY) / pixelScale;
      }
      showBubbles = false;
    }
  }
  }
  
  

  const mouseReleased = (p5) => {
    movePoint1 = false
    movePoint2 = false
    movePoint3 = false
  }

  const windowResized = (p5) => {
    resizeCheck()

    p5.resizeCanvas(width, height);
  }

  return (<>{
    isLoading ? <LoadingIcon /> : <>
    <br></br>
    <div className={styles['p5-container']} >
      {props.custom === true ?
        <>
          <button className={styles['show-options-btn']} onClick={() => showOptions ? setShowOptions(false) : setShowOptions(true)}>{showOptions ? 'Hide Options' : 'Show Options'}</button>
          {showOptions ?           
          <div className={styles['p5-options']} style={{ width: width }}>
            <div className={styles['misc-options']}>
              <button className={styles['button-input']} id='randomise-btn' type="button" name="randomise" onClick={userData?.app_metadata?.is_premium ? randomise : null}>Random Problem</button>
              <div className={styles['checkbox-container']}>
                <div>Degrees</div>
                <div>
                  <input className={styles['input-switch']} type="checkbox" id="degrees" />
                  <label className={styles['input-switch-label']} htmlFor="degrees">Toggle</label>
                </div>


              </div>
              <div className={styles['checkbox-container']}>
                  <div>Snapping</div>
                  <input defaultChecked={true} className={styles['input-switch']} type="checkbox" id="disableSnapping" />
                  <label className={styles['input-switch-label']} htmlFor="disableSnapping">Toggle</label>
              </div>
            </div>
            <div className={styles['selections-container']} id='angle-container'>
              <div className={styles['checkbox-container']}>
                <div>Hide angle A</div>
                <input className={styles['input-switch']} type="checkbox" id="hideAngleA" />
                <label className={styles['input-switch-label']} htmlFor="hideAngleA">Toggle</label>
              </div>
              <div className={styles['checkbox-container']}>
                <div>Hide angle B</div>
                <input className={styles['input-switch']} type="checkbox" id="hideAngleB" />
                <label className={styles['input-switch-label']} htmlFor="hideAngleB">Toggle</label>
              </div>
              <div className={styles['checkbox-container']}>
                <div>Hide angle C</div>
                <input className={styles['input-switch']} type="checkbox" id="hideAngleC" />
                <label className={styles['input-switch-label']} htmlFor="hideAngleC">Toggle</label>
              </div>

            </div>
            <div className={styles['selections-container']} id='side-container'>

              <div className={styles['checkbox-container']}>
                <div>Hide side A</div>
                <input className={styles['input-switch']} type="checkbox" id="hideSideA" />
                <label className={styles['input-switch-label']} htmlFor="hideSideA">Toggle</label>
              </div>
              <div className={styles['checkbox-container']}>
                <div>Hide side B</div>
                <input className={styles['input-switch']} type="checkbox" id="hideSideB" />
                <label className={styles['input-switch-label']} htmlFor="hideSideB">Toggle</label>
              </div>
              <div className={styles['checkbox-container']}>
                <div>Hide side C</div>
                <input className={styles['input-switch']} type="checkbox" id="hideSideC" />
                <label className={styles['input-switch-label']} htmlFor="hideSideC">Toggle</label>
              </div>

            </div>


          </div> : <></>}
        </>
        : <></>}

      <span id={props.custom ? styles[`custom-triangle`] : null}>
        <Sketch
          setup={setup}
          draw={draw}
          windowResized={windowResized}
          mousePressed={props.custom ? mousePressed : null}
          mouseDragged={props.custom ? mouseDragged : null}
          mouseReleased={props.custom ? mouseReleased : null} /></span>
    </div>
    <br></br></>
  }</>)


}

export default P5Trig