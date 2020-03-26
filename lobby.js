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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lobby.ts":
/*!**********************!*\
  !*** ./src/lobby.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

let lobby = {};
let enableKey = Menu.AddToggle(['Boost', 'General', 'LobbyCheats'], 'Cheats', false)
    .OnChange(state => {
    enableKey = state.newValue;
})
    .GetValue();
let godMode = Menu.AddToggle(['Boost', 'General', 'LobbyCheats'], 'God Mode', false)
    .OnChange(state => {
    enableKey = state.newValue;
})
    .GetValue();
let gold = Menu.AddToggle(['Boost', 'General', 'LobbyCheats'], 'Max Gold', false)
    .OnChange(state => {
    enableKey = state.newValue;
})
    .GetValue();
let lvl = Menu.AddToggle(['Boost', 'General', 'LobbyCheats'], 'Max LVL', false)
    .OnChange(state => {
    enableKey = state.newValue;
})
    .GetValue();
let allwision = Menu.AddToggle(['Boost', 'General', 'LobbyCheats'], 'All Vision', false)
    .OnChange(state => {
    enableKey = state.newValue;
})
    .GetValue();
let wtf = Menu.AddToggle(['Boost', 'General', 'LobbyCheats'], 'WTF', false)
    .OnChange(state => {
    enableKey = state.newValue;
})
    .GetValue();
let start = Menu.AddToggle(['Boost', 'General', 'LobbyCheats'], 'Start Game', false)
    .OnChange(state => {
    enableKey = state.newValue;
})
    .GetValue();
let Crip = Menu.AddToggle(['Boost', 'General', 'LobbyCheats'], 'Creeps no spawning', false)
    .OnChange(state => {
    enableKey = state.newValue;
})
    .GetValue();
//let teleport = Menu.AddKeyBind(['Boost', 'General', 'LobbyCheats'], 'Teleport Key', Enum.ButtonCode.KEY_NONE);
let refresh = Menu.AddKeyBind(['Boost', 'General', 'LobbyCheats'], 'Refresh', Enum.ButtonCode.KEY_NONE);
let refreshScipt = Menu.AddKeyBind(['Boost', 'General', 'LobbyCheats'], 'Refresh Script', Enum.ButtonCode.KEY_NONE);
function startgm() {
    if (wtf)
        Engine.ExecuteCommand('dota_ability_debug 1');
    if (allwision)
        Engine.ExecuteCommand('dota_all_vision 1');
    if (Crip)
        Engine.ExecuteCommand('dota_creeps_no_spawning 1');
    if (godMode)
        Engine.ExecuteCommand('dota_hero_god_mode 1');
    if (gold)
        Engine.ExecuteCommand('dota_give_gold 99999');
    if (start)
        Engine.ExecuteCommand('dota_start_game');
    if (lvl)
        Engine.ExecuteCommand('dota_hero_level 300');
}
lobby.OnUpdate = () => {
    if (enableKey) {
        if (Menu.IsKeyDown(refresh))
            Engine.ExecuteCommand('dota_hero_refresh');
        if (Menu.IsKeyDown(refreshScipt)) {
            setTimeout(() => {
                startgm();
            }, 1000);
        }
    }
};
lobby.OnGameStart = () => {
    if (enableKey) {
        startgm();
    }
};
RegisterScript(lobby);


/***/ }),

/***/ 1:
/*!****************************!*\
  !*** multi ./src/lobby.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\lobby.ts */"./src/lobby.ts");


/***/ })

/******/ });