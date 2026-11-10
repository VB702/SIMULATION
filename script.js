
// GET HTML ELEMENTS

let angle = document.getElementById("angle");

let leftHalf = document.getElementById("leftHalf");
let rightHalf = document.getElementById("rightHalf");


// HALF-SHADE SIMULATION

function updateSimulation() {

    let value = Number(angle.value);

    // DISPLAY ANGLE

    document.getElementById("angleValue").innerText =
        value.toFixed(1).replace(".0", "");

    // ROTATE ANALYZER SYMBOL

    document.getElementById("analyzerSymbol").style.transform =
        "rotate(" + value + "deg)";

    // ROTATE CIRCULAR DIAL POINTER

    document.getElementById("dialPointer").style.transform =
        "rotate(" + value + "deg)";

    // CHANGE BRIGHTNESS OF BOTH HALVES

    let difference = Math.sin(value * Math.PI / 60);

    let leftBrightness = 1 - difference * 0.6;
    let rightBrightness = 1 + difference * 0.6;

    leftHalf.style.filter =
        "brightness(" + leftBrightness + ")";

    rightHalf.style.filter =
        "brightness(" + rightBrightness + ")";


    // DISPLAY OBSERVATION STATUS

    if (Math.abs(value) < 0.5) {

        document.getElementById("brightnessStatus").innerText =
            "Equal Brightness Position";

        document.getElementById("observation").innerText =
            "Both halves have equal brightness.";

    }

    else if (value < 0) {

        document.getElementById("brightnessStatus").innerText =
            "Left Half is Brighter";

        document.getElementById("observation").innerText =
            "Left half is brighter than the right half.";

    }

    else {

        document.getElementById("brightnessStatus").innerText =
            "Right Half is Brighter";

        document.getElementById("observation").innerText =
            "Right half is brighter than the left half.";

    }

}


// RESET ANALYZER

function resetAnalyzer() {

    angle.value = 0;

    updateSimulation();

}


// CALCULATE SPECIFIC ROTATION

function calculateResult() {

    let initialReading =
        Number(document.getElementById("initialReading").value);

    let finalReading =
        Number(document.getElementById("finalReading").value);

    let mass =
        Number(document.getElementById("mass").value);

    let volume =
        Number(document.getElementById("volume").value);

    let length =
        Number(document.getElementById("tubeLength").value);


    // CHECK INPUT VALUES

    if (
        document.getElementById("initialReading").value === "" ||
        document.getElementById("finalReading").value === "" ||
        document.getElementById("mass").value === "" ||
        document.getElementById("volume").value === "" ||
        document.getElementById("tubeLength").value === "" ||

        !Number.isFinite(initialReading) ||
        !Number.isFinite(finalReading) ||
        !Number.isFinite(mass) ||
        !Number.isFinite(volume) ||
        !Number.isFinite(length) ||

        mass <= 0 ||
        volume <= 0 ||
        length <= 0
    ) {

        alert("Please enter valid readings and positive values.");

        return;
    }


    // CALCULATE ANGLE OF ROTATION

    let rotation = Math.abs(finalReading - initialReading);


    // CALCULATE CONCENTRATION

    let concentration = mass / volume;


    // CALCULATE SPECIFIC ROTATION

    let specificRotation =
        rotation / (length * concentration);


    // DISPLAY RESULTS

    document.getElementById("rotationResult").innerText =
        rotation.toFixed(2) + "°";

    document.getElementById("concentrationResult").innerText =
        concentration.toFixed(4) + " g/mL";

    document.getElementById("specificResult").innerText =
        specificRotation.toFixed(2);


    document.getElementById("resultMessage").innerText =
        "Calculation completed successfully!";

}


// RESET CALCULATIONS

function resetCalculation() {

    document.getElementById("initialReading").value = 0;

    document.getElementById("finalReading").value = 15;

    document.getElementById("mass").value = 10;

    document.getElementById("volume").value = 100;

    document.getElementById("tubeLength").value = 2;


    document.getElementById("rotationResult").innerText = "--";

    document.getElementById("concentrationResult").innerText = "--";

    document.getElementById("specificResult").innerText = "--";

    document.getElementById("resultMessage").innerText =
        "Enter the readings and calculate the result.";

}


// CONNECT SLIDER AND BUTTONS

angle.addEventListener("input", updateSimulation);

document.getElementById("resetAnalyzer")
    .addEventListener("click", resetAnalyzer);

document.getElementById("calculateButton")
    .addEventListener("click", calculateResult);

document.getElementById("resetCalculation")
    .addEventListener("click", resetCalculation);


// INITIAL DISPLAY

updateSimulation();
