const fetch = require('node-fetch');
const rot13 = require('rot13-cipher');

module.exports = async function (context, req) {
    const code = 'badapples123'
    const secret = await getSecret(code);
    const encoded = rot13(secret);
    const adminKey = await unlock(encoded);

    context.res = {
        status: 200,
        body: {
            key: adminKey,
        }
    }
}


async function getSecret (code) {
    const response = await fetch(`https://b4d4ppl3s.herokuapp.com/api/code?code=${code}`, {
        method: 'GET',
    });
    const responseJson = await response.json();
    return responseJson.secret
}

async function unlock (encoded) {
    const response = await fetch(`https://b4d4ppl3s.herokuapp.com/api/unlock`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'code': encoded,
        })
    });
    const responseJson = await response.json();
    return responseJson.key;
}