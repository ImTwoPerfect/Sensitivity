const levelInput = document.getElementById("sensInput");
const fovInput = document.getElementById("fovInput");

document.getElementById("calcButton").addEventListener("click", () => {
  calculate();
});

function calculate() {
	const sensBox = document.getElementById('sensInput').value;
	const fovBox = document.getElementById('fovInput').value;
	const sens = parseFloat(document.getElementById('sensInput').value);
	const fov = parseInt(document.getElementById('fovInput').value);
	const valRadio = document.getElementById('valRadio');
	const cmRadio = document.getElementById('cmRadio');
	const output = document.getElementById('output');
	
	if(valRadio.checked)
	{
		output.textContent = "Arsenal: " + ConvertSens(sens, fov);
		
		if(sensBox == "")
		{
			output.textContent = "ERROR: Enter valorant sensitivity.";
		}
	}
	
	else if(cmRadio.checked)
	{
		output.textContent = "Arsenal: " + ConvertCM(sens, fov);
	}
	
	else
	{
		output.textContent = "Select method to convert.";
	}
}

function GetArsenalYaw(fov)
{
	if (fov < 70)
	{
		fov = 70;
	}
	if (fov > 120)
	{
		fov = 120;
	}
	
	return (0.00535 * fov) + 0.0005;
}

function roundToTenThousandth(value) {
    return Math.round(value * 10000) / 10000;
}


function ConvertSens(sens, fov)
{
	let valYaw = 0.07;
	let arsenalYaw = GetArsenalYaw(fov);

	return roundToTenThousandth(sens * (valYaw / arsenalYaw));
}

function ConvertCM(cm, fov)
{
	let dpi = 800;
	let arsenalYaw = GetArsenalYaw(fov);

	return roundToTenThousandth((360.0 * 2.54) / (cm * dpi * arsenalYaw));
}
