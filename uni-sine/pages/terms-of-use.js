import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Head from "next/head";
export default function Privacy() {
  return (
    <div className={`${styles["container"]} ${styles["privacy-container"]}`}>
      <Head>
        <meta
          name="description"
          content="Uni-Sine: Terms of Use policy sets out how you can use our service"
        />
      </Head>
      <article>
        <section className={styles["privacy-container"]}>
          <h1>Terms of Use</h1>
          <p>Last updated: 28th May 2023</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Uni-Sine. This Terms of Use agreement
            (&quot;Agreement&quot;) is between you (&quot;you&quot;,
            &quot;your&quot;) and Uni-Sine (&quot;Uni-Sine&quot;,
            &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), the provider of
            this web application (&quot;Application&quot;).
          </p>
          <p>
            By using this Application, you agree to be bound by this Agreement.
            If you do not agree with these terms and conditions, please do not
            use our Application.
          </p>

          <h2>2. Use of the Application</h2>
          <p>
            You are granted a non-exclusive, non-transferable, revocable license
            to use the Application in accordance with these Terms of Use. You
            may only use the Application for lawful purposes.
          </p>

          <h2>3. Intellectual Property Rights</h2>
          <p>
            The design, trademarks, logos, service marks, and other intellectual
            property of Uni-Sine, as well as the content made available on the
            Application, are the exclusive property of Uni-Sine.
          </p>

          <h2>4. User Conduct</h2>
          <p>Users are prohibited from:</p>
          <ul>
            <li>Using the Application for any unlawful purpose.</li>
            <li>
              Attempting to reverse engineer, hack, spam, or misuse the
              Application.
            </li>
            <li>
              Violating or encouraging others to violate these Terms of Use.
            </li>
          </ul>
          <p>
            Violation of these rules may result in termination of your account.
          </p>

          <h2>5. Premium Subscription</h2>
          <p>
            Access to certain parts of the Application requires a premium
            subscription. Premium subscribers are billed in advance on a
            recurring basis. Payments are generally non-refundable, except in
            certain circumstances as determined by Uni-Sine. Users can contact
            support for refund requests.
          </p>

          <h2>6. Account Termination</h2>
          <p>
            We reserve the right to terminate or suspend any user&apos;s access
            to our Application, without notice, for any reason, including
            violation of these Terms of Use.
          </p>

          <h2>7. Modifications</h2>
          <p>
            Uni-Sine reserves the right, at any time, to modify these Terms of
            Use. We recommend users review these terms periodically.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions regarding these Terms of Use, please&nbsp;
            <Link style={{ textDecoration: "underline" }} href={"/contact"}>
              Contact Us
            </Link>
            .
          </p>

          <p>By using our Application, you agree to these Terms of Use.</p>
        </section>
      </article>
    </div>
  );
}
