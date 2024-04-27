export const aiFunction = {
  "name": "getQuestions",
  "parameters": {
    "type": "object",
    "properties": {
      "easy": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "question": {
              "type": "string",
              "description": "A randomly generation question"
            },
            "answers": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "text": {
                    "type": "string", 
                    "description": "an answer to the question, one should be correct, 3 should be not be correct"
                  },
                  "isCorrect": {
                    "type": "boolean"
                  }
                }
              }
            },
            "isAnswersEquation": {
              "type": "boolean",
              "description": "wether or not the answers use mathjax content"
            }
          }
        }
      },
      "medium": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "question": {
              "type": "string",
              "description": "A randomly generation question"
            },
            "answers": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "text": {
                    "type": "string", 
                    "description": "an answer to the question, one should be correct, 3 should be not be correct"
                  },
                  "isCorrect": {
                    "type": "boolean"
                  }
                }
              }
            },
            "isAnswersEquation": {
              "type": "boolean",
              "description": "wether or not the answers use mathjax content"
            }
          }
        }
      },
      "hard": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "question": {
              "type": "string",
              "description": "A randomly generation question"
            },
            "answers": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "text": {
                    "type": "string", 
                    "description": "an answer to the question, one should be correct, 3 should be not be correct"
                  },
                  "isCorrect": {
                    "type": "boolean"
                  }
                }
              }
            },
            "isAnswersEquation": {
              "type": "boolean",
              "description": "wether or not the answers use mathjax content"
            }
          }
        }
      },
    }
  }
}

