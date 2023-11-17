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

  export const mathSubtopic = ['trigonometry', 'logarithms and quadratics', 'differentiation', 'integration', 'vectors', 'complex numbers', 'matrices', 'sequences and series', 'proof', 'coordinate geometry', 'functions', 'binomial expansion', 'numerical methods', 'parametric equations', 'polar coordinates', 'differential equations', 'hyperbolic functions', 'vectors in 3D', 'moments'];

  export const physicsSubtopic = ['atomic structure', 'particles and antiparticles', 'forces and exchange particles', 'quarks', 'classification of particles', 'the photoelectric effect', 'wave-particle duality', 'energy levels and photon emission', 'progressive waves', 'diffraction', 'superposition and coherence', 'diffraction gratings', 'refractive index', 'forces', 'moments', 'mass, weight and centre of mass', 'projectile motion', 'newtons laws of motion', 'conservation of energy', 'drag and lift', 'stress and strain', 'the young modulus', 'current and potential difference', 'electrical enerfy and power', 'nuclear physics', 'gravitational potential', 'gravitational fields', 'capacitors', 'magnetic fields', 'ideal gas equation', 'simple harmonic motion'];

  export const compSubtopic = ['variables', 'queue stack', 'logic gates', 'binary math', 'object orientated programming', 'arrays', 'data types', 'sorting algorithms', 'hash tables', 'dictionaries', 'functions and scope', 'conditional statements', 'tls', 'osi model', 'binary search trees', 'multi-threaded execution', 'memory management', 'virtual memory', 'time complexities', 'tls handshakes']

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
