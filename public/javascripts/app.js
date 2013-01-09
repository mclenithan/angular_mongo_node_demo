//app called rbTodo - Red Bull Todo List
//No resources or dependencies stated
angular.module('rbTodo', []).
	//initiate route Provider
	config(['$routeProvider', function($routeProvider){
	$routeProvider.
		//currently using one view, one controller
		when('/', {templateUrl: '/list', controller: TodoCtrl}).
		otherwise({redirectTo: '/'});
	}]);