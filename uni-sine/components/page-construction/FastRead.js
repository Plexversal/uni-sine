import React, { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { GoEye, GoEyeClosed } from 'react-icons/go'

function FastRead() {
  const router = useRouter();
  let [isEnabled, setIsEnabled] = useState(false)

  function enable() {
    if(!document.getElementById('article')) return;
    let els = document.getElementById('article').querySelectorAll("p:not(.exclude-fast-read), ul li, ol li")
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
    if(!document.getElementById('article')) return;

    let els = document.getElementById('article').querySelectorAll("p:not(.exclude-fast-read), ul li, ol li")
    for (var i = 0; i < els.length; i++) {
      if (!els[i].querySelector("math")) {
        let wordsarray = els[i].textContent.split(" ")
        els[i].innerHTML = wordsarray.join(" ")
      }
    }
  }

  function toggle() {
    if (isEnabled) {
      disable()
      setIsEnabled(false)
    } else {
      enable()
      setIsEnabled(true)
    }
  }
  useEffect(() => {
    const handleRouteChange = () => {
      if (isEnabled) {
        enable();
      } else {
        disable();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the listener on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [isEnabled, router.events, enable, disable]);


  return (
    <>
      {
        <a onClick={toggle}>
          <div>
            <span>{isEnabled ? <GoEyeClosed /> : <GoEye />}</span>Toggle fast read
          </div>
        </a>
      }

    </>
  )
}




export default FastRead