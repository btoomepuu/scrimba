const inputEL = document.querySelector('#conversion-input');
const selectEl = document.querySelector('#decimal-select');
const convertBtnEl = document.querySelector('#convert-btn');
const conversionSectionEl = document.getElementById('conversion-section');

let numberToConvert = 0;

let conversions = [];

convertBtnEl.addEventListener('click', (e) => {
  numberToConvert = parseInt(inputEL.value);
  if (!isNaN(numberToConvert)) {
    createMessageElements(convertInput(numberToConvert));
  } else {
    alert('Input must be a number');
  }
});

function convertInput(inputNumber) {
  conversions = [];
  const length = {
    property: 'length',
    metric: 'meters',
    imperial: 'feet',
    conversionAmount: 3.2808,
  };

  const volume = {
    property: 'volume',
    metric: 'liters',
    imperial: 'gallons',
    conversionAmount: 0.2641,
  };

  const mass = {
    property: 'mass',
    metric: 'kilograms',
    imperial: 'pounds',
    conversionAmount: 2.2046,
  };

  conversions.push(length, volume, mass);
  return conversions;
}

function createMessageElements(conversionsArray) {
  conversionsArray.forEach((object) => {
    const conversionSectChildEl = document.getElementById(`${object.property}`);

    conversionSectChildEl.removeChild(conversionSectChildEl.lastChild);

    const imperialValue =
      Math.round(numberToConvert * object.conversionAmount * 1000) / 1000;
    const metricValue =
      Math.round((numberToConvert / object.conversionAmount) * 1000) / 1000;

    console.log(imperialValue, 'imperial');

    console.log(metricValue, 'metric');
    const measurementMessage = document.createElement('p');
    measurementMessage.textContent = `${numberToConvert} ${object.metric} = ${imperialValue} ${object.imperial} | ${numberToConvert} ${object.imperial} = ${metricValue} ${object.metric}`;
    conversionSectChildEl.append(measurementMessage);
  });
}

// let decimal = 0;
// window.onload = () => {
//   for (let i = 0; i < 4; i++) {
//     const option = document.createElement('option');
//     option.value = i;
//     option.textContent = i;
//     selectEl.appendChild(option);
//   }
// };

// parseFloat(imperialValue * conversionAmount).toFixed(3);
// parseFloat(metriclValue / conversionAmount).toFixed(3);
