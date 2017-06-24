var Ball = (function () {
    function Ball(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        this.dx = 1;
        this.dy = -1;
    }
    Ball.prototype.draw = function (ctx) {
    };
    Ball.prototype.update = function () {
        this.x += this.dx;
        this.y += this.dy;
    };
    return Ball;
}());
var Pong;
(function (Pong) {
    var Player = (function () {
        function Player() {
        }
        Player.prototype.update = function () {
        };
        Player.prototype.draw = function (ctx) {
        };
        return Player;
    }());
    Pong.Player = Player;
})(Pong || (Pong = {}));
var Utils;
(function (Utils) {
    function clearScreen(ctx) {
        var canvas = ctx.canvas;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    Utils.clearScreen = clearScreen;
})(Utils || (Utils = {}));
var FPS = 60;
var Pong;
(function (Pong) {
    var Game = (function () {
        function Game() {
            this.objectsToRender = [];
            this.objectsToRender.push(this.player1);
            this.objectsToRender.push(this.player2);
            this.objectsToRender.push(this.ball);
        }
        Game.prototype.update = function () {
        };
        Game.prototype.draw = function (ctx) {
            // Clear ready for next render
            Utils.clearScreen(ctx);
            // Useful variables
            var _a = ctx.canvas, width = _a.width, height = _a.height;
            // Draw new frame
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);
            this.objectsToRender.forEach(function (object) { return object.draw(ctx); });
        };
        return Game;
    }());
    Pong.Game = Game;
})(Pong || (Pong = {}));
document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext('2d');
    var game = new Pong.Game();
    setInterval(function () {
        game.update();
        game.draw(ctx);
    }, 1000 / FPS);
});
