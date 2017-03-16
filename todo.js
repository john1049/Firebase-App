(function() {
    var app = angular.module('todoApp', [])
    app.controller('todoController', function($scope) {
        $scope.tasks = (localStorage.getItem('todo') != null) ? JSON.parse(localStorage.getItem('todo')) : [];
        $scope.visible = false;

        $scope.update = function() {
            localStorage.setItem('todo', JSON.stringify($scope.tasks));
        }
				//The unfuck my tasks array
				//$scope.tasks = [];
				//$scope.update();

        $scope.add = function() {
            $scope.todo = ({
                name: $scope.taskName,
                date: $scope.dueDate,
								complete: false
            })
						$scope.todo.id = cuid();
						$scope.tasks.push($scope.todo);
            $scope.update();
            $scope.taskName = '';
            $scope.dueDate = '';
        }

        $scope.delete = function() {
					console.log(this.$index);
          $scope.tasks.splice(this.$index, 1);
          $scope.update();
        }

        $scope.completed = function() {
						this.task.complete = true;
            $scope.update();
        }

				$scope.uncomplete = function() {
            this.task.complete = false;
						console.log(this.task.complete);
            $scope.update();
        }
    })
})();
