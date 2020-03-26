/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/games/Snake.ts":
/*!****************************!*\
  !*** ./src/games/Snake.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

let snake = {};
var Snake;
(function (Snake) {
    Snake.BASE_PATH = ['Boost', 'Minigame\'s', 'Snake'];
    Menu.SetImage(['Boost'], '~/logo.png');
    Snake.isEnabledOption = Menu.AddToggle(Snake.BASE_PATH, 'Enable', false).SetNameLocale('ru', 'Включить');
    Snake.isEnabledValue = Snake.isEnabledOption
        .OnChange(state => {
        Snake.isEnabledValue = state.newValue;
    })
        .GetValue();
    Snake.pauseKey = Menu.AddKeyBind(Snake.BASE_PATH, 'Enable/Disable', Enum.ButtonCode.KEY_NONE);
    Snake.speedSnake = 0.15;
    Snake.speedMenu = Menu.AddSlider(Snake.BASE_PATH, 'Speed', 0.05, 1, 0.15, 0.05)
        .OnChange(state => Snake.speedSnake = state.newValue)
        .GetValue();
    Snake.startGame = Menu.AddKeyBind(Snake.BASE_PATH, 'start game key', Enum.ButtonCode.KEY_NONE);
    Snake.font = Renderer.LoadFont('Arial', 50, Enum.FontWeight.NORMAL);
    Snake.directionDictionary = new Map();
    Snake.directionDictionary.set("Down", [1, 0]);
    Snake.directionDictionary.set("Up", [-1, 0]);
    Snake.directionDictionary.set("Left", [0, -1]);
    Snake.directionDictionary.set("Right", [0, 1]);
    Snake.direction = Snake.directionDictionary.get('Right');
    Snake.changeHeadOnetime = false;
    Snake.windowWidth = 0;
    Snake.windowHeight = 0;
    Snake.clickedPlaySnake = false;
    Snake.lose = false;
    Snake.snakeLen = 3;
    Snake.randomApplePos = [0, 0];
    Snake.windowPowerHeight = 0.0;
    Snake.windowPowerWidth = 0.0;
    Snake.snakeMatrix = [];
    Snake.lenMatrixW = 16;
    Snake.lenMatrixH = 16;
    Snake.lastDirection = Snake.directionDictionary.get('Right');
    Snake.secondSnakeCell = [0, 0];
    Snake.apple = Renderer.LoadImage('~/apple.png');
    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
    Snake.randomInteger = randomInteger;
    function generateMatrix() {
        Snake.snakeMatrix = [];
        for (let i = 0; i < 16; i++) {
            Snake.snakeMatrix.push([]);
            for (let j = 0; j < 16; j++) {
                Snake.snakeMatrix[i].push(0);
            }
        }
    }
    Snake.generateMatrix = generateMatrix;
})(Snake || (Snake = {}));
snake.OnScriptLoad = () => {
    [Snake.windowHeight, Snake.windowWidth] = Renderer.GetScreenSize();
    Snake.windowPowerHeight = Snake.windowHeight / 1920;
    Snake.windowPowerWidth = Snake.windowPowerWidth / 1080;
};
snake.OnDraw = () => {
    Renderer.SetTopMost(true);
    if (Menu.IsKeyDownOnce(Snake.pauseKey)) {
        Snake.isEnabledValue = !Snake.isEnabledValue;
        Snake.isEnabledOption.SetValue(!Snake.isEnabledOption.GetValue());
    }
    if (Snake.isEnabledValue) {
        if (Input.IsKeyDown(Enum.ButtonCode.KEY_UP, false) && Snake.direction !== Snake.directionDictionary.get("Down")) {
            Snake.direction = Snake.directionDictionary.get('Up');
        }
        else if (Input.IsKeyDown(Enum.ButtonCode.KEY_DOWN, false) && Snake.direction !== Snake.directionDictionary.get("Up")) {
            Snake.direction = Snake.directionDictionary.get('Down');
        }
        else if (Input.IsKeyDown(Enum.ButtonCode.KEY_LEFT, false) && Snake.direction !== Snake.directionDictionary.get("Right")) {
            Snake.direction = Snake.directionDictionary.get("Left");
        }
        else if (Input.IsKeyDown(Enum.ButtonCode.KEY_RIGHT, false) && Snake.direction !== Snake.directionDictionary.get('Left')) {
            Snake.direction = Snake.directionDictionary.get("Right");
        }
        if (Menu.IsKeyDownOnce(Snake.startGame)) {
            Snake.clickedPlaySnake = true;
            Snake.lose = false;
            Snake.generateMatrix();
            Snake.snakeMatrix[0][0] = 1;
            Snake.snakeMatrix[0][1] = -1;
            Snake.snakeLen = 3;
            Snake.direction = Snake.directionDictionary.get("Right");
        }
        Snake.changeHeadOnetime = false;
        if (Engine.OnceAt(Snake.speedSnake) && !Snake.lose && Snake.clickedPlaySnake) {
            Snake.lastDirection = Snake.direction;
            for (let i = 0; i < Snake.lenMatrixH; i++) {
                for (let j = 0; j < Snake.lenMatrixW; j++) {
                    if (Snake.snakeMatrix[i][j] > 1) {
                        Snake.snakeMatrix[i][j] += 1;
                    }
                    if (Snake.snakeMatrix[i][j] === 1 && !Snake.changeHeadOnetime) {
                        Snake.snakeMatrix[i][j] += 1;
                        let nextSnakePosI = (i + Snake.direction[0]) % Snake.lenMatrixH;
                        let nextSnakePosJ = (j + Snake.direction[1]) % Snake.lenMatrixW;
                        if (i + Snake.direction[0] < 0) {
                            nextSnakePosI = Snake.lenMatrixH - 1;
                        }
                        else if (j + Snake.direction[1] < 0) {
                            nextSnakePosJ = Snake.lenMatrixW - 1;
                        }
                        if (Snake.snakeMatrix[nextSnakePosI][nextSnakePosJ] == -1) {
                            Snake.snakeLen += 1;
                            Snake.randomApplePos[0] = Snake.randomInteger(0, Snake.lenMatrixH - 1);
                            Snake.randomApplePos[1] = Snake.randomInteger(0, Snake.lenMatrixW - 1);
                            while (Snake.snakeMatrix[Snake.randomApplePos[0]][Snake.randomApplePos[1]] !== 0) {
                                Snake.randomApplePos[0] = Snake.randomInteger(0, 15);
                                Snake.randomApplePos[0] = Snake.randomInteger(0, 15);
                            }
                            Snake.snakeMatrix[Snake.randomApplePos[0]][Snake.randomApplePos[1]] = -1;
                        }
                        else if (Snake.snakeMatrix[nextSnakePosI][nextSnakePosJ] !== 0) {
                            Snake.clickedPlaySnake = false;
                            Snake.lose = true;
                        }
                        Snake.snakeMatrix[nextSnakePosI][nextSnakePosJ] = 1;
                        Snake.changeHeadOnetime = true;
                    }
                }
            }
        }
    }
    if (Snake.isEnabledValue) {
        if (Snake.lose) {
            Renderer.DrawText(Snake.font, Snake.windowHeight / 2 - 340, Snake.windowWidth / 2 - 200, "You lose");
            Renderer.DrawText(Snake.font, Snake.windowHeight / 2 - 340, Snake.windowWidth / 2 - 100, `Your Score: ${Snake.snakeLen - 3}`);
        }
        else if (Snake.clickedPlaySnake && !Snake.lose) {
            Renderer.SetDrawColor(255, 255, 255, 255);
            //            Renderer.DrawText(Snake.font, Snake.windowHeight / 2 - 150, Snake.windowWidth / 2 - 500, `Score: ${Snake.snakeLen - 3}`);
            Renderer.SetDrawColor(125, 176, 97, 255);
            Renderer.DrawFilledRect(Snake.windowHeight / 2 - 304, Snake.windowWidth / 2 - 304, 608, 608);
            Renderer.SetDrawColor(86, 127, 64, 255);
            for (let i = 0; i <= 3; i++) {
                Renderer.DrawOutlineRect(Snake.windowHeight / 2 - (304 + i), Snake.windowWidth / 2 - (304 + i), 608, 608);
                Renderer.DrawOutlineRect(Snake.windowHeight / 2 - (304 - i), Snake.windowWidth / 2 - (304 - i), 608, 608);
            }
            Renderer.SetDrawColor(255, 255, 255, 255);
            for (let i = 0; i < Snake.lenMatrixH; i++) {
                for (let j = 0; j < Snake.lenMatrixW; j++) {
                    if (Snake.snakeMatrix[i][j] === Snake.snakeLen) {
                        Snake.snakeMatrix[i][j] = 0;
                    }
                    if (Snake.snakeMatrix[i][j] === 0) {
                        Renderer.SetDrawColor(255, 255, 255, 0);
                        Renderer.DrawOutlineRect(Snake.windowHeight / 2 - 304 + (j * 38), Snake.windowWidth / 2 - 304 + (i * 38), 38, 38);
                    }
                    else if (Snake.snakeMatrix[i][j] == 1) {
                        Renderer.SetDrawColor(72, 68, 73, 255);
                        Renderer.DrawFilledRect(Snake.windowHeight / 2 - 304 + (j * 38), Snake.windowWidth / 2 - 304 + (i * 38), 38, 38);
                        Renderer.SetDrawColor(255, 255, 255, 255);
                    }
                    else if (Snake.snakeMatrix[i][j] > 0 && Snake.snakeMatrix[i][j] !== -1) {
                        if (Snake.snakeMatrix[i][j] == 2) {
                            Snake.secondSnakeCell[0] = i;
                            Snake.secondSnakeCell[1] = j;
                        }
                        Renderer.SetDrawColor(54, 47, 52, 255 - (1 * Snake.snakeMatrix[i][j]));
                        Renderer.DrawFilledRect(Snake.windowHeight / 2 - 304 + (j * 38), Snake.windowWidth / 2 - 304 + (i * 38), 38, 38);
                    }
                    if (Snake.snakeMatrix[i][j] === -1) {
                        Renderer.SetDrawColor(255, 255, 255, 255);
                        Renderer.DrawImage(Snake.apple, Snake.windowHeight / 2 - 304 + (j * 38), Snake.windowWidth / 2 - 304 + (i * 38), 38, 38);
                        Renderer.SetDrawColor(255, 255, 255, 255);
                    }
                }
            }
        }
    }
    else {
        // Renderer.SetTopMost(false);
    }
};
RegisterScript(snake);


/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./src/games/Snake.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\games\Snake.ts */"./src/games/Snake.ts");


/***/ })

/******/ });