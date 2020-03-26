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

/***/ "./src/games/noname.ts":
/*!*****************************!*\
  !*** ./src/games/noname.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = __webpack_require__(/*! ../lib */ "./src/lib.ts");
let kart = {};
var Kart;
(function (Kart) {
    var _a;
    Kart.BASE_PATH = ['Boost', 'Minigame\'s', 'KartGame'];
    Kart.logo = Renderer.LoadImage("~/logo.png");
    _a = [0, 0], Kart.x = _a[0], Kart.y = _a[1];
    Kart.enable = Menu.AddToggle(Kart.BASE_PATH, 'Enable', false)
        .OnChange(state => {
        Kart.enable = state.newValue;
    })
        .GetValue();
    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
    Kart.randomInteger = randomInteger;
    Kart.icons = [];
    Kart.icons.push(Renderer.LoadImage(lib_1.getIconHero('npc_dota_hero_centaur')));
    Kart.icons.push(Renderer.LoadImage(lib_1.getIconHero('npc_dota_hero_centaur')));
    Kart.icons.push(Renderer.LoadImage(lib_1.getIconHero('npc_dota_hero_skywrath_mage')));
    Kart.icons.push(Renderer.LoadImage(lib_1.getIconHero('npc_dota_hero_storm_spirit')));
    Kart.icons.push(Renderer.LoadImage(lib_1.getIconHero('npc_dota_hero_venomancer')));
    Kart.icons.push(Renderer.LoadImage(lib_1.getIconHero('npc_dota_hero_nevermore')));
    Kart.icons.push(Renderer.LoadImage(lib_1.getIconHero('npc_dota_hero_weaver')));
    Kart.icons.push(Renderer.LoadImage(lib_1.getIconHero('npc_dota_hero_keeper_of_the_light')));
    Kart.icons.push(Renderer.LoadImage(lib_1.getIconHero('npc_dota_hero_meepo')));
    Kart.icons.push(Renderer.LoadImage(lib_1.getIconHero('npc_dota_hero_furion')));
    Kart.check = true;
    Kart.clicks = 0;
    Kart.first_click = [-1, -1];
    Kart.second_click = [-1, -1];
    Kart.size = 80;
    function generateMatrix() {
        Kart.matrix = [];
        Kart.check = true;
        Kart.check_list = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < 9; i++) {
            Kart.matrix.push([]);
            for (let j = 0; j < 2; j++) {
                let temp = randomInteger(1, 9);
                Kart.matrix[i].push(temp);
                Kart.check_list[temp - 1] += 1;
            }
        }
        for (let i = 0; i < 9; i++) {
            if (Kart.check_list[i] != 2) {
                Kart.check = true;
                return;
            }
        }
        Kart.check = false;
    }
    Kart.generateMatrix = generateMatrix;
})(Kart || (Kart = {}));
kart.OnScriptLoad = () => {
    let [x, y] = Renderer.GetScreenSize();
    Kart.x = x / 3;
    Kart.y = y / 3;
    while (Kart.check) {
        Kart.generateMatrix();
    }
};
kart.OnUpdate = () => {
    if (Kart.enable) {
        let cnt = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 2; j++) {
                if (Kart.matrix[i][j] === -1) {
                    cnt += 1;
                }
            }
        }
        if (cnt === 18) {
            Kart.generateMatrix();
            while (Kart.check) {
                Kart.generateMatrix();
            }
        }
        if (Input.IsKeyDownOnce(Enum.ButtonCode.MOUSE_FIRST) && Input.IsCursorInRect(Kart.x, Kart.y, Kart.size * 9, Kart.size * 3)) {
            Kart.clicks += 1;
            let [x, y] = Input.GetCursorPos();
            x = Math.floor((x - Kart.x) / Kart.size);
            y = Math.floor((y - Kart.y) / Kart.size);
            if (Kart.matrix[x][y] !== -1) {
                switch (Kart.clicks) {
                    case 1: {
                        console.log(1);
                        Kart.first_click = [x, y];
                        break;
                    }
                    case 2: {
                        console.log(2);
                        Kart.second_click = [x, y];
                        setTimeout(() => {
                            if (Kart.matrix[x][y] === Kart.matrix[Kart.first_click[0]][Kart.first_click[1]]) {
                                Kart.matrix[x][y] = -1;
                                Kart.matrix[Kart.first_click[0]][Kart.first_click[1]] = -1;
                            }
                            Kart.second_click = [-1, -1];
                            Kart.first_click = [-1, -1];
                            console.log(3);
                            Kart.clicks = 0;
                        }, 1000);
                        break;
                    }
                }
                console.log(x, y);
            }
        }
    }
};
kart.OnDraw = () => {
    if (Kart.enable) {
        Renderer.SetTopMost(true);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 2; j++) {
                Renderer.SetDrawColor(255, 255, 255, 255);
                if (Kart.matrix[i][j] !== -1) {
                    Renderer.DrawImage(Kart.icons[Kart.matrix[i][j]], Kart.x + (i * Kart.size), Kart.y + (j * Kart.size), Kart.size, Kart.size);
                    Renderer.SetDrawColor(255, 255, 255, 255);
                    if (i === Kart.first_click[0] && j === Kart.first_click[1]) {
                        Renderer.SetDrawColor(0, 255, 0, 255);
                        Renderer.DrawOutlineRect(Kart.x + (i * Kart.size), Kart.y + (j * Kart.size), Kart.size, Kart.size);
                    }
                    else if (i === Kart.second_click[0] && j === Kart.second_click[1]) {
                        Renderer.SetDrawColor(255, 255, 0, 255);
                        Renderer.DrawOutlineRect(Kart.x + (i * Kart.size), Kart.y + (j * Kart.size), Kart.size, Kart.size);
                    }
                    else {
                        Renderer.DrawFilledRect(Kart.x + (i * Kart.size), Kart.y + (j * Kart.size), Kart.size, Kart.size);
                        Renderer.DrawImage(Kart.logo, Kart.x + (i * Kart.size), Kart.y + (j * Kart.size), Kart.size, Kart.size);
                        Renderer.SetDrawColor(255, 0, 0, 255);
                        Renderer.DrawOutlineRect(Kart.x + (i * Kart.size), Kart.y + (j * Kart.size), Kart.size, Kart.size);
                    }
                }
            }
        }
    }
    else {
        // Renderer.SetTopMost(false);
    }
};
RegisterScript(kart);


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

/***/ 0:
/*!***********************************!*\
  !*** multi ./src/games/noname.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\games\noname.ts */"./src/games/noname.ts");


/***/ })

/******/ });