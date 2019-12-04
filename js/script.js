// Current
// Используются промисы
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {

    function catchData() {

        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('GET', 'js/current.json');

            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();
            
// this.response - В данном случае контекст указывает на ответ от сервера в этом конкретном запросе. 
// Ведь мы можем послать 2 одинаковых запроса, а ответы получить разные 
// (вдруг на сервере в этот момент что-то изменилось) И вот чтобы на нужный 
// запрос пришел именно этот ответ- мы используем this.
            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    if (request.status == 200) {
                        resolve(this.response);
                    } else {
                        reject();
                    }
                }
            };
            
        });
    }

    catchData()
    .then( response => {
        let data = JSON.parse(response);
        inputUsd.value = (inputRub.value / data.usd).toFixed(3);
    })
    .catch(() => inputUsd.value = "Что-то пошло не так");
});


