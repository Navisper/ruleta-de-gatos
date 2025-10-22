const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.log(`404 - File not found: ${filePath}`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <h1>404 - File Not Found</h1>
                    <p>The file <code>${req.url}</code> was not found.</p>
                    <p>Requested path: <code>${filePath}</code></p>
                    <a href="/">Go back to home</a>
                `);
            } else {
                console.log(`500 - Server error: ${error.code}`);
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            console.log(`200 - Serving: ${filePath} (${mimeType})`);
            res.writeHead(200, { 
                'Content-Type': mimeType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`🚀 Cat Roulette Server running at http://localhost:${port}/`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🐱 Available test pages:`);
    console.log(`   - http://localhost:${port}/index.html (Main app)`);
    console.log(`   - http://localhost:${port}/simple-test.html (Simple test)`);
    console.log(`   - http://localhost:${port}/debug-cat-display.html (Debug page)`);
    console.log(`   - http://localhost:${port}/test-svg-display.html (SVG test)`);
    console.log(`\n📊 Server logs:`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down...');
    server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
    });
});