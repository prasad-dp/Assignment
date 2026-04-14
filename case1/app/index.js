const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'devops-secret-key';

app.use(bodyParser.urlencoded({ extended: true })); // To handle HTML form data
app.use(bodyParser.json());

// 1. Health Check
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// 2. Login Page (The Frontend)
app.get('/login', (req, res) => {
    res.send(`
        <html>
            <body style="font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh;">
                <form action="/login" method="POST" style="border: 1px solid #ccc; padding: 20px; border-radius: 8px;">
                    <h2>Metadome Login</h2>
                    <input type="text" name="username" placeholder="Username" required style="display:block; margin-bottom:10px;"><br>
                    <input type="password" name="password" placeholder="Password" required style="display:block; margin-bottom:10px;"><br>
                    <button type="submit">Login</button>
                </form>
            </body>
        </html>
    `);
});

// 3. Handle Login Logic
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password123') {
        const token = jwt.sign({ user: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        // In a simple web demo, we send the token back as text or a cookie
        return res.send(`<h3>Login Successful!</h3><p>Your Token is:</p><code style="word-break: break-all;">${token}</code><p><a href="/items?token=${token}">View Protected Items</a></p>`);
    }
    res.status(401).send('<h3>Login Failed</h3><a href="/login">Try again</a>');
});

// 4. Protected Endpoint
app.get('/items', (req, res) => {
    const token = req.query.token; // Taking token from URL for easy demo testing

    if (!token) return res.status(401).send('Unauthorized: No token provided');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Forbidden: Invalid token');
        
        res.json({
            message: "Access Granted to Private Subnet Data",
            items: ["EC2 Instance", "S3 Bucket", "RDS Database"],
            user: decoded.user
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
