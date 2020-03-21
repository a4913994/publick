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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/enemyRadius.ts":
/*!****************************!*\
  !*** ./src/enemyRadius.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = __webpack_require__(/*! ./lib */ "./src/lib.ts");
let radiusSpell = {};
var RadiusSpell;
(function (RadiusSpell) {
    RadiusSpell.BASE_PATH = ['Boost', 'General', 'RadiusSpell'];
    RadiusSpell.enable = Menu.AddToggle(RadiusSpell.BASE_PATH, 'Enable', false)
        .OnChange(state => {
        RadiusSpell.enable = state.newValue;
    })
        .GetValue();
    RadiusSpell.abilitys = [
        'axe_berserkers_call',
        'batrider_flamebreak',
        'brewmaster_thunder_clap',
        'centaur_hoof_stomp',
        'dark_willow_bramble_maze',
        'enigma_black_hole',
        'abyssal_underlord_pit_of_malice',
        'undying_decay',
    ];
    RadiusSpell.radiuses = [
        300,
        500,
        400,
        315,
        500,
        420,
        400,
        325
    ];
    RadiusSpell.particles = [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
    ];
    RadiusSpell.abilityesEnable = [];
    for (let i = 0; i < RadiusSpell.abilitys.length; i++) {
        RadiusSpell.abilityesEnable.push(true);
    }
    RadiusSpell.abilitysMenu = Menu.AddMultiSelect(RadiusSpell.BASE_PATH, 'Abilityes', lib_1.getIconSpellArray(RadiusSpell.abilitys), RadiusSpell.abilityesEnable)
        .OnChange(state => {
        RadiusSpell.abilitysMenu = state.newValue;
    })
        .GetValue();
    RadiusSpell.handle = null;
    RadiusSpell.gameStart = false;
    let Load;
    (function (Load) {
        function Init() {
            if (GameRules.IsActiveGame()) {
                RadiusSpell.gameStart = true;
                RadiusSpell.myHero = EntitySystem.GetLocalHero();
                RadiusSpell.myPlayer = EntitySystem.GetLocalPlayer();
            }
            if (!RadiusSpell.myHero ||
                !RadiusSpell.myHero.IsExist()) {
                RadiusSpell.gameStart = false;
                return;
            }
        }
        Load.Init = Init;
    })(Load = RadiusSpell.Load || (RadiusSpell.Load = {}));
})(RadiusSpell || (RadiusSpell = {}));
radiusSpell.OnUpdate = () => {
    if (RadiusSpell.enable && RadiusSpell.gameStart) {
        for (let i = 0; i < RadiusSpell.abilitysMenu.length; i++) {
            if (RadiusSpell.abilitysMenu[i]) {
                RadiusSpell.particles[i] = Particle.CreateCircle(null, RadiusSpell.myHero.GetAbsOrigin(), RadiusSpell.radiuses[i] * 2 + 100);
            }
            else {
                RadiusSpell.particles[i] = undefined;
            }
        }
        for (let i of RadiusSpell.particles) {
            if (i) {
                setTimeout(() => {
                    i.Destroy();
                }, 0);
            }
        }
    }
};
radiusSpell.OnGameEnd = () => {
    RadiusSpell.gameStart = false;
};
radiusSpell.OnScriptLoad = radiusSpell.OnGameStart = RadiusSpell.Load.Init;
RegisterScript(radiusSpell);


/***/ }),

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getIconHero(name) {
    name = `panorama/images/heroes/icons/${name}_png.vtex_c`;
    return name;
}
exports.getIconHero = getIconHero;
function getIconItem(name) {
    name = name.replace("item_", "");
    return `panorama/images/items/${name}_png.vtex_c`;
}
exports.getIconItem = getIconItem;
function getIconSpell(name) {
    name = `panorama/images/spellicons/${name}_png.vtex_c`;
    return name;
}
exports.getIconSpell = getIconSpell;
function getIconSpellArray(names) {
    let icons = [];
    for (let name of names) {
        icons.push(getIconSpell(name));
    }
    return icons;
}
exports.getIconSpellArray = getIconSpellArray;
function moveItem(self, item, slot) {
    if (slot >= 0 && item)
        EntitySystem.GetLocalPlayer().PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_ITEM, slot, null, item, 3, self);
}
exports.moveItem = moveItem;
let status;
function GetStatusResist(self) {
    let resist = 1;
    for (let buff of self.GetModifiers()) {
        let name = buff.GetName();
        if (status[name]) {
            if (!buff.IsDebuff()) {
                let spell = buff.GetAbility();
                if (status[name] != 1) {
                    resist = resist * (1 - spell.GetLevelSpecialValueForFloat("status_resistance") / 100);
                }
                else if (name == "modifier_ursa_enrage" && !IsStolen(spell) && IsTalant(self, Enum.Talents.TALENT_8)) {
                    resist = resist * (1 - 0.8);
                }
                else if (name == "modifier_slardar_sprint_river" && self.HasAghanimScepter()) {
                    resist = resist * (1 - spell.GetLevelSpecialValueForFloat("puddle_status_resistance") / 100);
                }
            }
            else {
                let spell = buff.GetAbility();
                if (spell) {
                    resist = resist * (1 + spell.GetLevelSpecialValueForFloat("status_resistance_reduction") / 100);
                }
            }
        }
    }
    return resist;
}
exports.GetStatusResist = GetStatusResist;
function IsStolen(spell) {
    return spell.IsStolen() && spell.GetProperty("C_DOTABaseAbility", "m_bReplicated");
}
exports.IsStolen = IsStolen;
function IsTalant(self, num) {
    return (self.GetTalentsMask() & num) == num;
}
exports.IsTalant = IsTalant;


/***/ }),

/***/ 3:
/*!**********************************!*\
  !*** multi ./src/enemyRadius.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\enemyRadius.ts */"./src/enemyRadius.ts");


/***/ })

/******/ });