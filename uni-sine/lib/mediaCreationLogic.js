import { randomStrings } from './schemaConstants'
import * as dedent from 'dedent-js'

export function trigMedia() {
  let calculation = Math.round(Math.random()) ? "angle" : "side";
  let sideA = parseFloat((Math.random() * 6 + 3).toFixed(2));
  let sideB = parseFloat(
    (
      Math.random() * (8 - Math.max(3, Math.abs(sideA - 8))) +
      Math.max(3, Math.abs(sideA - 8))
    ).toFixed(2)
  );
  let sideC = parseFloat((Math.random() * (sideA + sideB - 6) + 3).toFixed(2));

  let vertices = computeVertices(sideA, sideB, sideC);
  let point1x = vertices.point1x;
  let point1y = vertices.point1y;
  let point2x = vertices.point2x;
  let point2y = vertices.point2y;
  let point3x = vertices.point3x;
  let point3y = vertices.point3y;

  let A, B, C, a, b, c;

  function computeVertices(a, b, c) {
    let cosC = (a * a + b * b - c * c) / (2 * a * b);
    let sinC = Math.sqrt(1 - cosC * cosC);
    let baseX = 2; // Starting x-coordinate
    let baseY = 2; // Starting y-coordinate

    return {
      point1x: baseX,
      point1y: baseY,
      point2x: baseX + b,
      point2y: baseY,
      point3x: baseX + a * cosC,
      point3y: baseY + a * sinC,
    };
  }

  const distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };
  a = distance(point1x, point1y, point3x, point3y);
  b = distance(point1x, point1y, point2x, point2y);
  c = distance(point2x, point2y, point3x, point3y);

  A = Math.acos(
    (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c)
  );
  B = Math.acos(
    (Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c)
  );
  C = Math.acos(
    (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b)
  );

  let showTrigValues = {};
  let hideTrigValues = {};

  let target; // The value to be calculated

  const sides = ["sideA", "sideB", "sideC"];
  const angles = ["angleA", "angleB", "angleC"];

  if (calculation === "side") {
    // Pick one random side and one random angle to hide
    const indexForSides = Math.floor(Math.random() * sides.length);
    const indexForAngles = Math.floor(Math.random() * angles.length);
    target = sides[indexForSides];

    sides.splice(indexForSides, 1);
    angles.splice(indexForAngles, 1);

    showTrigValues = {
      sideA: false,
      sideB: false,
      sideC: false,
      angleA: false,
      angleB: false,
      angleC: false,
      [sides[0]]: true,
      [sides[1]]: true,
      [target]: true,
      [angles[0]]: true,
    };
  } else {
    // Pick two random sides to show and one random angle to calculate
    const indexForAngles = Math.floor(Math.random() * angles.length);
    target = angles[indexForAngles];

    angles.splice(indexForAngles, 1);

    showTrigValues = {
      sideA: false,
      sideB: false,
      sideC: false,
      angleA: false,
      angleB: false,
      angleC: false,
      [sides[0]]: true,
      [sides[1]]: true,
      [angles[0]]: true,
      [target]: true,
    };
  }

  // Based on the showTrigValues, set the hideTrigValues
  hideTrigValues = Object.keys(showTrigValues).reduce((acc, key) => {
    acc[`hide${key.charAt(0).toUpperCase() + key.slice(1)}`] = key === target;
    return acc;
  }, {});

  const media = {
    sides: { sideA, sideB, sideC },
    showTrigValues,
    hideTrigValues,
  };

  let question = `Calculate the missing ${calculation} from the diagram below`;
  let correctAnswer = Number; // Initialize to an empty string

  // Switch statement to determine the correct answer based on the 'target'
  switch (target) {
    case "sideA":
      correctAnswer = a;
      break;
    case "sideB":
      correctAnswer = b;
      break;
    case "sideC":
      correctAnswer = c;
      break;
    case "angleA":
      correctAnswer = A;
      break;
    case "angleB":
      correctAnswer = B;
      break;
    case "angleC":
      correctAnswer = C;
      break;
    default:
      console.log("Invalid target");
  }
  function generateIncorrectAnswer(correctAnswer, type) {
    let deviation;
    let incorrectAnswer;

    if (type === "angle") {
      deviation = 0.1;
    } else {
      deviation = 1;
    }
    do {
      incorrectAnswer =
        correctAnswer +
        Math.random() * deviation * (Math.random() < 0.5 ? -1 : 1);
    } while (incorrectAnswer === correctAnswer);

    return Number(incorrectAnswer.toFixed(2)); // You can adjust the number of decimal places
  }

  let questionData = {
    question: question,
    answers: [
      {
        text: parseFloat(correctAnswer.toFixed(2)),
        isCorrect: true,
      },
      {
        text: parseFloat(generateIncorrectAnswer(correctAnswer, calculation)),
        isCorrect: false,
      },
      {
        text: parseFloat(generateIncorrectAnswer(correctAnswer, calculation)),
        isCorrect: false,
      },
      {
        text: parseFloat(generateIncorrectAnswer(correctAnswer, calculation)),
        isCorrect: false,
      },
    ],
    requiresMedia: true,
    isAnswersEquation: false,
    mediaType: "trig",
    media: media,
  };

  return questionData;
}

