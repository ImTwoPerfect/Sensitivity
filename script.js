// DOM ELEMENTS 
const ogGames = document.getElementById("ogGames");
const toGames = document.getElementById("toGames");
const sensInput = document.getElementById("sensInput");

const ogFovRange = document.getElementById("ogFovRange");
const toFovRange = document.getElementById("toFovRange");
const ogFOVLabel = document.getElementById("ogFOV");
const toFOVLabel = document.getElementById("toFOV");

const output = document.getElementById("output");
const calcButton = document.getElementById("calcButton");

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function() {
    ogFOVLabel.textContent = `FOV: ${ogFovRange.value}`;
	toFOVLabel.textContent = `FOV: ${toFovRange.value}`;
});

ogFovRange.addEventListener("input", () => {
    ogFOVLabel.textContent = `FOV: ${ogFovRange.value}`;
});

toFovRange.addEventListener("input", () => {
    toFOVLabel.textContent = `FOV: ${toFovRange.value}`;
});

calcButton.addEventListener("click", calculate);

// CORE LOGIC
function calculate() {
    const sens = parseFloat(sensInput.value);
    const fromGame = ogGames.value;
    const toGame = toGames.value;
    const fromFov = parseInt(ogFovRange.value);
    const toFov = parseInt(toFovRange.value);

    if (isNaN(sens) || sens <= 0) {
        output.textContent = "ERROR: Enter a valid sensitivity value.";
        return;
    }

    if (fromGame === toGame) {
        output.textContent = `Result: ${roundToTenThousandth(sens)}`;
        return;
    }

    let cm360;

    // Convert FROM source game TO CM/360
    switch (fromGame) {
        case "valorant":
            cm360 = ValorantToCM(sens);
            break;
        case "arsenal":
            cm360 = ArsenalToCM(sens, fromFov);
            break;
        case "cm":
            cm360 = sens;
            break;
        default:
            output.textContent = "ERROR: Unknown source game.";
            return;
    }

    let finalSens;

    // Convert FROM CM/360 TO target game
    switch (toGame) {
        case "valorant":
            finalSens = CMToValorant(cm360);
            break;
        case "arsenal":
            finalSens = CMToArsenal(cm360, toFov);
            break;
        case "cm":
            finalSens = cm360;
            break;
        default:
            output.textContent = "ERROR: Unknown target game.";
            return;
    }

    output.textContent = `Converted Sensitivity: ${roundToTenThousandth(finalSens)}`;
}

// MATH HELPERS
function GetArsenalYaw(fov) {
    fov = Math.min(120, Math.max(70, fov));
    return (0.00535 * fov) + 0.0005;
}

function roundToTenThousandth(value) {
    return Math.round(value * 10000) / 10000;
}

// GAME CONVERSIONS 
const DPI = 800;
const VAL_YAW = 0.07;

// Valorant to CM
function ValorantToCM(valSens) {
    return (360 * 2.54) / (valSens * DPI * VAL_YAW);
}

function CMToValorant(cm) {
    return (360 * 2.54) / (cm * DPI * VAL_YAW);
}

// Arsenal to CM
function ArsenalToCM(arsSens, fov) {
    const yaw = GetArsenalYaw(fov);
    return (360 * 2.54) / (arsSens * DPI * yaw);
}

function CMToArsenal(cm, fov) {
    const yaw = GetArsenalYaw(fov);
    return (360 * 2.54) / (cm * DPI * yaw);
}
