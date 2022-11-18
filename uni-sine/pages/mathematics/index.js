import SecondaryBanner from '../../components/SecondaryBanner'
import Selection from '../../components/physics/Selection'

import styles from '../../styles/Content.module.css'
import Link from 'next/link'

export default function Maths() {

  let documentsContentListArray = [
    'Laws of exponents',
    'Fraction laws',
    'Probability',
    'Vectors',
    {
        name: 'Graphing Functions', 
        sub: ['Graphing linear functions', 'Graphing inequalities', 'Graphing quadratic functions', 'Graphing Cubic functions', 'Graphing radicals', 'Graphing exponentials', 'Graphing Logarithms', 'Graphing multiple x terms']
    },
    'Fundamental Trigonometry',
    "Triangle area and sectors",
    "Logarithms",
    "Calculus"
]

return (
  <>
      <SecondaryBanner title='Mathematics' subheader={`${documentsContentListArray.length} Articles · Updated 25/06/2022`}  />
      <div className={styles['content-container']}>
          <div className={styles['side-list-container']}>
              <div className={styles['list-parent']}>
                  <h2>Content List</h2>
                  <h3>Documents</h3>
                  <ol>{
                      documentsContentListArray.map((a,i) => (   // This maps the array of content in a list and creates list items for each array item
                      <li key={i}>{
                          typeof a === `object` ? (
                              <>{
                                  <Link href={`/mathematics/${a.name.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}>{a.name}</Link>}
                                  <ul>
                                      {a.sub.map((e, i) => 
                                      <li key={i}>{<Link href={`/mathematics/${e.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}>{e}</Link>}</li>
                                      )}
                                  </ul></>
                              ) : (<Link href={`/mathematics/${a.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}>{a}</Link>)
                      }
                      </li>
                  ))
                  }</ol>
                  
              </div>
      
          </div>
          <div className={styles['middle-content-container']}>
              <Selection 
              link={`/mathematics/${documentsContentListArray[0].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
              title={documentsContentListArray[0]}
              description={<p>
                  Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
              </p>}/>
              <Selection 
              link={`/mathematics/${documentsContentListArray[1].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
              title={documentsContentListArray[1]}
              description={<p>
                  Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
              </p>}/>
              <Selection 
              link={`/mathematics/${documentsContentListArray[2].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
              title={documentsContentListArray[2]}
              description={<p>
                  Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
              </p>}/>
              <Selection 
              link={`/mathematics/${documentsContentListArray[3].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
              title={documentsContentListArray[3]}
              description={<p>
                  Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
              </p>}/>

              <Selection 
                    link={`/mathematics/${documentsContentListArray[4].name.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
                    title={documentsContentListArray[4].name}
                    description={<p>
                        Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
                </p>}/>
                <Selection 
              link={`/mathematics/${documentsContentListArray[5].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
              title={documentsContentListArray[5]}
              description={<p>
                  Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
              </p>}/>
              <Selection 
              link={`/mathematics/${documentsContentListArray[6].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
              title={documentsContentListArray[6]}
              description={<p>
                  Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
              </p>}/>
              <Selection 
              link={`/mathematics/${documentsContentListArray[7].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
              title={documentsContentListArray[7]}
              description={<p>
                  Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
              </p>}/>
              <Selection 
              link={`/mathematics/${documentsContentListArray[8].toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
              title={documentsContentListArray[8]}
              description={<p>
                  Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.
              </p>}/>
          </div>
      </div>
  </>
)
  }