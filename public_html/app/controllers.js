
app.controller('PrincipalController', function ($mdSidenav, $state, $cookies) {

    var vm = this;

    vm.pantallas = [];

    vm.validateSession = function () {

        var session = $cookies.getObject('umgClinica');

        console.log(session);

        if (!session) {
            /**
             * validamos si el token es correcto
             */

            $state.transitionTo("login");
        } else {

            vm.pantallas = session.pantallas;

        }

    };

    vm.abrirMenu = function () {
        $mdSidenav('appMenu').toggle().then(function () {

        });
    };

    vm.logout = function () {
        $cookies.remove('umgClinica');
        $state.transitionTo("login");
    };

    vm.navigateTo = function (menuId, $event) {

        switch (menuId) {
            case -1:

                vm.logout();

                break;

            default:
                break;
        }

    };

    vm.validateSession();

});

app.controller('LoginController', function ($rootScope, $scope, $mdSidenav, $state, $cookies, UsuarioSessionService, $mdToast) {

    var vm = this;

    vm.validateSession = function () {

        var session = $cookies.getObject('umgClinica');

        if (session) {
            /**
             * Si el token es correcto, ingresara al menu
             */
            $state.transitionTo("menu");
        }

    };

    vm.login = function () {

        if ($scope.loginForm.$invalid) {
            return false;
        }

        vm.isShowProgressLinear = true;
        UsuarioSessionService.login(vm.usuario, vm.pass).success(function (data, status) {
            vm.isShowProgressLinear = false;

            if (status === 202) {

                $mdToast.show(
                        $mdToast.simple()
                        .hideDelay(3000)
                        .position('top right')
                        .textContent('Contraseña incorrecta')
                        );

            } else {

                var session = {
                    'token': data.token,
                    'userId': data.usuario.id,
                    'userName': data.usuario.nombre,
                    'pantallas': []
                };

                data.usuario.rol.pantallas.forEach(function (row, index) {
                    session.pantallas.push(row);
                });

                $cookies.putObject('umgClinica', session);

                $state.transitionTo("menu");

            }


        }).error(function (data, status) {

            console.log(status);

            vm.isShowProgressLinear = false;

            if (status === 404) {

                $mdToast.show(
                        $mdToast.simple()
                        .hideDelay(3000)
                        .position('top right')
                        .textContent('Usuario no existe')
                        );

                vm.user = "";
                vm.password = "";

            } else {
                $mdToast.show(
                        $mdToast.simple()
                        .hideDelay(3000)
                        .position('top right')
                        .textContent('Error interno')
                        );
            }

        });

    };

    vm.validateSession();

});

app.controller('RegistrarCitaController', function ($scope, $timeout, HorarioService, PacienteService, TrabajadorService, CitaService) {

    var vm = this;

    vm.pacientes = [];
    vm.trabajadores = [];
    vm.horarios = [];
    
    vm.cita = {
        asignaciones:[
            {}
        ]
    };

    vm.getPacientes = function () {

        PacienteService.findAll().success(function (data, status) {

            vm.pacientes = data;

        }).error(function (data, status) {
            console.error(data);
        });

    };

    vm.getTrabajadores = function () {

        TrabajadorService.findByPuesto(2).success(function (data, status) {
            vm.trabajadores = data;
        }).error(function (data, status) {
            console.error(data);
        });

    };

    vm.getHorarios = function () {

        HorarioService.findAll().success(function (data, status) {
            vm.horarios = data;
        }).error(function (data, status) {
            console.error(data);
        });

    };
    
    
    vm.registrar = function(){
        
        console.log(vm.cita);
        
        CitaService.onCreate(vm.cita).success(function(data, status){
            
            console.log(data);
            
            if(status === 200){
                
                /**
                 * mostrar mensaje
                 */
                
                vm.cita.descripcion = "";
                vm.cita.estado = "";
                vm.cita.horario = undefined;
                
                vm.cita.asignaciones[0] = undefined;
                
            }
            
        }).error(function(data, status){
            console.error(data);
        });
        
        
    };

    $timeout(function () {
        
        vm.getHorarios();
        vm.getPacientes();
        vm.getTrabajadores();

    }, 1000);
});