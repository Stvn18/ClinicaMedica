
app.controller('PrincipalController', function ( $mdSidenav, $state, $cookies) {

    var vm = this;

    vm.menu = [];

    vm.validateSession = function () {

        var session = $cookies.getObject('umgClinica');

        console.log(session);

        if (!session) {
            /**
             * validamos si el token es correcto
             */

            $state.transitionTo("login");
        } else {

            vm.menus = session.menus;

        }

    };

    vm.abrirMenu = function () {
        $mdSidenav('appMenu').toogle().then(function () {

        });
    };

    vm.logout = function () {
        $cookies.remove('umgClinica');
        $state.transitionTo("login");
    };

    vm.navigateTo = function (menuId, $event) {

        switch (menuId) {

            case 1:

                $state.transitionTo("menu.asignacionHorarios");

                break;

            case 2:

                $state.transitionTo("menu.cargarInventario");

                break;

            case 3:

                $state.transitionTo("menu.crearUsuario");

                break;

            case 4:

                $state.transitionTo("menu.historialPaciente");

                break;

            case 5:

                $state.transitionTo("menu.modificarCita");

                break;

            case 6:

                $state.transitionTo("menu.registrarCita");

                break;

            case 7:

                $state.transitionTo("menu.registrarPaciente");

                break;

            case 8:

                $state.transitionTo("menu.ventaMedicamento");

                break;

            case 9:

                $state.transitionTo("menu.asignacion");

                break;

            case 10:

                $state.transitionTo("menu.citaDoctor");

                break;

            case 11:

                $state.transitionTo("menu.medicamentos");

                break;

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
                
                data.usuario.rol.pantallas.forEach(function(row, index){
                    session.pantalla.push(row.pantalla);
                });
                /*data.usuario.usuarioPerfil.asignacionPerfilMenus.forEach(function (row, index) {

                    session.menus.push(row.menu);

                });*/

                $cookies.putObject('umgClinica', session);

                console.log($rootScope);

                $state.transitionTo("main");

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