export const schema = `{
    "easy": [
      {
        "question": " Express \\\\(\\\\cos (2x)\\\\) in terms of \\\\(\\\\sin x\\\\) only.",
        "answers": [
          {
            "text": "\\\\({1 - 2 \\\\sin ^2 x}\\\\)",
            "isCorrect": true
          },
          {
            "text": "\\\\({2 \\\\sin (x) - 1}\\\\)",
            
            "isCorrect": false
          },
          {
            "text": "\\\\({\\\\sin ^2 x - 2}\\\\)",
            "isCorrect": false
          },
          {
            "text": "\\\\({1 + 2 \\\\sin ^2 x}\\\\)",
            "isCorrect": false
          }
        ],
        "requiresMedia": false,
        "isAnswersEquation": true,
        "mediaType": null,
        "media": null,
        "answerType": "mcq"
      }
    ],
    "medium": [
      {
        "question": "\\\\(Solve the following, where -90° ≤ x ≤ 90°: ",
        "answers": [
          {
            "text": "\\\\(x = -30^\\\\circ\\\\)",
            "isCorrect": true
          },
          {
            "text": "\\\\(x = -45^\\\\circ\\\\)",
            "isCorrect": false
          },
          {
            "text": "\\\\(x = 30^\\\\circ\\\\)",
            "isCorrect": false
          },
          {
            "text": "\\\\(x = 45^\\\\circ\\\\)",
            "isCorrect": false
          }
        ],
        "requiresMedia": true,
        "isAnswersEquation": true,
        "mediaType": "equation",
        "media": "3\\\\tan(x)+2\\\\cos(x)=0",
        "answerType": "mcq"
      }
    ],
    "hard": [
      {
        "question": "Use the trapezium rule with 5 ordinates to find an estimate of the below integral to 3 decimal places:",
        "answers": [
          {
            "text": "2.978",
            "isCorrect": true
          },
          {
            "text": "3.978",
            "isCorrect": false
          },
          {
            "text": "2.555",
            "isCorrect": false
          },
          {
            "text": "3.123",
            "isCorrect": false
          }
        ],
        "requiresMedia": true,
        "isAnswersEquation": false,
        "mediaType": "equation",
        "media": "\\\\int_0^\\\\pi x\\\\sin(x)\\\\ x\\\\ dx",
        "answerType": "mcq"
      }
    ]
  }`

  export const schemaPhysics = `{
    "easy": [
      {
        "question": "A body of mass \\\\(m = 5kg\\\\) is acted upon by a force \\\\(F = 10N\\\\). What is the acceleration of the body?",
        "answers": [
          {
            "text": "\\\\(2 m/s^2\\\\)",
            "isCorrect": true
          },
          {
            "text": "\\\\(15 m/s^2\\\\)",
            
            "isCorrect": false
          },
          {
            "text": "\\\\(0.5 m/s^2\\\\)",
            "isCorrect": false
          },
          {
            "text": "\\\\(50 m/s^2\\\\)",
            "isCorrect": false
          }
        ],
        "requiresMedia": false,
        "isAnswersEquation": true,
        "mediaType": null,
        "media": null,
        "answerType": "mcq"
      }
    ],
    "medium": [
      {
        "question": "A diffraction grating has 500 lines per mm. What is the grating spacing?",
        "answers": [
          {
            "text": "\\\\(4 \\times 10^{-6} m\\\\)",
            "isCorrect": true
          },
          {
            "text": "\\\\(1 \\times 10^{-6} m\\\\)",
            "isCorrect": false
          },
          {
            "text": "\\\\(2 \\times 10^{-6} m\\\\)",
            "isCorrect": false
          },
          {
            "text": "\\\\(5 \\times 10^{-6} m\\\\)",
            "isCorrect": false
          }
        ],
        "requiresMedia": false,
        "isAnswersEquation": true,
        "mediaType": "equation",
        "media": null,
        "answerType": "mcq"
      }
    ],
    "hard": [
      {
        "question": "A projectile is launched at an angle of 30 degrees to the horizontal with a speed of 20 m/s. What is the maximum height reached by the projectile?",
        "answers": [
          {
            "text": "5m",
            "isCorrect": true
          },
          {
            "text": "10m",
            "isCorrect": false
          },
          {
            "text": "15m",
            "isCorrect": false
          },
          {
            "text": "20m",
            "isCorrect": false
          }
        ],
        "requiresMedia": false,
        "isAnswersEquation": false,
        "mediaType": "equation",
        "media": null,
        "answerType": "mcq"
      }
    ]
  }`

  export const schemaComp = `{
    "easy": [
      {
        "question": "Given the below binary value, what is the corresponding real number value?",
        "answers": [
          {
            "text": "145",
            "isCorrect": true
          },
          {
            "text": "3",
            
            "isCorrect": false
          },
          {
            "text": "10001",
            "isCorrect": false
          },
          {
            "text": "256",
            "isCorrect": false
          }
        ],
        "requiresMedia": false,
        "isAnswersEquation": false,
        "mediaType": "equation",
        "media": "10010001",
        "answerType": "mcq"
      }
    ],
    "medium": [
      {
        "question": "What is the time complexity of a binary search tree?",
        "answers": [
          {
            "text": "\\\\(O(n)\\\\)",
            "isCorrect": true
          },
          {
            "text": "\\\\(O(n log n)\\\\)",
            "isCorrect": false
          },
          {
            "text": "\\\\(O(n!)\\\\)",
            "isCorrect": false
          },
          {
            "text": "\\\\O(2^n)\\\\)",
            "isCorrect": false
          }
        ],
        "requiresMedia": false,
        "isAnswersEquation": true,
        "mediaType": "equation",
        "media": null,
        "answerType": "mcq"
      }
    ],
    "hard": [
      {
        "question": "What is the starting equation used in the Diffie-Hellman key exchange?",
        "answers": [
          {
            "text": "\\\\(g^a \\bmod n \\\\)",
            "isCorrect": true
          },
          {
            "text": "\\\\(g \\log n \\\\)",
            "isCorrect": false
          },
          {
            "text": "\\\\(g \\bmod n \\\\)",
            "isCorrect": false
          },
          {
            "text": "\\\\(g \\log n^a \\\\)",
            "isCorrect": false
          }
        ],
        "requiresMedia": false,
        "isAnswersEquation": false,
        "mediaType": "equation",
        "media": null,
        "answerType": "mcq"
      }
    ]
  }`

  export const mathSubtopic = [
    'trigonometry',
    'logarithms and quadratics',
    'differentiation',
    'integration',
    'vectors',
    'complex numbers',
    'matrices',
    'sequences and series',
    'proof',
    'coordinate geometry',
    'functions',
    'binomial expansion',
    'numerical methods',
    'parametric equations',
    'polar coordinates',
    'differential equations',
    'hyperbolic functions',
    'vectors in 3D',
    'moments',
    'probability theory',
    'statistics',
    'discrete mathematics',
    'graph theory',
    'linear algebra',
    'abstract algebra',
    'real analysis',
    'complex analysis',
    'topology',
    'geometry',
    'number theory',
    'set theory',
    'mathematical logic',
    'combinatorics',
    'optimization',
    'game theory',
    'financial mathematics',
    'actuarial science',
    'cryptographic algorithms',
    'mathematical modeling',
    'calculus of variations',
    'Fourier analysis',
    'wavelet transform',
    'fractals and chaos theory',
    'measure theory',
    'ergodic theory',
    'dynamical systems',
    'partial differential equations',
    'stochastic processes',
    'operations research',
    'mathematical physics',
    'applied mathematics',
    'history of mathematics',
    'mathematical education',
    'mathematical software and programming',
    'environmental mathematics',
    'biostatistics',
    'epidemiological modeling'
  ];
  

  export const physicsSubtopic = [
    'atomic structure',
    'particles and antiparticles',
    'forces and exchange particles',
    'quarks',
    'classification of particles',
    'the photoelectric effect',
    'wave-particle duality',
    'energy levels and photon emission',
    'progressive waves',
    'diffraction',
    'superposition and coherence',
    'diffraction gratings',
    'refractive index',
    'forces',
    'moments',
    'mass, weight and centre of mass',
    'projectile motion',
    'newtons laws of motion',
    'conservation of energy',
    'drag and lift',
    'stress and strain',
    'the young modulus',
    'current and potential difference',
    'electrical energy and power',
    'nuclear physics',
    'gravitational potential',
    'gravitational fields',
    'capacitors',
    'magnetic fields',
    'ideal gas equation',
    'simple harmonic motion',
    'thermodynamics',
    'entropy and the second law of thermodynamics',
    'quantum mechanics',
    'special relativity',
    'general relativity',
    'cosmology',
    'fluid dynamics',
    'plasma physics',
    'condensed matter physics',
    'acoustics',
    'optics',
    'electromagnetism',
    'particle physics',
    'nuclear fusion and fission',
    'astrophysics',
    'geophysics',
    'biophysics',
    'chemical physics',
    'environmental physics',
    'materials science',
    'electronic circuit design',
    'quantum field theory',
    'string theory',
    'loop quantum gravity',
    'chaos theory',
    'nanotechnology',
    'photovoltaics',
    'semiconductor physics',
    'superconductivity',
    'magnetohydrodynamics',
    'aerodynamics',
    'computational physics',
    'medical physics',
    'quantum computing'
  ];
  

  export const compSubtopic = [
    'variables',
    'queue stack',
    'logic gates',
    'binary math',
    'object orientated programming',
    'arrays',
    'data types',
    'sorting algorithms',
    'hash tables',
    'dictionaries',
    'functions and scope',
    'conditional statements',
    'tls',
    'osi model',
    'binary search trees',
    'multi-threaded execution',
    'memory management',
    'virtual memory',
    'time complexities',
    'tls handshakes',
    'graph algorithms',
    'dynamic programming',
    'recursion',
    'regular expressions',
    'software testing methods',
    'continuous integration/continuous deployment (CI/CD)',
    'cryptography fundamentals',
    'blockchain basics',
    'machine learning algorithms',
    'natural language processing',
    'computer vision',
    'web protocols (HTTP, HTTPS)',
    'RESTful APIs',
    'socket programming',
    'database normalization',
    'SQL and NoSQL databases',
    'indexing and search algorithms',
    'distributed systems',
    'cloud computing concepts',
    'cybersecurity threats and mitigation',
    'public key infrastructure (PKI)',
    'agile and scrum methodologies',
    'design patterns',
    'user authentication and authorization',
    'file systems',
    'operating system design',
    'network routing and switching',
    'firewalls and network security',
    'mobile application development',
    'game development fundamentals',
    'virtualization technologies',
    'containerization and orchestration (Docker, Kubernetes)',
    'big data processing',
    'Internet of Things (IoT) principles',
    'augmented and virtual reality basics',
    'ethical hacking basics',
    'quantum computing overview'
  ];
  

  export const randomStrings = [
    "Hello World",
    "Quick Brown Fox",
    "Final Draft",
    "New Entry",
    "Open Source",
    "Quick Sort",
    "Happy Days",
    "Night Sky",
    "Ocean View",
    "Great Job",
    "Magic Wand",
    "Urban Jungle",
    "Pure Gold",
    "Solar Power",
    "String Length",
    "Byte Code",
    "Deep Dive",
    "High Score",
    "Lost Cause",
    "True Colors",
    "Busy Bee",
    "Pixel Art",
    "Soft Skills",
    "Deep Blue Sea",
    "Strong Suit",
    "Fast Lane",
    "Smart Move",
    "End Game",
    "Hot Topic",
    "Wild Card",
    "Bright Side",
    "Prime Time",
    "Next Step",
    "Sweet Spot",
    "Last Call",
    "Old School",
    "Top Gear",
    "Key Point",
    "Green Light",
    "Late Night",
    "Close Call",
    "First Aid",
    "Good News",
    "Hard Rock",
    "High Five",
    "Big Deal",
    "Quick Fix",
    "Short Cut",
    "Small Talk",
    "Fun Fact",
    "Early Bird",
    "Fair Game",
    "Strong Hold",
    "Cool Breeze",
    "Dry Spell",
    "Free Fall",
    "High Tide",
    "Low Key",
    "Sharp Turn",
    "Tight Fit",
    "Warm Welcome",
    "Long Shot",
    "New Age",
    "Solid State",
    "Time Warp",
    "Wide Open",
    "Easy Win",
    "Big Bang",
    "Deep End",
    "Hot Spot",
    "Lost World",
    "Real Deal",
    "Speed Run",
    "Cold Case",
    "Light Year",
    "Small World",
    "Heavy Rain",
    "Old Ways",
    "Quick Start",
    "Best Bet",
    "Clear Sky",
    "Mountain High",
    "River Deep"
];

