import React from "react";
import styles from '../styles/Home.module.css'
import Link from "next/link";
import Head from "next/head";
export default function About() {
  return (
    <>
    <Head>
    <meta
    name="description"
    content="Revise Physics, Maths and Computer science with the power of AI, Courses, Graphing Calculators and more."
  />
</Head>
    <div className={styles['about-container']}>
      <h1>About us</h1>
      <p>
        Uni-Sine is an interactive learning platform built specifically to
        provide you with tools, courses and practice questions to help learn and
        understand a variety of topics.
      </p>
      <p>
        For business enquiries, please <Link href={'/contact'}>contact us</Link> or write to us
        at:
      </p>

      <p>
        Uni-Sine<br></br>Unit A,<br></br> 82 James Carter Road<br></br>
        Mildenhall Industrial Estate<br></br>
        Suffolk<br></br>
        United Kingdom<br></br>
        IP28 7DE
      </p>
      <p>Company number: 15328247</p>

    </div></>
  );
}