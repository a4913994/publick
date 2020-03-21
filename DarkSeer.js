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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DarkSeer.ts":
/*!*************************!*\
  !*** ./src/DarkSeer.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

let darkseer = {};
var DarkSeer;
(function (DarkSeer) {
    DarkSeer.BASE_PATH = ['Boost', 'Heroes', 'Intelligence', 'Dark Seer'];
    DarkSeer.HERO_NAME = 'npc_dota_hero_dark_seer';
    DarkSeer.combo = Menu.AddToggle(DarkSeer.BASE_PATH, 'Combo Kent', false)
        .OnChange(state => {
        DarkSeer.combo = state.newValue;
    })
        .GetValue();
    DarkSeer.comboKey = Menu.AddKeyBind(DarkSeer.BASE_PATH, 'Combo key', Enum.ButtonCode.KEY_NONE);
    DarkSeer.movetodark = Menu.AddToggle(DarkSeer.BASE_PATH, 'Move DarkSeer always', false)
        .OnChange(state => {
        DarkSeer.movetodark = state.newValue;
    })
        .GetValue();
    DarkSeer.particle = null;
    DarkSeer.gameStart = false;
    let Load;
    (function (Load) {
        function Init() {
            if (GameRules.IsActiveGame()) {
                DarkSeer.gameStart = true;
                DarkSeer.myHero = EntitySystem.GetLocalHero();
                DarkSeer.myPlayer = EntitySystem.GetLocalPlayer();
            }
            if (!DarkSeer.myHero ||
                !DarkSeer.myHero.IsExist() ||
                DarkSeer.myHero.GetUnitName() !== DarkSeer.HERO_NAME) {
                DarkSeer.gameStart = false;
                return;
            }
        }
        Load.Init = Init;
    })(Load = DarkSeer.Load || (DarkSeer.Load = {}));
})(DarkSeer || (DarkSeer = {}));
darkseer.OnUpdate = () => {
    if (DarkSeer.combo && DarkSeer.gameStart) {
        let creeps = EntitySystem.GetNPCsList().filter(npc => npc.IsCreep());
        let myCreep = null;
        for (let creep of creeps) {
            let owner = creep.GetOwner();
            // console.log(owner && owner.GetIndex() == DarkSeer.myPlayer.GetIndex() && creep.GetUnitName() === 'npc_dota_neutral_centaur_khan');
            if (owner && owner.GetIndex() == DarkSeer.myHero.GetIndex() && creep.GetUnitName() === 'npc_dota_neutral_centaur_khan') {
                myCreep = creep;
                break;
            }
        }
        if (myCreep) {
            if (DarkSeer.movetodark && !Menu.IsKeyDown(DarkSeer.comboKey)) {
                if (Engine.OnceAt(0.1)) {
                    myCreep.MoveTo(DarkSeer.myHero.GetAbsOrigin());
                }
            }
            if (Menu.IsKeyDown(DarkSeer.comboKey)) {
                let vacuum = DarkSeer.myHero.GetAbilityByIndex(0);
                if (vacuum && vacuum.GetCooldown() === 0.0 && myCreep.GetMana() >= myCreep.GetAbilityByIndex(0).GetManaCost() && myCreep.GetAbilityByIndex(0).GetCooldown() === 0.0 && DarkSeer.myHero.GetMana() >= vacuum.GetManaCost()) {
                    let pos = Input.GetWorldCursorPos();
                    myCreep.MoveTo(pos);
                    vacuum.CastPosition(pos);
                    setTimeout(() => {
                        if (myCreep.GetAbsOrigin().Distance(pos) < 100) {
                            // DarkSeer.myPlayer.HoldPosition(myCreep);
                            myCreep.GetAbilityByIndex(0).CastNoTarget();
                        }
                    }, 300 + (100 * DarkSeer.myHero.GetAbilityByIndex(0).GetLevel()));
                }
                // let enemes = myCreep.GetHeroesInRadius(300  , Enum.TeamType.TEAM_ENEMY);
                // if (enemes.length > 0) {
                //     myCreep.GetAbilityByIndex(0).CastNoTarget();
                // }
            }
        }
    }
};
darkseer.OnGameEnd = () => {
    DarkSeer.gameStart = false;
};
darkseer.OnScriptLoad = darkseer.OnGameStart = DarkSeer.Load.Init;
RegisterScript(darkseer);


/***/ }),

/***/ 5:
/*!*******************************!*\
  !*** multi ./src/DarkSeer.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\DarkSeer.ts */"./src/DarkSeer.ts");


/***/ })

/******/ });