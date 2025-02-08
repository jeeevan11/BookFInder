var verify_existance = false;

function queryBooks() {
    const QUERY = (document.getElementById("query").value).toLowerCase();
    var results = document.getElementById("res");
    loader.setAttribute('style', 'display: block;');
    var query_display = document.getElementById("query-display");

    if (verify_existance == true) {
        results.remove(results);

        results = document.createElement('div');
        results.setAttribute('id', 'res'); 
        results.setAttribute('class', 'results'); 

        loader = document.createElement('div');
        loader.setAttribute('class', 'loader');
        loader.setAttribute('id', 'load');

        query_display = document.createElement('div');
        query_display.setAttribute('id', 'query-display');

        results.appendChild(loader);
        results.appendChild(query_display);

        document.getElementById('main').appendChild(results);
    }

    query_display.innerHTML = "Related results for \"" + QUERY + "\"";

    const URL = "https://www.googleapis.com/books/v1/volumes?q=" + QUERY;
    
    var request = new XMLHttpRequest();
    request.open('GET', URL, true);
    
    request.onload = function () {
        for (var i = 0; i < 10; i++) {
            var data = JSON.parse(this.response);
            var authors = (data["items"][i]["volumeInfo"]["authors"]) || 'No Author Disclosed';
            var title = (data["items"][i]["volumeInfo"]["title"]) || 'No title Disclosed';
            var publisher = (data["items"][i]["volumeInfo"]["publisher"]) || 'No publisher Disclosed';
            try {
                var thumbnail = data["items"][i]["volumeInfo"]["imageLinks"]["thumbnail"];
            } catch (err) {
                var thumbnail = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Georgia_404.svg/1125px-Georgia_404.svg.png';
            }

            var info = (data["items"][i]["volumeInfo"]["infoLink"]) || 'No info Disclosed';

            var card = document.createElement('div');
            card.setAttribute('class', 'custom-card');
            card.setAttribute('id', 'results');

            const logo = document.createElement('img');
            logo.src = thumbnail;
            logo.className = "custom-card-img";
    
            card.appendChild(logo);
        
            const card_body = document.createElement('div');
            card_body.setAttribute('class', 'custom-card-body');
        
            const card_title = document.createElement('h5');
            card_title.setAttribute('class', 'custom-card-title');
            card_title.innerHTML = title;
        
            card_body.appendChild(card_title);
        
            const card_text = document.createElement('p');
            card_text.setAttribute('class', 'custom-card-text');
            card_text.innerHTML = "By: " + authors + "<br>Published By: " + publisher;
        
            card_body.appendChild(card_text);
        
            const button = document.createElement('a');
            button.setAttribute('class', 'custom-button');
            button.setAttribute('href', info);
            button.innerHTML = "See this Book";
        
            card_body.appendChild(button);

            card.appendChild(card_body);
        
            results.appendChild(card);
        }
    };
    
    verify_existance = true;
    request.send();
    document.getElementById('query').value = '';
    setTimeout(() => loader.setAttribute('style', 'display: none;'), 1500);
}
