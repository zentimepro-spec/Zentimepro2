/* eslint-disable */
const fs = require('fs');
const path = require('path');
const potrace = require('potrace');

const inPath = path.join(__dirname, '..', 'public', 'logooficial.png');
const outPath = path.join(__dirname, '..', 'public', 'logooficial-traced.svg');

console.log('Tracing', inPath);
potrace.trace(inPath, { turdSize: 100, optTolerance: 0.4 }, (err, svg) => {
  if (err) {
    console.error('Trace error:', err);
    process.exit(1);
  }

  fs.writeFileSync(outPath, svg, 'utf8');
  console.log('Wrote traced SVG to', outPath);
});
