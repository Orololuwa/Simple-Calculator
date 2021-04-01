const dataValues = {
    bufferText: document.querySelector('[data-buffer]'),
    outputText: document.querySelector('[data-output]'),
    deleteButton: document.querySelector('[data-delete]'),
    allClearButton: document.querySelector('[data-all-clear]'),
    operationButtons: document.querySelectorAll('[data-operation]'),
    digitButtons: document.querySelectorAll('[data-digit]'),
    equalsButton: document.querySelector('[data-equals]')
};

let leftOperand = dataValues.bufferText.textContent;
let rightOperand = dataValues.outputText.textContent;
let operation;

//functions
const digitSelected = (digit) => {
    if (rightOperand){
        if (rightOperand.includes(".") && digit === ".") return;
    }
    rightOperand = rightOperand + digit.toString();
};

const operationSelected = (opp) => {
    if (rightOperand === "") return;
    if (leftOperand !== ""){
        evaluate();
    }
    operation = opp;
    leftOperand = rightOperand;
    rightOperand = ""

};

const clear = () => {
    leftOperand = "";
    rightOperand = "";
    operation = undefined;
};

const backSpace = () => {
    rightOperand = rightOperand.toString().slice(0, -1);
}

const evaluate = () => {
    let evaluation
    const prev = parseFloat(leftOperand);
    const curr = parseFloat(rightOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operation){
        case "+":
            evaluation = prev + curr;
            break;
        case "-":
            evaluation = prev - curr;
            break;
        case "X":
            evaluation = prev * curr;
            break;
        case "/":
            evaluation = prev / curr;
            break;
        default:
            return;
    }
    rightOperand = evaluation;
    leftOperand = "";
    operation = undefined;
}

const updateDisplay = () => {
    dataValues.outputText.textContent = getCommaDelimitedNumber(rightOperand);
    if (operation != null){
        dataValues.bufferText.textContent = `${getCommaDelimitedNumber(leftOperand)} ${operation}`
    }
    else{
        dataValues.bufferText.textContent = "";
    }
}

const getCommaDelimitedNumber = (num) => {
    const stringNumber = num.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
}


//EventListners
dataValues.allClearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

dataValues.deleteButton.addEventListener('click', () => {
    backSpace();
    updateDisplay();
});

dataValues.digitButtons.forEach((el, i) => {
    el.addEventListener('click', ()=>{
        digitSelected(el.textContent);
        updateDisplay();
    })
});

dataValues.operationButtons.forEach((el, i) => {
    el.addEventListener('click', () =>{
        operationSelected(el.textContent);
        updateDisplay();
    })
})

dataValues.equalsButton.addEventListener('click', () =>{
    evaluate();
    updateDisplay();
})

window.addEventListener('load', (event) => {
    clear();
});