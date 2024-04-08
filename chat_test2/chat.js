document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('chatForm').addEventListener('submit', function(e) {
        e.preventDefault(); // フォームの送信を防ぐ

        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var firstMessage = document.getElementById('firstMessage').value;

        // fetch APIを使ってサーバーにユーザー情報を送信
        fetch('registerUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, email: email, firstMessage: firstMessage })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

            // 以下、Channel Talkウィジェットを動的に初期化し、開く処理
            (function() {
                var w = window;
                if (w.ChannelIO) {
                    return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
                }
                var ch = function() { ch.c(arguments); };
                ch.q = [];
                ch.c = function(args) { ch.q.push(args); };
                w.ChannelIO = ch;

                function l() {
                    if (w.ChannelIOInitialized) {
                        return;
                    }
                    w.ChannelIOInitialized = true;
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
                    s.charset = 'UTF-8';
                    var x = document.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                }
                if (document.readyState === 'complete') { l(); }
                else if (window.attachEvent) { window.attachEvent('onload', l); }
                else { window.addEventListener('DOMContentLoaded', l, false); window.addEventListener('load', l, false); }
            })();

            // ユーザー情報を使ってChannel Talkウィジェットを初期化し、表示
            ChannelIO('boot', {
                "pluginKey": "748abef7-08de-4b43-a36d-6784199afd77", // 実際のプラグインキーに置き換えてください
                "firstMessage": firstMessage,
                "profile": {
                    "name": name,
                    "email": email
                }
            });

            // ウィジェットをプログラム的に開く
            ChannelIO('openChat', undefined, '');

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
