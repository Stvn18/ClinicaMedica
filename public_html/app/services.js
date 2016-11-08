app.service('UsuarioSessionService', function ($http, WS_URL) {
    var service = this;
    var path = 'api/UsuarioSesion/';

    function getUrl() {
        return WS_URL + path;
    }

    service.login = function (usuario, pass) {
        return $http({
            url: getUrl() + 'login',
            method: 'GET',
            params: {'usuario': usuario, 'pass': pass}
        });
    };

});

app.service('UsuarioService', function ($http, WS_URL) {
    var service = this;
    var path = 'api/Usuario/';

    function getUrl() {
        return WS_URL + path;
    }

    service.findByUser = function (usuario) {
        return $http({
            url: getUrl() + 'findByUser',
            method: 'GET',
            params: {'usuario': usuario}
        });
    };

    service.doCreate = function (usuario) {
        return $http({
            url: getUrl(),
            method: 'POST',
            data: usuario,
            params: {}
        });
    };

});

app.service('PacienteService', function ($http, WS_URL) {

    var path = 'api/Paciente/', service = this;

    function getUrl() {
        return WS_URL + path;
    }

    service.findAll = function () {
        return $http({
            url: getUrl(),
            method: 'GET',
            params: {}
        });
    };

});

app.service('TrabajadorService', function ($http, WS_URL) {

    var path = 'api/Trabajador/', service = this;

    function getUrl() {
        return WS_URL + path;
    }

    service.findByPuesto = function (puestoId) {
        return $http({
            url: getUrl() + 'findByPuesto',
            method: 'GET',
            params: {'puestoId': puestoId}
        });
    };

});

app.service('HorarioService', function ($http, WS_URL) {

    var path = 'api/Horario/', service = this;

    function getUrl() {
        return WS_URL + path;
    }

    service.findAll = function () {
        return $http({
            url: getUrl(),
            method: 'GET',
            params: {}
        });
    };

});

app.service('CitaService', function ($http, WS_URL) {

    var path = 'api/Cita/', service = this;

    function getUrl() {
        return WS_URL + path;
    }
    
    service.onCreate = function(cita){
        return $http({
            url: getUrl(),
            method: 'POST',
            data: cita,
            params: {}
        });
    };

});