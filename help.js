﻿(function () {
    var locale = window.location.search.replace('?', '');

    var title = {
        "en": "? Help",
        "ru": "? Помощь"
    }

    var loading_screen_text = {
        "en": "Loading...",
        "ru": "Загрузка..."
    }

    document.querySelector('title').textContent = loading_screen_text[locale];
    document.querySelector('.loading_screen').textContent = loading_screen_text[locale];

    document.addEventListener("DOMContentLoaded", function () {
        var json_file = document.createElement('script');
        json_file.setAttribute('type', 'text/javascript');
        json_file.setAttribute('src', '/selected-text-searcher/locales/' + locale + '.js');
        document.body.appendChild(json_file);

        json_file.addEventListener('load', function () {
            var elements = document.querySelectorAll('[data-ih]');

            for (i = 0; i < elements.length; i++) {
                elements[i].innerHTML = json[elements[i].dataset.ih]; // ih = innerHTML
            }

            var elements = document.querySelectorAll('[data-idl]');

            for (i = 0; i < elements.length; i++) {
                elements[i].dataset.id = json[elements[i].dataset.idl]; // idl = id local
            }

            load_video_thumbnails();
        });
    });

    function load_video_thumbnails() {
        var div, n,
            v = document.getElementsByClassName("youtube_player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = labnolThumb(v[n].dataset.id);
            div.onclick = labnolIframe;
            v[n].appendChild(div);
        }

        var loading_screen = document.querySelector('.loading_screen');

        loading_screen.offsetWidth;
        loading_screen.style.opacity = '0';

        loading_screen.addEventListener('transitionend', function () {
            this.parentNode.removeChild(this);
        });
    }

    function labnolThumb(id) {
        var thumb = '<img src="https://img.youtube.com/vi/ID/maxresdefault.jpg">',
            play = '<div class="play"></div>';
        return thumb.replace("ID", id) + play;
    }

    function labnolIframe() {
        var iframe = document.createElement("iframe");
        var embed = "https://www.youtube.com/embed/ID?autoplay=1";
        iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "1");
        this.parentNode.replaceChild(iframe, this);
    }
})();