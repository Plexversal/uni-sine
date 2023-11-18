import { useEffect, useState, useCallback, useRef } from "react";
import LoadingIcon from "../page-construction/LoadingIcon";
import styles from "../../styles/Courses.module.css";
import { BsFillXCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import PercentIcon from "../page-construction/PercentageIcon";
import QuestionElement from "./QuestionElement";
import MathJaxContent from "../page-construction/MathJaxContent";
export default function BlackHoleCourse(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [userCourseData, setUserCourseData] = useState([]);
  const [correctAnswerValue, setCorrectAnswerValue] = useState(null);
  const [selected, setSelected] = useState("");
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const prevSectionRef = useRef(props.currentSection);

  const list = [
    "Stellar Evolution",
    "Stellar Evolution Practice",
    "High Mass Stars",
    "High Mass Stars Practice",
    "Supernovae and Stellar Collapse",
    "Supernovae and Stellar Collapse Practice",
    "Event Horizon and Singularities",
    "Event Horizon and Singularities Practice",
    "Advanced: Hawking Radiation",
    "Advanced: Types of Black Holes",
    "Practice Questions",
    "Course Review",
  ];

  const questions = [
    {
      question:
        "How many different variables are involved in the hydrostatic equilibrium equation?",
      answersArray: [`5`, `3`, { correctAnswer: `4` }, `0`],
    },
    {
      question:
        "What event happens when a large mass star reaches a critical density and forms Iron at the core?",
      answersArray: [
        `Star gains more mass`,
        `Fusion into larger elements`,
        { correctAnswer: `Supernova explosion` },
        `Cools down`,
      ],
    },
    {
      question:
        "Which formula can be used to calculate the Schwarzschild radius?",
      answersArray: [
        `\\(\\frac{\\hbar}{8\\pi GMk_B}\\)`,
        `\\(-\\frac{GM(r)p(r)}{r^2}\\)`,
        { correctAnswer: `\\(\\frac{2GM}{c^2}\\)` },
        `\\(R_{\\mu v} - \\frac{1}{2}g_{\\mu v} R\\)`,
      ],
    },
  ];

  const handleQuestionCallback = (childData) => {
    setCorrectQuestions((prevState) => {
      const existingQuestionIndex = prevState.findIndex(
        (item) => item.question === childData.question
      );

      if (existingQuestionIndex > -1) {
        const updatedState = [...prevState];
        updatedState[existingQuestionIndex] = childData;
        return updatedState;
      }

      return [...prevState, childData];
    });

    setIsDataReady(true);
  };

  function checkSections(section) {
    if (!userCourseData || userCourseData.length <= 0) return section;
    let completedSection = userCourseData.completedSections;
    const isDone = completedSection.some((e) => e === section);

    return isDone ? "\u2713" : section;
  }

  function setCorrectAnswer(e, answer) {
    let inputValue = e.target.value;

    if (typeof inputValue === "string") {
      inputValue = inputValue.toLowerCase();
    }

    if (
      inputValue == (typeof answer === "string" ? answer.toLowerCase() : answer)
    ) {
      setCorrectAnswerValue(true);
    } else {
      setCorrectAnswerValue(false);
    }
  }

  const handleClick = (value, correct) => {
    if (selected) return;
    if (correct) {
      setCorrectAnswerValue(true);
    } else {
      setCorrectAnswerValue(false);
    }
    setSelected(value);
  };

  useEffect(() => {
    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset();
    }
    setCorrectAnswerValue(null);

    setSelected("");
  }, [props.currentSection]);

  // save course data on page move
  useEffect(() => {
    let data;

    if (prevSectionRef.current == list.length - 1) {
      if (!isDataReady) return;
      data = {
        courseName: props.courseName, // string
        section: prevSectionRef.current, // number
        questionsCompleted: correctQuestions,
      };
    } else if (correctAnswerValue !== null) {
      data = {
        courseName: props.courseName, // string
        section: prevSectionRef.current, // number
        standardQuestions: [
          { section: prevSectionRef.current, isCorrect: correctAnswerValue },
        ], // array
      };
    } else {
      data = {
        courseName: props.courseName, // string
        section: prevSectionRef.current, // number
      };
    }

    async function saveToUser() {
      if (prevSectionRef.current == 0) return;
      try {
        setIsLoading(true);
        const saveToUserResponse = await fetch(`/api/db/postUserCourseData`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseData: data,
          }),
        });
        if (saveToUserResponse.status === 200) {
          return true;
        } else {
          const errorData = await saveToUserResponse.json();
          const errorMessage =
            errorData.message || saveToUserResponse.statusText;
          return console.error(
            `Error saving to user ${saveToUserResponse.status}: ${errorMessage}`
          );
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    saveToUser();
    setIsDataReady(false); // Reset the flag
    prevSectionRef.current = props.currentSection;
  }, [props.currentSection, isDataReady]);

  // get user course data
  useEffect(() => {
    console.log(props.currentSection);
    if (props.currentSection !== 0 && props.currentSection !== list.length)
      return;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        let response = await fetch(
          `/api/db/getUserCourseStats?courseName=${encodeURIComponent(
            props.courseName
          )}`
        );
        if (response.status === 404) {
          return setUserCourseData(null);
        } else {
          let data = await response.json();
          setUserCourseData(data);
        }
      } catch (error) {
        setUserCourseData(null);
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.currentSection, isDataReady]);

  return (
    <>
      {props.currentSection == 0 ? (
        <div>
          <div>
            <h2>Introduction to Black Holes</h2>
            <p>
              Black holes are extraordinary cosmic objects that are formed from
              the remnants of massive stars after they exhaust their nuclear
              fuel and undergo a supernova explosion. Essentially, a black hole
              is a region of space where the gravitational pull is so strong
              that not even light can escape. This gravitational force is the
              result of a huge mass being compressed into an extremely small
              volume, often referred to as a &quot;singularity&quot; at the center. The
              boundary surrounding a black hole is known as the event horizon,
              which serves as the point of no return: anything crossing this
              threshold will inevitably be pulled into the black hole..
            </p>
            <p>
              The science of black holes challenges our understanding of
              physics, especially when it comes to reconciling general
              relativity with quantum mechanics. According to general
              relativity, the immense gravitational pull of a black hole warps
              the fabric of spacetime itself, affecting the motion of matter and
              even the passage of time near it. On the other hand, quantum
              mechanics suggests that black holes are not completely &quot;black&quot; but
              can emit Hawking radiation, a form of thermal radiation, which
              ultimately could lead to the black hole evaporating over
              astronomical timescales. This counterintuitive behavior of black
              holes serves as a compelling arena for testing and refining
              theories about the fundamental nature of the universe.
            </p>
          </div>
          <div>
            <div className={styles["course-content"]}>
              <h2>Course content</h2>
              <p>
                <i>Click below to jump to a section</i>
              </p>
              {isLoading ? (
                <LoadingIcon />
              ) : (
                <ol className={styles["course-item-list"]} type="number">
                  {list.map((l, i) => (
                    <li
                      onClick={() => props.setCurrentSection(i + 1)}
                      data-content={checkSections(i + 1)}
                      data-done={
                        checkSections(i + 1) === "\u2713" ? "true" : "false"
                      }
                      key={i}
                    >
                      {l}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      ) : props.currentSection == 1 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Stellar Evolution</h2>
            <p>
              Before getting to black holes, you first need to know how stars
              are formed as they are the basis for any potential black hole.
            </p>
            <p>
              Stars form from giant clouds of gas and dust in interstellar
              space. The initial mass of the cloud determines the life path of
              the star. Generally, the mass is expressed in terms of{" "}
              <strong>solar masses</strong>, with one solar mass being the mass
              of our Sun. Lower mass stars (0.1-0.5 solar masses) will become{" "}
              <strong>red dwarfs</strong> and burn slowly, lasting billions or
              even trillions of years.
            </p>
            <p>
              Stars like our Sun, with masses between 0.5 and 8 solar masses,
              will evolve into red giants and eventually shed their outer layers
              to form a <strong>planetary nebula</strong>, leaving behind a{" "}
              <strong>white dwarf</strong>. Stars more massive than 8 solar
              masses will undergo a more dramatic death, exploding as supernovae
              and leaving behind either a <strong>neutron star</strong> or a{" "}
              <strong>black hole</strong>.
            </p>
            <p>
              The core of the star is performing <strong>nuclear fusion</strong>
              . This happens when the <strong>Hydrogen atoms</strong> are under
              pressure from gravity but{" "}
              <strong>electromagnetic repulsion</strong> keeps the positively
              charged protons apart.
            </p>
            <p>
              The equation to determine the amount of energy released by Fusion
              is {`\\(E=mc^2\\)`}. Mass is converted to energy in the form of
              light and heat which is why stars shine.
            </p>
            <p>The Amount of Matter Determines the Fate of the Star:</p>
            <ol>
              <li>
                Low mass stars burn out slowly and generally become white
                dwarfs.
              </li>
              <li>
                High mass stars burn out fast and become neutron stars and black
                holes.
              </li>
            </ol>
            <p>
              The minimum mass required for an object to become a star is around
              0.08 solar masses; anything smaller doesn&apos;t have enough
              gravitational pull to ignite fusion and becomes a brown dwarf
              instead.
            </p>
          </div>
          <div
            style={{ textAlign: "center" }}
            className={styles["media-content"]}
          ></div>
        </div>
      ) : props.currentSection == 2 ? (
        <div>
          <div>
            <h2>Practice</h2>
            <p>
              What is the minimum mass required for a star to form from gas and
              matter?
            </p>
            <div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 1 ? styles.selected : ""
                }`}
                onClick={() => handleClick(1, false)}
              >
                1 Solar Mass
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 2 ? styles.selected : ""
                }`}
                onClick={() => handleClick(2, true)}
              >
                0.08 Solar Mass
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 3 ? styles.selected : ""
                }`}
                onClick={() => handleClick(3, false)}
              >
                0.1 Solar Mass
              </div>
            </div>
            {correctAnswerValue ? (
              <div className={styles["correct-text"]}>Correct</div>
            ) : (
              <div className={styles["incorrect-text"]}>
                {correctAnswerValue !== null && "Incorrect"}
              </div>
            )}
          </div>
        </div>
      ) : props.currentSection == 3 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>High Mass Stars</h2>
            <p>
              High-mass stars typically have masses greater than 8 solar masses.
              These stars are the powerhouses of the universe, emitting enormous
              amounts of energy and often ending their lives in dramatic ways
              such as supernovae.
            </p>
            <p>
              Due to their higher mass, the force of gravity in high-mass stars
              is much greater. This increased gravitational pull compresses the
              core more intensely, leading to higher temperatures and pressures.
              Consequently, the rate of nuclear fusion is much faster, and the
              outward pressure generated by this fusion balances the inward
              gravitational force. The relevant equation describing the balance
              of forces is the <strong>hydrostatic equilibrium</strong>{" "}
              equation:
            </p>
            <MathJaxContent
              content={`$$ \\frac{dP(r)}{dr} = -\\frac{GM(r)p(r)}{r^2} $$`}
            />
            <p>
              Where {"\\(P\\)"} is pressure, {"\\(r\\)"} is radius, {"\\(G\\)"}{" "}
              is the gravitational constant, {"\\(M(r)\\)"} is the mass within
              the radius and {"\\(p\\)"} is density.
            </p>
            <p>
              High-mass stars burn through their nuclear fuel at an accelerated
              rate compared to lower-mass stars. As a result, their lifespans
              are considerably shorter, often only a few hundred million years,
              as opposed to billions of years for stars like our Sun.
            </p>
            <p>
              In the main sequence phase, high-mass stars primarily convert
              hydrogen into helium through the <strong>CNO</strong> cycle, a set
              of nuclear fusion reactions involving carbon, nitrogen, and oxygen
              as catalysts. This is different from the proton-proton chain that
              powers lower-mass stars. Despite their shorter lives, high-mass
              main sequence stars play a crucial role in the evolution of
              galaxies and the production of heavy elements.
            </p>
          </div>
          <div
            style={{ textAlign: "center" }}
            className={styles["media-content"]}
          ></div>
        </div>
      ) : props.currentSection == 4 ? (
        <div>
          <div>
            <h2>Practice</h2>
            <p>
              What is the name of the relevant equation for describing the
              balance of forces within a star?
            </p>

            <input
              onChange={(e) => setCorrectAnswer(e, "hydrostatic equilibrium")}
              placeholder="Type Answer"
              id="number-input"
              className={styles["answer-input"]}
              type="text"
            />
            {correctAnswerValue == true ? (
              <div className={styles["correct-text"]}>Correct</div>
            ) : (
              <div className={styles["incorrect-text"]}>
                {correctAnswerValue !== null && "Incorrect"}
              </div>
            )}
          </div>
        </div>
      ) : props.currentSection == 5 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Supernovae and Stellar Collapse</h2>
            <p>
              As a high-mass star ages, its core undergoes increasingly complex
              fusion reactions that create heavier and heavier elements,
              progressing from hydrogen and helium to carbon, oxygen, and so on.
              Eventually, the core begins to produce iron which is the last
              element a star can form, a process that consumes more energy than
              it releases. At this stage, the core becomes increasingly
              unstable. With no energy-generating fusion to counterbalance
              gravity, the core contracts rapidly. This leads to a dramatic rise
              in temperature and density. The average time for the core to
              collapse is on the order of milliseconds to seconds.
            </p>
            <p>
              When the collapsing core reaches a critical density, a rebound
              effect occurs, and the outer layers of the star are expelled
              violently into space in a cataclysmic event known as a{" "}
              <strong>supernova</strong>. This explosion releases a tremendous
              amount of energy and can outshine entire galaxies for a short
              period. The remaining star will either be a{" "}
              <strong>neutron star</strong> or a <strong>black hole</strong>{" "}
              depending on the mass of the star.
            </p>
            <p>
              During the supernova explosion, the extreme conditions enable the
              creation of elements heavier than iron through a process called{" "}
              <strong>rapid neutron capture</strong> or the{" "}
              <strong>&quot;r-process.&quot;</strong> These elements are relatively rare
              in the universe precisely because they can only be formed in the
              intense environments of supernovae.
            </p>
            <p>
              Supernovae are incredibly bright events, often outshining their
              entire host galaxy for weeks. The brightness is a result of the
              tremendous amount of energy released in the explosion, which is on
              the order of {`\\(10^{44}\\)`} joules. This luminosity makes them
              important markers for astronomical observations and for
              understanding the scale of the universe.
            </p>
          </div>
          <div></div>
        </div>
      ) : props.currentSection == 6 ? (
        <div>
          <span>
          <div>
            <h2>Practice</h2>
            <p>
              What is the largest element a star can form before it becomes
              unstable?
            </p>
            <div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 1 ? styles.selected : ""
                }`}
                onClick={() => handleClick(1, true)}
              >
                Iron
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 2 ? styles.selected : ""
                }`}
                onClick={() => handleClick(2, false)}
              >
                Hygrogen
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 3 ? styles.selected : ""
                }`}
                onClick={() => handleClick(3, false)}
              >
                Oxygen
              </div>
            </div>
            {correctAnswerValue ? (
              <div className={styles["correct-text"]}>Correct</div>
            ) : (
              <div className={styles["incorrect-text"]}>
                {correctAnswerValue !== null && "Incorrect"}
              </div>
            )}
          </div></span>
        </div>
      ) : props.currentSection == 7 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Event Horizon and Singularities</h2>
            <p>
              The event horizon of a black hole is a boundary in spacetime
              beyond which nothing can escape, not even light. It effectively
              marks the &quot;point of no return.&quot; The radius of the event horizon is
              called the Schwarzschild radius {`\\(R_s\\)`} calculated using the
              formula:
            </p>
            <MathJaxContent content={`$$ R_s = \\frac{2GM}{c^2} $$`} />

            <p>
              Where {`\\(G\\)`} is the gravitational constant, {`\\(M\\)`} is
              the mass of the black hole, and c is the speed of light. Once an
              object crosses the event horizon, it becomes a part of the black
              hole and adds to its mass.
            </p>
            <p>
              At the very center of a black hole lies a singularity, a point
              where gravity becomes infinitely strong and density becomes
              infinitely high. Classical physics breaks down at the singularity,
              and our understanding of it is limited to the realm of general
              relativity and quantum mechanics. Mathematically, the singularity
              is described as a point where the curvature of spacetime becomes
              infinite.
            </p>
            <MathJaxContent
              content={`$$ R_{\\mu v} - \\frac{1}{2}g_{\\mu v} R = 8\\pi GT_{\\mu v} $$`}
            />
            <p>
              This is the Einstein field equation, where {`\\(R_{\\mu v}\\)`} is
              the Ricci curvature tensor, {`\\(g_{\\mu v}\\)`} is the metric
              tensor, {`\\(R\\)`} is the scaler curvature, and{" "}
              {`\\(T_{\\mu v}\\)`} is the stress-energy tensor. The singularity
              is the point where these equations approach infinity.{" "}
            </p>
            <p>
              The event horizon and the singularity are intrinsically connected
              components of a black hole. The event horizon acts as a shield,
              concealing the singularity within and preventing any direct
              observation or interaction. This makes black holes among the most
              mysterious and intriguing objects in the universe, subjects of
              intense research and sources of invaluable insights into the laws
              of physics.
            </p>
          </div>
        </div>
      ) : props.currentSection == 8 ? (
        <div>
          <div>
            <div>
              <h2>Practice</h2>
              <p>
                There is a supermassive black hole at the center of the Milky
                Way Galaxy, the star is called Sagittarius A*.
              </p>
              <p>
                The mass of the black hole is{" "}
                {`\\(8.26 * 10^{36}\\ \\text{kg}\\)`}.
              </p>
              <p>
                Using the Schwarzschild radius ({`\\(R_s\\)`}) equation,
                calculate the event horizon of our galaxy to{" "}
                <strong>3 significant figures</strong>:
              </p>
              <MathJaxContent content={`$$ R_s = \\frac{2GM}{c^2} $$`} />
              <p>
                where{" "}
                {`\\(G = 6.67430 \\times 10^{-11} \\ \\frac{Nm^2}{kg^2} \\)`}{" "}
                and {`\\(c = 299 792 458 \\ \\frac{m}{s}\\)`}{" "}
              </p>
              <input
                onChange={(e) => setCorrectAnswer(e, 1.22)}
                placeholder="Type Answer"
                id="number-input"
                className={styles["answer-input"]}
                type="number"
                step={0.01}
              />{" "}
              {`\\(\\times 10^{10} \\text{m}\\)`}
              {correctAnswerValue == true ? (
                <div className={styles["correct-text"]}>Correct</div>
              ) : (
                <div className={styles["incorrect-text"]}>
                  {correctAnswerValue !== null && "Incorrect"}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : props.currentSection == 9 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Advanced: Hawking Radiation</h2>
            <h3>Conceptual Overview</h3>
            <p>
              Hawking Radiation is a theoretical prediction by physicist Stephen
              Hawking, which suggests that black holes are not completely
              &quot;black&quot; but can emit small amounts of thermal radiation due to
              quantum effects near the event horizon. This defies the classical
              understanding that nothing can escape a black hole.
            </p>
            <h3>Quantum Fluctuations and Particle-Antiparticle Pairs</h3>
            <p>
              The core idea behind Hawking radiation comes from the concept of
              quantum fluctuations. In the vacuum of space, virtual
              particle-antiparticle pairs spontaneously come into existence and
              annihilate each other. However, near the event horizon of a black
              hole, it&apos;s possible for one of these particles to fall into the
              black hole while the other escapes, turning into a real particle.
            </p>
            <h3>The Hawking Temperature and Radiation Equation</h3>
            <p>
              The temperature of the radiation emitted, known as the Hawking
              temperature {"\\(T_H\\)"}, can be calculated as:
            </p>
            <MathJaxContent
              content={`$$ T_H = \\frac{\\hbar}{8\\pi GMk_B} $$`}
            />
            <p>
              where {`\\(\\hbar\\)`} is the reduced Planck constant, {`\\(c\\)`}{" "}
              is the speed of light, {`\\(G\\)`} is the gravitational constant,{" "}
              {`\\(M\\)`} is the mass of the black hole, and {`\\(k_B\\)`} is
              Boltzmann&apos;s constant. Note that the Hawking temperature is
              inversely proportional to the mass of the black hole: smaller
              black holes are hotter and emit more radiation.
            </p>
            <h3>Implications for Black Hole Evaporation</h3>
            <p>
              Hawking radiation has profound implications for the fate of black
              holes. Over time, as a black hole emits Hawking radiation, it
              loses mass and shrinks, ultimately evaporating completely. The
              rate of mass loss due to Hawking radiation can be described by:
            </p>
            <MathJaxContent
              content={`$$ \\frac{dM}{dt} = - \\frac{\\hbar c^6}{15360\\pi G^2 M^2} $$`}
            />
            <p>
              This equation shows that the rate of mass loss increases as the
              mass of the black hole decreases, leading to a runaway process
              that ends with the complete evaporation of the black hole.
            </p>
            <h3>Significance in Modern Astrophysics</h3>
            <p>
              While Hawking radiation has not yet been observed directly, it
              remains a critical component in the study of black holes and the
              intersection of quantum mechanics and general relativity. It helps
              us understand the life cycle and ultimate fate of black holes, as
              well as offering insights into the nature of spacetime at its most
              extreme scales.
            </p>
          </div>
        </div>
      ) : props.currentSection == 10 ? (
        <div>
          <div className={styles["text-content"]}>
            <div>
              <h2>Advanced: Types of Black Holes</h2>
              <h3>Stellar Black Holes</h3>
              <p>
                Stellar black holes are formed from the remnants of massive
                stars after a supernova event. Their masses typically range from
                about 5 to several tens of solar masses. The Schwarzschild
                radius equation {`\\(R_s = \\frac{2GM}{c^2}\\)`} is often used
                to describe these non-rotating black holes.
              </p>
              <h3>Intermediate-Mass Black Holes</h3>
              <p>
                Intermediate-mass black holes are those with masses ranging from
                hundreds to thousands of solar masses. They are often found in
                globular clusters and could be the precursors to supermassive
                black holes. Their properties can also be described using the
                Schwarzschild radius equation.
              </p>
              <h3>Supermassive Black Holes</h3>
              <p>
                Supermassive black holes have masses ranging from millions to
                billions of solar masses and are usually found at the centers of
                galaxies. The mechanics of their formation are still a subject
                of research.
              </p>
              <h3>Measuring Types of Black Holes</h3>
              <p>
                The mass of a black hole can often be estimated by observing the
                dynamics of nearby objects, like stars or gas clouds, that are
                under its gravitational influence. By applying Newton&apos;s law of
                gravitation {`\\(F = \\frac{Gm_1 m_2}{r^2}\\)`} and the
                equations of motion, the mass {`\\(M\\)`} can be determined,
                which subsequently helps in classifying the type of black hole.
              </p>
              <h3>Spinning Black Holes: The Kerr Solution</h3>
              <p>
                Black holes can also rotate, and these are described by the Kerr
                solution to Einstein&apos;s field equations. The equation for the
                radius of the event horizon of a rotating black hole is:
              </p>
              <MathJaxContent
                content={`$$ R_{\\text{horizon}} = GM \\left(1 + \\sqrt{1 - \\left(\\frac{J}{Mc}\\right)^2} \\right) $$`}
              />

              <p>
                where {`\\(J\\)`} is the angular momentum of the black hole. The
                quantity {`\\(\\frac{J}{Mc}\\)`} can range from 0 for a
                non-rotating black hole to 1 for a maximally rotating black
                hole.
              </p>
              <h3>Frame-Dragging and Ergospheres</h3>
              <p>
                Rotating black holes drag spacetime along with their rotation, a
                phenomenon known as frame-dragging. They also possess an
                ergosphere, a region outside the event horizon where objects
                cannot remain in place and are forced to move in the direction
                of the black hole&apos;s rotation.
              </p>
              <h3>Identifying Spinning Black Holes</h3>
              <p>
                The presence of a spinning black hole can often be inferred from
                the high-energy emissions (like X-rays) originating from the
                accretion disk around it, which can be distorted due to the
                effects of frame-dragging. The spin parameter{" "}
                {`\\(a = \\frac{J}{Mc}\\)`} is crucial for identifying the
                nature of the black hole&apos;s rotation.
              </p>
            </div>
          </div>
        </div>
      ) : props.currentSection == 11 ? (
        <div>
          {" "}
          <div className={styles["text-content"]}>
            <h2>Practice Questions</h2>
            <ol>
              {questions.map((q, index) => (
                <QuestionElement
                  key={index}
                  questionNumber={index}
                  currentSection={props.currentSection}
                  question={q.question}
                  answersArray={q.answersArray}
                  questionIndex={index}
                  parentCallback={handleQuestionCallback}
                />
              ))}
            </ol>
          </div>
        </div>
      ) : props.currentSection == 12 ? (
        <div style={{ display: "block" }}>
          <div className={styles["text-content"]}>
            {isLoading ? (
              <LoadingIcon />
            ) : (
              <div className={styles["review-container"]}>
                <div className={styles["review-text"]}>
                  <div>
                    <h3>Final Questions</h3>
                    <div className={styles["review-questions-completed"]}>
                      {userCourseData.questionsCompleted?.length > 0 ? (
                        userCourseData.questionsCompleted.map((e, i) => (
                          <div key={i}>
                            {e.isCorrect ? (
                              <BsFillCheckCircleFill
                                color="#50C878"
                                size={"2em"}
                              />
                            ) : (
                              <BsFillXCircleFill color="#FF5733" size={"2em"} />
                            )}
                          </div>
                        ))
                      ) : (
                        <div>Not completed</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3>Standard sections:</h3>
                    <div className={styles["review-standard-container"]}>
                      {userCourseData.standardQuestions?.length > 0 ? (
                        userCourseData.standardQuestions
                          .sort((a, b) => a.section - b.section)
                          .map((e, i) => (
                            <div style={{ margin: "0 10px" }} key={i}>
                              <p>
                                Section <strong>{e.section}</strong>{" "}
                              </p>
                              <div>
                                {e.isCorrect ? (
                                  <BsFillCheckCircleFill
                                    color="#50C878"
                                    size={"2em"}
                                  />
                                ) : (
                                  <BsFillXCircleFill
                                    color="#FF5733"
                                    size={"2em"}
                                  />
                                )}
                              </div>
                            </div>
                          ))
                      ) : (
                        <div>Not completed</div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <ol className={styles["course-item-list"]} type="number">
                    {list.map((l, i) => (
                      <li
                        onClick={() => props.setCurrentSection(i + 1)}
                        data-content={checkSections(i + 1)}
                        data-done={
                          checkSections(i + 1) === "\u2713" ? "true" : "false"
                        }
                        key={i}
                      >
                        {l}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>final</div>
      )}
    </>
  );
}
