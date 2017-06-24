var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pong;
(function (Pong) {
    var Constants;
    (function (Constants) {
        var Colours;
        (function (Colours) {
            Colours.MENU_BACKGROUND = '#7E8F7C';
            Colours.GAME_BACKGROUND = '#000000';
            Colours.PITCH_COLOUR = '#FFFFFF';
            Colours.TITLE_COLOUR = '#FDF3E7';
            Colours.SCORE_COLOUR = '#FFFFFF';
            Colours.BALL_COLOUR = '#FF0000';
            Colours.PADDLE_COLOUR = '#0000FF';
        })(Colours = Constants.Colours || (Constants.Colours = {}));
        var Text;
        (function (Text) {
            Text.GAME_TITLE = 'Pong!';
            Text.TITLE_SIZE = '60px';
            Text.TITLE_FONT = 'Arial';
            Text.GAME_SUBTITLE = 'Click to play...';
            Text.SUBTITLE_SIZE = '32px';
            Text.SUBTITLE_FONT = 'Arial';
            Text.SCORE_SIZE = '60px';
            Text.SCORE_FONT = 'Arial';
        })(Text = Constants.Text || (Constants.Text = {}));
        var Game;
        (function (Game) {
            // Score needed to win
            Game.WINNING_SCORE = 5;
            // Pixels the players are from the edge
            Game.PLAYER_PADDING = 40;
            // Paddle size
            Game.PADDLE_WIDTH = 10;
            Game.PADDLE_HEIGHT = 50;
            Game.PADDLE_SPEED = 5;
        })(Game = Constants.Game || (Constants.Game = {}));
    })(Constants = Pong.Constants || (Pong.Constants = {}));
})(Pong || (Pong = {}));
var FPS = 60;
// Create the game
document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('game-canvas');
    var ctx = canvas.getContext('2d');
    var game = new Pong.GameEngine(ctx);
    // TODO: Seperate draw and game loops
    setInterval(function () {
        game.update();
        game.draw();
    }, 1000 / FPS);
    canvas.addEventListener('click', function () {
        // game.restart();
    });
});
;
var Utils;
(function (Utils) {
    function clearScreen(ctx) {
        var _a = ctx.canvas, width = _a.width, height = _a.height;
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.closePath();
    }
    Utils.clearScreen = clearScreen;
    function between(x, low, high) {
        return x >= low && x <= high;
    }
    Utils.between = between;
    Utils.KeyCode = {
        ENTER: 13,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40
    };
})(Utils || (Utils = {}));
/// <reference path='../lib/GraphicalElement.ts' />
/// <reference path='../Constants.ts' />
var Pong;
(function (Pong) {
    var Ball = (function () {
        function Ball(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
            this.speed = 2;
            this.size = 8;
            this.destroyed = false;
            this.colour = Pong.Constants.Colours.BALL_COLOUR;
            this.dx = 0;
            this.dy = 0;
            this.startX = x;
            this.startY = y;
            this.start();
        }
        Ball.prototype.isDistroyed = function () {
            return this.destroyed;
        };
        Ball.prototype.draw = function (ctx) {
            if (!this.destroyed) {
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
                ctx.fillStyle = this.colour;
                ctx.fill();
            }
        };
        Ball.prototype.update = function (ctx) {
            var maxX = ctx.canvas.width;
            var maxY = ctx.canvas.height;
            this.x += this.dx * this.speed;
            this.y += this.dy * this.speed;
            if (this.x >= maxX || this.x <= 0) {
                this.destroyed = true;
                this.dx = 0;
                this.dy = 0;
            }
            if (this.y >= maxY || this.y <= 0) {
                this.dy = -this.dy;
            }
        };
        Ball.prototype.start = function () {
            var _this = this;
            this.x = this.startX;
            this.y = this.startY;
            setTimeout(function () {
                _this.dx = 3;
                _this.dy = 2;
                // 5050 chance of direction
                if (Math.random() > 0.5) {
                    _this.dx = -_this.dx;
                }
            }, 2000);
        };
        Ball.prototype.restart = function () {
            this.destroyed = false;
            this.dx = 0;
            this.dy = 0;
            this.start();
        };
        Ball.prototype.hit = function () {
            this.dx = -this.dx;
        };
        return Ball;
    }());
    Pong.Ball = Ball;
})(Pong || (Pong = {}));
/// <reference path='./Ball.ts' />
var Pong;
(function (Pong) {
    var Player = (function () {
        function Player(x, y, ball) {
            this.x = x;
            this.y = y;
            this.ball = ball;
            this.direction = null;
            this.speed = Pong.Constants.Game.PADDLE_SPEED;
            this.colour = Pong.Constants.Colours.PADDLE_COLOUR;
            this.score = 0;
            this.paddleWidth = Pong.Constants.Game.PADDLE_WIDTH;
            this.paddleHeight = Pong.Constants.Game.PADDLE_HEIGHT;
            this.name = 'Unknown Player';
            this.startX = x;
            this.startY = y;
        }
        Player.prototype.getScore = function () {
            return this.score;
        };
        Player.prototype.givePoint = function () {
            this.score += 1;
        };
        Player.prototype.resetScore = function () {
            this.score = 0;
        };
        Player.prototype.update = function (ctx) {
            if (this.direction !== null) {
                switch (this.direction) {
                    case 0 /* UP */:
                        this.y -= this.speed;
                        break;
                    case 1 /* DOWN */:
                        this.y += this.speed;
                }
            }
            var maxY = ctx.canvas.height - this.paddleHeight;
            if (this.y < 0) {
                this.y = 0;
            }
            else if (this.y > maxY) {
                this.y = maxY;
            }
            if (Utils.between(this.ball.y, this.y, this.y + this.paddleHeight)
                && Utils.between(this.ball.x, this.x, this.x + this.paddleWidth)) {
                this.ball.hit();
            }
        };
        Player.prototype.draw = function (ctx) {
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.x, this.y, this.paddleWidth, this.paddleHeight);
        };
        return Player;
    }());
    Pong.Player = Player;
})(Pong || (Pong = {}));
/// <reference path='./Player.ts' />
/// <reference path='../lib/Direction.ts' />
var Pong;
(function (Pong) {
    var ComputerPlayer = (function (_super) {
        __extends(ComputerPlayer, _super);
        function ComputerPlayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ComputerPlayer.prototype.update = function (ctx) {
            _super.prototype.update.call(this, ctx);
            // Just follow the direction of the ball
            if (this.ball.y < this.y) {
                this.direction = 0 /* UP */;
            }
            else {
                this.direction = 1 /* DOWN */;
            }
            // If the ball is going away from the player
            // (Assuming the AI is on the right). Maybe improve?
            if (this.ball.dx <= 0) {
                console.log('dx', this.ball.dx);
                console.log('y', this.y, this.startY);
                // Return to starting position
                if (this.y < this.startY) {
                    this.direction = 1 /* DOWN */;
                }
                else if (this.y < this.startY) {
                    this.direction = 0 /* UP */;
                }
            }
            console.log('Dir', this.direction.toString());
        };
        return ComputerPlayer;
    }(Pong.Player));
    Pong.ComputerPlayer = ComputerPlayer;
})(Pong || (Pong = {}));
/// <reference path='./Ball.ts' />
/// <reference path='./Player.ts' />
/// <reference path='../lib/Utils.ts' />
/// <reference path='../lib/Direction.ts' />
var Pong;
(function (Pong) {
    var HumanPlayer = (function (_super) {
        __extends(HumanPlayer, _super);
        function HumanPlayer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.handleKeydown = function (evt) {
                switch (evt.keyCode) {
                    case Utils.KeyCode.UP_ARROW:
                        _this.direction = 0 /* UP */;
                        break;
                    case Utils.KeyCode.DOWN_ARROW:
                        _this.direction = 1 /* DOWN */;
                        break;
                    default:
                        _this.direction = null;
                }
            };
            _this.handleKeyup = function (_) {
                _this.direction = null;
            };
            return _this;
        }
        HumanPlayer.prototype.bind = function () {
            window.addEventListener('keydown', this.handleKeydown);
            window.addEventListener('keyup', this.handleKeyup);
        };
        HumanPlayer.prototype.unbind = function () {
            window.removeEventListener('keydown', this.handleKeydown);
            window.removeEventListener('keyup', this.handleKeyup);
        };
        return HumanPlayer;
    }(Pong.Player));
    Pong.HumanPlayer = HumanPlayer;
})(Pong || (Pong = {}));
/// <reference path='../objects/HumanPlayer.ts' />
/// <reference path='./GameEngine.ts' />
var Pong;
(function (Pong) {
    var Scene = (function () {
        function Scene(ctx) {
            this.ctx = ctx;
        }
        // Optionally implement
        // Can optionally be given parameters
        Scene.prototype.load = function (params) { };
        Scene.prototype.unload = function () { };
        Scene.prototype.setGameContext = function (game) {
            this.gameContext = game;
        };
        return Scene;
    }());
    Pong.Scene = Scene;
})(Pong || (Pong = {}));
/// <reference path='../lib/Scene.ts' />
/// <reference path='./MainScene.ts' />
var Pong;
(function (Pong) {
    var EndScene = (function (_super) {
        __extends(EndScene, _super);
        function EndScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Bounds 'this' to the class
            _this.handleClick = function (evt) {
                _this.gameContext.loadScene(new Pong.MenuScene(_this.ctx));
            };
            return _this;
        }
        EndScene.prototype.draw = function () {
            var ctx = this.ctx;
            var _a = ctx.canvas, width = _a.width, height = _a.height;
            // Draw background
            ctx.fillStyle = '#7E8F7C';
            ctx.fillRect(0, 0, width, height);
            // == Draw text
            // Draw title
            var title = 'Game Over! - ' + this.winner.name;
            ctx.font = "60px Arial";
            ctx.fillStyle = '#FDF3E7';
            ctx.textAlign = 'center';
            ctx.fillText(title, width / 2, height / 2);
            // Draw title
            var subtitle = 'Click to go to main menu.';
            ctx.font = "24px Arial";
            ctx.textAlign = 'center';
            ctx.fillText(subtitle, width / 2, (height / 2) + 60);
        };
        EndScene.prototype.update = function () {
        };
        EndScene.prototype.load = function (params) {
            this.winner = params.winner;
            this.ctx.canvas.addEventListener('click', this.handleClick);
        };
        EndScene.prototype.unload = function () {
            this.ctx.canvas.removeEventListener('click', this.handleClick);
        };
        return EndScene;
    }(Pong.Scene));
    Pong.EndScene = EndScene;
})(Pong || (Pong = {}));
/// <reference path='../lib/Scene.ts' />
/// <reference path='./EndScene.ts' />
/// <reference path='../objects/Player.ts' />
/// <reference path='../objects/Ball.ts' />
/// <reference path='../objects/HumanPlayer.ts' />
/// <reference path='../objects/ComputerPlayer.ts' />
var Pong;
(function (Pong) {
    var MainScene = (function (_super) {
        __extends(MainScene, _super);
        function MainScene(ctx) {
            var _this = _super.call(this, ctx) || this;
            _this.playerPadding = Pong.Constants.Game.PLAYER_PADDING;
            _this.winningScore = Pong.Constants.Game.WINNING_SCORE;
            _this.objectsInScene = [];
            var _a = ctx.canvas, width = _a.width, height = _a.height;
            var centerH = width / 2;
            var centerV = height / 2;
            // Position objects
            _this.ball = new Pong.Ball(centerH, centerV);
            _this.player1 = new Pong.HumanPlayer(_this.playerPadding, centerV, _this.ball);
            var player2Offset = ctx.canvas.width
                - (_this.playerPadding + _this.player1.paddleWidth);
            _this.player2 = new Pong.ComputerPlayer(player2Offset, centerV, _this.ball);
            _this.objectsInScene.push(_this.player1);
            _this.objectsInScene.push(_this.player2);
            _this.objectsInScene.push(_this.ball);
            return _this;
        }
        MainScene.prototype.drawBackground = function (ctx) {
            // Useful variables
            var _a = ctx.canvas, width = _a.width, height = _a.height;
            var middle = ctx.canvas.width / 2;
            // Draw background
            ctx.fillStyle = Pong.Constants.Colours.GAME_BACKGROUND;
            ctx.fillRect(0, 0, width, height);
            // Draw pitch
            ctx.beginPath();
            ctx.strokeStyle = Pong.Constants.Colours.PITCH_COLOUR;
            ctx.setLineDash([5, 15]);
            ctx.moveTo(middle, 0);
            ctx.lineTo(middle, ctx.canvas.height);
            ctx.stroke();
            ctx.closePath();
        };
        MainScene.prototype.drawScores = function (ctx) {
            // Useful variables
            var _a = ctx.canvas, width = _a.width, height = _a.height;
            ctx.font = Pong.Constants.Text.SCORE_SIZE + " " + Pong.Constants.Text.SCORE_FONT;
            ctx.fillStyle = Pong.Constants.Colours.SCORE_COLOUR;
            ctx.fillText(this.player1.getScore().toString(), width / 4, height / 2);
            ctx.fillText(this.player2.getScore().toString(), 3 * (width / 4), height / 2);
        };
        MainScene.prototype.draw = function () {
            var _this = this;
            var ctx = this.ctx;
            this.drawBackground(ctx);
            this.drawScores(ctx);
            this.objectsInScene.forEach(function (object) { return object.draw(_this.ctx); });
        };
        MainScene.prototype.load = function () {
            this.player1.bind();
        };
        MainScene.prototype.unload = function () {
            this.player1.unbind();
        };
        MainScene.prototype.update = function () {
            var _this = this;
            if (this.ball.isDistroyed()) {
                if (this.ball.x <= 0) {
                    this.player2.givePoint();
                }
                else {
                    this.player1.givePoint();
                }
                this.ball.restart();
            }
            if (this.player1.getScore() >= this.winningScore) {
                this.gameContext.loadScene(new Pong.EndScene(this.ctx), { winner: this.player1 });
            }
            else if (this.player2.getScore() >= this.winningScore) {
                this.gameContext.loadScene(new Pong.EndScene(this.ctx), { winner: this.player2 });
            }
            else {
                // Draw remaining objects
                this.objectsInScene.forEach(function (object) { return object.update(_this.ctx); });
            }
        };
        MainScene.prototype.restart = function () {
            this.player1.resetScore();
            this.player2.resetScore();
            this.ball.restart();
        };
        return MainScene;
    }(Pong.Scene));
    Pong.MainScene = MainScene;
})(Pong || (Pong = {}));
/// <reference path='../lib/Scene.ts' />
/// <reference path='./MainScene.ts' />
/// <reference path='../Constants.ts' />
var Pong;
(function (Pong) {
    var MenuScene = (function (_super) {
        __extends(MenuScene, _super);
        function MenuScene() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // Bounds 'this' to the class
            _this.handleClick = function (evt) {
                _this.gameContext.loadScene(new Pong.MainScene(_this.ctx));
            };
            return _this;
        }
        MenuScene.prototype.draw = function () {
            var ctx = this.ctx;
            var _a = ctx.canvas, width = _a.width, height = _a.height;
            // Draw background
            ctx.fillStyle = Pong.Constants.Colours.MENU_BACKGROUND;
            ctx.fillRect(0, 0, width, height);
            // == Draw text
            // Draw title
            var title = Pong.Constants.Text.GAME_TITLE;
            ctx.font = Pong.Constants.Text.TITLE_SIZE + " " + Pong.Constants.Text.TITLE_FONT;
            ctx.fillStyle = Pong.Constants.Colours.TITLE_COLOUR;
            ctx.textAlign = 'center';
            ctx.fillText(title, width / 2, height / 2);
            // Draw title
            var subtitle = Pong.Constants.Text.GAME_SUBTITLE;
            ctx.font = Pong.Constants.Text.SUBTITLE_SIZE + " " + Pong.Constants.Text.SUBTITLE_FONT;
            ctx.textAlign = 'center';
            ctx.fillText(subtitle, width / 2, (height / 2) + 60);
        };
        MenuScene.prototype.update = function () {
        };
        MenuScene.prototype.load = function () {
            this.ctx.canvas.addEventListener('click', this.handleClick);
        };
        MenuScene.prototype.unload = function () {
            this.ctx.canvas.removeEventListener('click', this.handleClick);
        };
        return MenuScene;
    }(Pong.Scene));
    Pong.MenuScene = MenuScene;
})(Pong || (Pong = {}));
/// <reference path='../lib/Utils.ts' />
/// <reference path='../objects/Ball.ts' />
/// <reference path='../objects/ComputerPlayer.ts' />
/// <reference path='../objects/HumanPlayer.ts' />
/// <reference path='./Scene.ts' />
/// <reference path='../scenes/MenuScene.ts' />
var Pong;
(function (Pong) {
    var GameEngine = (function () {
        function GameEngine(ctx) {
            this.ctx = ctx;
            var menu = new Pong.MenuScene(ctx);
            this.loadScene(menu);
        }
        GameEngine.prototype.draw = function () {
            // Clear ready for next render
            Utils.clearScreen(this.ctx);
            this.scene.draw();
        };
        GameEngine.prototype.update = function () {
            this.scene.update();
        };
        GameEngine.prototype.loadScene = function (newScene, params) {
            // If a scene has been loaded already, unload it
            if (this.scene) {
                this.scene.unload();
            }
            this.scene = newScene;
            this.scene.setGameContext(this);
            if (params === undefined) {
                params = {};
            }
            this.scene.load(params);
        };
        return GameEngine;
    }());
    Pong.GameEngine = GameEngine;
})(Pong || (Pong = {}));
