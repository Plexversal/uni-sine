import React from "react"
import Link from 'next/link'


function FastRead() {

    function enable() {
        let els = document.getElementById('article').querySelectorAll('p')
        console.log(els)
        console.log(document.body)
        
        for(var i=0;i < els.length; i++){
            let wordsarray = els[i].textContent.split(" ")
            els[i].innerHTML = wordsarray.map(function(e){
                //if(/[^a-zA-Z]/gi.test(e)) return e // make this exclusion of numbers/symbols more advanced such as if tag surrounding word then ignore it completely 
                return `<b>${e.slice(0, Math.ceil(e.length/2))}</b>${e.slice(Math.ceil(e.length/2))}`
            }).join(" ")
        }

    }

    return (
    <div>
        <button onClick={enable}>Enable fast read</button>
    </div>
    )
  }

export default FastRead