import 'angular-material.css';
import './app.scss';
import angular from 'angular';
import ngMaterial from 'angular-material';
import { sjAuth } from './component';

class AppController {
  constructor(...injects) {
    AppController.$inject.forEach((item, index) => (this[item] = injects[index]));
    this.state = null;
    this.credentials = {
      username: '',
      passowrd: ''
    };
    this.login = credentials => {
      this.auth
        .login('http://private-88b4e0-sanjiauthui.apiary-mock.com/auth/local', credentials)
        .then(data => {
          /*eslint no-console: 0*/
          console.log('login success, token: ', data);
          return this.$http.get('http://private-88b4e0-sanjiauthui.apiary-mock.com/users/me');
        })
        .then(res => {
          this.sesion.setUserData(res.data);
        })
        .catch(err => {
          /*eslint no-console: 0*/
          console.log('login fail', err);
        });
    };
  }
}
AppController.$inject = ['$http', 'auth', 'session'];
const app = angular.module('webapp', [ngMaterial, sjAuth]);
app.config((authProvider, sessionProvider) => {
  sessionProvider.configure({
    tokenHeader: 'token'
  });
  authProvider.configure({
    role: {
      admin: 'admin',
      guest: 'guest'
    }
  });
});
app.controller('AppController', AppController);

angular.element(document).ready(() => {
  angular.bootstrap(document.body, ['webapp']);
});
