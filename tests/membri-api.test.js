import test from 'node:test';
import assert from 'node:assert/strict';
import { apiRequest } from '../membri-api.js';

test('apiRequest constructs URL and headers correctly', async () => {
  let captured = {};
  global.fetch = async (url, options) => {
    captured.url = url;
    captured.options = options;
    return { ok: true, json: async () => ({ result: 'ok' }) };
  };

  await apiRequest('Member/Login', {
    method: 'POST',
    query: '&foo=bar',
    body: { hello: 'world' }
  });

  assert.equal(
    captured.url,
    'https://api.membri365.com/v1_01/Member/Login?orgId=ec4fb530-d07a-4e5c-81d2-b238d3ff2adb&foo=bar'
  );
  assert.deepEqual(captured.options.headers, {
    Accept: 'application/json',
    SCode: 'rkTl0wgwFkJVxOURkz3tpwWcYols1flS4NdUZAcFzoBAckCxvl6tDr2XE5VGPgfG',
    'Content-Type': 'application/json'
  });
  assert.equal(captured.options.method, 'POST');
  assert.equal(captured.options.body, JSON.stringify({ hello: 'world' }));
});

test('apiRequest throws on non-ok response', async () => {
  global.fetch = async () => ({
    ok: false,
    status: 500,
    text: async () => 'boom'
  });

  await assert.rejects(
    apiRequest('Member/Login', { method: 'GET' }),
    /API erreur GET Member\/Login: 500 - boom/
  );
});
