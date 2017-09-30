angular.module('ngSnake', [])

  .controller('snakeCtrl', function($scope, $timeout, $window) {
    var BOARD_SIZE = 8;

    var COLORS = {
      BARRIER: '#6E2C00',
      PLAYER: '#2ECC71',
      BOARD: '#85C1E9'
    };

    $scope.setStyling = function(col, row) {
     
      if ($scope.board[col][row] == -1) {
        return COLORS.BARRIER;
      }
      else if ($scope.board[col][row] == 1) {
        return COLORS.PLAYER;
      }

      return COLORS.BOARD;
    };


    function setupBoard() {
      $scope.board = [];
      for (var i = 0; i < BOARD_SIZE; i++) {
        $scope.board[i] = [];
        for (var j = 0; j < BOARD_SIZE; j++) {
          $scope.board[i][j] = 0;
        }
      }
    }
    setupBoard();
    
    function setupBarriers(){

        $scope.board[1][2] = -1;
        $scope.board[3][4] = -1; 

    }
    setupBarriers();

    function setupPlayer(){
        $scope.board[4][5] = 1;
    }
    setupPlayer();

    $window.addEventListener("keyup", function(e) {

    });

    $scope.startGame = function() {

    };

  });