const bcrypt = require('bcryptjs');

const passwords = [
  { email: 'admin@lib.com',      password: 'Admin1234' },
  { email: 'librarian@lib.com',  password: 'Lib1234' },
  { email: 'member1@lib.com',    password: 'Mem1234' },
  { email: 'member2@lib.com',    password: 'Mem1234' },
  { email: 'member3@lib.com',    password: 'Mem1234' },
  { email: 'member4@lib.com',    password: 'Mem1234' },
  { email: 'member5@lib.com',    password: 'Mem1234' },
];

(async () => {
  for (const u of passwords) {
    const hash = await bcrypt.hash(u.password, 10);
    console.log(`${u.email} → '${hash}'`);
  }
})();