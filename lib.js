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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

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

/***/ 8:
/*!**************************!*\
  !*** multi ./src/lib.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\lib.ts */"./src/lib.ts");


/***/ })

/******/ });