export function graphMedia() {
  const a = Math.floor(Math.random() * 6) + 1;
  const b = Math.floor(Math.random() * 16) - 5;
  const c = Math.floor(Math.random() * 6) - 5;
  
  const formatTerm = (coeff, variable = '') => {
    if (coeff === 0) return '';
    const sign = coeff > 0 ? '+' : '-';
    const absCoeff = Math.abs(coeff);
    return ` ${sign} ${absCoeff === 1 && variable ? '' : absCoeff}${variable}`;
  };
  
  let media = `${a}x^2${formatTerm(b, 'x')}${formatTerm(c)}`;
  
  // Generate incorrect equations
  const incorrectEquations = [];
  while (incorrectEquations.length < 3) {
    const aDeviation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    const bDeviation = Math.floor(Math.random() * 3) - 1;
    const cDeviation = Math.floor(Math.random() * 3) - 1;
  
    const newEquation = `${a + aDeviation}x^2${formatTerm(b + bDeviation, 'x')}${formatTerm(c + cDeviation)}`;
  
    // Check for duplicates
    if (newEquation !== media && !incorrectEquations.includes(newEquation)) {
      incorrectEquations.push(newEquation);
    }
  }
  
  let questionData = {
    question: `Find the equation f(x) from the graph below.`,
    answers: [
      {
        text: `\\(y = ${media}\\)`,
        isCorrect: true,
      },
      ...incorrectEquations.map(equation => ({
        text: `\\(y = ${equation}\\)`,
        isCorrect: false,
      })),
    ],
    requiresMedia: true,
    isAnswersEquation: true,
    mediaType: "graph",
    media: media,
  };
  
  
  let question2 = `Find the equation f(x) from the graph below.`;
  let coefficient1 = Math.round(Math.random() * 5);
  let coefficient2 = Math.round(Math.random() * 5);
  let coefficient3 = Math.round(Math.random() * 5);

  let correctAnswer1 = `${
    coefficient1 == 0 ? `` : coefficient1
  }x^3-${coefficient2}x+${coefficient3}`;

  let questionData1 = {
    question: question2,
    answers: [
      {
        text: `\\(y = ${correctAnswer1}\\)`,
        isCorrect: true,
      },
      {
        text: `\\(y = ${
          coefficient1 + parseFloat(Math.round(Math.random() * 2))
        }x^3-${coefficient2 + parseFloat(Math.round(Math.random() * 2))}x+${
          coefficient3 + parseFloat(Math.round(Math.random() * 2))
        }\\)`,
        isCorrect: false,
      },
      {
        text: `\\(y = ${
          coefficient1 + parseFloat(Math.round(Math.random() * 2))
        }x^3-${coefficient2 + parseFloat(Math.round(Math.random() * 2))}x+${
          coefficient3 + parseFloat(Math.round(Math.random() * 2))
        }\\)`,
        isCorrect: false,
      },
      {
        text: `\\(y = ${
          coefficient1 + parseFloat(Math.round(Math.random() * 2))
        }x^3-${coefficient2 + parseFloat(Math.round(Math.random() * 2))}x+${
          coefficient3 + parseFloat(Math.round(Math.random() * 2))
        }\\)`,
        isCorrect: false,
      },
    ],
    requiresMedia: true,
    isAnswersEquation: true,
    mediaType: "graph",
    media: correctAnswer1,
  };

  return { medium: questionData, hard: questionData1 };
}

