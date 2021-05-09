'use strict';
const https = require('https');
const fs = require('fs');

const url = 'https://api.github.com/users/lukaswagner/gpg_keys';

function error(...e) {
    console.error(...e);
    process.exit(1);
}

https.get(
    url,
    { headers: { 'User-Agent': 'Mozilla/5.0' } },
    (res) => {
        let str = '';
        res.on('data', (buf) => {
            str += buf;
        });
        res.on('end', () => {
            const data = JSON.parse(str);
            if (!Array.isArray(data) || data.length !== 1) error('Invalid response', data);
            const key = data[0].raw_key;
            fs.writeFileSync('../deploy/key.asc', key);
            process.exit(0);
        });
    })
    .on('error', error);
