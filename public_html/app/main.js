/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('app', ['ui.router', 'pascalprecht.translate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngCookies', 'chart.js']);

app.constant('WS_URL', 'http://localhost:8084/ClinicaMedicaWS/');

/**
 * Interceptamos las peticiones para mandar el userId y el token
 */
app.factory('interceptor', function ($cookies) {
    return {
        'request': function (config) {

            console.log(config);

            if (config.url.indexOf('http') === 0) {

                var session = $cookies.getObject('umgClinica');

                if (session !== undefined) {


                    if (config.params === undefined) {
                        config.params = {'token': session.token, 'userId': session.userId};
                    } else {
                        config.params.token = session.token;
                        config.params.userId = session.userId;
                    }
                }
            }
            return config;

        },
        'response': function (response) {

            console.log(response);

            return response;
        }
    };
});

/**
 * Definimos la configuracion de nuestra aplicacion
 */
app.config(function ($stateProvider, $translateProvider, $mdThemingProvider, $httpProvider) {

    $httpProvider.interceptors.push('interceptor');

    $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    "index": {
                        controller: 'LoginController as vm',
                        templateUrl: 'templates/login.html'
                    }
                }

            })
            .state('menu', {
                url: '/menu',
                views: {
                    "index": {
                        controller: 'PrincipalController as vm',
                        templateUrl: 'templates/menu.html'
                    }
                }
            })
            .state('menu.asignacionHorarios', {
                url: '/asignacionHorarios',
                views: {
                    "menu": {
                        controller: 'AsignacionHorariosController as vm',
                        templateUrl: 'templates/asignacionHorarios.html'
                    }
                }
            })
            .state('menu.cargarInventario', {
                url: '/cargarInventario',
                views: {
                    "menu": {
                        controller: 'CargarInventarioController as vm',
                        templateUrl: 'templates/cargarInventario.html'
                    }
                }
            })
            .state('menu.crearUsuario', {
                url: '/crearUsuario',
                views: {
                    "menu": {
                        controller: 'CrearUsuarioController as vm',
                        templateUrl: 'templates/crearUsuario.html'
                    }
                }
            })
            .state('menu.historialPaciente', {
                url: '/historialPaciente',
                views: {
                    "menu": {
                        controller: 'HistorialPacienteController as vm',
                        templateUrl: 'templates/historialPaciente.html'
                    }
                }
            })
            .state('menu.modificarCita', {
                url: '/modificarCita',
                views: {
                    "menu": {
                        controller: 'ModificarCitaController as vm',
                        templateUrl: 'templates/modificarCita.html'
                    }
                }
            })
            .state('menu.registrarCita', {
                url: '/registrarCita',
                views: {
                    "menu": {
                        controller: 'RegistrarCitaController as vm',
                        templateUrl: 'templates/registrarCita.html'
                    }
                }
            })
            .state('menu.registrarPaciente', {
                url: '/registrarPaciente',
                views: {
                    "menu": {
                        controller: 'RegistrarPacienteController as vm',
                        templateUrl: 'templates/registrarPaciente.html'
                    }
                }
            })
            .state('menu.ventaMedicamento', {
                url: '/ventaMedicamento',
                views: {
                    "menu": {
                        controller: 'VentaMedicamentoController as vm',
                        templateUrl: 'templates/ventaMedicamentos.html'
                    }
                }
            })
            .state('menu.asignacion', {
                url: '/asignacion',
                views: {
                    "menu": {
                        controller: 'AsignacionController as vm',
                        templateUrl: 'templates/visualizarAsignPacMed.html'
                    }
                }
            })
            .state('menu.citaDoctor', {
                url: '/citaDoctor',
                views: {
                    "menu": {
                        controller: 'CitaDoctorController as vm',
                        templateUrl: 'templates/visualizarCitaDoctor.html'
                    }
                }
            })
            .state('menu.medicamentos', {
                url: '/medicamentos',
                views: {
                    "menu": {
                        controller: 'MedicamentosController as vm',
                        templateUrl: 'templates/visualizarMedicamentos.html'
                    }
                }
            });

    $translateProvider.useStaticFilesLoader({
        prefix: 'lan/',
        suffix: '.json'
    });

    /*
     * Configuramos el idioma por defecto
     */

    $translateProvider.preferredLanguage('es');
    /*
     * 
     * Configuracion del tema 29/10/2016
     */

    $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('light-blue');
    //.backgroundPalette('light-green');
});

/*
 * Configuramos la vista por defecto 29/10/2016
 */

app.run(function ($state) {

    $state.transitionTo("menu");
});

