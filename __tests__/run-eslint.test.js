'use strict';

const path = require('path');
const child_process = require('child_process');

function sanitize(str) {
  return String(str).split(__dirname).join('');
}

function yarnInstall(cwd) {
  return child_process.spawnSync('yarn', ['install'], {cwd, encoding: 'utf8'});
}

function runESLint(cwd) {
  return child_process.spawnSync(
    'node_modules/.bin/eslint',
    ['.'],
    {cwd, encoding: 'utf8'}
  );
}

test('works with eslint 4.x', () => {
  const cwd = path.join(__dirname, '__fixtures__/eslint-project');

  const yarnRet = yarnInstall(cwd);
  expect(yarnRet.status).toEqual(0);
  expect(yarnRet.error).toBeUndefined();

  const eslintRet = runESLint(cwd);
  expect(sanitize(eslintRet.stderr)).toMatchSnapshot();
  expect(sanitize(eslintRet.stdout)).toMatchSnapshot();
  expect(eslintRet.error).toBeUndefined();
});
