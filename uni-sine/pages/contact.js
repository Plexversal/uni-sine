import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Contact.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import OnSubmitContact from "../components/http/HTTP-main-contact";
import LoadingIcons from "react-loading-icons";
import Head from "next/head";

const Contact = (props) => {
  async function contactFormSubmit(e) {
    await OnSubmitContact(e, setResponse, SetIsLoading, recaptchaRef);
  }
  const [isLoading, SetIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  let recaptchaRef = useRef(null);

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Revise Physics, Maths and Computer science with the power of AI, Courses, Graphing Calculators and more."
        />
      </Head>
      <section className={styles["contact-section"]}>
        <div className={styles["contact-form-info-pain"]}>
          <h1>CONTACT US</h1>
          <div>
            <div className={styles["contact-info"]}>
              <p>
                If you have any questions regarding billing, technical or legal
                questions, please fill out the form. We will contact you back on
                the email provided. We aim to respond to all requests within 48
                hours.
              </p>
            </div>
            <br></br>
            <div className={styles["privacy-disclaimer"]}>
              <p>
                The details you provide are kept securely and held only for the
                purposes of contacting you to discuss your request. It is not
                processed by third parties or for any other use. For more
                information on how we handle your data, please read our{" "}
                <a href="https://uni-sine.com/privacy-policy">Privacy Policy</a>
              </p>
              <p>
                This form is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy">Privacy Policy</a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
                apply.
              </p>
            </div>
          </div>
        </div>
        <form
          onSubmit={contactFormSubmit}
          className={styles["contact-form-content"]}
        >
          <div className={styles["input-wrapper"]}>
            <label id="name-label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type={"text"}
              maxLength="150"
              placeholder=""
            ></input>
          </div>
          <div className={styles["input-wrapper"]}>
            <label id="email-label" htmlFor="email">
              Email
            </label>
            <input id="email" type={"email"} placeholder=""></input>
          </div>
          <div className={styles["input-wrapper"]}>
            <label
              id="msgText-label"
              spellCheck="true"
              htmlFor="text-area-input"
            >
              Message
            </label>
            <textarea id="text-area-input" placeholder=""></textarea>
          </div>
          {isLoading ? (
            <LoadingIcons.Oval />
          ) : response ? (
            <>{response}</>
          ) : (
            <input value={"SUBMIT"} type="submit"></input>
          )}

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LfJLfojAAAAAOQ7DiNKwJzkYnsGYH0tT_4_2GNq"
            size="invisible"
            hidden={true}
          />
        </form>
      </section>
    </div>
  );
};

export default Contact;
