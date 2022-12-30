import React, { useEffect, useState } from "react"

import Link from 'next/link'
import styles from '../../styles/Path.module.css'
import {GoEye, GoEyeClosed } from 'react-icons/go'

function FastRead() {
    function enable() {
      let els = document.getElementById('article').querySelectorAll('p')
      for (var i = 0; i < els.length; i++) {
        if (!els[i].querySelector("math")) {
          let wordsarray = els[i].textContent.split(" ")
          els[i].innerHTML = wordsarray.map(function (e) {
            return `<b>${e.slice(0, Math.ceil(e.length / 2))}</b>${e.slice(Math.ceil(e.length / 2))}`
          }).join(" ")
        }
  
        if (els[i].querySelector("math")) {
          // same bold code as above but can ignore the text surrounded in <math> tags
        }
      }
    }
  
    function disable() {
      let els = document.getElementById('article').querySelectorAll('p')
      for (var i = 0; i < els.length; i++) {
        if (!els[i].querySelector("math")) {
          let wordsarray = els[i].textContent.split(" ")
          els[i].innerHTML = wordsarray.join(" ")
        }
      }
    }
  
    let [isEnabled, setIsEnabled] = useState(false)
    function toggle() {
      if (isEnabled) {
        disable()
        setIsEnabled(false)
      } else {
        enable()
        setIsEnabled(true)
      }
    }
  
    return (
      <button title={isEnabled ?  "Disable fast read": "Enable fast read" } className={styles['fast-read-btn']} onClick={toggle}>
        {
            isEnabled ?  <GoEyeClosed /> : <GoEye /> 
        }
      </button>
    )
  }
  



export default FastRead