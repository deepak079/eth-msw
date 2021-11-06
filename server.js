const express = require('express');
const app = express();
const walletRouter = require('./server/wallet');


const PORT = process.env.PORT || 4001;
const HOST = '127.0.0.1';

// Add middleware for static pages
app.use(express.static('public'));
// Add middleware for parsing request bodies here:
app.use(express.json());



app.use('/wallet', walletRouter);



app.listen(PORT, HOST, () => {
    console.log(`Server listening on port ${PORT}`);
});

