module.exports = {
  '**/*.{js,jsx,ts,tsx}': [ 'npx eslint -c .eslintrc.js --fix' ],
  // '**/*.ts?(x)': () => 'npx tsc -p tsconfig.json --skipLibCheck',
  '**/*.{css,less}': [ 'npx stylelint --aei --config .stylelintrc.js --fix' ],
  '**/*.{js,jsx,ts,tsx,md,html,css,less}': 'npx prettier --write',
}
