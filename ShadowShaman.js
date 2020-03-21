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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Shadow Shaman.ts":
/*!******************************!*\
  !*** ./src/Shadow Shaman.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

let shadowshaman = {};
var ShadowShaman;
(function (ShadowShaman) {
    ShadowShaman.BASE_PATH = ['Boost', 'Heroes', 'Intelligence', 'Shadow Shaman'];
    ShadowShaman.HERO_INDEX = 'npc_dota_hero_shadow_shaman';
    ShadowShaman.enable = Menu.AddToggle(ShadowShaman.BASE_PATH, 'Enable Auto Denay Ult', false)
        .OnChange(state => {
        ShadowShaman.enable = state.newValue;
    })
        .GetValue();
    ShadowShaman.particle = null;
    ShadowShaman.gameStart = false;
    let Load;
    (function (Load) {
        function Init() {
            if (GameRules.IsActiveGame()) {
                ShadowShaman.gameStart = true;
                ShadowShaman.myHero = EntitySystem.GetLocalHero();
                ShadowShaman.myPlayer = EntitySystem.GetLocalPlayer();
            }
            if (!ShadowShaman.myHero ||
                !ShadowShaman.myHero.IsExist() ||
                ShadowShaman.myHero.GetUnitName() !== ShadowShaman.HERO_INDEX) {
                ShadowShaman.gameStart = false;
                return;
            }
        }
        Load.Init = Init;
    })(Load = ShadowShaman.Load || (ShadowShaman.Load = {}));
})(ShadowShaman || (ShadowShaman = {}));
shadowshaman.OnUpdate = () => {
    if (ShadowShaman.gameStart && ShadowShaman.enable) {
        let wards = [];
        let lst = EntitySystem.GetNPCsList();
        for (let i of lst) {
            if (i.GetUnitName().indexOf('npc_dota_shadow_shaman_ward') !== -1) {
                wards.push(i);
            }
        }
        for (let ward of wards) {
            if (ward.GetHealth() === 1) {
                let nearWards = EntitySystem.GetNPCsList().filter(npc => npc.GetAbsOrigin().Distance(ward.GetAbsOrigin()) < 1000);
                for (let nearWard of nearWards) {
                    if (nearWard.GetUnitName().indexOf('npc_dota_shadow_shaman_ward') !== -1 && nearWard.GetIndex() !== ward.GetIndex() && nearWard.IsAlive() && ward.IsAlive()) {
                        ShadowShaman.myPlayer.AttackTarget(nearWard, ward);
                        break;
                    }
                }
            }
        }
    }
};
shadowshaman.OnGameEnd = () => {
    ShadowShaman.gameStart = false;
};
shadowshaman.OnScriptLoad = shadowshaman.OnGameStart = ShadowShaman.Load.Init;
RegisterScript(shadowshaman);


/***/ }),

/***/ 7:
/*!************************************!*\
  !*** multi ./src/Shadow Shaman.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\Shadow Shaman.ts */"./src/Shadow Shaman.ts");


/***/ })

/******/ });