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

/***/ "./src/stopperBranch.ts":
/*!******************************!*\
  !*** ./src/stopperBranch.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

let stopper = {};
var Stopper;
(function (Stopper) {
    Stopper.BASE_PATH = ['Boost', 'General', 'BranchStopper'];
    Stopper.enable = Menu.AddToggle(Stopper.BASE_PATH, 'Enable Script', false)
        .OnChange(state => {
        Stopper.enable = state.newValue;
    })
        .GetValue();
    Stopper.isEnabledOption = Menu.AddToggle(Stopper.BASE_PATH, 'Enable', false).SetNameLocale('ru', 'Включить');
    Stopper.isEnabledValue = Stopper.isEnabledOption
        .OnChange(state => {
        Stopper.isEnabledValue = state.newValue;
    })
        .GetValue();
    Stopper.frontSmall = Renderer.LoadFont("Arial", 15, Enum.FontWeight.NORMAL);
    Stopper.keyEnable = Menu.AddKeyBind(Stopper.BASE_PATH, 'Enable Stopper', Enum.ButtonCode.KEY_NONE);
    Stopper.xOffset = Menu.AddSlider(Stopper.BASE_PATH, 'X Offset', -1000, 1000, 0, 0.1);
    Stopper.yOffset = Menu.AddSlider(Stopper.BASE_PATH, 'Y Offset', -1000, 1000, 0, 0.1);
    Stopper.handle = null;
    Stopper.gameStart = false;
    let Load;
    (function (Load) {
        function Init() {
            if (GameRules.IsActiveGame()) {
                Stopper.gameStart = true;
                Stopper.myHero = EntitySystem.GetLocalHero();
                Stopper.myPlayer = EntitySystem.GetLocalPlayer();
            }
            if (!Stopper.myHero ||
                !Stopper.myHero.IsExist()) {
                Stopper.gameStart = false;
                return;
            }
        }
        Load.Init = Init;
    })(Load = Stopper.Load || (Stopper.Load = {}));
})(Stopper || (Stopper = {}));
stopper.OnDraw = () => {
    if (Stopper.gameStart && Stopper.isEnabledValue) {
        let [x, y, screen] = Renderer.WorldToScreen(Stopper.myHero.GetAbsOrigin().add(new Vector(0, 0, Stopper.myHero.GetHealthBarOffset())));
        if (screen) {
            Renderer.DrawText(Stopper.frontSmall, x, y, 'Enable');
        }
    }
};
stopper.OnUpdate = () => {
    if (Stopper.gameStart) {
        if (Menu.IsKeyDownOnce(Stopper.keyEnable)) {
            Stopper.isEnabledValue = !Stopper.isEnabledValue;
            Stopper.isEnabledOption.SetValue(Stopper.isEnabledValue);
        }
        if (Stopper.enable && Stopper.isEnabledValue) {
            let enemy = Input.GetNearestHeroToCursor(Enum.TeamType.TEAM_ENEMY);
            let ironwoodtree = Stopper.myHero.GetItem('item_ironwood_tree', false);
            let ironwood = Stopper.myHero.GetItem('item_branches', false);
            if (Engine.OnceAt(0.1) && enemy) {
                let pos = enemy.GetAbsOrigin().add(enemy.GetRotation().GetForward().Normalized().Scaled(50));
                if (ironwoodtree && ironwoodtree.GetCooldown() === 0.0 && ironwoodtree.GetCastRange() >= Stopper.myHero.GetAbsOrigin().Distance(pos))
                    ironwoodtree.CastPosition(pos);
                else if (ironwood && ironwood.GetCastRange() >= Stopper.myHero.GetAbsOrigin().Distance(pos))
                    ironwood.CastPosition(pos);
            }
        }
    }
};
stopper.OnGameEnd = () => {
    Stopper.gameStart = false;
};
stopper.OnScriptLoad = stopper.OnGameStart = Stopper.Load.Init;
RegisterScript(stopper);


/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./src/stopperBranch.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\stopperBranch.ts */"./src/stopperBranch.ts");


/***/ })

/******/ });