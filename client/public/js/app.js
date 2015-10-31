var todoApp = angular.module('todoApp', [])

.factory('Todo', function($http) {
    return {
        get : function() {
            return $http.get('/api/todos');
        },
        create : function(todoData) {
            return $http.post('/api/todos', todoData);
        },
        delete : function(id) {
            return $http.delete('/api/todos/' + id);
        }
    }
})

.controller('mainController', function($scope, $http, Todo) {
    
    $scope.formData = {};
    
    // when landing on the page, get all todos and show them
    
    Todo.get()
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
       });
    
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        if (!$.isEmptyObject($scope.formData)) {
            Todo.create($scope.formData)
                .success(function(data) {
                    // clear the form so our user is ready to enter another
                    $scope.formData = {};
                    $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
           });
        }
    }
    
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        Todo.delete(id)
            .success(function(data) {
                $scope.todos = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
       });
    }
});