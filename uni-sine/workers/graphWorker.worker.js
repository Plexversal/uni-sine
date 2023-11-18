import * as math from "mathjs";

self.onmessage = function (event) {
  const { equation } = event.data;

  const xLimit = 100;
  self.postMessage({
    xIntercepts: "calculating...",
    yIntercept: "calculating...",
  });
  let results = [];
  let maxY = -Infinity;
  let minY = Infinity;

  for (let x = -xLimit; x <= xLimit; x += 0.01) {
    try {
      if ((equation.includes("ln") || equation.includes("log")) && x <= 0) {
        // Skip for negative and zero values with logarithms
        continue;
      }

      if ((equation.includes("sqrt") || equation.includes("^0.5")) && x < 0) {
        // Skip for negative values under the square root
        continue;
      }

      if (equation.includes("arcsin") || equation.includes("arccos")) {
        if (x < -1 || x > 1) {
          // Skip values outside of [-1, 1] for arcsin and arccos
          continue;
        }
      }

      if (
        (equation.includes("arcsec") || equation.includes("arccsc")) &&
        Math.abs(x) < 1
      ) {
        // Skip values inside (-1, 1) for arcsec and arccsc
        continue;
      }

      let y = math.evaluate(equation, { x: x }) || 0;
      if (typeof y !== "number") {
        throw new Error("Evaluation did not result in a number.");
      }
      if (y > maxY) maxY = y;
      if (y < minY) minY = y;
      results.push({ x, y });
    } catch (error) {
      self.postMessage({ error: error, equation: equation, xLimit: xLimit });
      return;
    }
  }

  self.postMessage({ results, maxY, minY });

  function newtonRaphson(
    initialGuess,
    equation,
    maxIterations = 100,
    tolerance = 1e-6
  ) {
    let x = initialGuess;
    for (let i = 0; i < maxIterations; i++) {
      const y = math.evaluate(equation, { x: x });
      const dy = math.derivative(equation, "x").evaluate({ x: x });

      if (Math.abs(dy) < tolerance) return null;

      const xNext = x - y / dy;

      if (Math.abs(xNext - x) < tolerance) {
        return xNext;
      }

      x = xNext;
    }
    return null;
  }

  let xIntercepts = [];
  let yIntercept = null;

  for (let x = -xLimit; x <= xLimit; x += 0.5) {
    const root = newtonRaphson(x, equation);
    if (
      root !== null &&
      !xIntercepts.some(
        (existingRoot) => Math.abs(existingRoot - root) < 1e-2
      ) && // check if root is too close to an existing root
      Math.abs(root) <= 35 &&
      Math.abs(math.evaluate(equation, { x: root })) <= 35
    ) {
      xIntercepts.push(parseFloat(root.toFixed(3)));
    }

    if (x === 0 && Math.abs(math.evaluate(equation, { x: 0 })) <= 35) {
      yIntercept = parseFloat(math.evaluate(equation, { x: 0 }).toFixed(5));
    }
  }
  if (xIntercepts.length === 0) {
    self.postMessage({
      xIntercepts: "no roots",
      yIntercept: yIntercept !== null ? yIntercept : "no y-intercept",
    });
  } else {
    self.postMessage({
      xIntercepts,
      yIntercept: yIntercept !== null ? yIntercept : "no y-intercept",
    });
  }
};
