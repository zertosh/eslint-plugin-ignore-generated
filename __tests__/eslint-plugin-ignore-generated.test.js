'use strict';

const path = require('path');
const child_process = require('child_process');

test('eslint-plugin-ignore-generated works', () => {
  const eslintRet = child_process.spawnSync(
    'node_modules/.bin/eslint',
    [
      '.',
    ],
    {
      cwd: path.join(__dirname, '__fixtures__/eslint-project'),
      encoding: 'utf8',
    }
  );
  expect(eslintRet.error).toBeUndefined();
  expect(eslintRet.stderr).toMatchSnapshot();
  expect(eslintRet.stdout).toMatchSnapshot();
  expect(eslintRet.status).toEqual(1);
});
