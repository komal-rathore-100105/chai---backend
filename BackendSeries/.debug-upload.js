import fs from 'fs';

const form = new FormData();
form.append('fullname', 'Test User');
form.append('email', 'test@example.com');
form.append('username', 'testuser');
form.append('password', 'secret');

const tempFile = './public/temp/test-avatar.txt';
fs.mkdirSync('./public/temp', { recursive: true });
fs.writeFileSync(tempFile, 'dummy image content');
const fileBuffer = fs.readFileSync(tempFile);
const fileBlob = new Blob([fileBuffer], { type: 'text/plain' });
form.append('avatar', fileBlob, 'test-avatar.txt');
const response = await fetch('http://localhost:8000/api/v1/users/register', {
    method: 'POST',
    body: form
});
const bodyText = await response.text();
console.log('status', response.status);
console.log('body', bodyText);

