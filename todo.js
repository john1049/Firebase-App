(function() {
    .module('todoApp', ['ngAnimate', 'firebase'])
    .constant('firebaseConfig', {
      apiKey: "AIzaSyCGz88kNQ2b-7nU8EGaQHtubdnlisG54hI",
      authDomain: "cloud-based-todo.firebaseapp.com",
      databaseURL: "https://cloud-based-todo.firebaseio.com",
      storageBucket: "cloud-based-todo.appspot.com",
      messagingSenderId: "509749300206"
    })
    .run(firebaseConfig => firebase.initializeApp(firebaseConfig))
    .service('dbRefRoot', DbRefRoot)
    .service('todos', Todos)
    .controller('todoController', function($scope) {
        $scope.tasks = (localStorage.getItem('todo') != null) ? JSON.parse(localStorage.getItem('todo')) : [];
        $scope.visible = false;

        $scope.update = function() {
            localStorage.setItem('todo', JSON.stringify($scope.tasks));
        }

        Array.prototype.remove = function(value) {
            this.splice(this.indexOf(value), 1);
            return true;
        };

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

        $scope.delete = function(task) {
            $scope.tasks.remove(task);
            $scope.update();
        }

        $scope.completed = function() {
            this.task.complete = true;
            $scope.update();
        }

        $scope.uncomplete = function() {
            this.task.complete = false;
            $scope.update();
        }
    })
})();
