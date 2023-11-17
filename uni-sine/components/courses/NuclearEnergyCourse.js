import { useEffect, useState, useCallback, useRef  } from "react";
import LoadingIcon from "../page-construction/LoadingIcon";
import styles from "../../styles/Courses.module.css";
import {BsFillXCircleFill, BsFillCheckCircleFill} from 'react-icons/bs'
import PercentIcon from "../page-construction/PercentageIcon";
import QuestionElement from "./QuestionElement";
import MathJaxContent from '../page-construction/MathJaxContent'
export default function NuclearEnergyCourse (props) {
  const [isLoading, setIsLoading] = useState(false);
  const [userCourseData, setUserCourseData] = useState([])
  const [correctAnswerValue, setCorrectAnswerValue] = useState(null)
  const [selected, setSelected] = useState("");
  const [correctQuestions, setCorrectQuestions] = useState([])
  const [isDataReady, setIsDataReady] = useState(false);
  const prevSectionRef = useRef(props.currentSection); 

  const list = ['Basics of Nuclear Physics', 'Further Concepts in Nuclear Physics', 'Nuclear Fission', 'Nuclear Fission Practice', 'Nuclear Fusion','Nuclear Fusion Practice', 'Reactor Designs', 'Reactor Designs Practice', 'Advanced: Radiation and Safety', 'Practice Questions', 'Course Review']

  const questions = [
    {
      question: "Which particle often starts a controlled nuclear fission reaction?",
      answersArray: [`proton`, `electron`, {correctAnswer: `neutron`}, `positron`]
    },
    {
      question: "What is the most common isotopes used in fusion reactions?",
      answersArray: [`uranium`, `plutonium`, {correctAnswer: `hydrogen`}, `nitrogen`]
    },
    {
      question: "Which formula can be used to calculate the amount of energy deposited by radiation per unit mass of tissue?",
      answersArray: [`\\(D = \\frac{m}{E}\\)`, `\\(D = \\frac{Q}{I_0 e}\\)`, {correctAnswer:  `\\(D = \\frac{E}{m}\\)`}, `\\(D = \\frac{1}{r^2}\\)`]
    }
  ];

  const handleQuestionCallback = (childData) => {
    setCorrectQuestions(prevState => {
      const existingQuestionIndex = prevState.findIndex(
        item => item.question === childData.question
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

    function checkSections (section) {
      if(!userCourseData || userCourseData.length <= 0) return section
      let completedSection = userCourseData.completedSections;
      const isDone = completedSection.some((e) => e === section);
      
      return isDone ? '\u2713' : section;
      
    }
    

    function setCorrectAnswer(e, answer) {
      let inputValue = e.target.value;
      
      if(typeof inputValue === 'string') {
        inputValue = inputValue.toLowerCase();
      }
      
      if(inputValue == (typeof answer === 'string' ? answer.toLowerCase() : answer)) {
        setCorrectAnswerValue(true);
      } else {
        setCorrectAnswerValue(false);
      }
    }
    



  const handleClick = (value, correct) => {
    if(selected) return
    if(correct) {
      setCorrectAnswerValue(true)
    } else {
      setCorrectAnswerValue(false)
    }
    setSelected(value);
  };

  useEffect(() => {

    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset();
    }
    setCorrectAnswerValue(null)

    setSelected('')

  }, [props.currentSection]);

    // save course data on page move
    useEffect(() => {
      let data;
  
      if(prevSectionRef.current == list.length - 1) {
        if(!isDataReady) return
        data = {
          courseName: props.courseName, // string
          section: prevSectionRef.current, // number
          questionsCompleted: correctQuestions
        }
  
      } 
      else if(correctAnswerValue !== null) {
        data = {
          courseName: props.courseName, // string
          section: prevSectionRef.current, // number
          standardQuestions: [{section: prevSectionRef.current, isCorrect: correctAnswerValue}] // array
  
        }
      }
      else {
  
        data = {
          courseName: props.courseName, // string
          section: prevSectionRef.current, // number
  
        }
      }
  
      async function saveToUser() {
        if(prevSectionRef.current == 0) return
        try {
          setIsLoading(true)
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
            const errorMessage = errorData.message || saveToUserResponse.statusText;
            return console.error(
              `Error saving to user ${saveToUserResponse.status}: ${errorMessage}`
            );
          }
        } catch (error) {
          console.error("Unexpected error:", error);
        } finally {
          setIsLoading(false)
  
  
        }
      }
  
      saveToUser()
      setIsDataReady(false); // Reset the flag
      prevSectionRef.current = props.currentSection;
  
    }, [props.currentSection, isDataReady])
  
  // get user course data
  useEffect(() => {
    console.log(props.currentSection)
    if((props.currentSection !== 0  && props.currentSection !== list.length)) return
    setIsLoading(true)
    const fetchData = async () => {
      try {
        let response = await fetch(`/api/db/getUserCourseStats?courseName=${encodeURIComponent(props.courseName)}`)
        if(response.status === 404) {
          return setUserCourseData(null)
        } else {
          let data = await response.json()
          setUserCourseData(data)
         
        }
      } catch (error) {
        setUserCourseData(null)
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [props.currentSection, isDataReady])

  return (
    <>
      {props.currentSection == 0 ? (
        <div>
          <div>
            <h2>Introduction to Nuclear Energy</h2>
            <p>
            Nuclear energy represents one of the most concentrated forms of energy available, produced through the processes of nuclear fission or fusion. In nuclear fission, the nucleus of an atom is split into smaller parts, usually as a result of absorbing a neutron. This splitting releases a significant amount of energy, primarily in the form of heat, which can be harnessed to produce steam that drives turbines to generate electricity. The most common element used in fission reactors is uranium, which is relatively abundant and can release large amounts of energy due to its heavy and unstable nucleus. Nuclear power plants utilize this process in a controlled environment, ensuring a steady and reliable source of electricity while emitting no greenhouse gases during operation.
            </p>
            <p>
            The potential of nuclear energy extends beyond just electricity production; it also includes medical applications, space exploration, and desalination processes. One of the key advantages of nuclear power is its high energy density compared to fossil fuels, meaning a small amount of nuclear fuel can produce a large amount of energy. However, the management of nuclear waste and the risks associated with potential nuclear accidents are significant challenges that continue to be addressed through advancements in reactor design, safety systems, and waste disposal methods. As the global community grapples with climate change and the search for sustainable energy sources, nuclear energy remains a pivotal part of the conversation due to its capability to provide large-scale, low-carbon energy.
            </p>
          </div>
          <div>
            <div className={styles["course-content"]}>
              <h2>Course content</h2>
              <p>
                <i>Click below to jump to a section</i>
              </p>
              {
                isLoading ? <LoadingIcon /> : <ol className={styles['course-item-list']} type="number">
                {list.map((l, i) => (
                  <li
                    onClick={() => props.setCurrentSection(i + 1)}
                    data-content={checkSections(i+1)}
                    data-done={checkSections(i+1) === '\u2713' ? 'true' : 'false'}
                    key={i}
                  >
                    {l}
                  </li>
                ))}
              </ol>
              }
            </div>
          </div>
        </div>
      ) : props.currentSection == 1 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>The Basics of Nuclear Physics</h2>
            <p>Understanding nuclear physics is foundational for comprehending how nuclear energy is produced, harnessed, and utilized. Here are the key concepts and equations that form the basis of nuclear physics:</p>
            <p>The nucleus is the small, dense region at the center of an atom, composed of protons and neutrons (collectively known as nucleons). Protons have a positive charge, while neutrons are neutral. The protons within the nucleus repel each other due to their like charges, but the nucleus remains bound together by the strong nuclear force, which is much more powerful than the electromagnetic repulsion but operates over very short distances.</p>
            <p>The famous equation {`\\(E = mc^2\\)`} by Albert Einstein is crucial in nuclear physics. It states that mass and energy are interchangeable; this principle underpins the enormous energy release in nuclear reactions, where tiny amounts of mass can be converted into large quantities of energy.</p>
            <h3>Nuclear Binding Energy and Mass Defect</h3>
            <p>The binding energy of a nucleus is the energy required to disassemble a nucleus into its constituent protons and neutrons. The mass of a nucleus is always less than the sum of the masses of its free constituent particles; this difference is known as the mass defect, and it is equivalent to the binding energy {`\\(E_b\\)`} of the nucleus:</p>
            <MathJaxContent content={`$$ E_b = (\\Delta m)c^2 $$`} />
            <p>where {`\\(\\delta m\\)`} is the mass defect.</p>
            <p>Radioactivity is the spontaneous emission of particles or electromagnetic radiation from an unstable nucleus. The decay of radioactive isotopes is governed by decay laws, quantified by the half-life {`\\(t_{\\frac{1}{2}}\\)`} which is the time required for half of the radioactive nuclei in a sample to decay.</p>
            <p>The decay rate can be expressed as: </p>
            <MathJaxContent content={`$$ R = \\lambda N $$`} />
            <p>where {`\\(\\lambda\\)`} is the decay constant and {`\\(N\\)`} is the number of radioactive nuclei.</p>
          </div>
          <div
            style={{ textAlign: "center" }}
            className={styles["media-content"]}
          >

          </div>
        </div>
      ) : props.currentSection == 2 ? (
        <div>
            <div>
            <div className={styles["text-content"]}>
            <h2>Further Concepts in Nuclear Physics</h2>
            <p>Building on the foundation of nuclear physics, several advanced concepts are pivotal for a deeper understanding. Here&apos;s an overview of these concepts:</p>
            <h3>Electromagnetic Radiation</h3>
            <p>Electromagnetic radiation is energy transmitted through space in the form of waves or particles called photons. It encompasses a broad spectrum, including radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays. Nuclear processes often involve gamma rays, which are high-energy electromagnetic radiation emitted from nuclear transitions. The energy {`\\(E\\)`} of a photon is given by the equation:</p>
            <MathJaxContent content={`$$ E = hv $$`} />
            <p>where {`\\(h\\)`} is Planck&apos;s constant and {`\\(v\\)`} is the frequency of the radiation.</p>
            <h3>Antiparticles and Antimatter</h3>
            <p>Every particle in the Standard Model of particle physics has a corresponding antiparticle with the same mass but opposite charge. When a particle meets its antiparticle, they annihilate each other, converting their mass into energy according to Einstein&apos;s equation {`\\(E = mc^2\\)`}. Positrons ({`\\(e^+\\)`}), antiprotons ({`\\(\\bar{p}\\)`}), and antineutrons ({`\\(\\bar{n}\\)`}) are examples of antiparticles to electrons, protons and neutrons, respectively.</p>
            <h3>Nuclear Forces</h3>
            <ol>
              <li>
              <strong>Strong Nuclear Force:</strong> This is the force that binds protons and neutrons in the nucleus. It&apos;s described by quantum chromodynamics (QCD) and is mediated by particles called gluons. The strong force has a property known as &quot;color confinement,&quot; meaning it acts only over a short range (on the order of 1 femtometer).
              </li>
              <li>
              <strong>Weak Nuclear Force:</strong> Responsible for the process of beta decay, the weak force operates over a short range and is weaker than the electromagnetic and strong forces but stronger than gravity. It&apos;s mediated by W and Z bosons, as per the electroweak theory part of the Standard Model.
              </li>
            </ol>
            <h3>Beta Decay and the Weak Interaction</h3>
            <p>Beta decay is a process by which a nucleus can change its internal structure by emitting a beta particle (an electron or a positron). There are two types:</p>
            <p><strong>Beta-minus decay:</strong> A neutron is transformed into a proton, an electron {`\\(e^-\\)`} and an antineutrino {`\\(\\bar{v}_e\\)`}</p>
            <MathJaxContent content={`$$ {}^{A}_{Z}\\mathrm{X} \\rightarrow {}^{A}_{Z+1}\\mathrm{Y} + e^- + \\bar{v}_e$$`} />
            <p><strong>Beta-plus decay: </strong>A proton is converted into a neutron, a positron {`\\(e^+\\)`} and a neutrino {`\\(v_e\\)`}</p>
            <MathJaxContent content={`$$ {}^{A}_{Z}\\mathrm{X} \\rightarrow {}^{A}_{Z-1}\\mathrm{Y} + e^+ + \\bar{v}_e$$`} />
            <h3>Conversation Laws</h3>
            <p>Key conservation laws govern nuclear reactions:</p>
            <ul>
              <li><strong>Conservation of Energy:</strong> Energy cannot be created or destroyed, only transformed.</li>
              <li><strong>Conservation of Momentum:</strong> The total momentum before and after a nuclear reaction must be equal.</li>
              <li><strong>Conservation of Charge:</strong> The total charge remains the same before and after the reaction.</li>
              <li><strong>Conservation of Baryon Number:</strong> The total number of baryons (protons and neutrons) remains constant.</li>
              <li><strong>Conservation of Lepton Number:</strong> The total number of leptons remains the same, although the number of leptons of each type (electron, muon, tau) must also be conserved separately.</li>
            </ul>
          </div>
          
          </div>
          <div
            style={{ textAlign: "center" }}
            className={styles["media-content"]}
          >

          </div>
        </div>
      ) : props.currentSection == 3 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Nuclear Fission</h2>
            <p>Nuclear fission is a type of nuclear reaction in which the nucleus of an atom splits into two or more smaller nuclei, along with a few neutrons and a large amount of energy. Here&apos;s how it works on an atomic level and the relevant equations associated with it:</p>
            <ol>
              <li><strong>Neutron Absorption:</strong> Fission begins when a heavy nucleus (like uranium-235 or plutonium-239) absorbs a neutron. This causes the nucleus to become excited and unstable.</li>
              <li><strong>Nucleus Deformation:</strong> The absorbed neutron increases the energy within the nucleus, causing it to deform and elongate.</li>

              <li><strong>Nucleus Splitting:</strong> Due to the instability and deformation, the nuclear forces can no longer hold the nucleus together, and it splits into two or more smaller nuclei, which are called fission fragments.</li>

              <li><strong>Neutron Emission:</strong> During the splitting, additional neutrons are released. These can go on to initiate further fission reactions in a chain reaction.</li>

              <li><strong>Energy Release:</strong> The mass of the fission products and released neutrons is less than the original mass. The mass difference (mass defect) is converted into energy according to Einstein&apos;s equation {`\\(E = mc^2\\)`}</li>

            </ol>
            <p>The amount of energy released {`\\(E\\)`} can be calculated from the mass defect {`\\(\\Delta m\\)`} using Einstein&apos;s equation:</p>
            <MathJaxContent content={`$$ E = \\Delta m \\cdot c^2 $$`} />
            <p>A critical aspect of fission is the chain reaction, which can be represented by the multiplication factor {`\\(k\\)`}, where:</p>
            <MathJaxContent content={`$$ k = \\frac{\\text{number of neutrons in one generation}}{\\text{number of neutrons in the preceding genertation}} $$`}/>
            <p>or a sustained chain reaction, {`\\(k\\)`} must be equal to or greater than 1</p>
            <p>The neutron life cycle is the average number of neutrons from one fission event that cause another fission event is given by the effective multiplication factor {`\\((k_{eff})\\)`}</p>
            <MathJaxContent content={`$$ k_{eff} = f \\cdot \\eta \\cdot p \\cdot \\epsilon $$`} />
            <p>where {`\\(f\\)`} is the thermal utilization factor, {`\\(\\eta\\)`} is the number of neutrons produced per absorption in fuel, {`\\(p\\)`} is the fast fission factor, and {`\\(\\epsilon\\)`} is the fast non-leakage probability.</p>
            <p>The minimum amount of fissile material needed to maintain a chain reaction is called the critical mass. It depends on various factors like the shape, purity, and density of the material, as well as the presence of a moderator.</p>
            <p>The binding energy per nucleon indicates the stability of a nucleus and can help predict whether a nucleus is likely to undergo fission. It is given by:</p>
            <MathJaxContent content={`$$ B / A = \\frac{E_b}{A} $$`} />
            <p>where {`\\(B / A\\)`} is the binding energy per nucleon, {`\\(E_b\\)`} is the total binding energy, and {`\\(A\\)`}  is the mass number (total number of protons and neutrons).</p>
            <p>The products of fission are not uniform; they follow a distribution where some mass numbers are more favored than others, typically yielding two uneven fragments.</p>
            <p>Not all neutrons are released immediately during fission. Prompt neutrons are released directly, while delayed neutrons are emitted by the fission products over time. Delayed neutrons play a crucial role in the control of nuclear reactors.</p>
          </div>
          <div
            style={{ textAlign: "center" }}
            className={styles["media-content"]}
          >

          </div>
        </div>
      ) : props.currentSection == 4 ? (
        <div>
          <div>
            <h2>Practice</h2>
            <p>
            The total binding energy of a certain nucleus (X) with a mass number (A) of 56 is 490 MeV. Calculate the binding energy per nucleon for nucleus X.
            </p>


            <input
              onChange={(e) => setCorrectAnswer(e, 8.75)}
              placeholder="Type Answer"
              id="number-input"
              className={styles["answer-input"]}
              type="number"
              step={0.01}
            /> MeV / nucleon
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
            <h2>Nuclear Fusion</h2>
            <p>Nuclear fusion is the process by which two light atomic nuclei combine to form a heavier nucleus, releasing energy as a result. It&apos;s the process that powers the sun and other stars, and it holds the potential for a near-limitless source of clean energy. Here&apos;s a detailed look at how fusion works on an atomic level and the relevant equations:</p>
            <ol>
              <li><strong>Approaching Nuclei:</strong> Fusion requires two positively charged nuclei to come close enough for the strong nuclear force to overcome their electromagnetic repulsion.</li>
              <li><strong>Overcoming Coulomb Barrier:</strong> At room temperature and pressure, the Coulomb barrier (the repulsion between the positive charges) prevents the nuclei from coming close enough to fuse. To overcome this, high temperatures and pressures are necessary, such as those found in the cores of stars.</li>
              <li><strong>Formation of New Nucleus:</strong> Once close enough, the strong nuclear force binds the nuclei together, forming a heavier nucleus. This process usually involves isotopes of hydrogen, such as deuterium (<sup>2</sup>H) and tritium (<sup>3</sup>H).</li>
              <li><strong>Energy Release:</strong> The mass of the new nucleus is less than the sum of the original masses. This mass difference is released as energy according to Einstein&apos;s equation {`\\(E = mc^2\\)`}</li>
            </ol>
            <p>The fusion rate depends on the temperature, density, and cross-section of the target nuclei and can be estimated by the Gamow factor, which gives the probability of tunneling through the Coulomb barrier.</p>
            <p>The power density {`\\(P\\)`} of a fusion reaction is given by:</p>
            <MathJaxContent content={`$$ P = n^2 \\langle  \\sigma v \\rangle Q $$`} />
            <p>where {`\\(n\\)`} is the number density of the reacting particles, {`\\(\\langle  \\sigma v \\rangle\\)`} is the product of the fusion cross-section {`\\(\\sigma\\)`} and the relative velocity of the particles {`\\(v\\)`}, averaged over all velocities, and {`\\(Q\\)`} is the energy released per reaction.</p>
            <p> For a fusion reaction to be self-sustaining, it must satisfy the Lawson criterion, which states that the product of the density of the fuel and the energy confinement time must exceed a certain minimum value.</p>
            <MathJaxContent content={`$$ n r \\geq \\frac{12 k T}{\\langle  \\sigma v \\rangle Q} $$`} />
            <p>where {`\\(r\\)`} is the confinement time, {`\\(k\\)`} is the Boltzmann constant, and {`\\(T\\)`} is the temperature.</p>
            <p>The most common fusion reactions involve hydrogen isotopes because they have the lowest Coulomb barriers. Two primary reactions are:</p>
            <p><strong>Deuterium-Tritium (D-T) Fusion</strong></p>
            <MathJaxContent content={`$$ {}^{2}_{1}\\mathrm{H} + {}^{3}_{1}\\mathrm{H} \\rightarrow {}^{4}_{2}\\mathrm{He} + {}^{1}_{0}n + 17.6 \\text{MeV} $$`} />
            <p><strong>Deuterium-Deuterium (D-D) Fusion</strong></p>
            <MathJaxContent content={`$$ {}^{2}_{1}\\mathrm{H} + {}^{2}_{1}\\mathrm{H} \\rightarrow {}^{3}_{2}\\mathrm{He} + {}^{1}_{0}n + 3.3 \\text{MeV} $$`} />

            <p>or</p>
            <MathJaxContent content={`$$ {}^{2}_{1}\\mathrm{H} + {}^{2}_{1}\\mathrm{H} \\rightarrow {}^{3}_{1}\\mathrm{H} + {}^{1}_{1}p + 4.0 \\text{MeV} $$`} />
            <p>Achieving controlled fusion on Earth requires conditions similar to the sun&apos;s core — extremely high temperatures and pressures. Technologies like magnetic confinement in tokamaks or inertial confinement using lasers are being developed to create and maintain these conditions in a stable manner.</p>

          </div>
          <div>
          </div>
        </div>
      ) : props.currentSection == 6 ? (
        <div>
<div>
            <h2>Practice</h2>
            <p>
            Assume you have a plasma where the number densities of deuterium and tritium are both {} particles per cubic meter {} The average fusion cross-section {} for D-T at the temperature of the plasma is given as {} Calculate the power density.
            </p>
            <div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 1 ? styles.selected : ""
                }`}
                onClick={() => handleClick(1, false)}
              >
                {`\\(3.84444 \\times 10^4 \\ \\text{W}/m^3\\)`}
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 2 ? styles.selected : ""
                }`}
                onClick={() => handleClick(2, false)}
              >
                {`\\(0.85484 \\times 10^4 \\ \\text{W}/m^3\\)`}
              </div>
              <div
                className={`${styles["option-div"]} ${
                  selected === 3 ? styles.selected : ""
                }`}
                onClick={() => handleClick(3, true)}
              >
                {`\\(2.81984 \\times 10^4 \\ \\text{W}/m^3\\)`}
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
      ) : props.currentSection == 7 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Reactor Designs</h2>
            <p>Modern fission reactors are engineered to harness the energy produced by nuclear fission in a controlled and safe manner. The designs of these reactors are intricate, with safety, efficiency, and sustainability at their core. Here are some of the modern fission reactor designs, with a basic explanation and relevant equations related to energy production.</p>
            <h3>Pressurized Water Reactor (PWR)</h3>
            <p>The PWR is the most common type of nuclear reactor. In a PWR, water is used as both a coolant and a moderator. The water is kept under high pressure to prevent it from boiling.</p>
            <p>Heat Production: The core of a PWR contains fuel rods with fissile material, typically enriched uranium or plutonium. The nuclear fission reaction generates heat. This heat is transferred to the water, which circulates through the core.</p>
            <MathJaxContent content={`$$ Q = mc\\Delta T $$`} />
            <p>where {`\\(Q\\)`} is the heat transferred, {`\\(m\\)`} is the mass flow rate of the coolant, {`\\(c\\)`} is the specific heat capacity of water, and {`\\(\\Delta T\\)`} is the temperature increase of the coolant.</p>
            <p>Energy Conversion: The hot pressurized water is then used to heat a separate water line in a steam generator, turning it into steam, which drives a turbine connected to an electrical generator.</p>
            <h3>Boiling Water Reactor (BWR)</h3>
            <p>BWRs are similar to PWRs but with a key difference: the water used for cooling the reactor core is allowed to boil, and the steam generated directly drives the turbine.</p>
            <p>Efficiency: The efficiency {`\\(\\eta\\)`} of a BWR can be estimated using the Carnot efficiency formula, which is dependent on the temperature difference between the reactor core and the output steam:</p>
            <MathJaxContent content={`$$ \\eta = 1 - \\frac{T_{cold}}{T_{hot}} $$`} />
            <p>where {`\\(T_{cold}\\)`} and {`\\(T_{hot}\\)`} are the temperatures of the coolant at the cold outlet and hot inlet, respectively.</p>
            <h3>Advanced Gas-cooled Reactor (AGR)</h3>
            <p>AGRs use carbon dioxide as the coolant and graphite as the moderator. They operate at higher temperatures than PWRs or BWRs, improving thermal efficiency.</p>
            <p>Thermal Efficiency: The thermal efficiency of AGRs is given by:</p>
            <MathJaxContent content={`$$ \\eta = \\frac{W_{out}}{Q_{in}} $$`} />
            <p>where {`\\(W_{out}\\)`} is the produced by the turbine and {`\\(Q_{in}\\)`} is the heat generated in the reactor.</p>
            <h3>Fast Neutron Reactors (FNR)</h3>
            <p>FNRs use fast neutrons to sustain the fission chain reaction, and typically, liquid metal such as sodium or lead is used as the coolant. They can use a broader range of fissile material, including spent nuclear fuel from other reactors.</p>
            <p>Neutron Economy: Fast reactors don&apos;t require a moderator because fast neutrons are more efficient at inducing fission in the fissile material.</p>
            <h3>Small Modular Reactors (SMRs)</h3>
            <p>SMRs are a newer development in reactor technology. They are smaller in size and can be fabricated at a plant and brought to a site to be assembled. They offer flexibility and are considered to be safer due to passive safety features.</p>
            <p>Modularity: SMRs can be combined to increase power output. The total output {`\\(P_{total}\\)`} is the sum of the power outputs of individual modules {`\\(P_{module}\\)`}</p>
            <MathJaxContent content={`$$P_{total} = n \\cdot P_{module} $$`} />
            <p>where {`\\(n\\)`} is the number of modules.</p>
           </div>
        </div>
      ) : props.currentSection == 8 ? (
        <div>
          <div>

            <h2>Practice</h2>
            <p>
            Suppose you have a boiling water reactor (BWR) operating with a reactor core temperature of 558.15 Kelvin and it expels waste heat into the environment at a temperature of 308.15 Kelvin. Calculate the maximum possible efficiency of this reactor using the Carnot efficiency formula.
            </p>

            <input
              onChange={(e) => setCorrectAnswer(e, 44.78)}
              placeholder="Type Answer"
              id="number-input"
              className={styles["answer-input"]}
              type="number"
              step={0.01}
            /> %
            {correctAnswerValue == true ? (
              <div className={styles["correct-text"]}>Correct</div>
            ) : (
              <div className={styles["incorrect-text"]}>
                {correctAnswerValue !== null && "Incorrect"}
              </div>
            )}

          </div>
        </div>
      ) : props.currentSection == 9 ? (
        <div>
          <div className={styles["text-content"]}>
            <h2>Advanced: Radiation and Safety</h2>
            <p>Radiation safety is a critical aspect of nuclear energy and medical applications that use radioactive materials. Understanding the types of radiation, their interactions with matter, and the measures used to ensure safety is essential. Here&apos;s a basic overview with relevant equations where applicable.</p>
            <p>Types of radiation:</p>
            <ul>
              <li><strong>Alpha Particles (α):</strong>Helium nuclei emitted by some radioactive substances. They have high mass and charge, making them highly ionizing but with low penetration ability. They can be stopped by a sheet of paper or the outer layer of skin.</li>
              <li><strong>Beta Particles (β):</strong>High-speed electrons or positrons emitted by certain types of radioactive decay. Beta particles are lighter than alpha particles and can penetrate further, requiring materials like plastic or aluminium to stop them.</li>
              <li><strong>Gamma Rays (γ):</strong>High-energy photons with no mass or charge, making them highly penetrating. They require dense materials like lead or several centimeters of concrete to attenuate effectively.</li>

            </ul>
            <p>Radiation interacts with matter primarily through ionization and excitation. The intensity of ionizing radiation decreases as it travels through a medium, which is described by the equation:</p>
            <MathJaxContent content={`$$ I = I_0 e^{-\\mu x} $$`} />
            <p>where {`\\(I\\)`} is the intensity after traveling through a distance x of the material, {`\\(I_0\\)`} is the initial intensity of the radiation, {`\\(\\mu\\)`} is the linear attenuation coefficient for the material and {`\\(x\\)`} is the thickness of the material.</p>
            <h3>Dose and dose rate</h3>
            <p>Absorbed Dose (D): The amount of energy deposited by radiation per unit mass of tissue, measured in grays (Gy).</p>
            <MathJaxContent content={`$$ D = \\frac{E}{m} $$`} />
            <p>where {`\\(E\\)`} is the energy deposited by the radiation and {`\\(m\\)`} is the mass of the absorbing tissue.</p>
            <p>Equivalent Dose (H): Accounts for the type of radiation and its biological effectiveness, measured in sieverts (Sv).</p>
            <MathJaxContent content={`$$ H = Q \\cdot D $$`} />
            <p>where {`\\(Q\\)`} is the quality factor, which varies with the type of radiation and {`\\(D\\)`} is the absorbed dose.</p>
            <h3>Radiation Safety Principles</h3>
            <ul>
              <li><strong>Shielding:</strong> Using appropriate materials to absorb or block the radiation can protect against exposure. The choice of shielding material depends on the type of radiation and its energy.</li>
              <li><strong>Time:</strong> Minimizing the time of exposure to radiation reduces the dose received.</li>
              <li><strong>Distance:</strong> Increasing distance from the source reduces dose due to the inverse square law for point sources:</li>
            </ul>
            <MathJaxContent content={`$$ I \\propto \\frac{1}{r^2} $$`} />
            <p>where {`\\(r\\)`} is the distance from the source</p>
            <h3>Safety Protocols and Regulations</h3>
            <p>ALARA Principle: &quot;As Low As Reasonably Achievable&quot; is a radiation safety principle for minimizing exposure.</p>
            <p>Devices like Geiger-Müller counters, ionization chambers, and dosimeters are used to measure radiation levels and personal exposure.</p>
            <p>Governments and international organizations set regulatory limits for radiation exposure to the public and occupational workers.</p>
              



          </div>
        </div>
      ) : props.currentSection == 10 ? (
        <div>          <div className={styles["text-content"]}>
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
      </div></div>
      ) : props.currentSection == 11 ? (
        <div style={{display: 'block'}}>
        <div className={styles["text-content"]}>

          {
            isLoading ? <LoadingIcon /> : 
            <div className={styles['review-container']}>
              <div className={styles['review-text']}>
                <div>
                  <h3>Final Questions</h3>
                  <div className={styles['review-questions-completed']}>
                    {
                      userCourseData.questionsCompleted?.length > 0 ? userCourseData.questionsCompleted.map((e, i) => (
                        <div  key={i}> 
                          {e.isCorrect ? <BsFillCheckCircleFill color="#50C878" size={'2em'} /> : <BsFillXCircleFill color="#FF5733" size={'2em'} />}
                        </div>  
                      )) : <div>Not completed</div>
                    }
                    
                  </div>
                </div>
                <div>
                  <h3>Standard sections:</h3>
                  <div className={styles['review-standard-container']}>
                  {
                      userCourseData.standardQuestions?.length > 0 ? userCourseData.standardQuestions.sort((a, b) => a.section - b.section).map((e, i) => (
                        <div style={{margin:'0 10px'}} key={i}> 
                          <p>Section <strong>{e.section}</strong> </p>
                          <div>{e.isCorrect ? <BsFillCheckCircleFill color="#50C878" size={'2em'} /> : <BsFillXCircleFill color="#FF5733" size={'2em'} />}</div>
                        </div>  
                      )) : <div>Not completed</div>
                    }
                    
                  </div>
                </div>
              </div>
              <div>
                <ol className={styles['course-item-list']} type="number">
              {list.map((l, i) => (
                <li
                onClick={() => props.setCurrentSection(i + 1)}
                  data-content={checkSections(i+1)}
                  data-done={checkSections(i+1) === '\u2713' ? 'true' : 'false'}
                  key={i}
                >
                  {l}
                </li>
                
              ))}
              
            </ol>
              </div>
              
            </div>
          }
        </div>
      </div>
      ) : (
        <div>final</div>
      )}
    </>
  );

}