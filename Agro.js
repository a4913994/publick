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

/***/ "./src/AgroForSale.ts":
/*!****************************!*\
  !*** ./src/AgroForSale.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

let agroin = {};
var AgroIn;
(function (AgroIn) {
    AgroIn.BASE_PATH = ['Boost', 'General', 'AgroInitiation'];
    AgroIn.HERO_NAME = "";
    AgroIn.enable = Menu.AddToggle(AgroIn.BASE_PATH, 'enable', false)
        .OnChange(state => {
        AgroIn.enable = state.newValue;
    })
        .GetValue();
    AgroIn.items = [
        'item_bloodthorn',
        'item_orchid',
        'item_sheepstick',
        'item_abyssal_blade',
        'item_cyclone',
        'item_heavens_halberd',
    ];
    AgroIn.itemBoolean = [true, true, true, true, true, true];
    AgroIn.imagesItems = [];
    for (let i of AgroIn.items) {
        let item = i;
        item = item.replace("item_", '');
        AgroIn.imagesItems.push(`panorama/images/items/${item}_png.vtex_c`);
    }
    AgroIn.gameStart = false;
    AgroIn.listEnemy = [];
    AgroIn.listEnemyItem = [];
    AgroIn.downKey = false;
    AgroIn.opnMenu = Menu.AddKeyBind(AgroIn.BASE_PATH, 'Open menu', Enum.ButtonCode.KEY_NONE);
    AgroIn.openMenu = false;
    AgroIn.xOffset = Menu.AddSlider(AgroIn.BASE_PATH, 'X Offset', -1000, 1000, 0, 1)
        .OnChange(state => {
        AgroIn.xOffset = state.newValue;
    })
        .GetValue();
    AgroIn.yOffset = Menu.AddSlider(AgroIn.BASE_PATH, 'Y Offset', -1000, 1000, 0, 1)
        .OnChange(state => {
        AgroIn.yOffset = state.newValue;
    })
        .GetValue();
    let Load;
    (function (Load) {
        function getIcon(name) {
            name = `panorama/images/heroes/icons/${name}_png.vtex_c`;
            return Renderer.LoadImage(name);
        }
        Load.getIcon = getIcon;
        function getIconItem(name) {
            name = name.replace("item_", "");
            return Renderer.LoadImage(`panorama/images/items/${name}_png.vtex_c`);
        }
        Load.getIconItem = getIconItem;
        function Init() {
            if (GameRules.IsActiveGame()) {
                AgroIn.gameStart = true;
                AgroIn.myHero = EntitySystem.GetLocalHero();
                AgroIn.HERO_NAME = AgroIn.myHero.GetUnitName();
                AgroIn.myPlayer = EntitySystem.GetLocalPlayer();
                let players = EntitySystem.GetPlayersList();
                AgroIn.listEnemyItem = [];
                AgroIn.listEnemy = [];
                for (let i of players) {
                    if (!i.IsSameTeam(AgroIn.myHero) && i.GetPlayerSelectedHeroName() !== 'invalid index') {
                        AgroIn.listEnemy.push(i.GetPlayerSelectedHeroName());
                        AgroIn.listEnemyItem.push([true, true, true, true, true, true]);
                    }
                }
            }
            if (!AgroIn.myHero ||
                !AgroIn.myHero.IsExist()) {
                AgroIn.gameStart = false;
                return;
            }
        }
        Load.Init = Init;
    })(Load = AgroIn.Load || (AgroIn.Load = {}));
})(AgroIn || (AgroIn = {}));
agroin.OnDraw = () => {
    if (AgroIn.enable && AgroIn.gameStart && AgroIn.openMenu) {
        for (let i = 0; i < AgroIn.listEnemy.length; i++) {
            Renderer.SetDrawColor(255, 255, 255, 255);
            Renderer.DrawImage(AgroIn.Load.getIcon(AgroIn.listEnemy[i]), 500 + AgroIn.xOffset + i * 60, 500 + AgroIn.yOffset, 60, 40);
            for (let j = 0; j < AgroIn.listEnemyItem[0].length; j++) {
                if (AgroIn.listEnemyItem[i][j]) {
                    Renderer.SetDrawColor(0, 255, 0, 255);
                }
                else {
                    Renderer.SetDrawColor(255, 0, 0, 255);
                }
                Renderer.DrawImage(AgroIn.Load.getIconItem(AgroIn.items[j]), 500 + AgroIn.xOffset + i * 60, 500 + AgroIn.yOffset + (j + 1) * 40, 60, 40);
            }
        }
    }
};
agroin.OnUpdate = () => {
    if (AgroIn.enable && AgroIn.gameStart) {
        if (Menu.IsKeyDownOnce(AgroIn.opnMenu)) {
            AgroIn.openMenu = !AgroIn.openMenu;
        }
        AgroIn.enemes = AgroIn.myHero.GetHeroesInRadius(2000, Enum.TeamType.TEAM_ENEMY);
        for (let enemy of AgroIn.enemes) {
            let cast = !enemy.HasState(Enum.ModifierState.MODIFIER_STATE_DISARMED) &&
                !enemy.HasState(Enum.ModifierState.MODIFIER_STATE_HEXED) &&
                !enemy.HasState(Enum.ModifierState.MODIFIER_STATE_FROZEN) &&
                !enemy.HasState(Enum.ModifierState.MODIFIER_STATE_STUNNED) &&
                !enemy.HasState(Enum.ModifierState.MODIFIER_STATE_ROOTED) &&
                !enemy.HasState(Enum.ModifierState.MODIFIER_STATE_SILENCED);
            if (cast) {
                let indexHero = AgroIn.listEnemy.indexOf(enemy.GetUnitName());
                for (let item of AgroIn.items) {
                    let itemHero = AgroIn.myHero.GetItem(item, true);
                    let indexItem = -1;
                    if (itemHero) {
                        indexItem = AgroIn.items.indexOf(itemHero.GetName());
                    }
                    if (itemHero && AgroIn.listEnemyItem[indexHero][indexItem] && itemHero.GetCooldown() === 0.0 && AgroIn.myHero.GetMana() > itemHero.GetManaCost() && AgroIn.myHero.GetAbsOrigin().Distance(enemy.GetAbsOrigin()) < itemHero.GetCastRange()) {
                        itemHero.CastTarget(enemy);
                        break;
                    }
                }
            }
        }
    }
};
agroin.OnKeyEvent = (key) => {
    if (AgroIn.openMenu && AgroIn.enable && key.key === Enum.ButtonCode.MOUSE_FIRST && Input.IsCursorInRect(500 + AgroIn.xOffset, 500 + 40 + AgroIn.yOffset, AgroIn.listEnemy.length * 60, AgroIn.listEnemyItem[0].length * 40 + 40)) {
        let [x, y] = Input.GetCursorPos();
        AgroIn.listEnemyItem[Math.floor((x - (500 + AgroIn.xOffset)) / 60)][Math.floor((y - (540 + AgroIn.yOffset)) / 40)] = !AgroIn.listEnemyItem[Math.floor((x - (500 + AgroIn.xOffset)) / 60)][Math.floor((y - (540 + AgroIn.yOffset)) / 40)];
        //AgroIn.listEnemyItem[Math.floor((x - 500) / 40)][Math.floor((y - 560) / 60)] = false;
    }
};
agroin.OnGameEnd = () => {
    AgroIn.gameStart = false;
};
agroin.OnGameStart = () => {
    AgroIn.Load.Init();
};
agroin.OnScriptLoad = () => {
    AgroIn.Load.Init();
};
RegisterScript(agroin);


/***/ }),

/***/ 1:
/*!**********************************!*\
  !*** multi ./src/AgroForSale.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\AgroForSale.ts */"./src/AgroForSale.ts");


/***/ })

/******/ });