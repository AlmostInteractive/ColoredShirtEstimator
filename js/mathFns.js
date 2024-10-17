// Function to extract variable names from an equation string
function extractVariables(equationStrings) {
    const variableSet = new Set();
    const variablePattern = /[a-zA-Z]+/g; // Match variable names like 'x', 'y', etc.

    equationStrings.forEach(eq => {
        const [left] = eq.split("=").map(s => s.trim()); // Only check the left-hand side
        const variables = left.match(variablePattern);
        if (variables) {
            variables.forEach(v => variableSet.add(v));
        }
    });

    return Array.from(variableSet); // Convert set back to array for consistency
}

// Function to parse the equation strings and compute the objective (sum of squared residuals)
function objectiveFromEquations(equationStrings, vars, variableNames) {
    const residuals = equationStrings.map(eq => {
        // Split the equation into left and right parts by "="
        const [left, right] = eq.split("=").map(s => s.trim());

        // Create a scope (variables mapping) for x, y, etc.
        const scope = {};
        variableNames.forEach((varName, index) => {
            scope[varName] = vars[index];  // Assign values to variables
        });

        // Use math.js to evaluate the left side of the equation with the current variable values
        const leftValue = math.evaluate(left, scope);

        // Evaluate the right side (it's just a number)
        const rightValue = parseFloat(right);

        // Return the residual (difference between left and right sides)
        return leftValue - rightValue;
    });

    // Sum of squares of residuals
    return residuals.reduce((sum, r) => sum + r * r, 0);
}

// Function to minimize the objective using numeric.js
function minimizeEquations(equationStrings, initialGuess) {
    // Extract the variable names from the equations
    const variableNames = extractVariables(equationStrings);

    if (initialGuess === undefined) {
        initialGuess = new Array(variableNames.length).fill(1);
    }

    // Minimize the objective function using numeric.js
    const result = numeric.uncmin(
        vars => objectiveFromEquations(equationStrings, vars, variableNames),
        initialGuess
    );

    // Return the solution (optimal values for x, y, etc.) and minimized error
    return {
        solution: result.solution,
        error: result.f,
        variableNames: variableNames
    };
}
