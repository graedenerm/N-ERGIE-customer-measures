import fs from 'fs';
import path from 'path';

// Read the measures.json file
const measuresPath = path.join(process.cwd(), 'data', 'measures.json');
const measures = JSON.parse(fs.readFileSync(measuresPath, 'utf8'));

// Function to divide a number by 4 and round
const divideBy4 = (num) => Math.round(num / 4);

// Process each measure
const correctedMeasures = measures.map(measure => {
  return {
    ...measure,
    yearlySavingsRangeFrom: divideBy4(measure.yearlySavingsRangeFrom),
    yearlySavingsRangeTo: divideBy4(measure.yearlySavingsRangeTo),
    yearlySavingsEnergyRangeFrom: divideBy4(measure.yearlySavingsEnergyRangeFrom),
    yearlySavingsEnergyRangeTo: divideBy4(measure.yearlySavingsEnergyRangeTo),
  };
});

// Write the corrected file
fs.writeFileSync(measuresPath, JSON.stringify(correctedMeasures, null, 2));

console.log('Measures corrected successfully!');
console.log(`Processed ${correctedMeasures.length} measures`);

// Calculate totals
let totalSavingsMin = 0;
let totalSavingsMax = 0;
correctedMeasures.forEach(m => {
  totalSavingsMin += m.yearlySavingsRangeFrom;
  totalSavingsMax += m.yearlySavingsRangeTo;
});

console.log(`New total savings range: €${totalSavingsMin.toLocaleString('de-DE')} - €${totalSavingsMax.toLocaleString('de-DE')}`);
