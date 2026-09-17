const express = require('express');

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 25000,
    cpu: '1 Core',
    ram: '1 GB',
    storage: '20 GB NVMe',
    description: 'Cocok untuk bot Discord, website kecil, dan kebutuhan basic.',
    badge: 'Best for start'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 50000,
    cpu: '2 Core',
    ram: '2 GB',
    storage: '40 GB NVMe',
    description: 'Untuk bot aktif, website kecil, dan aplikasi ringan.',
    badge: 'Popular'
  },
  {
    id: 'business',
    name: 'Business',
    price: 90000,
    cpu: '4 Core',
    ram: '4 GB',
    storage: '80 GB NVMe',
    description: 'Sesuai untuk game server, panel panel, dan proyek scaling.',
    badge: 'High performance'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 170000,
    cpu: '8 Core',
    ram: '8 GB',
    storage: '160 GB NVMe',
    description: 'Power untuk aplikasi besar, komunitas, dan kebutuhan khusus.',
    badge: 'Custom'
  }
];

const planCards = plans.map((plan) => (
  '<article class="plan">' +
  '<span class="tag">' + plan.badge + '</span>' +
  '<h3>' + plan.name + '</h3>' +
  '<div class="price">Rp ' + plan.price.toLocaleString('id-ID') + '</div>' +
  '<small>' + plan.description + '</small>' +
  '<ul>' +
    '<li>' + plan.cpu + '</li>' +
    '<li>' + plan.ram + '</li>' +
    '<li>' + plan.storage + '</li>' +
  '</ul>' +
  '</article>'
)).join('');

const planOptions = plans.map((plan) => '<option value="' + plan.name + '">' + plan.name + '</option>').join('');

