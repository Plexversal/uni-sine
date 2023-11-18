
import SecondaryBanner from '../../components/page-construction/SecondaryBanner'
import Selection from '../../components/page-construction/Selection'
import styles from '../../styles/Content.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Physics() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [documentsContentListArray, setList] = useState([
    {
        title: 'Specific charge',
        description: `Calculate specific charge of the standard particles in an atom and what each subatomic particle's mass and charge are.`,
        category: 'Particles',
        path: 'specific-charge'
    },
    {
        title: 'Balancing Nuclear Equations',
        description: 'Understand when particles decay and what results to expect. Including alpha, electron-capture and beta decay.',
        category: 'Particles',
        path: 'balancing-nuclear-equations'
    },
    {
        title: 'Exponential decay and half-life',
        description: 'Calculate half-life of a particular atom based on given samples and understand the decay constant.',
        category: 'Particles',
        path: 'exponential-decay-and-halflife'

    },
    {
        title: 'Electric Fields and forces',
        description: 'Force and field equations using Coulombs law, electric potential and work done.',
        category: 'Forces',
        path: 'electric-fields-and-forces'
    },
    {
        title: 'Gravitational Fields and forces',
        description: 'Force and field equations using Newtons laws of gravity and calculate the strength of a gravitational field',
        category: 'Forces',
        path: 'gravitational-fields-and-forces'
    },
    {
        title: 'Keplers third law',
        description: 'Combine Newtonian gravitational equations with Keplers orbital relationships to find velocity and orbital periods of celestial objects.',
        category: 'Forces',
        path: 'keplers-third-law'
    },
    {
        title: 'Escape velocity',
        description: 'Use Newtonian equations to work out the velocity objects require to escape a bodies gravitational pull.',
        category: 'Forces',
        path: 'escape-velocity'
    },
    {
        title: 'Gravitational Potential',
        description: 'Explore the inner workings of gravitational potential and how a mass body has energy based on its surrounding gravitational field',
        category: 'Forces',
        path: 'gravitational-potential'
    },
    {
        title: 'Binding energy and mass defect',
        description: 'Understand Einstein\'s energy equation and how all atoms contain large amounts of energy which can be converted in a variety of ways',
        category: 'Particles',
        path: 'binding-energy-and-mass-defect'
    },
])
  const [forcesTopics, setForcesTopics] = useState([]);
  const [particlesTopics, setParticlesTopics] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const forceTopics = documentsContentListArray.filter(a => a.category === 'Forces');
    const particleTopics = documentsContentListArray.filter(a => a.category === 'Particles');
    setForcesTopics(forceTopics);
    setParticlesTopics(particleTopics);
    setNoResults(forceTopics.length > 0 || particleTopics.length > 0);
  }, [documentsContentListArray]);

  useEffect(() => {
    const filteredForceTopics = documentsContentListArray.filter(a => a.category === 'Forces' && a.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredParticleTopics = documentsContentListArray.filter(a => a.category === 'Particles' && a.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setForcesTopics(filteredForceTopics);
    setParticlesTopics(filteredParticleTopics);
    setNoResults(filteredForceTopics.length > 0 || filteredParticleTopics.length > 0);
  }, [searchTerm]);

  function searchQuery(e) {
    setSearchTerm(e.target.value);
  }

  function displayTopic(topics) {
    return topics.map((a, i) => (
      <Selection key={i}
        link={`${router.route}/${a.title.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/[ *]/g, "-")}`}
        title={a.title}
        description={a.description}
      />
    ));
  }

  function searchComponent() {
    return (
      <div className={styles['search-content-wrapper']}>
        <input placeholder='Browse topics below or search' className={styles['user-topic-search']} id='user-search-topic' onChange={e => searchQuery(e)} type='text'></input>
      </div>
    );
  }

  return (
    <>
      <SecondaryBanner title='Physics' search={true ? searchComponent : <div>Loading</div>} subheader={`${documentsContentListArray.length} Articles · Updated 25/06/2022`} />
      <div className={styles['content-container']}>
        {!noResults ? <h2>No topics match search criteria</h2> : null}

        <div id='middle-content-container' className={styles['middle-content-container']}>
          {forcesTopics.length > 0 ? <h2 id='forces-topic-title'>Forces</h2> : null}
          <div id='forces-topic-wrapper' className={styles['middle-content-wrapper']}>
            {displayTopic(forcesTopics)}
          </div>
          {particlesTopics.length > 0 ? <h2 id='particles-topic-title'>Particles</h2> : null}
          <div id='particles-topic-wrapper' className={styles['middle-content-wrapper']}>
            {displayTopic(particlesTopics)}
          </div>
        </div>
      </div>
    </>
  );
}