export const biologySubtopic = [
  'cell structure',
  'photosynthesis',
  'cellular respiration',
  'protein synthesis',
  'gene expression',
  'DNA replication',
  'RNA transcription',
  'molecular genetics',
  'genetic engineering',
  'CRISPR and gene editing',
  'human anatomy',
  'plant anatomy',
  'animal physiology',
  'plant physiology',
  'neurobiology',
  'endocrinology',
  'immunology',
  'pathogens and host defense',
  'epidemiology',
  'virology',
  'bacteriology',
  'parasitology',
  'fungi biology',
  'ecology',
  'conservation biology',
  'biodiversity',
  'marine biology',
  'freshwater biology',
  'desert ecology',
  'rainforest ecology',
  'biomes',
  'evolutionary theory',
  'natural selection',
  'speciation',
  'adaptive radiation',
  'phylogenetics',
  'population genetics',
  'ecological succession',
  'environmental science',
  'biogeochemical cycles',
  'biotechnology',
  'bioinformatics',
  'systems biology',
  'developmental biology',
  'embryology',
  'comparative anatomy',
  'paleontology',
  'zoology',
  'botany',
  'microscopy techniques',
  'biochemical pathways',
  'metabolomics',
  'proteomics',
  'genomics',
  'structural biology',
  'behavioral biology',
  'biophysics',
  'agricultural science',
  'food science',
  'forensic biology',
  'medical microbiology',
  'pharmacology',
  'toxicology',
  'wildlife biology',
  'ethology (study of animal behavior)',
  'aquatic and fish biology',
  'entomology (study of insects)',
  'herpetology (study of reptiles and amphibians)',
  'ornithology (study of birds)',
  'mycology (study of fungi)'
];

