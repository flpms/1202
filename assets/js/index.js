var utils = {
    addClass: function(elem, className) {
        if (elem.classList) {
            elem.classList.add(className);
        } else {
            elem.className += ' ' + className;
        }
    },
    removeClass: function(elem, className) {
        if (elem.classList) {
            elem.classList.remove(className);
        } else {
            elem.className = elem.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
}

window.onload = function() {
    var button = document.getElementById('send');
    var email = document.getElementById('email');
    var form = document.getElementById('js-register-form');
    var sucessAlert = document.getElementsByClassName('sucess-alert')[0];
    var alertArea = document.getElementsByClassName('js-alert-area')[0];
    var validEmail = false;

    email.addEventListener('blur', function(evt) {

        evt.preventDefatult;
        evt.stopPropagation;

        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

        if (!regex.test(email.value)) {
            utils.removeClass(alertArea, 'hide');
            validEmail = false;
        } else {
            utils.addClass(alertArea, 'hide');
            validEmail = true;
        }
    }, false);

    button.addEventListener('click', function(evt) {

        evt.preventDefatult;
        evt.stopPropagation;

        if (!validEmail) {
            return 0;
        }

        var request = new XMLHttpRequest();
        request.open('POST', 'http://159.203.77.18:8080/api/users/   ', true);
        request.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');
        request.send(JSON.stringify({"email":email.value}));
        request.addEventListener("load", function(evt) {

            if (request.status === 200) {
                utils.addClass(form, 'hide');
                utils.removeClass(sucessAlert, 'hide');
            }
        }, false);
    }, false);
};
