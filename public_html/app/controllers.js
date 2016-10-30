
app.controller('principalController', function ($mdSidenav, $state, $cookies) {

    var vm = this;

    vm.menu = [];

    vm.validateSession = function () {

        var session = $cookies.getObject('umgEvaluaciones');

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
        $cookies.remove('umgEvaluaciones');
        $state.transitionTo("login");
    };

    vm.navigateTo = function (menuId, $event) {

        switch (menuId) {

            case 1:

                $state.transitionTo("main.statistics");

                break;

            case -1:

                vm.logout();

                break;

            default:
                break;
        }

    };

});

app.controller('loginController', function ($mdSidenav, $state, $cookies) {

    var vm = this;

});

