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

/***/ "./src/Timber.ts":
/*!***********************!*\
  !*** ./src/Timber.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = __webpack_require__(/*! ./lib */ "./src/lib.ts");
let timber = {};
var Timber;
(function (Timber) {
    Timber.BASE_PATH = ['Boost', 'Heroes', 'Strength', 'Timber'];
    Timber.HERO_NAME = 'npc_dota_hero_shredder';
    Timber.combo = Menu.AddToggle(Timber.BASE_PATH, 'Enable', false)
        .OnChange(state => {
        Timber.combo = state.newValue;
    })
        .GetValue();
    Timber.comboKey = Menu.AddKeyBind(Timber.BASE_PATH, 'Active key', Enum.ButtonCode.KEY_NONE);
    Menu.SetImage(['Boost', 'Heroes'], '~/menu/40x40/heroes.png'); // strength.png
    Menu.SetImage(['Boost', 'Heroes', 'Strength'], '~/menu/40x40/strength.png'); // npc_dota_hero_shredder
    Menu.SetImage(Timber.BASE_PATH, `${lib_1.getIconHero('npc_dota_hero_shredder')}`);
    Timber.particle = null;
    Timber.gameStart = false;
    let Load;
    (function (Load) {
        function Init() {
            if (GameRules.IsActiveGame()) {
                Timber.gameStart = true;
                Timber.myHero = EntitySystem.GetLocalHero();
                Timber.myPlayer = EntitySystem.GetLocalPlayer();
            }
            if (!Timber.myHero ||
                !Timber.myHero.IsExist() ||
                Timber.myHero.GetUnitName() !== Timber.HERO_NAME) {
                Timber.gameStart = false;
                return;
            }
        }
        Load.Init = Init;
    })(Load = Timber.Load || (Timber.Load = {}));
})(Timber || (Timber = {}));
timber.OnUpdate = () => {
    if (Timber.gameStart && Timber.combo && Menu.IsKeyDown(Timber.comboKey) && Engine.OnceAt(0.1)) {
        let ironwood = Timber.myHero.GetItem('item_ironwood_tree', false);
        let ironbranch = Timber.myHero.GetItem('item_branches', false);
        if (ironwood && Timber.myHero.GetAbilityByIndex(1).GetCooldown() === 0.0 && ironwood.GetCooldown() === 0.0 && Timber.myHero.GetMana() >= Timber.myHero.GetAbilityByIndex(1).GetManaCost()) {
            let pos = Input.GetWorldCursorPos();
            let posTimber = Timber.myHero.GetAbsOrigin();
            pos.z = 0;
            posTimber.z = 0;
            ironwood.CastPosition(pos);
            if (posTimber.Distance(pos) - 20 <= ironwood.GetCastRange()) {
                Timber.myHero.GetAbilityByIndex(1).CastPosition(pos);
            }
        }
        else if (ironbranch && Timber.myHero.GetAbilityByIndex(1).GetCooldown() === 0.0 && ironbranch.GetCooldown() === 0.0 && Timber.myHero.GetMana() >= Timber.myHero.GetAbilityByIndex(1).GetManaCost()) {
            let pos = Input.GetWorldCursorPos();
            let posTimber = Timber.myHero.GetAbsOrigin();
            pos.z = 0;
            posTimber.z = 0;
            ironbranch.CastPosition(pos);
            if (posTimber.Distance(pos) - 20 <= ironbranch.GetCastRange()) {
                Timber.myHero.GetAbilityByIndex(1).CastPosition(pos);
            }
        }
    }
};
timber.OnGameEnd = () => {
    Timber.gameStart = false;
};
timber.OnScriptLoad = timber.OnGameStart = Timber.Load.Init;
RegisterScript(timber);


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

/***/ 1:
/*!*****************************!*\
  !*** multi ./src/Timber.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\Timber.ts */"./src/Timber.ts");


/***/ })

/******/ });