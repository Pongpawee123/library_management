const http = require('http');

function post(path, data, token) {
  return new Promise((resolve, reject) => {
    const dataStr = JSON.stringify(data);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(dataStr)
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'POST',
      headers
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf8');
        resolve({ status: res.statusCode, body });
      });
    });
    req.on('error', reject);
    req.write(dataStr);
    req.end();
  });
}

async function run() {
  try {
    const rnd = Math.random().toString(36).substring(7);
    const email = `test_${rnd}@lib.com`;
    console.log('Registering:', email);
    
    const regRes = await post('/api/auth/register', { name: 'Test User', email, password: 'password123' });

    const loginRes = await post('/api/auth/login', { email, password: 'password123' });
    const auth = JSON.parse(loginRes.body);
    console.log('Login token:', !!auth.token);
    
    if (auth.token) {
      const bRes = await post('/api/borrows', { book_id: 5 }, auth.token);
      console.log('Borrow code:', bRes.status);
      console.log('Borrow body:', bRes.body);
    }
  } catch(e) { console.error(e); }
}
run();
