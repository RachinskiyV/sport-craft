var nashaForma = document.getElementById('formaGlavnaya');
var knopkaNazad = document.getElementById('nazadKnopka');
var knopkaNazadCorrect = document.querySelector('.form-box .btn-submit');

if (nashaForma) {
    nashaForma.addEventListener('submit', function(event) {
         gtag('event', 'btn_accept');
        event.preventDefault(); 
        
        var polePhone = document.getElementById('user-phone');
        var textOshibka = document.getElementById('nomer-oshibka');
        var textVvoda = polePhone.value;

        if (textVvoda.length < 10 || textVvoda.length > 13) {
            textOshibka.style.display = 'block';
            polePhone.style.borderColor = '#b32d2d';
        } else {
            textOshibka.style.display = 'none';
            polePhone.style.borderColor = '#d1dcde';
            window.location.href = 'correct.html';
        }
    });
}

if (knopkaNazad) {
    knopkaNazad.addEventListener('click', function(event) {
        event.preventDefault();
        window.history.back();
    });
}

if (knopkaNazadCorrect && !nashaForma) {
    knopkaNazadCorrect.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'order.html';
    });
}
