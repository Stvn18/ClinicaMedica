app.service('UsuarioSessionService', function($http, WS_URL){
    var service = this;
    var path = 'api/UsuarioSesion/';
    
    function getUrl(){
        return WS_URL+path;
    }
    
    service.login = function(usuario,pass){
        return $http({
            url: getUrl()+'login',
            method: 'GET',
            params: {'usuario':usuario, 'pass':pass}
        });
    };
    
});

app.service('UsuarioService', function($http, WS_URL){
    var service = this;
    var path = 'api/Usuario/';
    
    function getUrl(){
        return WS_URL + path;
    }
    
    service.findByUser = function(usuario){
        return $http({
           url: getUrl()+'findByUser',
           method: 'GET',
           params: {'usuario':usuario}
        });
    };
    
    service.doCreate = function(usuario){
        return $http({
            url: getUrl(),
            method: 'POST',
            data: usuario,
            params:{}
        });
    };
    
});



