# Release 0.2 — Interactive apparatus upgrade

## Added
- Dedicated 3D apparatus arrangements for LAB 02 (salt dissolution), LAB 03 (vinegar + baking soda), and LAB 11 (ball drop onto clay).
- Model-linked readouts for elapsed dissolution time, collected carbon dioxide volume, and clay indentation.
- React-frame-driven experimental progress with reset per recorded run; earlier scene displayed fixed progress rather than updating.
- White laboratory benches, window panels, transparent glassware and measurement markings.
- New `runId` sequence to distinguish repeated runs at the same setting.

## Scientific interpretation
- Animations are illustrative and NOT validated laboratory measurements.
- The three dedicated scenes display A/B/C positions as staged apparatus, but only the current experiment choice is numerically simulated. They are NOT simultaneous independently computed A/B/C trials.
- The actual two-condition comparison is performed in the experiment history UI, requiring a common control setting.

## Outstanding work
- Install package dependencies in an internet-enabled environment; run `npm run typecheck`, `npm run test`, and `npm run build`.
- Add true independent side-by-side 3D comparison, manipulable pipettes, drag gestures and calibrated instrument scales.
- Upgrade the remaining 12 scene compositions; they currently reuse generic plant/glassware/bench assets.
- Validate all educational model coefficients against documented sources before use for quantitative science claims.
- Browser and mobile end-to-end tests have not been run.
