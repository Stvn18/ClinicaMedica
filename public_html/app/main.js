/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('app', ['ui.router', 'pascalprecht.translate', 'ngAria', 'ngMaterial', 'ngMessages', 'ngAnimate']);
        app.config(function ($stateProvider, $translateProvider, $mdThemingProvider) {

        $stateProvider
                .state('login',{
                url: '/login',
                        views: {
                        "main": {
                        templateUrl:'templates/login.html'
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
                $mdThemingProvider.theme('th')
                .primaryPalette('red')
                .accentPalette('light-blue')
                .backgroundPalette('light-green');
                });
                
        /*
         * Configuramos la vista por defecto 29/10/2016
         */
        app.run(function($state){

        $state.transitionTo("login");
                });

