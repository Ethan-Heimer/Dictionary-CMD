const { error } = require('console');
const https = require('https');
require('dotenv').config();

const key = process.env.KEY;

function getDef(word) {
    try{
        const request = https.get(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`, (response) => {
            let body = '';

            response.on("data", (data) => {
                body += data.toString();
            });

            response.on("end", () => {
                const def = JSON.parse(body);
                console.log(def[0].shortdef);
            });
        });
    
        request.on("error", (error) => console.log(error.message));
    }
    catch{
        console.error(error.message);
    }
}

const query = process.argv.slice(2);
query.forEach(getDef);