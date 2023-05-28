
import styles from '../../styles/Contact.module.css'
import React from 'react'
import Checkmark from '../icons/Checkmark'

export default async function OnSubmitContact(e, setResponse, SetIsLoading, recaptchaRef) {
    e.preventDefault()

    let nameValue = document.getElementById('name').value
    let emailValue = document.getElementById('email').value
    let messageTextValue = document.getElementById('text-area-input').value

    if (!nameValue || !emailValue || !messageTextValue) {
      if (!nameValue) {
        document.getElementById('name-label').innerHTML = `<p style='color:#e50000;font-weight:700;'>Required</p>Name`
        document.getElementById('name').style.borderColor = '#ff6c6c'
      } else {
        document.getElementById('name-label').innerHTML = `Name`
        document.getElementById('name').style.borderColor = ''
      }

      if (!emailValue) {
        document.getElementById('email-label').innerHTML = `<p style='color:#e50000;font-weight:700;'>Required</p>Email`
        document.getElementById('email').style.borderColor = '#ff6c6c'
      } else {
        document.getElementById('email-label').innerHTML = `Email`
        document.getElementById('email').style.borderColor = ''
      }

      if (!messageTextValue) {
        document.getElementById('msgText-label').innerHTML = `<p style='color:#e50000;font-weight:700;'>Required</p>Message`
        document.getElementById('text-area-input').style.borderColor = '#ff6c6c'
      } else {
        document.getElementById('msgText-label').innerHTML = `Message`
        document.getElementById('text-area-input').style.borderColor = ''
      }

      return;
    }

    const token = await recaptchaRef.current.executeAsync()
    recaptchaRef.current.reset()

    SetIsLoading(true)
    let data = {
      name: nameValue,
      email: emailValue,
      messageText: messageTextValue,
      token: token
    }
    let resOk
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          resOk = false
        }
        if (res.ok) {
          resOk = true
        }
        return res.json()
      })
      .then(res => {
        if (resOk) {
          setResponse(
            <div className={styles['response-ok']}><Checkmark /><p>Response Sent!</p></div>
          )
        }
        if (!resOk) {
          setResponse(<p className={styles['response-bad']}>Failed to send: {res.message}</p>)
        }

      })
      .catch(error => {
        setResponse(`An unknown error occurred!`);
        console.error('There was an error!', error);
      });


    return SetIsLoading(false)
}