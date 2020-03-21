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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AutoEscape.ts":
/*!***************************!*\
  !*** ./src/AutoEscape.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

let autoescape = {};
var AutoEscape;
(function (AutoEscape) {
    var _a;
    AutoEscape.BASE_PATH = ['Boost', 'General', 'AutoEscape(Semi-working)'];
    AutoEscape.ORDER_TIME = 0.1;
    AutoEscape.EnableScript = false;
    AutoEscape.EnableScriptMenu = Menu.AddToggle(AutoEscape.BASE_PATH, 'EnableScript', false)
        .OnChange(state => {
        AutoEscape.EnableScript = state.newValue;
    });
    AutoEscape.AutoEscapeEnable = false;
    AutoEscape.autoEscapeMenu = Menu.AddToggle(AutoEscape.BASE_PATH, 'AutoEscape', false)
        .OnChange(state => {
        AutoEscape.AutoEscapeEnable = state.newValue;
    });
    AutoEscape.keyAutoEscape = Menu.AddKeyBind(AutoEscape.BASE_PATH, 'Enable/Disable key', Enum.ButtonCode.BUTTON_CODE_NONE);
    AutoEscape.radiusHero = 1200;
    AutoEscape.radiusHeroSlider = Menu.AddSlider(AutoEscape.BASE_PATH, 'Поиск врага в радиусе', 100, 1200, 1000, 10)
        .OnChange(state => {
        AutoEscape.radiusHero = state.newValue;
    });
    AutoEscape.radiusDraw = Menu.AddToggle(AutoEscape.BASE_PATH, 'Draw radius around enemy', false)
        .OnChange(state => {
        AutoEscape.radiusDraw = state.newValue;
    })
        .GetValue();
    AutoEscape.xOffset = Menu.AddSlider(AutoEscape.BASE_PATH, 'X offset', -1500, 1500, 0, 1)
        .OnChange(state => {
        AutoEscape.xOffset = state.newValue;
    })
        .GetValue();
    AutoEscape.yOffset = Menu.AddSlider(AutoEscape.BASE_PATH, 'Y offset', -1500, 1500, 0, 1)
        .OnChange(state => {
        AutoEscape.yOffset = state.newValue;
    })
        .GetValue();
    AutoEscape.frontSmall = Renderer.LoadFont("Arial", 25, Enum.FontWeight.NORMAL);
    AutoEscape.frontBig = Renderer.LoadFont("Arial", 100, Enum.FontWeight.NORMAL);
    AutoEscape.gameStart = false;
    _a = [1920, 1080], AutoEscape.x = _a[0], AutoEscape.y = _a[1];
    let Load;
    (function (Load) {
        function Init() {
            if (GameRules.IsActiveGame())
                AutoEscape.gameStart = true;
            AutoEscape.myHero = EntitySystem.GetLocalHero();
            if (!AutoEscape.myHero ||
                !AutoEscape.myHero.IsExist()) {
                AutoEscape.gameStart = false;
                return;
            }
        }
        Load.Init = Init;
        function DrawCircle(position, radius, sidesCount) {
            let pos = position;
            let angle = 360 / sidesCount;
            for (let i = 0; i <= 360 / angle; i++) {
                let posVec = position.add(new Vector(0, radius, 0).Rotated(angle * i));
                if (i !== 0 && AutoEscape.radiusDraw) {
                    Renderer.DrawWorldLine(pos, posVec);
                }
                pos = posVec;
            }
        }
        Load.DrawCircle = DrawCircle;
        function drawFunck(state) {
            if (state) {
                Renderer.SetDrawColor(102, 255, 0, 255, 1000);
                Renderer.DrawText(AutoEscape.frontSmall, AutoEscape.x / 5 + AutoEscape.xOffset, AutoEscape.y / 20 + AutoEscape.yOffset, 'AutoEscape - On');
            }
            else {
                Renderer.SetDrawColor(210, 31, 60, 255, 1000);
                Renderer.DrawText(AutoEscape.frontSmall, AutoEscape.x / 5 + AutoEscape.xOffset, AutoEscape.y / 20 + AutoEscape.yOffset, 'AutoEscape - Off');
            }
        }
        Load.drawFunck = drawFunck;
    })(Load = AutoEscape.Load || (AutoEscape.Load = {}));
})(AutoEscape || (AutoEscape = {}));
autoescape.OnDraw = () => {
    if (AutoEscape.gameStart && AutoEscape.EnableScript) {
        AutoEscape.Load.drawFunck(AutoEscape.AutoEscapeEnable);
    }
};
autoescape.OnUpdate = () => {
    if (AutoEscape.EnableScript && AutoEscape.gameStart) {
        if (Menu.IsKeyDownOnce(AutoEscape.keyAutoEscape)) {
            AutoEscape.AutoEscapeEnable = !AutoEscape.AutoEscapeEnable;
        }
        let heroes = AutoEscape.myHero.GetHeroesInRadius(2000, Enum.TeamType.TEAM_ENEMY);
        for (let i of heroes) {
            let abs = i.GetAbsOrigin();
            let circlePos = new Vector(abs.x, abs.y, Engine.GetGroundZ(abs));
            let circleRange = AutoEscape.radiusHero;
            let myHeroPos = EntitySystem.GetLocalHero().GetAbsOrigin();
            Renderer.SetDrawColor(255, 255, 255, 255);
            AutoEscape.Load.DrawCircle(circlePos, circleRange, 20);
            let diffVec = myHeroPos.sub(circlePos);
            diffVec.z = 0;
            if (circleRange - diffVec.Length2D() > 0) {
                let tmpVec = diffVec.Normalized().Scaled(circleRange - diffVec.Length2D());
                let moveto = myHeroPos.add(tmpVec);
                if (Engine.OnceAt(0.1) && AutoEscape.AutoEscapeEnable) {
                    let item = AutoEscape.myHero.GetItem('item_blink', true);
                    if (item && AutoEscape.myHero.GetAbsOrigin().Distance(moveto) > 400 && item.GetCooldown() === 0.0) {
                        item.CastPosition(moveto);
                    }
                    else {
                        AutoEscape.myHero.MoveTo(moveto);
                    }
                }
                Renderer.DrawWorldLine(moveto, myHeroPos);
            }
        }
    }
};
autoescape.OnScriptLoad = () => {
    [AutoEscape.x, AutoEscape.y] = Renderer.GetScreenSize();
};
autoescape.OnGameEnd = () => {
    AutoEscape.gameStart = false;
};
autoescape.OnScriptLoad = autoescape.OnGameStart = AutoEscape.Load.Init;
RegisterScript(autoescape);


/***/ }),

/***/ 2:
/*!*********************************!*\
  !*** multi ./src/AutoEscape.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\AutoEscape.ts */"./src/AutoEscape.ts");


/***/ })

/******/ });