export const chemistrySubtopic = [
  'atomic structure',
  'periodic table',
  'chemical bonds',
  'molecular geometry',
  'stoichiometry',
  'chemical reactions',
  'equilibrium',
  'thermodynamics',
  'kinetics',
  'acids and bases',
  'redox reactions',
  'electrochemistry',
  'organic chemistry',
  'inorganic chemistry',
  'analytical chemistry',
  'physical chemistry',
  'biochemistry',
  'nuclear chemistry',
  'materials chemistry',
  'environmental chemistry',
  'industrial chemistry',
  'pharmaceutical chemistry',
  'polymer chemistry',
  'surface chemistry',
  'quantum chemistry',
  'spectroscopy',
  'chromatography',
  'mass spectrometry',
  'crystallography',
  'computational chemistry',
  'green chemistry',
  'chemical safety',
  'chemical engineering',
  'catalysis',
  'solubility',
  'solution chemistry',
  'colloids and suspensions',
  'coordination chemistry',
  'agrochemistry',
  'petrochemistry',
  'geochemistry',
  'photochemistry',
  'supramolecular chemistry',
  'medicinal chemistry',
  'cosmetic chemistry',
  'food chemistry',
  'marine chemistry',
  'atmospheric chemistry',
  'chemical kinetics',
  'chemical thermodynamics',
  'chemical synthesis',
  'organometallic compounds',
  'radioactivity',
  'nanotechnology in chemistry',
  'chemical informatics',
  'chemical education',
  'history of chemistry',
  'toxicology',
  'metallurgy',
  'ceramics chemistry',
  'electroplating',
  'corrosion science',
  'biomaterials',
  'laboratory techniques',
  'chemical legislation and standards'
];

export const calculusSubtopic = [
  'limits and continuity',
  'derivatives',
  'differentiation rules',
  'applications of derivatives',
  'maxima and minima',
  'curve sketching',
  'related rates',
  'optimization problems',
  'Newtons method',
  'antiderivatives',
  'definite integrals',
  'indefinite integrals',
  'integration techniques',
  'applications of integration',
  'area under a curve',
  'volume of solids of revolution',
  'arc length and surface area',
  'work done by a force',
  'center of mass',
  'fluid pressure and force',
  'sequences and series',
  'convergence tests for series',
  'power series',
  'Taylor and Maclaurin series',
  'Fourier series',
  'partial derivatives',
  'multiple integrals',
  'double integrals over rectangular and general regions',
  'triple integrals',
  'line integrals',
  'surface integrals',
  'vector fields',
  'Greens theorem',
  'Stokes theorem',
  'divergence theorem',
  'differential equations',
  'first-order differential equations',
  'second-order differential equations',
  'Laplace transforms',
  'systems of differential equations',
  'numerical methods in calculus',
  'calculus in polar coordinates',
  'parametric equations and calculus',
  'complex variables in calculus',
  'calculus of variations',
  'calculus with applications in physics',
  'calculus with applications in engineering',
  'calculus with applications in economics',
  'multivariable calculus',
  'differential geometry',
  'non-standard analysis'
];
