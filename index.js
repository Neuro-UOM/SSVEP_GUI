angular.module('ngSnake', [])

  .controller('snakeCtrl', function($scope, $timeout, $window) {
    var BOARD_SIZE = 6;

    var DIRECTIONS = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };

    var COLORS = {
      BARRIER: '#6E2C00',
      PLAYER: '#2ECC71',
      BOARD: '#85C1E9'
    };

    var snake = {
      direction: DIRECTIONS.LEFT,
      parts: {
        x: 5,
        y: 4
      }
    };

    var interval, tempDirection;

    $scope.setStyling = function(col, row) {
     
      if ($scope.board[col][row] == -1) {
        return COLORS.BARRIER;
      }
      else if ($scope.board[col][row] == 1) {
        return COLORS.PLAYER;
      }
      return COLORS.BOARD;
    };

    function update() {
      console.log(snake);

      var newHead = getNewHead();
      // Remove tail
      var oldTail = snake.parts;
      console.log(oldTail);
      $scope.board[oldTail.y][oldTail.x] = 0;

      // Pop tail to head
      snake.parts = newHead;
      $scope.board[newHead.y][newHead.x] = 1;

      // Do it again
      snake.direction = tempDirection;

      setupBarriers();
      // $timeout(update, interval);
    }

    function getNewHead() {
      var newHead = angular.copy(snake.parts);
      console.log(newHead);
      // Update Location

      
      if (tempDirection === DIRECTIONS.LEFT && newHead.x > 0 && $scope.board[newHead.y][newHead.x -1] != -1) {
          newHead.x -= 1;
      } else if (tempDirection === DIRECTIONS.RIGHT && newHead.x < (BOARD_SIZE - 1) && $scope.board[newHead.y][newHead.x +1] != -1) {
          newHead.x += 1;
      } else if (tempDirection === DIRECTIONS.UP && newHead.y > 0 && $scope.board[newHead.y - 1][newHead.x] != -1) {
          newHead.y -= 1;
      } else if (tempDirection === DIRECTIONS.DOWN && newHead.y < (BOARD_SIZE - 1) && $scope.board[newHead.y + 1][newHead.x] != -1) {
          newHead.y += 1;
      }
      return newHead;
    }


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
      
      if (e.keyCode == DIRECTIONS.LEFT) {
        tempDirection = DIRECTIONS.LEFT;
        console.log("left");
      } else if (e.keyCode == DIRECTIONS.UP) {
        tempDirection = DIRECTIONS.UP;
        console.log("up");
      } else if (e.keyCode == DIRECTIONS.RIGHT) {
        tempDirection = DIRECTIONS.RIGHT;
      } else if (e.keyCode == DIRECTIONS.DOWN) {
        tempDirection = DIRECTIONS.DOWN;
      }

      $timeout(update, 1000);

    });

    $scope.startGame = function() {
      interval = 1500;
      snake = {direction: DIRECTIONS.LEFT, parts: {}};
      tempDirection = DIRECTIONS.LEFT;

      snake.parts = {x: 5, y: 4};
      console.log("in");

      update();
    };
  });