export function compMedia() {
  function removeLeadingWhitespace(str) {
    const lines = str.split('\n');
    const minIndent = Math.min(
      ...lines.filter(line => line.trim() !== '')
              .map(line => line.match(/^ */)[0].length)
    );
    return lines.map(line => line.slice(minIndent)).join('\n').trim();
  }
  function stringQuestion () {
    let question = `What would be the final returned value from this string manipulation function?`;
    let variable =  randomStrings[Math.floor(Math.random() * randomStrings.length)];
    
    let codeOptions = [
        `let text = "${variable}";

        function manipulate() {
            return text.split("").reverse().join("");
        }
        manipulate()`, // reverse string

        `let text = "${variable}";

        function manipulate() {
            let word = 'lorem ipsum';
            text = text + word.slice(5);
            return text;
        }
        manipulate()`, // insert word

        `let number = ${variable};

        function manipulate() {
            return number.toString(2);
        }
        manipulate()`,  // convert to binary

        `let text = "${variable}";

        function manipulate() {
            let word = "world";
            return text.concat(' ', word);
        }
        manipulate()`, // concat word

        `let text = "${variable}";

        function manipulate() {
            return text.replace(/\\s+/g, "-");
        }
        manipulate()` // replace regex
    ]; 
    
    const randomIndex = Math.floor(Math.random() * codeOptions.length);

    // Use the Function constructor to create an isolated function
    const executeCode = new Function(codeOptions[randomIndex]);
    let correctAnswer = executeCode(); // Run the function

    let questionData = {
        question: question,
        answers: [
            {
                text: `${correctAnswer}`,
                isCorrect: true,
            }
        ],
        requiresMedia: true,
        isAnswersEquation: false,
        mediaType: "codeblock",
        answerType: 'text',
        media: codeOptions[randomIndex],
    };

    return questionData;
}

    function mathQuestion() {
        let question = "What would be the final returned value from this math operation function?";
        let variable = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    
        let codeOptions = [
`let number = ${variable};

function manipulate() {
    return Math.pow(number + 2, 2);
}
manipulate()`,  // square the number

`let text = "${variable}";

function manipulate() {
    return text.split("").map((char, i) => i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()).join("");
}
manipulate()`, // alternate case

`let number = ${variable};

function manipulate() {
    return Math.floor(Math.random() * number);
}
manipulate()`,  // random number between 0 and variable

`let number = ${variable};

function manipulate() {
    return (number % 2 === 0);
}
manipulate()`,  // check if number is even (returns a boolean)

`let number = ${variable};

function manipulate() {
    return Number.isInteger(number / 2);
}
manipulate()`  // check if number divided by 2 is an integer
        ];
    
        const randomIndex = Math.floor(Math.random() * codeOptions.length);
        let correctAnswer = eval(codeOptions[randomIndex]);
    
        let questionData = {
            question: question,
            answers: [
                {
                    text: `${correctAnswer}`,
                    isCorrect: true,
                }
            ],
            requiresMedia: true,
            isAnswersEquation: false,
            mediaType: "codeblock",
            answerType: 'text',
            media: codeOptions[randomIndex], 
        };
    
        return questionData;
    }

    return { easy: stringQuestion(), medium: mathQuestion() }
}