const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../server');

async function request(app, method, path, body) {
  const server = app.listen(0);
  const { port } = server.address();
  const response = await fetch(`http://127.0.0.1:${port}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  await new Promise((resolve) => server.close(resolve));
  return response;
}

test('GET / returns landing page HTML', async () => {
  const app = createApp();
  const response = await request(app, 'GET', '/');
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Pterodactyl|Hosting|Server/i);
});

test('GET /api/plans returns available hosting plans', async () => {
  const app = createApp();
  const response = await request(app, 'GET', '/api/plans');
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.ok(Array.isArray(data));
  assert.ok(data.length >= 3);
  assert.ok(data[0].name);
  assert.ok(data[0].price);
});

test('POST /api/orders creates an order payload', async () => {
  const app = createApp();
  const response = await request(app, 'POST', '/api/orders', {
    name: 'Budi',
    email: 'budi@example.com',
    plan: 'Starter',
    serverType: 'Bot Discord',
    notes: 'Cek buat bot public'
  });

  assert.equal(response.status, 201);
  const data = await response.json();
  assert.equal(data.customer.name, 'Budi');
  assert.equal(data.status, 'pending');
  assert.equal(data.plan, 'Starter');
});
