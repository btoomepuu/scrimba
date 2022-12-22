const conversions = [
  {
    property: 'length',
    metric: 'meters',
    imperial: 'feet',
    conversionAmount: 3.2808,
    metricAbbrev: 'm',
    imperAbbrev: 'ft',
  },
  {
    property: 'volume',
    metric: 'liters',
    imperial: 'gallons',
    conversionAmount: 0.2641,
    metricAbbrev: 'L',
    imperAbbrev: 'gal',
  },
  {
    property: 'mass',
    metric: 'kilograms',
    imperial: 'pounds',
    conversionAmount: 2.2046,
    metricAbbrev: 'kg',
    imperAbbrev: 'lbs',
  },
];

const inputEL = document.querySelector('#conversion-input');
const selectEl = document.querySelector('#decimal-select');
const convertBtnEl = document.querySelector('#convert-btn');
const conversionSectionEl = document.getElementById('conversion-section');

let numberToConvert = 0;

createMessageElements(numberToConvert);

convertBtnEl.addEventListener('click', (e) => {
  numberToConvert = parseFloat(inputEL.value);
  createMessageElements(numberToConvert);
});

function createMessageElements() {
  conversions.forEach((object) => {
    const conversionSectChildEl = document.getElementById(`${object.property}`);

    conversionSectChildEl.removeChild(conversionSectChildEl.lastChild);

    const imperialValue = (numberToConvert * object.conversionAmount).toFixed(
      3
    );
    const metricValue = (numberToConvert / object.conversionAmount).toFixed(3);

    const measurementMessage = document.createElement('p');
    measurementMessage.textContent = `${numberToConvert}${object.metricAbbrev} = ${imperialValue}${object.imperAbbrev} | ${numberToConvert}${object.imperAbbrev} = ${metricValue}${object.metricAbbrev}`;
    conversionSectChildEl.append(measurementMessage);
  });
}
