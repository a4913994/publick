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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SnapFire2.ts":
/*!**************************!*\
  !*** ./src/SnapFire2.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

let snap = {};
var Snap;
(function (Snap) {
    Snap.BASE_PATH = ['Boost', 'General', 'SnapFireBlink'];
    Snap.ORDER_TIME = 0.1;
    Snap.HERO_NAME = "";
    Snap.enableBlink = Menu.AddToggle(Snap.BASE_PATH, "AutoBlink", false)
        .OnChange(state => {
        Snap.enableBlink = state.newValue;
    })
        .GetValue();
    Snap.blOrders = false;
    Snap.index = -1;
    Snap.listIndex = -1;
    Snap.gameStart = false;
    let Load;
    (function (Load) {
        function Init() {
            if (GameRules.IsActiveGame()) {
                Snap.gameStart = true;
                Snap.myHero = EntitySystem.GetLocalHero();
                Snap.HERO_NAME = Snap.myHero.GetUnitName();
                Snap.myPlayer = EntitySystem.GetLocalPlayer();
            }
            if (!Snap.myHero ||
                !Snap.myHero.IsExist()) {
                Snap.gameStart = false;
                return;
            }
        }
        Load.Init = Init;
    })(Load = Snap.Load || (Snap.Load = {}));
})(Snap || (Snap = {}));
snap.OnProjectile = (particle) => {
    if (Snap.enableBlink && Snap.gameStart && particle.target.GetUnitName() == Snap.HERO_NAME && particle.fullName === 'particles/units/heroes/hero_snapfire/hero_snapfire_cookie_projectile.vpcf') {
        Snap.index = particle.handle;
        let time = Snap.myHero.GetTimeToFacePosition(Input.GetWorldCursorPos());
        if (time !== 0 && time <= 0.2) {
            Snap.myPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_MOVE_TO_DIRECTION, null, Input.GetWorldCursorPos(), null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, Snap.myHero);
            Snap.myPlayer.HoldPosition(Snap.myHero);
        }
    }
};
snap.OnUpdate = () => {
    if (Snap.gameStart && Snap.enableBlink) {
        let blink = Snap.myHero.GetItem("item_blink", true);
        let list = EntitySystem.GetTargetProjectileList(); //
        for (let i = 0; i < list.length; i++) {
            if (list[i].index === Snap.index && list[i].target === Snap.myHero) {
                let list_i = list[i].currentPosition;
                let abs = list[i].targetPosition;
                let pos = list_i.Distance(abs);
                if (pos <= 125 + (NetChannel.GetAvgLatency(Enum.Flow.FLOW_INCOMING) + NetChannel.GetAvgLatency(Enum.Flow.FLOW_OUTGOING) * 1000) * 1.21
                    && Snap.myHero.GetTimeToFacePosition(Input.GetWorldCursorPos()) === 0) {
                    if (blink && blink.GetCooldown() === 0.0) {
                        blink.CastPosition(Input.GetWorldCursorPos());
                    }
                }
            }
        }
    }
};
snap.OnPrepareUnitOrders = (order) => {
};
snap.OnGameEnd = () => {
    Snap.gameStart = false;
};
snap.OnScriptLoad = snap.OnGameStart = Snap.Load.Init;
RegisterScript(snap);


/***/ }),

/***/ 6:
/*!********************************!*\
  !*** multi ./src/SnapFire2.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\madaspe\AppData\Roaming\Minority\scripts\src\SnapFire2.ts */"./src/SnapFire2.ts");


/***/ })

/******/ });