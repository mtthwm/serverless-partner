const translator = require('emoji-translator');

module.exports = async function (context, req) {
    const redacted = req.query.redacted;

    const dictionary = {
        "🕵🏽": "John",
        "🕵🏻‍♀️": "Nora",
        "🗻": "Waverly Valley Place",
    };

    if (!redacted)
    {
        context.res = {
            status: 400,
            body: "please enter a redacted string"
        }
        return;
    }

    const translate = translator(dictionary);

    const translated = translate(redacted);

    context.res = {
        body: translated,
    }
}