function renderLandingPage() {
  return [
    '<!DOCTYPE html>',
    '<html lang="id">',
    '<head>',
    '  <meta charset="UTF-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '  <title>MA Hosting | Panel Pterodactyl</title>',
    '  <style>',
    '    :root { --bg:#0b1020; --card:#121a2b; --card-soft:#172338; --primary:#4cc9f0; --accent:#7c3aed; --text:#edf6ff; --muted:#a5b7d3; --success:#4ade80; --danger:#f87171; }',
    '    * { box-sizing: border-box; }',
    '    body { margin: 0; font-family: Arial, sans-serif; color: var(--text); background: linear-gradient(180deg, #09111d 0%, #0b1020 100%); }',
    '    a { color: inherit; text-decoration: none; }',
    '    .container { width: min(1120px, calc(100% - 24px)); margin: 0 auto; }',
    '    header { position: sticky; top: 0; background: rgba(11,16,32,0.8); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.08); }',
    '    nav { display: flex; align-items: center; justify-content: space-between; min-height: 72px; }',
    '    .brand { font-size: 1.2rem; font-weight: 700; letter-spacing: 0.04em; }',
    '    .brand span { color: var(--primary); }',
    '    .nav-links { display: flex; gap: 18px; color: var(--muted); font-size: 0.96rem; }',
    '    .hero { padding: 72px 0 26px; }',
    '    .hero-wrap { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 32px; align-items: center; }',
    '    .hero h1 { font-size: clamp(2.3rem, 5vw, 4rem); line-height: 1.05; margin: 0 0 16px; }',
    '    .hero p { color: var(--muted); font-size: 1.06rem; line-height: 1.7; margin: 0 0 24px; }',
    '    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }',
    '    .btn { display: inline-flex; align-items: center; justify-content: center; padding: 13px 20px; border-radius: 12px; font-weight: 700; border: 1px solid transparent; transition: 0.2s ease; }',
    '    .btn.primary { background: linear-gradient(135deg, var(--primary), #00b8d9); color: #04111c; }',
    '    .btn.secondary { background: transparent; border-color: rgba(255,255,255,0.12); color: var(--text); }',
    '    .stats { display: flex; gap: 26px; flex-wrap: wrap; color: var(--muted); font-size: 0.95rem; }',
    '    .stats strong { display: block; color: var(--text); font-size: 1.3rem; margin-bottom: 4px; }',
    '    .panel { background: linear-gradient(180deg, var(--card) 0%, var(--card-soft) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 22px; padding: 24px; box-shadow: 0 18px 40px rgba(0,0,0,0.25); }',
    '    .mini-card { display: grid; gap: 14px; }',
    '    .mini-card .badge { width: max-content; background: rgba(76,201,240,0.12); border: 1px solid rgba(76,201,240,0.24); color: var(--primary); font-size: 0.8rem; padding: 8px 12px; border-radius: 999px; }',
    '    .price-box { display: flex; justify-content: space-between; align-items: end; margin: 16px 0; }',
    '    .price-box .amount { font-size: 2.4rem; font-weight: 700; }',
    '    .items { list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 12px; color: var(--muted); }',
    '    .items li::before { content: "✓"; color: var(--success); margin-right: 10px; font-weight: 700; }',
    '    section { padding: 36px 0; }',
    '    .section-title { font-size: 2rem; margin-bottom: 16px; }',
    '    .plans { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; margin-top: 20px; }',
    '    .plan { background: rgba(18,26,43,0.9); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 20px; display: flex; flex-direction: column; gap: 14px; }',
    '    .plan h3 { margin: 0; font-size: 1.3rem; }',
    '    .plan .tag { display: inline-block; width: fit-content; background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.2); color: #d6c7ff; padding: 6px 10px; border-radius: 999px; font-size: 0.75rem; }',
    '    .plan .price { font-size: 1.9rem; font-weight: 700; }',
    '    .plan small { color: var(--muted); }',
    '    .plan ul { margin: 0; padding-left: 18px; color: var(--muted); line-height: 1.8; }',
    '    .order-box { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 26px; }',
    '    .form-card, .summary-card { background: rgba(18,26,43,0.9); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 22px; }',
    '    form { display: grid; gap: 16px; }',
    '    label { display: grid; gap: 8px; font-size: 0.93rem; color: var(--muted); }',
    '    input, select, textarea { width: 100%; border: 1px solid rgba(255,255,255,0.12); background: rgba(10,15,26,0.8); color: var(--text); border-radius: 10px; padding: 12px 14px; font: inherit; }',
    '    textarea { min-height: 110px; resize: vertical; }',
    '    .summary-card ul { list-style: none; padding: 0; margin: 18px 0 0; display: grid; gap: 12px; color: var(--muted); }',
    '    @media (max-width: 900px) { .hero-wrap, .plans, .order-box { grid-template-columns: 1fr; } .nav-links { display: none; } }',
    '  </style>',
    '</head>',
    '<body>',
    '  <header>',
    '    <div class="container">',
    '      <nav>',
    '        <div class="brand"><span>MA</span> HOSTING</div>',
    '        <div class="nav-links">',
    '          <a href="#plans">Plan</a>',
    '          <a href="#features">Fitur</a>',
    '          <a href="#order">Order</a>',
    '        </div>',
    '      </nav>',
    '    </div>',
    '  </header>',
    '  <main>',
    '    <section class="hero">',
    '      <div class="container hero-wrap">',
    '        <div>',
    '          <h1>Jualan hosting dan server game di satu panel.</h1>',
    '          <p>Platform hosting untuk bot Discord, website, game server, dan kebutuhan aplikasi. Semua order terpusat di satu website dengan sistem otomatis dan payment gateway siap dikembangkan.</p>',
    '          <div class="actions">',
    '            <a class="btn primary" href="#plans">Lihat Paket</a>',
    '            <a class="btn secondary" href="#order">Order Sekarang</a>',
    '          </div>',
    '          <div class="stats">',
    '            <div><strong>300+</strong> Server aktif</div>',
    '            <div><strong>99.9%</strong> Uptime</div>',
    '            <div><strong>24/7</strong> Support</div>',
    '          </div>',
    '        </div>',
    '        <div class="panel mini-card">',
    '          <div class="badge">Server Panel Pterodactyl</div>',
    '          <div class="price-box">',
    '            <div>',
    '              <div style="color: var(--muted); font-size: 0.85rem;">Mulai dari</div>',
    '              <div class="amount">Rp 25.000</div>',
    '            </div>',
    '            <div style="color: var(--muted);">/ bulan</div>',
    '          </div>',
    '          <ul class="items">',
    '            <li>SSD NVMe Premium</li>',
    '            <li>Panel Pterodactyl siap pakai</li>',
    '            <li>Backup otomatis dan monitoring</li>',
    '            <li>Support teknis 24 jam</li>',
    '          </ul>',
    '        </div>',
    '      </div>',
    '    </section>',
    '    <section id="plans">',
    '      <div class="container">',
    '        <div class="section-title">Pilih paket hosting Anda</div>',
    '        <div class="plans">' + planCards + '</div>',
    '      </div>',
    '    </section>',
    '    <section id="features">',
    '      <div class="container">',
    '        <div class="section-title">Kenapa memilih MA Hosting?</div>',
    '        <div class="plans">',
    '          <article class="plan"><h3>Otomatis</h3><small>Semua proses order, setup, dan notifikasi dikelola secara otomatis.</small></article>',
    '          <article class="plan"><h3>Multi Server</h3><small>Beberapa server panel bisa dikelola dengan satu website pusat.</small></article>',
    '          <article class="plan"><h3>Payment Gateways</h3><small>Pendapatan lebih mudah dengan sistem pembayaran yang siap dikembangkan.</small></article>',
    '          <article class="plan"><h3>Scalable</h3><small>Siap tumbuh untuk kebutuhan website, bot, dan game server.</small></article>',
    '        </div>',
    '      </div>',
    '    </section>',
    '    <section id="order">',
    '      <div class="container">',
    '        <div class="section-title">Formulir pemesanan</div>',
    '        <div class="order-box">',
    '          <div class="form-card">',
    '            <form id="orderForm">',
    '              <label>Nama Lengkap<input type="text" name="name" placeholder="Masukkan nama" required /></label>',
    '              <label>Email<input type="email" name="email" placeholder="contoh@email.com" required /></label>',
    '              <label>Pilih Paket<select name="plan" required>' + planOptions + '</select></label>',
    '              <label>Tipe Server<select name="serverType" required><option value="Bot Discord">Bot Discord</option><option value="Website">Website</option><option value="Game Server">Game Server</option><option value="Aplikasi/Custom">Aplikasi/Custom</option></select></label>',
    '              <label>Catatan<textarea name="notes" placeholder="Jelaskan kebutuhan server Anda"></textarea></label>',
    '              <button class="btn primary" type="submit">Kirim Pesanan</button>',
    '            </form>',
    '          </div>',
    '          <aside class="summary-card">',
    '            <h3>Ringkasan</h3>',
    '            <ul>',
    '              <li>Server siap pakai</li>',
    '              <li>Panel Pterodactyl terintegrasi</li>',
    '              <li>Pembayaran akan diproses secara aman</li>',
    '              <li>Setup otomatis setelah persetujuan</li>',
    '            </ul>',
    '            <div style="margin-top:20px; color: var(--muted);">Status pesanan: <strong style="color: var(--success);">Pending</strong></div>',
    '          </aside>',
    '        </div>',
    '      </div>',
    '    </section>',
    '  </main>',
    '  <script>',
    "    document.getElementById('orderForm').addEventListener('submit', async (event) => {",
    '      event.preventDefault();',
    '      const form = event.currentTarget;',
    '      const payload = Object.fromEntries(new FormData(form).entries());',
    '      try {',
    "        const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });",
    '        if (!response.ok) throw new Error("Order failed");',
    '        const data = await response.json();',
    '        alert(`Pesanan berhasil dibuat: #${data.id} (${data.status})`);',
    '        form.reset();',
    '      } catch (error) {',
    "        alert('Terjadi kesalahan saat mengirim pesanan.');",
    '      }',
    '    });',
    '  </script>',
    '</body>',
    '</html>'
  ].join('\n');
}

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/', (req, res) => {
    res.type('html').send(renderLandingPage());
  });

  app.get('/api/plans', (req, res) => {
    res.json(plans);
  });

  app.post('/api/orders', (req, res) => {
    const { name, email, plan, serverType, notes } = req.body || {};

    if (!name || !email || !plan || !serverType) {
      return res.status(400).json({ error: 'Name, email, plan, and serverType are required.' });
    }

    const order = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      status: 'pending',
      plan,
      serverType,
      notes: notes || '',
      customer: { name, email },
      createdAt: new Date().toISOString()
    };

    return res.status(201).json(order);
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'ma-hosting' });
  });

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('MA Hosting app running at http://localhost:' + port);
  });
}

module.exports = { createApp, plans };
