const button = document.getElementById('jokeButton');

function displayJoke (data)
{
    const jod = data.contents.jokes[0];
    const titleContainer = document.getElementById('jokeTitle');
    const textContainer = document.getElementById('jokeText');

    titleContainer.textContent = jod.joke.title;
    textContainer.textContent = jod.joke.text;
}

button.addEventListener('click', function (event) {
    const response = fetch('https://api.jokes.one/jod', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        displayJoke(data);
    });

    // For debug to avoid rate limits
    // const hardCodedResponse = 
    // {
    //     "success": {
    //       "total": 1
    //     },
    //     "contents": {
    //       "jokes": [
    //         {
    //           "description": "Joke of the day ",
    //           "language": "en",
    //           "background": "",
    //           "category": "jod",
    //           "date": "2022-07-10",
    //           "joke": {
    //             "title": "Lazy Weather",
    //             "lang": "en",
    //             "length": "72",
    //             "clean": "1",
    //             "racial": "0",
    //             "date": "2022-07-10",
    //             "id": "U_c4s0UGjFqJDH4PO4nSlweF",
    //             "text": "Q: What type of cloud is so lazy, because it will never get up?\r\nA: Fog!"
    //           }
    //         }
    //       ],
    //       "copyright": "2019-20 https://jokes.one"
    //     }
    //   };

    // displayJoke(hardCodedResponse);
});
