import http from 'http';
const data = JSON.stringify({ fullname: 'Test User', email: 'test@example.com', username: 'testuser', password: 'secret' });
const options = {
    hostname: 'localhost',
    port: 8000,
    path: '/api/v1/users/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};
const req = http.request(options, res => {
    console.log('status', res.statusCode);
    res.setEncoding('utf8');
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        console.log('body', body);
        process.exit(0);
    });
});
req.on('error', err => { console.error('request error', err); process.exit(1); });
req.write(data);
req.end();
