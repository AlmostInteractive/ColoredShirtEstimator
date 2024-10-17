const shirtsDiv = document.getElementById('shirts');
const sprintSummariesDiv = document.getElementById('summaries');
const variablesDiv = document.getElementById('variables');
let shirtId = 0;
const sprintSummaries = [];

document.getElementById('addShirtEntry').onclick = () => addShirtEntry();
document.getElementById('addSprintSummary').onclick = () => addSprintSummary();
document.getElementById('computeVariables').onclick = () => computeVariables();

function addShirtEntry() {
    const html = `
  <input type="number" id="count_${shirtId}" placeholder="1" value="1">
  <select id="color_${shirtId}">
    <option value="0">Blue</option>
    <option value="1">Green</option>
    <option value="2">Yellow</option>
    <option value="3">Orange</option>
    <option value="4">Red</option>
  </select>
  <select id="size_${shirtId}">
    <option value="0">X-Small</option>
    <option value="1">Small</option>
    <option value="2">Medium</option>
    <option value="3">Large</option>
    <option value="4">X-Large</option>
  </select>
  <br>`;

    shirtId++;

    shirtsDiv.insertAdjacentHTML('beforeend', html);
}

function getColor(variable) {
    const a = 'a'.charCodeAt(0);
    switch ((variable.charCodeAt(0) - a) % 5) {
        case 0:
            return 'Blue';
        case 1:
            return 'Green';
        case 2:
            return 'Yellow';
        case 3:
            return 'Orange';
        case 4:
            return 'Red';
    }
}

function getSize(variable) {
    const a = 'a'.charCodeAt(0);
    switch (Math.floor((variable.charCodeAt(0) - a) / 5)) {
        case 0:
            return 'X-Small';
        case 1:
            return 'Small';
        case 2:
            return 'Medium';
        case 3:
            return 'Large';
        case 4:
            return 'X-Large';
    }
}
function equationToEnglish(eqn) {
    const [tickets, hours] = eqn.split('=');
    const ticketsRegex = /(\d+)([a-z])/gm;
    const english = [];

    tickets.matchAll(ticketsRegex).forEach(([_, count, variable]) => {
        english.push(`${count}x ${getColor(variable)} ${getSize(variable)}`);
    });

    return english.join(', ') + ` in ${hours} hours<br>`;
}

function variablesToEnglish(vars) {
    const eng = Object.keys(vars).map( cur => {
        const color = getColor(cur);
        const size = getSize(cur);
        return `${color} ${size} = ${vars[cur]} hours`;
    }, {});
    return eng.join('<br>');
}

function addSprintSummary() {
    const hours = Number.parseInt(document.getElementById('hours').value);
    if (!(hours > 0)) {
        window.alert("Invalid number of hours");
        return;
    }

    const variableConstants = {};
    for (let i = 0; i < shirtId; i++) {
        const count = Number.parseInt(document.getElementById(`count_${i}`).value);
        const color = Number.parseInt(document.getElementById(`color_${i}`).value);
        const size = Number.parseInt(document.getElementById(`size_${i}`).value);
        const variable = String.fromCharCode('a'.charCodeAt(0) + size * 5 + color);
        variableConstants[variable] = (variableConstants[variable] || 0) + count;
    }

    const equations = Object.keys(variableConstants).map(variable => `${variableConstants[variable]}${variable}`);

    let equation = equations.join('+') + `=${hours}`;
    sprintSummaries.push(equation);
    sprintSummariesDiv.insertAdjacentHTML('beforeend', equationToEnglish(equation));
}

function computeVariables() {
    const result = minimizeEquations(sprintSummaries);
    console.log(result);
    /*
    error: 7.615543679198281e-21
    solution: Array [ 1, 5.000000000087267 ]
    variableNames: Array [ "x", "y" ]
    */

    const variables = result.variableNames.reduce((acc, cur, idx) => {
        acc[cur] = +result.solution[idx].toFixed(2)
        return acc;
    }, {});

    variablesDiv.innerHTML = `${variablesToEnglish(variables)}<br>error: ${result.error.toFixed(2)}`;
}
