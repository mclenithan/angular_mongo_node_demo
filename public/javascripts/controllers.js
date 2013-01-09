//Controllers

//currently only one controller - TodoCtrl
function TodoCtrl ($scope, $http){
	//Get data
	$http.get('/data').success(function(data){
		$scope.todoList = data;
	});

	//add data
	$scope.addTodo = function(){
		//AJAX call explicitally stated for POSTing data
		$http({
			method:'POST',
			url: '/data',
			data: {
				name: $scope.name,
				desc: $scope.desc
			}
		}).success(function (data, status, headers, config){
			//add locally on successful POST
			$scope.todoList.push({
				done: false,
				name: $scope.name,
				desc: $scope.desc
			});
			//Clear fields
			$scope.name = '';
			$scope.desc = '';
		});
	};

	//delete checked items
	$scope.delTodo = function() {
		//using angular's iteration forEach function
		angular.forEach($scope.todoList, function(todoitem){
			if (todoitem.done) {
				//Calling server to delete item
				$http.delete('/data/' + todoitem.name).
					error( function (data, status, headers, config){
						alert('oops!!!');
				})
			}
		})
	}
	
}
