import {
  require_react
} from "./chunk-UM3JHGVO.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-CEQRFMJQ.js";

// node_modules/load-script/index.js
var require_load_script = __commonJS({
  "node_modules/load-script/index.js"(exports, module) {
    module.exports = function load(src, opts, cb) {
      var head = document.head || document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      opts = opts || {};
      cb = cb || function() {
      };
      script.type = opts.type || "text/javascript";
      script.charset = opts.charset || "utf8";
      script.async = "async" in opts ? !!opts.async : true;
      script.src = src;
      if (opts.attrs) {
        setAttributes(script, opts.attrs);
      }
      if (opts.text) {
        script.text = "" + opts.text;
      }
      var onend = "onload" in script ? stdOnEnd : ieOnEnd;
      onend(script, cb);
      if (!script.onload) {
        stdOnEnd(script, cb);
      }
      head.appendChild(script);
    };
    function setAttributes(script, attrs) {
      for (var attr in attrs) {
        script.setAttribute(attr, attrs[attr]);
      }
    }
    function stdOnEnd(script, cb) {
      script.onload = function() {
        this.onerror = this.onload = null;
        cb(null, script);
      };
      script.onerror = function() {
        this.onerror = this.onload = null;
        cb(new Error("Failed to load " + this.src), script);
      };
    }
    function ieOnEnd(script, cb) {
      script.onreadystatechange = function() {
        if (this.readyState != "complete" && this.readyState != "loaded")
          return;
        this.onreadystatechange = null;
        cb(null, script);
      };
    }
  }
});

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next) {
        return deepmerge(prev, next, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module.exports = deepmerge_1;
  }
});

// node_modules/react-player/lib/utils.js
var require_utils = __commonJS({
  "node_modules/react-player/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseStartTime = parseStartTime;
    exports.parseEndTime = parseEndTime;
    exports.randomString = randomString;
    exports.queryString = queryString;
    exports.getSDK = getSDK;
    exports.getConfig = getConfig;
    exports.omit = omit;
    exports.callPlayer = callPlayer;
    exports.isMediaStream = isMediaStream;
    exports.isBlobUrl = isBlobUrl;
    exports.supportsWebKitPresentationMode = supportsWebKitPresentationMode;
    var _loadScript = _interopRequireDefault(require_load_script());
    var _deepmerge = _interopRequireDefault(require_cjs());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    var MATCH_START_QUERY = /[?&#](?:start|t)=([0-9hms]+)/;
    var MATCH_END_QUERY = /[?&#]end=([0-9hms]+)/;
    var MATCH_START_STAMP = /(\d+)(h|m|s)/g;
    var MATCH_NUMERIC = /^\d+$/;
    function parseTimeParam(url, pattern) {
      if (url instanceof Array) {
        return void 0;
      }
      var match = url.match(pattern);
      if (match) {
        var stamp = match[1];
        if (stamp.match(MATCH_START_STAMP)) {
          return parseTimeString(stamp);
        }
        if (MATCH_NUMERIC.test(stamp)) {
          return parseInt(stamp);
        }
      }
      return void 0;
    }
    function parseTimeString(stamp) {
      var seconds = 0;
      var array = MATCH_START_STAMP.exec(stamp);
      while (array !== null) {
        var _array = array, _array2 = _slicedToArray(_array, 3), count = _array2[1], period = _array2[2];
        if (period === "h")
          seconds += parseInt(count, 10) * 60 * 60;
        if (period === "m")
          seconds += parseInt(count, 10) * 60;
        if (period === "s")
          seconds += parseInt(count, 10);
        array = MATCH_START_STAMP.exec(stamp);
      }
      return seconds;
    }
    function parseStartTime(url) {
      return parseTimeParam(url, MATCH_START_QUERY);
    }
    function parseEndTime(url) {
      return parseTimeParam(url, MATCH_END_QUERY);
    }
    function randomString() {
      return Math.random().toString(36).substr(2, 5);
    }
    function queryString(object) {
      return Object.keys(object).map(function(key) {
        return "".concat(key, "=").concat(object[key]);
      }).join("&");
    }
    function getGlobal(key) {
      if (window[key]) {
        return window[key];
      }
      if (window.exports && window.exports[key]) {
        return window.exports[key];
      }
      if (window.module && window.module.exports && window.module.exports[key]) {
        return window.module.exports[key];
      }
      return null;
    }
    var requests = {};
    function getSDK(url, sdkGlobal) {
      var sdkReady = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      var isLoaded = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function() {
        return true;
      };
      var fetchScript = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : _loadScript["default"];
      var existingGlobal = getGlobal(sdkGlobal);
      if (existingGlobal && isLoaded(existingGlobal)) {
        return Promise.resolve(existingGlobal);
      }
      return new Promise(function(resolve, reject) {
        if (requests[url]) {
          requests[url].push({
            resolve,
            reject
          });
          return;
        }
        requests[url] = [{
          resolve,
          reject
        }];
        var onLoaded = function onLoaded2(sdk) {
          requests[url].forEach(function(request) {
            return request.resolve(sdk);
          });
        };
        if (sdkReady) {
          var previousOnReady = window[sdkReady];
          window[sdkReady] = function() {
            if (previousOnReady)
              previousOnReady();
            onLoaded(getGlobal(sdkGlobal));
          };
        }
        fetchScript(url, function(err) {
          if (err) {
            requests[url].forEach(function(request) {
              return request.reject(err);
            });
            requests[url] = null;
          } else if (!sdkReady) {
            onLoaded(getGlobal(sdkGlobal));
          }
        });
      });
    }
    function getConfig(props, defaultProps) {
      return (0, _deepmerge["default"])(defaultProps.config, props.config);
    }
    function omit(object) {
      var _ref;
      for (var _len = arguments.length, arrays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arrays[_key - 1] = arguments[_key];
      }
      var omitKeys = (_ref = []).concat.apply(_ref, arrays);
      var output = {};
      var keys = Object.keys(object);
      for (var _i2 = 0, _keys = keys; _i2 < _keys.length; _i2++) {
        var key = _keys[_i2];
        if (omitKeys.indexOf(key) === -1) {
          output[key] = object[key];
        }
      }
      return output;
    }
    function callPlayer(method) {
      var _this$player;
      if (!this.player || !this.player[method]) {
        var message = "ReactPlayer: ".concat(this.constructor.displayName, " player could not call %c").concat(method, "%c – ");
        if (!this.player) {
          message += "The player was not available";
        } else if (!this.player[method]) {
          message += "The method was not available";
        }
        console.warn(message, "font-weight: bold", "");
        return null;
      }
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return (_this$player = this.player)[method].apply(_this$player, args);
    }
    function isMediaStream(url) {
      return typeof window !== "undefined" && typeof window.MediaStream !== "undefined" && url instanceof window.MediaStream;
    }
    function isBlobUrl(url) {
      return /^blob:/.test(url);
    }
    function supportsWebKitPresentationMode() {
      var video = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document.createElement("video");
      var notMobile = /iPhone|iPod/.test(navigator.userAgent) === false;
      return video.webkitSupportsPresentationMode && typeof video.webkitSetPresentationMode === "function" && notMobile;
    }
  }
});

// node_modules/react-player/lib/patterns.js
var require_patterns = __commonJS({
  "node_modules/react-player/lib/patterns.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.canPlay = exports.FLV_EXTENSIONS = exports.DASH_EXTENSIONS = exports.HLS_EXTENSIONS = exports.VIDEO_EXTENSIONS = exports.AUDIO_EXTENSIONS = exports.MATCH_URL_KALTURA = exports.MATCH_URL_VIDYARD = exports.MATCH_URL_MIXCLOUD = exports.MATCH_URL_DAILYMOTION = exports.MATCH_URL_TWITCH_CHANNEL = exports.MATCH_URL_TWITCH_VIDEO = exports.MATCH_URL_WISTIA = exports.MATCH_URL_STREAMABLE = exports.MATCH_URL_FACEBOOK_WATCH = exports.MATCH_URL_FACEBOOK = exports.MATCH_URL_VIMEO = exports.MATCH_URL_SOUNDCLOUD = exports.MATCH_URL_YOUTUBE = void 0;
    var _utils = require_utils();
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it;
      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e) {
            throw _e;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = o[Symbol.iterator]();
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e2) {
        didErr = true;
        err = _e2;
      }, f: function f() {
        try {
          if (!normalCompletion && it["return"] != null)
            it["return"]();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    var MATCH_URL_YOUTUBE = /(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;
    exports.MATCH_URL_YOUTUBE = MATCH_URL_YOUTUBE;
    var MATCH_URL_SOUNDCLOUD = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/;
    exports.MATCH_URL_SOUNDCLOUD = MATCH_URL_SOUNDCLOUD;
    var MATCH_URL_VIMEO = /vimeo\.com\/(?!progressive_redirect).+/;
    exports.MATCH_URL_VIMEO = MATCH_URL_VIMEO;
    var MATCH_URL_FACEBOOK = /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/;
    exports.MATCH_URL_FACEBOOK = MATCH_URL_FACEBOOK;
    var MATCH_URL_FACEBOOK_WATCH = /^https?:\/\/fb\.watch\/.+$/;
    exports.MATCH_URL_FACEBOOK_WATCH = MATCH_URL_FACEBOOK_WATCH;
    var MATCH_URL_STREAMABLE = /streamable\.com\/([a-z0-9]+)$/;
    exports.MATCH_URL_STREAMABLE = MATCH_URL_STREAMABLE;
    var MATCH_URL_WISTIA = /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?([^?]+)/;
    exports.MATCH_URL_WISTIA = MATCH_URL_WISTIA;
    var MATCH_URL_TWITCH_VIDEO = /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/;
    exports.MATCH_URL_TWITCH_VIDEO = MATCH_URL_TWITCH_VIDEO;
    var MATCH_URL_TWITCH_CHANNEL = /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/;
    exports.MATCH_URL_TWITCH_CHANNEL = MATCH_URL_TWITCH_CHANNEL;
    var MATCH_URL_DAILYMOTION = /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?(?:[\w.#_-]+)?/;
    exports.MATCH_URL_DAILYMOTION = MATCH_URL_DAILYMOTION;
    var MATCH_URL_MIXCLOUD = /mixcloud\.com\/([^/]+\/[^/]+)/;
    exports.MATCH_URL_MIXCLOUD = MATCH_URL_MIXCLOUD;
    var MATCH_URL_VIDYARD = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/;
    exports.MATCH_URL_VIDYARD = MATCH_URL_VIDYARD;
    var MATCH_URL_KALTURA = /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_].*)$/;
    exports.MATCH_URL_KALTURA = MATCH_URL_KALTURA;
    var AUDIO_EXTENSIONS = /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
    exports.AUDIO_EXTENSIONS = AUDIO_EXTENSIONS;
    var VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
    exports.VIDEO_EXTENSIONS = VIDEO_EXTENSIONS;
    var HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
    exports.HLS_EXTENSIONS = HLS_EXTENSIONS;
    var DASH_EXTENSIONS = /\.(mpd)($|\?)/i;
    exports.DASH_EXTENSIONS = DASH_EXTENSIONS;
    var FLV_EXTENSIONS = /\.(flv)($|\?)/i;
    exports.FLV_EXTENSIONS = FLV_EXTENSIONS;
    var canPlayFile = function canPlayFile2(url) {
      if (url instanceof Array) {
        var _iterator = _createForOfIteratorHelper(url), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var item = _step.value;
            if (typeof item === "string" && canPlayFile2(item)) {
              return true;
            }
            if (canPlayFile2(item.src)) {
              return true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return false;
      }
      if ((0, _utils.isMediaStream)(url) || (0, _utils.isBlobUrl)(url)) {
        return true;
      }
      return AUDIO_EXTENSIONS.test(url) || VIDEO_EXTENSIONS.test(url) || HLS_EXTENSIONS.test(url) || DASH_EXTENSIONS.test(url) || FLV_EXTENSIONS.test(url);
    };
    var canPlay = {
      youtube: function youtube(url) {
        if (url instanceof Array) {
          return url.every(function(item) {
            return MATCH_URL_YOUTUBE.test(item);
          });
        }
        return MATCH_URL_YOUTUBE.test(url);
      },
      soundcloud: function soundcloud(url) {
        return MATCH_URL_SOUNDCLOUD.test(url) && !AUDIO_EXTENSIONS.test(url);
      },
      vimeo: function vimeo(url) {
        return MATCH_URL_VIMEO.test(url) && !VIDEO_EXTENSIONS.test(url) && !HLS_EXTENSIONS.test(url);
      },
      facebook: function facebook(url) {
        return MATCH_URL_FACEBOOK.test(url) || MATCH_URL_FACEBOOK_WATCH.test(url);
      },
      streamable: function streamable(url) {
        return MATCH_URL_STREAMABLE.test(url);
      },
      wistia: function wistia(url) {
        return MATCH_URL_WISTIA.test(url);
      },
      twitch: function twitch(url) {
        return MATCH_URL_TWITCH_VIDEO.test(url) || MATCH_URL_TWITCH_CHANNEL.test(url);
      },
      dailymotion: function dailymotion(url) {
        return MATCH_URL_DAILYMOTION.test(url);
      },
      mixcloud: function mixcloud(url) {
        return MATCH_URL_MIXCLOUD.test(url);
      },
      vidyard: function vidyard(url) {
        return MATCH_URL_VIDYARD.test(url);
      },
      kaltura: function kaltura(url) {
        return MATCH_URL_KALTURA.test(url);
      },
      file: canPlayFile
    };
    exports.canPlay = canPlay;
  }
});

// node_modules/react-player/lib/players/YouTube.js
var require_YouTube = __commonJS({
  "node_modules/react-player/lib/players/YouTube.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://www.youtube.com/iframe_api";
    var SDK_GLOBAL = "YT";
    var SDK_GLOBAL_READY = "onYouTubeIframeAPIReady";
    var MATCH_PLAYLIST = /[?&](?:list|channel)=([a-zA-Z0-9_-]+)/;
    var MATCH_USER_UPLOADS = /user\/([a-zA-Z0-9_-]+)\/?/;
    var MATCH_NOCOOKIE = /youtube-nocookie\.com/;
    var NOCOOKIE_HOST = "https://www.youtube-nocookie.com";
    var YouTube = function(_Component) {
      _inherits(YouTube2, _Component);
      var _super = _createSuper(YouTube2);
      function YouTube2() {
        var _this;
        _classCallCheck(this, YouTube2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "parsePlaylist", function(url) {
          if (url instanceof Array) {
            return {
              listType: "playlist",
              playlist: url.map(_this.getID).join(",")
            };
          }
          if (MATCH_PLAYLIST.test(url)) {
            var _url$match = url.match(MATCH_PLAYLIST), _url$match2 = _slicedToArray(_url$match, 2), playlistId = _url$match2[1];
            return {
              listType: "playlist",
              list: playlistId.replace(/^UC/, "UU")
            };
          }
          if (MATCH_USER_UPLOADS.test(url)) {
            var _url$match3 = url.match(MATCH_USER_UPLOADS), _url$match4 = _slicedToArray(_url$match3, 2), username = _url$match4[1];
            return {
              listType: "user_uploads",
              list: username
            };
          }
          return {};
        });
        _defineProperty(_assertThisInitialized(_this), "onStateChange", function(event) {
          var data = event.data;
          var _this$props = _this.props, onPlay = _this$props.onPlay, onPause = _this$props.onPause, onBuffer = _this$props.onBuffer, onBufferEnd = _this$props.onBufferEnd, onEnded = _this$props.onEnded, onReady = _this$props.onReady, loop = _this$props.loop, _this$props$config = _this$props.config, playerVars = _this$props$config.playerVars, onUnstarted = _this$props$config.onUnstarted;
          var _window$SDK_GLOBAL$Pl = window[SDK_GLOBAL].PlayerState, UNSTARTED = _window$SDK_GLOBAL$Pl.UNSTARTED, PLAYING = _window$SDK_GLOBAL$Pl.PLAYING, PAUSED = _window$SDK_GLOBAL$Pl.PAUSED, BUFFERING = _window$SDK_GLOBAL$Pl.BUFFERING, ENDED = _window$SDK_GLOBAL$Pl.ENDED, CUED = _window$SDK_GLOBAL$Pl.CUED;
          if (data === UNSTARTED)
            onUnstarted();
          if (data === PLAYING) {
            onPlay();
            onBufferEnd();
          }
          if (data === PAUSED)
            onPause();
          if (data === BUFFERING)
            onBuffer();
          if (data === ENDED) {
            var isPlaylist = !!_this.callPlayer("getPlaylist");
            if (loop && !isPlaylist) {
              if (playerVars.start) {
                _this.seekTo(playerVars.start);
              } else {
                _this.play();
              }
            }
            onEnded();
          }
          if (data === CUED)
            onReady();
        });
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.callPlayer("mute");
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          _this.callPlayer("unMute");
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(container) {
          _this.container = container;
        });
        return _this;
      }
      _createClass(YouTube2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "getID",
        value: function getID(url) {
          if (!url || url instanceof Array || MATCH_PLAYLIST.test(url)) {
            return null;
          }
          return url.match(_patterns.MATCH_URL_YOUTUBE)[1];
        }
      }, {
        key: "load",
        value: function load(url, isReady) {
          var _this2 = this;
          var _this$props2 = this.props, playing = _this$props2.playing, muted = _this$props2.muted, playsinline = _this$props2.playsinline, controls = _this$props2.controls, loop = _this$props2.loop, config = _this$props2.config, _onError = _this$props2.onError;
          var playerVars = config.playerVars, embedOptions = config.embedOptions;
          var id = this.getID(url);
          if (isReady) {
            if (MATCH_PLAYLIST.test(url) || MATCH_USER_UPLOADS.test(url) || url instanceof Array) {
              this.player.loadPlaylist(this.parsePlaylist(url));
              return;
            }
            this.player.cueVideoById({
              videoId: id,
              startSeconds: (0, _utils.parseStartTime)(url) || playerVars.start,
              endSeconds: (0, _utils.parseEndTime)(url) || playerVars.end
            });
            return;
          }
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function(YT) {
            return YT.loaded;
          }).then(function(YT) {
            if (!_this2.container)
              return;
            _this2.player = new YT.Player(_this2.container, _objectSpread({
              width: "100%",
              height: "100%",
              videoId: id,
              playerVars: _objectSpread(_objectSpread({
                autoplay: playing ? 1 : 0,
                mute: muted ? 1 : 0,
                controls: controls ? 1 : 0,
                start: (0, _utils.parseStartTime)(url),
                end: (0, _utils.parseEndTime)(url),
                origin: window.location.origin,
                playsinline: playsinline ? 1 : 0
              }, _this2.parsePlaylist(url)), playerVars),
              events: {
                onReady: function onReady() {
                  if (loop) {
                    _this2.player.setLoop(true);
                  }
                  _this2.props.onReady();
                },
                onPlaybackRateChange: function onPlaybackRateChange(event) {
                  return _this2.props.onPlaybackRateChange(event.data);
                },
                onPlaybackQualityChange: function onPlaybackQualityChange(event) {
                  return _this2.props.onPlaybackQualityChange(event);
                },
                onStateChange: _this2.onStateChange,
                onError: function onError(event) {
                  return _onError(event.data);
                }
              },
              host: MATCH_NOCOOKIE.test(url) ? NOCOOKIE_HOST : void 0
            }, embedOptions));
          }, _onError);
          if (embedOptions.events) {
            console.warn("Using `embedOptions.events` will likely break things. Use ReactPlayer’s callback props instead, eg onReady, onPlay, onPause");
          }
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("playVideo");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pauseVideo");
        }
      }, {
        key: "stop",
        value: function stop() {
          if (!document.body.contains(this.callPlayer("getIframe")))
            return;
          this.callPlayer("stopVideo");
        }
      }, {
        key: "seekTo",
        value: function seekTo(amount) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          this.callPlayer("seekTo", amount);
          if (!keepPlaying && !this.props.playing) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction * 100);
        }
      }, {
        key: "setPlaybackRate",
        value: function setPlaybackRate(rate) {
          this.callPlayer("setPlaybackRate", rate);
        }
      }, {
        key: "setLoop",
        value: function setLoop(loop) {
          this.callPlayer("setLoop", loop);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.callPlayer("getDuration");
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.callPlayer("getCurrentTime");
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.callPlayer("getVideoLoadedFraction") * this.getDuration();
        }
      }, {
        key: "render",
        value: function render() {
          var display = this.props.display;
          var style = {
            width: "100%",
            height: "100%",
            display
          };
          return _react["default"].createElement("div", {
            style
          }, _react["default"].createElement("div", {
            ref: this.ref
          }));
        }
      }]);
      return YouTube2;
    }(_react.Component);
    exports["default"] = YouTube;
    _defineProperty(YouTube, "displayName", "YouTube");
    _defineProperty(YouTube, "canPlay", _patterns.canPlay.youtube);
  }
});

// node_modules/react-player/lib/players/SoundCloud.js
var require_SoundCloud = __commonJS({
  "node_modules/react-player/lib/players/SoundCloud.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://w.soundcloud.com/player/api.js";
    var SDK_GLOBAL = "SC";
    var SoundCloud = function(_Component) {
      _inherits(SoundCloud2, _Component);
      var _super = _createSuper(SoundCloud2);
      function SoundCloud2() {
        var _this;
        _classCallCheck(this, SoundCloud2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "duration", null);
        _defineProperty(_assertThisInitialized(_this), "currentTime", null);
        _defineProperty(_assertThisInitialized(_this), "fractionLoaded", null);
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.setVolume(0);
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          if (_this.props.volume !== null) {
            _this.setVolume(_this.props.volume);
          }
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(iframe) {
          _this.iframe = iframe;
        });
        return _this;
      }
      _createClass(SoundCloud2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load(url, isReady) {
          var _this2 = this;
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function(SC) {
            if (!_this2.iframe)
              return;
            var _SC$Widget$Events = SC.Widget.Events, PLAY = _SC$Widget$Events.PLAY, PLAY_PROGRESS = _SC$Widget$Events.PLAY_PROGRESS, PAUSE = _SC$Widget$Events.PAUSE, FINISH = _SC$Widget$Events.FINISH, ERROR = _SC$Widget$Events.ERROR;
            if (!isReady) {
              _this2.player = SC.Widget(_this2.iframe);
              _this2.player.bind(PLAY, _this2.props.onPlay);
              _this2.player.bind(PAUSE, function() {
                var remaining = _this2.duration - _this2.currentTime;
                if (remaining < 0.05) {
                  return;
                }
                _this2.props.onPause();
              });
              _this2.player.bind(PLAY_PROGRESS, function(e) {
                _this2.currentTime = e.currentPosition / 1e3;
                _this2.fractionLoaded = e.loadedProgress;
              });
              _this2.player.bind(FINISH, function() {
                return _this2.props.onEnded();
              });
              _this2.player.bind(ERROR, function(e) {
                return _this2.props.onError(e);
              });
            }
            _this2.player.load(url, _objectSpread(_objectSpread({}, _this2.props.config.options), {}, {
              callback: function callback() {
                _this2.player.getDuration(function(duration) {
                  _this2.duration = duration / 1e3;
                  _this2.props.onReady();
                });
              }
            }));
          });
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.callPlayer("seekTo", seconds * 1e3);
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction * 100);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.fractionLoaded * this.duration;
        }
      }, {
        key: "render",
        value: function render() {
          var display = this.props.display;
          var style = {
            width: "100%",
            height: "100%",
            display
          };
          return _react["default"].createElement("iframe", {
            ref: this.ref,
            src: "https://w.soundcloud.com/player/?url=".concat(encodeURIComponent(this.props.url)),
            style,
            frameBorder: 0,
            allow: "autoplay"
          });
        }
      }]);
      return SoundCloud2;
    }(_react.Component);
    exports["default"] = SoundCloud;
    _defineProperty(SoundCloud, "displayName", "SoundCloud");
    _defineProperty(SoundCloud, "canPlay", _patterns.canPlay.soundcloud);
    _defineProperty(SoundCloud, "loopOnEnded", true);
  }
});

// node_modules/react-player/lib/players/Vimeo.js
var require_Vimeo = __commonJS({
  "node_modules/react-player/lib/players/Vimeo.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://player.vimeo.com/api/player.js";
    var SDK_GLOBAL = "Vimeo";
    var cleanUrl = function cleanUrl2(url) {
      return url.replace("/manage/videos", "");
    };
    var Vimeo = function(_Component) {
      _inherits(Vimeo2, _Component);
      var _super = _createSuper(Vimeo2);
      function Vimeo2() {
        var _this;
        _classCallCheck(this, Vimeo2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "duration", null);
        _defineProperty(_assertThisInitialized(_this), "currentTime", null);
        _defineProperty(_assertThisInitialized(_this), "secondsLoaded", null);
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.setMuted(true);
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          _this.setMuted(false);
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(container) {
          _this.container = container;
        });
        return _this;
      }
      _createClass(Vimeo2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load(url) {
          var _this2 = this;
          this.duration = null;
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function(Vimeo3) {
            if (!_this2.container)
              return;
            var _this2$props$config = _this2.props.config, playerOptions = _this2$props$config.playerOptions, title = _this2$props$config.title;
            _this2.player = new Vimeo3.Player(_this2.container, _objectSpread({
              url: cleanUrl(url),
              autoplay: _this2.props.playing,
              muted: _this2.props.muted,
              loop: _this2.props.loop,
              playsinline: _this2.props.playsinline,
              controls: _this2.props.controls
            }, playerOptions));
            _this2.player.ready().then(function() {
              var iframe = _this2.container.querySelector("iframe");
              iframe.style.width = "100%";
              iframe.style.height = "100%";
              if (title) {
                iframe.title = title;
              }
            })["catch"](_this2.props.onError);
            _this2.player.on("loaded", function() {
              _this2.props.onReady();
              _this2.refreshDuration();
            });
            _this2.player.on("play", function() {
              _this2.props.onPlay();
              _this2.refreshDuration();
            });
            _this2.player.on("pause", _this2.props.onPause);
            _this2.player.on("seeked", function(e) {
              return _this2.props.onSeek(e.seconds);
            });
            _this2.player.on("ended", _this2.props.onEnded);
            _this2.player.on("error", _this2.props.onError);
            _this2.player.on("timeupdate", function(_ref) {
              var seconds = _ref.seconds;
              _this2.currentTime = seconds;
            });
            _this2.player.on("progress", function(_ref2) {
              var seconds = _ref2.seconds;
              _this2.secondsLoaded = seconds;
            });
            _this2.player.on("bufferstart", _this2.props.onBuffer);
            _this2.player.on("bufferend", _this2.props.onBufferEnd);
            _this2.player.on("playbackratechange", function(e) {
              return _this2.props.onPlaybackRateChange(e.playbackRate);
            });
          }, this.props.onError);
        }
      }, {
        key: "refreshDuration",
        value: function refreshDuration() {
          var _this3 = this;
          this.player.getDuration().then(function(duration) {
            _this3.duration = duration;
          });
        }
      }, {
        key: "play",
        value: function play() {
          var promise = this.callPlayer("play");
          if (promise) {
            promise["catch"](this.props.onError);
          }
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
          this.callPlayer("unload");
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.callPlayer("setCurrentTime", seconds);
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "setMuted",
        value: function setMuted(muted) {
          this.callPlayer("setMuted", muted);
        }
      }, {
        key: "setLoop",
        value: function setLoop(loop) {
          this.callPlayer("setLoop", loop);
        }
      }, {
        key: "setPlaybackRate",
        value: function setPlaybackRate(rate) {
          this.callPlayer("setPlaybackRate", rate);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.secondsLoaded;
        }
      }, {
        key: "render",
        value: function render() {
          var display = this.props.display;
          var style = {
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display
          };
          return _react["default"].createElement("div", {
            key: this.props.url,
            ref: this.ref,
            style
          });
        }
      }]);
      return Vimeo2;
    }(_react.Component);
    exports["default"] = Vimeo;
    _defineProperty(Vimeo, "displayName", "Vimeo");
    _defineProperty(Vimeo, "canPlay", _patterns.canPlay.vimeo);
    _defineProperty(Vimeo, "forceLoad", true);
  }
});

// node_modules/react-player/lib/players/Facebook.js
var require_Facebook = __commonJS({
  "node_modules/react-player/lib/players/Facebook.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://connect.facebook.net/en_US/sdk.js";
    var SDK_GLOBAL = "FB";
    var SDK_GLOBAL_READY = "fbAsyncInit";
    var PLAYER_ID_PREFIX = "facebook-player-";
    var Facebook = function(_Component) {
      _inherits(Facebook2, _Component);
      var _super = _createSuper(Facebook2);
      function Facebook2() {
        var _this;
        _classCallCheck(this, Facebook2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "playerID", _this.props.config.playerId || "".concat(PLAYER_ID_PREFIX).concat((0, _utils.randomString)()));
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.callPlayer("mute");
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          _this.callPlayer("unmute");
        });
        return _this;
      }
      _createClass(Facebook2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load(url, isReady) {
          var _this2 = this;
          if (isReady) {
            (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(function(FB) {
              return FB.XFBML.parse();
            });
            return;
          }
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(function(FB) {
            FB.init({
              appId: _this2.props.config.appId,
              xfbml: true,
              version: _this2.props.config.version
            });
            FB.Event.subscribe("xfbml.render", function(msg) {
              _this2.props.onLoaded();
            });
            FB.Event.subscribe("xfbml.ready", function(msg) {
              if (msg.type === "video" && msg.id === _this2.playerID) {
                _this2.player = msg.instance;
                _this2.player.subscribe("startedPlaying", _this2.props.onPlay);
                _this2.player.subscribe("paused", _this2.props.onPause);
                _this2.player.subscribe("finishedPlaying", _this2.props.onEnded);
                _this2.player.subscribe("startedBuffering", _this2.props.onBuffer);
                _this2.player.subscribe("finishedBuffering", _this2.props.onBufferEnd);
                _this2.player.subscribe("error", _this2.props.onError);
                if (_this2.props.muted) {
                  _this2.callPlayer("mute");
                } else {
                  _this2.callPlayer("unmute");
                }
                _this2.props.onReady();
                document.getElementById(_this2.playerID).querySelector("iframe").style.visibility = "visible";
              }
            });
          });
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.callPlayer("seek", seconds);
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.callPlayer("getDuration");
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.callPlayer("getCurrentPosition");
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return null;
        }
      }, {
        key: "render",
        value: function render() {
          var attributes = this.props.config.attributes;
          var style = {
            width: "100%",
            height: "100%"
          };
          return _react["default"].createElement("div", _extends({
            style,
            id: this.playerID,
            className: "fb-video",
            "data-href": this.props.url,
            "data-autoplay": this.props.playing ? "true" : "false",
            "data-allowfullscreen": "true",
            "data-controls": this.props.controls ? "true" : "false"
          }, attributes));
        }
      }]);
      return Facebook2;
    }(_react.Component);
    exports["default"] = Facebook;
    _defineProperty(Facebook, "displayName", "Facebook");
    _defineProperty(Facebook, "canPlay", _patterns.canPlay.facebook);
    _defineProperty(Facebook, "loopOnEnded", true);
  }
});

// node_modules/react-player/lib/players/Streamable.js
var require_Streamable = __commonJS({
  "node_modules/react-player/lib/players/Streamable.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://cdn.embed.ly/player-0.1.0.min.js";
    var SDK_GLOBAL = "playerjs";
    var Streamable = function(_Component) {
      _inherits(Streamable2, _Component);
      var _super = _createSuper(Streamable2);
      function Streamable2() {
        var _this;
        _classCallCheck(this, Streamable2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "duration", null);
        _defineProperty(_assertThisInitialized(_this), "currentTime", null);
        _defineProperty(_assertThisInitialized(_this), "secondsLoaded", null);
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.callPlayer("mute");
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          _this.callPlayer("unmute");
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(iframe) {
          _this.iframe = iframe;
        });
        return _this;
      }
      _createClass(Streamable2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load(url) {
          var _this2 = this;
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function(playerjs) {
            if (!_this2.iframe)
              return;
            _this2.player = new playerjs.Player(_this2.iframe);
            _this2.player.setLoop(_this2.props.loop);
            _this2.player.on("ready", _this2.props.onReady);
            _this2.player.on("play", _this2.props.onPlay);
            _this2.player.on("pause", _this2.props.onPause);
            _this2.player.on("seeked", _this2.props.onSeek);
            _this2.player.on("ended", _this2.props.onEnded);
            _this2.player.on("error", _this2.props.onError);
            _this2.player.on("timeupdate", function(_ref) {
              var duration = _ref.duration, seconds = _ref.seconds;
              _this2.duration = duration;
              _this2.currentTime = seconds;
            });
            _this2.player.on("buffered", function(_ref2) {
              var percent = _ref2.percent;
              if (_this2.duration) {
                _this2.secondsLoaded = _this2.duration * percent;
              }
            });
            if (_this2.props.muted) {
              _this2.player.mute();
            }
          }, this.props.onError);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.callPlayer("setCurrentTime", seconds);
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction * 100);
        }
      }, {
        key: "setLoop",
        value: function setLoop(loop) {
          this.callPlayer("setLoop", loop);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.secondsLoaded;
        }
      }, {
        key: "render",
        value: function render() {
          var id = this.props.url.match(_patterns.MATCH_URL_STREAMABLE)[1];
          var style = {
            width: "100%",
            height: "100%"
          };
          return _react["default"].createElement("iframe", {
            ref: this.ref,
            src: "https://streamable.com/o/".concat(id),
            frameBorder: "0",
            scrolling: "no",
            style,
            allow: "encrypted-media; autoplay; fullscreen;"
          });
        }
      }]);
      return Streamable2;
    }(_react.Component);
    exports["default"] = Streamable;
    _defineProperty(Streamable, "displayName", "Streamable");
    _defineProperty(Streamable, "canPlay", _patterns.canPlay.streamable);
  }
});

// node_modules/react-player/lib/players/Wistia.js
var require_Wistia = __commonJS({
  "node_modules/react-player/lib/players/Wistia.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://fast.wistia.com/assets/external/E-v1.js";
    var SDK_GLOBAL = "Wistia";
    var PLAYER_ID_PREFIX = "wistia-player-";
    var Wistia = function(_Component) {
      _inherits(Wistia2, _Component);
      var _super = _createSuper(Wistia2);
      function Wistia2() {
        var _this;
        _classCallCheck(this, Wistia2);
        for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
          _args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(_args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "playerID", _this.props.config.playerId || "".concat(PLAYER_ID_PREFIX).concat((0, _utils.randomString)()));
        _defineProperty(_assertThisInitialized(_this), "onPlay", function() {
          var _this$props;
          return (_this$props = _this.props).onPlay.apply(_this$props, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onPause", function() {
          var _this$props2;
          return (_this$props2 = _this.props).onPause.apply(_this$props2, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onSeek", function() {
          var _this$props3;
          return (_this$props3 = _this.props).onSeek.apply(_this$props3, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onEnded", function() {
          var _this$props4;
          return (_this$props4 = _this.props).onEnded.apply(_this$props4, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onPlaybackRateChange", function() {
          var _this$props5;
          return (_this$props5 = _this.props).onPlaybackRateChange.apply(_this$props5, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.callPlayer("mute");
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          _this.callPlayer("unmute");
        });
        return _this;
      }
      _createClass(Wistia2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load(url) {
          var _this2 = this;
          var _this$props6 = this.props, playing = _this$props6.playing, muted = _this$props6.muted, controls = _this$props6.controls, _onReady = _this$props6.onReady, config = _this$props6.config, onError = _this$props6.onError;
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function(Wistia3) {
            if (config.customControls) {
              config.customControls.forEach(function(control) {
                return Wistia3.defineControl(control);
              });
            }
            window._wq = window._wq || [];
            window._wq.push({
              id: _this2.playerID,
              options: _objectSpread({
                autoPlay: playing,
                silentAutoPlay: "allow",
                muted,
                controlsVisibleOnLoad: controls,
                fullscreenButton: controls,
                playbar: controls,
                playbackRateControl: controls,
                qualityControl: controls,
                volumeControl: controls,
                settingsControl: controls,
                smallPlayButton: controls
              }, config.options),
              onReady: function onReady(player) {
                _this2.player = player;
                _this2.unbind();
                _this2.player.bind("play", _this2.onPlay);
                _this2.player.bind("pause", _this2.onPause);
                _this2.player.bind("seek", _this2.onSeek);
                _this2.player.bind("end", _this2.onEnded);
                _this2.player.bind("playbackratechange", _this2.onPlaybackRateChange);
                _onReady();
              }
            });
          }, onError);
        }
      }, {
        key: "unbind",
        value: function unbind() {
          this.player.unbind("play", this.onPlay);
          this.player.unbind("pause", this.onPause);
          this.player.unbind("seek", this.onSeek);
          this.player.unbind("end", this.onEnded);
          this.player.unbind("playbackratechange", this.onPlaybackRateChange);
        }
        // Proxy methods to prevent listener leaks
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
          this.unbind();
          this.callPlayer("remove");
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.callPlayer("time", seconds);
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("volume", fraction);
        }
      }, {
        key: "setPlaybackRate",
        value: function setPlaybackRate(rate) {
          this.callPlayer("playbackRate", rate);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.callPlayer("duration");
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.callPlayer("time");
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return null;
        }
      }, {
        key: "render",
        value: function render() {
          var url = this.props.url;
          var videoID = url && url.match(_patterns.MATCH_URL_WISTIA)[1];
          var className = "wistia_embed wistia_async_".concat(videoID);
          var style = {
            width: "100%",
            height: "100%"
          };
          return _react["default"].createElement("div", {
            id: this.playerID,
            key: videoID,
            className,
            style
          });
        }
      }]);
      return Wistia2;
    }(_react.Component);
    exports["default"] = Wistia;
    _defineProperty(Wistia, "displayName", "Wistia");
    _defineProperty(Wistia, "canPlay", _patterns.canPlay.wistia);
    _defineProperty(Wistia, "loopOnEnded", true);
  }
});

// node_modules/react-player/lib/players/Twitch.js
var require_Twitch = __commonJS({
  "node_modules/react-player/lib/players/Twitch.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://player.twitch.tv/js/embed/v1.js";
    var SDK_GLOBAL = "Twitch";
    var PLAYER_ID_PREFIX = "twitch-player-";
    var Twitch = function(_Component) {
      _inherits(Twitch2, _Component);
      var _super = _createSuper(Twitch2);
      function Twitch2() {
        var _this;
        _classCallCheck(this, Twitch2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "playerID", _this.props.config.playerId || "".concat(PLAYER_ID_PREFIX).concat((0, _utils.randomString)()));
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.callPlayer("setMuted", true);
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          _this.callPlayer("setMuted", false);
        });
        return _this;
      }
      _createClass(Twitch2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load(url, isReady) {
          var _this2 = this;
          var _this$props = this.props, playsinline = _this$props.playsinline, onError = _this$props.onError, config = _this$props.config, controls = _this$props.controls;
          var isChannel = _patterns.MATCH_URL_TWITCH_CHANNEL.test(url);
          var id = isChannel ? url.match(_patterns.MATCH_URL_TWITCH_CHANNEL)[1] : url.match(_patterns.MATCH_URL_TWITCH_VIDEO)[1];
          if (isReady) {
            if (isChannel) {
              this.player.setChannel(id);
            } else {
              this.player.setVideo("v" + id);
            }
            return;
          }
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function(Twitch3) {
            _this2.player = new Twitch3.Player(_this2.playerID, _objectSpread({
              video: isChannel ? "" : id,
              channel: isChannel ? id : "",
              height: "100%",
              width: "100%",
              playsinline,
              autoplay: _this2.props.playing,
              muted: _this2.props.muted,
              // https://github.com/CookPete/react-player/issues/733#issuecomment-549085859
              controls: isChannel ? true : controls,
              time: (0, _utils.parseStartTime)(url)
            }, config.options));
            var _Twitch$Player = Twitch3.Player, READY = _Twitch$Player.READY, PLAYING = _Twitch$Player.PLAYING, PAUSE = _Twitch$Player.PAUSE, ENDED = _Twitch$Player.ENDED, ONLINE = _Twitch$Player.ONLINE, OFFLINE = _Twitch$Player.OFFLINE, SEEK = _Twitch$Player.SEEK;
            _this2.player.addEventListener(READY, _this2.props.onReady);
            _this2.player.addEventListener(PLAYING, _this2.props.onPlay);
            _this2.player.addEventListener(PAUSE, _this2.props.onPause);
            _this2.player.addEventListener(ENDED, _this2.props.onEnded);
            _this2.player.addEventListener(SEEK, _this2.props.onSeek);
            _this2.player.addEventListener(ONLINE, _this2.props.onLoaded);
            _this2.player.addEventListener(OFFLINE, _this2.props.onLoaded);
          }, onError);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
          this.callPlayer("pause");
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.callPlayer("seek", seconds);
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.callPlayer("getDuration");
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.callPlayer("getCurrentTime");
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return null;
        }
      }, {
        key: "render",
        value: function render() {
          var style = {
            width: "100%",
            height: "100%"
          };
          return _react["default"].createElement("div", {
            style,
            id: this.playerID
          });
        }
      }]);
      return Twitch2;
    }(_react.Component);
    exports["default"] = Twitch;
    _defineProperty(Twitch, "displayName", "Twitch");
    _defineProperty(Twitch, "canPlay", _patterns.canPlay.twitch);
    _defineProperty(Twitch, "loopOnEnded", true);
  }
});

// node_modules/react-player/lib/players/DailyMotion.js
var require_DailyMotion = __commonJS({
  "node_modules/react-player/lib/players/DailyMotion.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _iterableToArrayLimit(arr, i) {
      if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
        return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = void 0;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i)
            break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null)
            _i["return"]();
        } finally {
          if (_d)
            throw _e;
        }
      }
      return _arr;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://api.dmcdn.net/all.js";
    var SDK_GLOBAL = "DM";
    var SDK_GLOBAL_READY = "dmAsyncInit";
    var DailyMotion = function(_Component) {
      _inherits(DailyMotion2, _Component);
      var _super = _createSuper(DailyMotion2);
      function DailyMotion2() {
        var _this;
        _classCallCheck(this, DailyMotion2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "onDurationChange", function() {
          var duration = _this.getDuration();
          _this.props.onDuration(duration);
        });
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.callPlayer("setMuted", true);
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          _this.callPlayer("setMuted", false);
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(container) {
          _this.container = container;
        });
        return _this;
      }
      _createClass(DailyMotion2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load(url) {
          var _this2 = this;
          var _this$props = this.props, controls = _this$props.controls, config = _this$props.config, onError = _this$props.onError, playing = _this$props.playing;
          var _url$match = url.match(_patterns.MATCH_URL_DAILYMOTION), _url$match2 = _slicedToArray(_url$match, 2), id = _url$match2[1];
          if (this.player) {
            this.player.load(id, {
              start: (0, _utils.parseStartTime)(url),
              autoplay: playing
            });
            return;
          }
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function(DM) {
            return DM.player;
          }).then(function(DM) {
            if (!_this2.container)
              return;
            var Player = DM.player;
            _this2.player = new Player(_this2.container, {
              width: "100%",
              height: "100%",
              video: id,
              params: _objectSpread({
                controls,
                autoplay: _this2.props.playing,
                mute: _this2.props.muted,
                start: (0, _utils.parseStartTime)(url),
                origin: window.location.origin
              }, config.params),
              events: {
                apiready: _this2.props.onReady,
                seeked: function seeked() {
                  return _this2.props.onSeek(_this2.player.currentTime);
                },
                video_end: _this2.props.onEnded,
                durationchange: _this2.onDurationChange,
                pause: _this2.props.onPause,
                playing: _this2.props.onPlay,
                waiting: _this2.props.onBuffer,
                error: function error(event) {
                  return onError(event);
                }
              }
            });
          }, onError);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.callPlayer("seek", seconds);
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.player.duration || null;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.player.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.player.bufferedTime;
        }
      }, {
        key: "render",
        value: function render() {
          var display = this.props.display;
          var style = {
            width: "100%",
            height: "100%",
            display
          };
          return _react["default"].createElement("div", {
            style
          }, _react["default"].createElement("div", {
            ref: this.ref
          }));
        }
      }]);
      return DailyMotion2;
    }(_react.Component);
    exports["default"] = DailyMotion;
    _defineProperty(DailyMotion, "displayName", "DailyMotion");
    _defineProperty(DailyMotion, "canPlay", _patterns.canPlay.dailymotion);
    _defineProperty(DailyMotion, "loopOnEnded", true);
  }
});

// node_modules/react-player/lib/players/Mixcloud.js
var require_Mixcloud = __commonJS({
  "node_modules/react-player/lib/players/Mixcloud.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://widget.mixcloud.com/media/js/widgetApi.js";
    var SDK_GLOBAL = "Mixcloud";
    var Mixcloud = function(_Component) {
      _inherits(Mixcloud2, _Component);
      var _super = _createSuper(Mixcloud2);
      function Mixcloud2() {
        var _this;
        _classCallCheck(this, Mixcloud2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "duration", null);
        _defineProperty(_assertThisInitialized(_this), "currentTime", null);
        _defineProperty(_assertThisInitialized(_this), "secondsLoaded", null);
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(iframe) {
          _this.iframe = iframe;
        });
        return _this;
      }
      _createClass(Mixcloud2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load(url) {
          var _this2 = this;
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function(Mixcloud3) {
            _this2.player = Mixcloud3.PlayerWidget(_this2.iframe);
            _this2.player.ready.then(function() {
              _this2.player.events.play.on(_this2.props.onPlay);
              _this2.player.events.pause.on(_this2.props.onPause);
              _this2.player.events.ended.on(_this2.props.onEnded);
              _this2.player.events.error.on(_this2.props.error);
              _this2.player.events.progress.on(function(seconds, duration) {
                _this2.currentTime = seconds;
                _this2.duration = duration;
              });
              _this2.props.onReady();
            });
          }, this.props.onError);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.callPlayer("seek", seconds);
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return null;
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props, url = _this$props.url, config = _this$props.config;
          var id = url.match(_patterns.MATCH_URL_MIXCLOUD)[1];
          var style = {
            width: "100%",
            height: "100%"
          };
          var query = (0, _utils.queryString)(_objectSpread(_objectSpread({}, config.options), {}, {
            feed: "/".concat(id, "/")
          }));
          return _react["default"].createElement("iframe", {
            key: id,
            ref: this.ref,
            style,
            src: "https://www.mixcloud.com/widget/iframe/?".concat(query),
            frameBorder: "0",
            allow: "autoplay"
          });
        }
      }]);
      return Mixcloud2;
    }(_react.Component);
    exports["default"] = Mixcloud;
    _defineProperty(Mixcloud, "displayName", "Mixcloud");
    _defineProperty(Mixcloud, "canPlay", _patterns.canPlay.mixcloud);
    _defineProperty(Mixcloud, "loopOnEnded", true);
  }
});

// node_modules/react-player/lib/players/Vidyard.js
var require_Vidyard = __commonJS({
  "node_modules/react-player/lib/players/Vidyard.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://play.vidyard.com/embed/v4.js";
    var SDK_GLOBAL = "VidyardV4";
    var SDK_GLOBAL_READY = "onVidyardAPI";
    var Vidyard = function(_Component) {
      _inherits(Vidyard2, _Component);
      var _super = _createSuper(Vidyard2);
      function Vidyard2() {
        var _this;
        _classCallCheck(this, Vidyard2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.setVolume(0);
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          if (_this.props.volume !== null) {
            _this.setVolume(_this.props.volume);
          }
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(container) {
          _this.container = container;
        });
        return _this;
      }
      _createClass(Vidyard2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load(url) {
          var _this2 = this;
          var _this$props = this.props, playing = _this$props.playing, config = _this$props.config, onError = _this$props.onError, onDuration = _this$props.onDuration;
          var id = url && url.match(_patterns.MATCH_URL_VIDYARD)[1];
          if (this.player) {
            this.stop();
          }
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY).then(function(Vidyard3) {
            if (!_this2.container)
              return;
            Vidyard3.api.addReadyListener(function(data, player) {
              if (_this2.player) {
                return;
              }
              _this2.player = player;
              _this2.player.on("ready", _this2.props.onReady);
              _this2.player.on("play", _this2.props.onPlay);
              _this2.player.on("pause", _this2.props.onPause);
              _this2.player.on("seek", _this2.props.onSeek);
              _this2.player.on("playerComplete", _this2.props.onEnded);
            }, id);
            Vidyard3.api.renderPlayer(_objectSpread({
              uuid: id,
              container: _this2.container,
              autoplay: playing ? 1 : 0
            }, config.options));
            Vidyard3.api.getPlayerMetadata(id).then(function(meta) {
              _this2.duration = meta.length_in_seconds;
              onDuration(meta.length_in_seconds);
            });
          }, onError);
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
          window.VidyardV4.api.destroyPlayer(this.player);
        }
      }, {
        key: "seekTo",
        value: function seekTo(amount) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.callPlayer("seek", amount);
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "setPlaybackRate",
        value: function setPlaybackRate(rate) {
          this.callPlayer("setPlaybackSpeed", rate);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.callPlayer("currentTime");
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return null;
        }
      }, {
        key: "render",
        value: function render() {
          var display = this.props.display;
          var style = {
            width: "100%",
            height: "100%",
            display
          };
          return _react["default"].createElement("div", {
            style
          }, _react["default"].createElement("div", {
            ref: this.ref
          }));
        }
      }]);
      return Vidyard2;
    }(_react.Component);
    exports["default"] = Vidyard;
    _defineProperty(Vidyard, "displayName", "Vidyard");
    _defineProperty(Vidyard, "canPlay", _patterns.canPlay.vidyard);
  }
});

// node_modules/react-player/lib/players/Kaltura.js
var require_Kaltura = __commonJS({
  "node_modules/react-player/lib/players/Kaltura.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SDK_URL = "https://cdn.embed.ly/player-0.1.0.min.js";
    var SDK_GLOBAL = "playerjs";
    var Kaltura = function(_Component) {
      _inherits(Kaltura2, _Component);
      var _super = _createSuper(Kaltura2);
      function Kaltura2() {
        var _this;
        _classCallCheck(this, Kaltura2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "callPlayer", _utils.callPlayer);
        _defineProperty(_assertThisInitialized(_this), "duration", null);
        _defineProperty(_assertThisInitialized(_this), "currentTime", null);
        _defineProperty(_assertThisInitialized(_this), "secondsLoaded", null);
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.callPlayer("mute");
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          _this.callPlayer("unmute");
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(iframe) {
          _this.iframe = iframe;
        });
        return _this;
      }
      _createClass(Kaltura2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
        }
      }, {
        key: "load",
        value: function load(url) {
          var _this2 = this;
          (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function(playerjs) {
            if (!_this2.iframe)
              return;
            _this2.player = new playerjs.Player(_this2.iframe);
            _this2.player.on("ready", function() {
              setTimeout(function() {
                _this2.player.isReady = true;
                _this2.player.setLoop(_this2.props.loop);
                if (_this2.props.muted) {
                  _this2.player.mute();
                }
                _this2.addListeners(_this2.player, _this2.props);
                _this2.props.onReady();
              }, 500);
            });
          }, this.props.onError);
        }
      }, {
        key: "addListeners",
        value: function addListeners(player, props) {
          var _this3 = this;
          player.on("play", props.onPlay);
          player.on("pause", props.onPause);
          player.on("ended", props.onEnded);
          player.on("error", props.onError);
          player.on("timeupdate", function(_ref) {
            var duration = _ref.duration, seconds = _ref.seconds;
            _this3.duration = duration;
            _this3.currentTime = seconds;
          });
        }
      }, {
        key: "play",
        value: function play() {
          this.callPlayer("play");
        }
      }, {
        key: "pause",
        value: function pause() {
          this.callPlayer("pause");
        }
      }, {
        key: "stop",
        value: function stop() {
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.callPlayer("setCurrentTime", seconds);
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.callPlayer("setVolume", fraction);
        }
      }, {
        key: "setLoop",
        value: function setLoop(loop) {
          this.callPlayer("setLoop", loop);
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          return this.duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          return this.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          return this.secondsLoaded;
        }
      }, {
        key: "render",
        value: function render() {
          var style = {
            width: "100%",
            height: "100%"
          };
          return _react["default"].createElement("iframe", {
            ref: this.ref,
            src: this.props.url,
            frameBorder: "0",
            scrolling: "no",
            style,
            allow: "encrypted-media; autoplay; fullscreen;",
            referrerPolicy: "no-referrer-when-downgrade"
          });
        }
      }]);
      return Kaltura2;
    }(_react.Component);
    exports["default"] = Kaltura;
    _defineProperty(Kaltura, "displayName", "Kaltura");
    _defineProperty(Kaltura, "canPlay", _patterns.canPlay.kaltura);
  }
});

// node_modules/react-player/lib/players/FilePlayer.js
var require_FilePlayer = __commonJS({
  "node_modules/react-player/lib/players/FilePlayer.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var HAS_NAVIGATOR = typeof navigator !== "undefined";
    var IS_IPAD_PRO = HAS_NAVIGATOR && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    var IS_IOS = HAS_NAVIGATOR && (/iPad|iPhone|iPod/.test(navigator.userAgent) || IS_IPAD_PRO) && !window.MSStream;
    var IS_SAFARI = HAS_NAVIGATOR && /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && !window.MSStream;
    var HLS_SDK_URL = "https://cdn.jsdelivr.net/npm/hls.js@VERSION/dist/hls.min.js";
    var HLS_GLOBAL = "Hls";
    var DASH_SDK_URL = "https://cdnjs.cloudflare.com/ajax/libs/dashjs/VERSION/dash.all.min.js";
    var DASH_GLOBAL = "dashjs";
    var FLV_SDK_URL = "https://cdn.jsdelivr.net/npm/flv.js@VERSION/dist/flv.min.js";
    var FLV_GLOBAL = "flvjs";
    var MATCH_DROPBOX_URL = /www\.dropbox\.com\/.+/;
    var MATCH_CLOUDFLARE_STREAM = /https:\/\/watch\.cloudflarestream\.com\/([a-z0-9]+)/;
    var REPLACE_CLOUDFLARE_STREAM = "https://videodelivery.net/{id}/manifest/video.m3u8";
    var FilePlayer = function(_Component) {
      _inherits(FilePlayer2, _Component);
      var _super = _createSuper(FilePlayer2);
      function FilePlayer2() {
        var _this;
        _classCallCheck(this, FilePlayer2);
        for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
          _args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(_args));
        _defineProperty(_assertThisInitialized(_this), "onReady", function() {
          var _this$props;
          return (_this$props = _this.props).onReady.apply(_this$props, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onPlay", function() {
          var _this$props2;
          return (_this$props2 = _this.props).onPlay.apply(_this$props2, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onBuffer", function() {
          var _this$props3;
          return (_this$props3 = _this.props).onBuffer.apply(_this$props3, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onBufferEnd", function() {
          var _this$props4;
          return (_this$props4 = _this.props).onBufferEnd.apply(_this$props4, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onPause", function() {
          var _this$props5;
          return (_this$props5 = _this.props).onPause.apply(_this$props5, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onEnded", function() {
          var _this$props6;
          return (_this$props6 = _this.props).onEnded.apply(_this$props6, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onError", function() {
          var _this$props7;
          return (_this$props7 = _this.props).onError.apply(_this$props7, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onPlayBackRateChange", function(event) {
          return _this.props.onPlaybackRateChange(event.target.playbackRate);
        });
        _defineProperty(_assertThisInitialized(_this), "onEnablePIP", function() {
          var _this$props8;
          return (_this$props8 = _this.props).onEnablePIP.apply(_this$props8, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "onDisablePIP", function(e) {
          var _this$props9 = _this.props, onDisablePIP = _this$props9.onDisablePIP, playing = _this$props9.playing;
          onDisablePIP(e);
          if (playing) {
            _this.play();
          }
        });
        _defineProperty(_assertThisInitialized(_this), "onPresentationModeChange", function(e) {
          if (_this.player && (0, _utils.supportsWebKitPresentationMode)(_this.player)) {
            var webkitPresentationMode = _this.player.webkitPresentationMode;
            if (webkitPresentationMode === "picture-in-picture") {
              _this.onEnablePIP(e);
            } else if (webkitPresentationMode === "inline") {
              _this.onDisablePIP(e);
            }
          }
        });
        _defineProperty(_assertThisInitialized(_this), "onSeek", function(e) {
          _this.props.onSeek(e.target.currentTime);
        });
        _defineProperty(_assertThisInitialized(_this), "mute", function() {
          _this.player.muted = true;
        });
        _defineProperty(_assertThisInitialized(_this), "unmute", function() {
          _this.player.muted = false;
        });
        _defineProperty(_assertThisInitialized(_this), "renderSourceElement", function(source, index) {
          if (typeof source === "string") {
            return _react["default"].createElement("source", {
              key: index,
              src: source
            });
          }
          return _react["default"].createElement("source", _extends({
            key: index
          }, source));
        });
        _defineProperty(_assertThisInitialized(_this), "renderTrack", function(track, index) {
          return _react["default"].createElement("track", _extends({
            key: index
          }, track));
        });
        _defineProperty(_assertThisInitialized(_this), "ref", function(player) {
          if (_this.player) {
            _this.prevPlayer = _this.player;
          }
          _this.player = player;
        });
        return _this;
      }
      _createClass(FilePlayer2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.props.onMount && this.props.onMount(this);
          this.addListeners(this.player);
          var src = this.getSource(this.props.url);
          if (src) {
            this.player.src = src;
          }
          if (IS_IOS || this.props.config.forceDisableHls) {
            this.player.load();
          }
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          if (this.shouldUseAudio(this.props) !== this.shouldUseAudio(prevProps)) {
            this.removeListeners(this.prevPlayer, prevProps.url);
            this.addListeners(this.player);
          }
          if (this.props.url !== prevProps.url && !(0, _utils.isMediaStream)(this.props.url) && !(this.props.url instanceof Array)) {
            this.player.srcObject = null;
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.player.removeAttribute("src");
          this.removeListeners(this.player);
          if (this.hls) {
            this.hls.destroy();
          }
        }
      }, {
        key: "addListeners",
        value: function addListeners(player) {
          var _this$props10 = this.props, url = _this$props10.url, playsinline = _this$props10.playsinline;
          player.addEventListener("play", this.onPlay);
          player.addEventListener("waiting", this.onBuffer);
          player.addEventListener("playing", this.onBufferEnd);
          player.addEventListener("pause", this.onPause);
          player.addEventListener("seeked", this.onSeek);
          player.addEventListener("ended", this.onEnded);
          player.addEventListener("error", this.onError);
          player.addEventListener("ratechange", this.onPlayBackRateChange);
          player.addEventListener("enterpictureinpicture", this.onEnablePIP);
          player.addEventListener("leavepictureinpicture", this.onDisablePIP);
          player.addEventListener("webkitpresentationmodechanged", this.onPresentationModeChange);
          if (!this.shouldUseHLS(url)) {
            player.addEventListener("canplay", this.onReady);
          }
          if (playsinline) {
            player.setAttribute("playsinline", "");
            player.setAttribute("webkit-playsinline", "");
            player.setAttribute("x5-playsinline", "");
          }
        }
      }, {
        key: "removeListeners",
        value: function removeListeners(player, url) {
          player.removeEventListener("canplay", this.onReady);
          player.removeEventListener("play", this.onPlay);
          player.removeEventListener("waiting", this.onBuffer);
          player.removeEventListener("playing", this.onBufferEnd);
          player.removeEventListener("pause", this.onPause);
          player.removeEventListener("seeked", this.onSeek);
          player.removeEventListener("ended", this.onEnded);
          player.removeEventListener("error", this.onError);
          player.removeEventListener("ratechange", this.onPlayBackRateChange);
          player.removeEventListener("enterpictureinpicture", this.onEnablePIP);
          player.removeEventListener("leavepictureinpicture", this.onDisablePIP);
          player.removeEventListener("webkitpresentationmodechanged", this.onPresentationModeChange);
          if (!this.shouldUseHLS(url)) {
            player.removeEventListener("canplay", this.onReady);
          }
        }
        // Proxy methods to prevent listener leaks
      }, {
        key: "shouldUseAudio",
        value: function shouldUseAudio(props) {
          if (props.config.forceVideo) {
            return false;
          }
          if (props.config.attributes.poster) {
            return false;
          }
          return _patterns.AUDIO_EXTENSIONS.test(props.url) || props.config.forceAudio;
        }
      }, {
        key: "shouldUseHLS",
        value: function shouldUseHLS(url) {
          if (IS_SAFARI && this.props.config.forceSafariHLS || this.props.config.forceHLS) {
            return true;
          }
          if (IS_IOS || this.props.config.forceDisableHls) {
            return false;
          }
          return _patterns.HLS_EXTENSIONS.test(url) || MATCH_CLOUDFLARE_STREAM.test(url);
        }
      }, {
        key: "shouldUseDASH",
        value: function shouldUseDASH(url) {
          return _patterns.DASH_EXTENSIONS.test(url) || this.props.config.forceDASH;
        }
      }, {
        key: "shouldUseFLV",
        value: function shouldUseFLV(url) {
          return _patterns.FLV_EXTENSIONS.test(url) || this.props.config.forceFLV;
        }
      }, {
        key: "load",
        value: function load(url) {
          var _this2 = this;
          var _this$props$config = this.props.config, hlsVersion = _this$props$config.hlsVersion, hlsOptions = _this$props$config.hlsOptions, dashVersion = _this$props$config.dashVersion, flvVersion = _this$props$config.flvVersion;
          if (this.hls) {
            this.hls.destroy();
          }
          if (this.dash) {
            this.dash.reset();
          }
          if (this.shouldUseHLS(url)) {
            (0, _utils.getSDK)(HLS_SDK_URL.replace("VERSION", hlsVersion), HLS_GLOBAL).then(function(Hls) {
              _this2.hls = new Hls(hlsOptions);
              _this2.hls.on(Hls.Events.MANIFEST_PARSED, function() {
                _this2.props.onReady();
              });
              _this2.hls.on(Hls.Events.ERROR, function(e, data) {
                _this2.props.onError(e, data, _this2.hls, Hls);
              });
              if (MATCH_CLOUDFLARE_STREAM.test(url)) {
                var id = url.match(MATCH_CLOUDFLARE_STREAM)[1];
                _this2.hls.loadSource(REPLACE_CLOUDFLARE_STREAM.replace("{id}", id));
              } else {
                _this2.hls.loadSource(url);
              }
              _this2.hls.attachMedia(_this2.player);
              _this2.props.onLoaded();
            });
          }
          if (this.shouldUseDASH(url)) {
            (0, _utils.getSDK)(DASH_SDK_URL.replace("VERSION", dashVersion), DASH_GLOBAL).then(function(dashjs) {
              _this2.dash = dashjs.MediaPlayer().create();
              _this2.dash.initialize(_this2.player, url, _this2.props.playing);
              _this2.dash.on("error", _this2.props.onError);
              if (parseInt(dashVersion) < 3) {
                _this2.dash.getDebug().setLogToBrowserConsole(false);
              } else {
                _this2.dash.updateSettings({
                  debug: {
                    logLevel: dashjs.Debug.LOG_LEVEL_NONE
                  }
                });
              }
              _this2.props.onLoaded();
            });
          }
          if (this.shouldUseFLV(url)) {
            (0, _utils.getSDK)(FLV_SDK_URL.replace("VERSION", flvVersion), FLV_GLOBAL).then(function(flvjs) {
              _this2.flv = flvjs.createPlayer({
                type: "flv",
                url
              });
              _this2.flv.attachMediaElement(_this2.player);
              _this2.flv.on(flvjs.Events.ERROR, function(e, data) {
                _this2.props.onError(e, data, _this2.flv, flvjs);
              });
              _this2.flv.load();
              _this2.props.onLoaded();
            });
          }
          if (url instanceof Array) {
            this.player.load();
          } else if ((0, _utils.isMediaStream)(url)) {
            try {
              this.player.srcObject = url;
            } catch (e) {
              this.player.src = window.URL.createObjectURL(url);
            }
          }
        }
      }, {
        key: "play",
        value: function play() {
          var promise = this.player.play();
          if (promise) {
            promise["catch"](this.props.onError);
          }
        }
      }, {
        key: "pause",
        value: function pause() {
          this.player.pause();
        }
      }, {
        key: "stop",
        value: function stop() {
          this.player.removeAttribute("src");
          if (this.dash) {
            this.dash.reset();
          }
        }
      }, {
        key: "seekTo",
        value: function seekTo(seconds) {
          var keepPlaying = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          this.player.currentTime = seconds;
          if (!keepPlaying) {
            this.pause();
          }
        }
      }, {
        key: "setVolume",
        value: function setVolume(fraction) {
          this.player.volume = fraction;
        }
      }, {
        key: "enablePIP",
        value: function enablePIP() {
          if (this.player.requestPictureInPicture && document.pictureInPictureElement !== this.player) {
            this.player.requestPictureInPicture();
          } else if ((0, _utils.supportsWebKitPresentationMode)(this.player) && this.player.webkitPresentationMode !== "picture-in-picture") {
            this.player.webkitSetPresentationMode("picture-in-picture");
          }
        }
      }, {
        key: "disablePIP",
        value: function disablePIP() {
          if (document.exitPictureInPicture && document.pictureInPictureElement === this.player) {
            document.exitPictureInPicture();
          } else if ((0, _utils.supportsWebKitPresentationMode)(this.player) && this.player.webkitPresentationMode !== "inline") {
            this.player.webkitSetPresentationMode("inline");
          }
        }
      }, {
        key: "setPlaybackRate",
        value: function setPlaybackRate(rate) {
          try {
            this.player.playbackRate = rate;
          } catch (error) {
            this.props.onError(error);
          }
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          if (!this.player)
            return null;
          var _this$player = this.player, duration = _this$player.duration, seekable = _this$player.seekable;
          if (duration === Infinity && seekable.length > 0) {
            return seekable.end(seekable.length - 1);
          }
          return duration;
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          if (!this.player)
            return null;
          return this.player.currentTime;
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          if (!this.player)
            return null;
          var buffered = this.player.buffered;
          if (buffered.length === 0) {
            return 0;
          }
          var end = buffered.end(buffered.length - 1);
          var duration = this.getDuration();
          if (end > duration) {
            return duration;
          }
          return end;
        }
      }, {
        key: "getSource",
        value: function getSource(url) {
          var useHLS = this.shouldUseHLS(url);
          var useDASH = this.shouldUseDASH(url);
          var useFLV = this.shouldUseFLV(url);
          if (url instanceof Array || (0, _utils.isMediaStream)(url) || useHLS || useDASH || useFLV) {
            return void 0;
          }
          if (MATCH_DROPBOX_URL.test(url)) {
            return url.replace("www.dropbox.com", "dl.dropboxusercontent.com");
          }
          return url;
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props11 = this.props, url = _this$props11.url, playing = _this$props11.playing, loop = _this$props11.loop, controls = _this$props11.controls, muted = _this$props11.muted, config = _this$props11.config, width = _this$props11.width, height = _this$props11.height;
          var useAudio = this.shouldUseAudio(this.props);
          var Element2 = useAudio ? "audio" : "video";
          var style = {
            width: width === "auto" ? width : "100%",
            height: height === "auto" ? height : "100%"
          };
          return _react["default"].createElement(Element2, _extends({
            ref: this.ref,
            src: this.getSource(url),
            style,
            preload: "auto",
            autoPlay: playing || void 0,
            controls,
            muted,
            loop
          }, config.attributes), url instanceof Array && url.map(this.renderSourceElement), config.tracks.map(this.renderTrack));
        }
      }]);
      return FilePlayer2;
    }(_react.Component);
    exports["default"] = FilePlayer;
    _defineProperty(FilePlayer, "displayName", "FilePlayer");
    _defineProperty(FilePlayer, "canPlay", _patterns.canPlay.file);
  }
});

// node_modules/react-player/lib/players/index.js
var require_players = __commonJS({
  "node_modules/react-player/lib/players/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = require_react();
    var _utils = require_utils();
    var _patterns = require_patterns();
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var _default = [{
      key: "youtube",
      name: "YouTube",
      canPlay: _patterns.canPlay.youtube,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_YouTube());
        });
      })
    }, {
      key: "soundcloud",
      name: "SoundCloud",
      canPlay: _patterns.canPlay.soundcloud,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_SoundCloud());
        });
      })
    }, {
      key: "vimeo",
      name: "Vimeo",
      canPlay: _patterns.canPlay.vimeo,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_Vimeo());
        });
      })
    }, {
      key: "facebook",
      name: "Facebook",
      canPlay: _patterns.canPlay.facebook,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_Facebook());
        });
      })
    }, {
      key: "streamable",
      name: "Streamable",
      canPlay: _patterns.canPlay.streamable,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_Streamable());
        });
      })
    }, {
      key: "wistia",
      name: "Wistia",
      canPlay: _patterns.canPlay.wistia,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_Wistia());
        });
      })
    }, {
      key: "twitch",
      name: "Twitch",
      canPlay: _patterns.canPlay.twitch,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_Twitch());
        });
      })
    }, {
      key: "dailymotion",
      name: "DailyMotion",
      canPlay: _patterns.canPlay.dailymotion,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_DailyMotion());
        });
      })
    }, {
      key: "mixcloud",
      name: "Mixcloud",
      canPlay: _patterns.canPlay.mixcloud,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_Mixcloud());
        });
      })
    }, {
      key: "vidyard",
      name: "Vidyard",
      canPlay: _patterns.canPlay.vidyard,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_Vidyard());
        });
      })
    }, {
      key: "kaltura",
      name: "Kaltura",
      canPlay: _patterns.canPlay.kaltura,
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_Kaltura());
        });
      })
    }, {
      key: "file",
      name: "FilePlayer",
      canPlay: _patterns.canPlay.file,
      canEnablePIP: function canEnablePIP(url) {
        return _patterns.canPlay.file(url) && (document.pictureInPictureEnabled || (0, _utils.supportsWebKitPresentationMode)()) && !_patterns.AUDIO_EXTENSIONS.test(url);
      },
      lazyPlayer: (0, _react.lazy)(function() {
        return Promise.resolve().then(function() {
          return _interopRequireWildcard(require_FilePlayer());
        });
      })
    }];
    exports["default"] = _default;
  }
});

// node_modules/memoize-one/dist/memoize-one.esm.js
var memoize_one_esm_exports = {};
__export(memoize_one_esm_exports, {
  default: () => memoize_one_esm_default
});
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (safeIsNaN(first) && safeIsNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (var i = 0; i < newInputs.length; i++) {
    if (!isEqual(newInputs[i], lastInputs[i])) {
      return false;
    }
  }
  return true;
}
function memoizeOne(resultFn, isEqual2) {
  if (isEqual2 === void 0) {
    isEqual2 = areInputsEqual;
  }
  var lastThis;
  var lastArgs = [];
  var lastResult;
  var calledOnce = false;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      newArgs[_i] = arguments[_i];
    }
    if (calledOnce && lastThis === this && isEqual2(newArgs, lastArgs)) {
      return lastResult;
    }
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }
  return memoized;
}
var safeIsNaN, memoize_one_esm_default;
var init_memoize_one_esm = __esm({
  "node_modules/memoize-one/dist/memoize-one.esm.js"() {
    safeIsNaN = Number.isNaN || function ponyfill(value) {
      return typeof value === "number" && value !== value;
    };
    memoize_one_esm_default = memoizeOne;
  }
});

// node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "node_modules/react-fast-compare/index.js"(exports, module) {
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        var it;
        if (hasMap && a instanceof Map && b instanceof Map) {
          if (a.size !== b.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b.has(i.value[0]))
              return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!equal(i.value[1], b.get(i.value[0])))
              return false;
          return true;
        }
        if (hasSet && a instanceof Set && b instanceof Set) {
          if (a.size !== b.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b.has(i.value[0]))
              return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (a[i] !== b[i])
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function")
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function")
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        if (hasElementType && a instanceof Element)
          return false;
        for (i = length; i-- !== 0; ) {
          if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
            continue;
          }
          if (!equal(a[keys[i]], b[keys[i]]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }
    module.exports = function isEqual2(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error;
      }
    };
  }
});

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element2 = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element2;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
              );
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/react-player/lib/props.js
var require_props = __commonJS({
  "node_modules/react-player/lib/props.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.defaultProps = exports.propTypes = void 0;
    var _propTypes = _interopRequireDefault(require_prop_types());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var string = _propTypes["default"].string;
    var bool = _propTypes["default"].bool;
    var number = _propTypes["default"].number;
    var array = _propTypes["default"].array;
    var oneOfType = _propTypes["default"].oneOfType;
    var shape = _propTypes["default"].shape;
    var object = _propTypes["default"].object;
    var func = _propTypes["default"].func;
    var node = _propTypes["default"].node;
    var propTypes = {
      url: oneOfType([string, array, object]),
      playing: bool,
      loop: bool,
      controls: bool,
      volume: number,
      muted: bool,
      playbackRate: number,
      width: oneOfType([string, number]),
      height: oneOfType([string, number]),
      style: object,
      progressInterval: number,
      playsinline: bool,
      pip: bool,
      stopOnUnmount: bool,
      light: oneOfType([bool, string, object]),
      playIcon: node,
      previewTabIndex: number,
      fallback: node,
      oEmbedUrl: string,
      wrapper: oneOfType([string, func, shape({
        render: func.isRequired
      })]),
      config: shape({
        soundcloud: shape({
          options: object
        }),
        youtube: shape({
          playerVars: object,
          embedOptions: object,
          onUnstarted: func
        }),
        facebook: shape({
          appId: string,
          version: string,
          playerId: string,
          attributes: object
        }),
        dailymotion: shape({
          params: object
        }),
        vimeo: shape({
          playerOptions: object,
          title: string
        }),
        file: shape({
          attributes: object,
          tracks: array,
          forceVideo: bool,
          forceAudio: bool,
          forceHLS: bool,
          forceSafariHLS: bool,
          forceDisableHls: bool,
          forceDASH: bool,
          forceFLV: bool,
          hlsOptions: object,
          hlsVersion: string,
          dashVersion: string,
          flvVersion: string
        }),
        wistia: shape({
          options: object,
          playerId: string,
          customControls: array
        }),
        mixcloud: shape({
          options: object
        }),
        twitch: shape({
          options: object,
          playerId: string
        }),
        vidyard: shape({
          options: object
        })
      }),
      onReady: func,
      onStart: func,
      onPlay: func,
      onPause: func,
      onBuffer: func,
      onBufferEnd: func,
      onEnded: func,
      onError: func,
      onDuration: func,
      onSeek: func,
      onPlaybackRateChange: func,
      onPlaybackQualityChange: func,
      onProgress: func,
      onClickPreview: func,
      onEnablePIP: func,
      onDisablePIP: func
    };
    exports.propTypes = propTypes;
    var noop = function noop2() {
    };
    var defaultProps = {
      playing: false,
      loop: false,
      controls: false,
      volume: null,
      muted: false,
      playbackRate: 1,
      width: "640px",
      height: "360px",
      style: {},
      progressInterval: 1e3,
      playsinline: false,
      pip: false,
      stopOnUnmount: true,
      light: false,
      fallback: null,
      wrapper: "div",
      previewTabIndex: 0,
      oEmbedUrl: "https://noembed.com/embed?url={url}",
      config: {
        soundcloud: {
          options: {
            visual: true,
            // Undocumented, but makes player fill container and look better
            buying: false,
            liking: false,
            download: false,
            sharing: false,
            show_comments: false,
            show_playcount: false
          }
        },
        youtube: {
          playerVars: {
            playsinline: 1,
            showinfo: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1
          },
          embedOptions: {},
          onUnstarted: noop
        },
        facebook: {
          appId: "1309697205772819",
          version: "v3.3",
          playerId: null,
          attributes: {}
        },
        dailymotion: {
          params: {
            api: 1,
            "endscreen-enable": false
          }
        },
        vimeo: {
          playerOptions: {
            autopause: false,
            byline: false,
            portrait: false,
            title: false
          },
          title: null
        },
        file: {
          attributes: {},
          tracks: [],
          forceVideo: false,
          forceAudio: false,
          forceHLS: false,
          forceDASH: false,
          forceFLV: false,
          hlsOptions: {},
          hlsVersion: "1.1.4",
          dashVersion: "3.1.3",
          flvVersion: "1.5.0",
          forceDisableHls: false
        },
        wistia: {
          options: {},
          playerId: null,
          customControls: null
        },
        mixcloud: {
          options: {
            hide_cover: 1
          }
        },
        twitch: {
          options: {},
          playerId: null
        },
        vidyard: {
          options: {}
        }
      },
      onReady: noop,
      onStart: noop,
      onPlay: noop,
      onPause: noop,
      onBuffer: noop,
      onBufferEnd: noop,
      onEnded: noop,
      onError: noop,
      onDuration: noop,
      onSeek: noop,
      onPlaybackRateChange: noop,
      onPlaybackQualityChange: noop,
      onProgress: noop,
      onClickPreview: noop,
      onEnablePIP: noop,
      onDisablePIP: noop
    };
    exports.defaultProps = defaultProps;
  }
});

// node_modules/react-player/lib/Player.js
var require_Player = __commonJS({
  "node_modules/react-player/lib/Player.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _reactFastCompare = _interopRequireDefault(require_react_fast_compare());
    var _props = require_props();
    var _utils = require_utils();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var SEEK_ON_PLAY_EXPIRY = 5e3;
    var Player = function(_Component) {
      _inherits(Player2, _Component);
      var _super = _createSuper(Player2);
      function Player2() {
        var _this;
        _classCallCheck(this, Player2);
        for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
          _args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(_args));
        _defineProperty(_assertThisInitialized(_this), "mounted", false);
        _defineProperty(_assertThisInitialized(_this), "isReady", false);
        _defineProperty(_assertThisInitialized(_this), "isPlaying", false);
        _defineProperty(_assertThisInitialized(_this), "isLoading", true);
        _defineProperty(_assertThisInitialized(_this), "loadOnReady", null);
        _defineProperty(_assertThisInitialized(_this), "startOnPlay", true);
        _defineProperty(_assertThisInitialized(_this), "seekOnPlay", null);
        _defineProperty(_assertThisInitialized(_this), "onDurationCalled", false);
        _defineProperty(_assertThisInitialized(_this), "handlePlayerMount", function(player) {
          if (_this.player) {
            _this.progress();
            return;
          }
          _this.player = player;
          _this.player.load(_this.props.url);
          _this.progress();
        });
        _defineProperty(_assertThisInitialized(_this), "getInternalPlayer", function(key) {
          if (!_this.player)
            return null;
          return _this.player[key];
        });
        _defineProperty(_assertThisInitialized(_this), "progress", function() {
          if (_this.props.url && _this.player && _this.isReady) {
            var playedSeconds = _this.getCurrentTime() || 0;
            var loadedSeconds = _this.getSecondsLoaded();
            var duration = _this.getDuration();
            if (duration) {
              var progress = {
                playedSeconds,
                played: playedSeconds / duration
              };
              if (loadedSeconds !== null) {
                progress.loadedSeconds = loadedSeconds;
                progress.loaded = loadedSeconds / duration;
              }
              if (progress.playedSeconds !== _this.prevPlayed || progress.loadedSeconds !== _this.prevLoaded) {
                _this.props.onProgress(progress);
              }
              _this.prevPlayed = progress.playedSeconds;
              _this.prevLoaded = progress.loadedSeconds;
            }
          }
          _this.progressTimeout = setTimeout(_this.progress, _this.props.progressFrequency || _this.props.progressInterval);
        });
        _defineProperty(_assertThisInitialized(_this), "handleReady", function() {
          if (!_this.mounted)
            return;
          _this.isReady = true;
          _this.isLoading = false;
          var _this$props = _this.props, onReady = _this$props.onReady, playing = _this$props.playing, volume = _this$props.volume, muted = _this$props.muted;
          onReady();
          if (!muted && volume !== null) {
            _this.player.setVolume(volume);
          }
          if (_this.loadOnReady) {
            _this.player.load(_this.loadOnReady, true);
            _this.loadOnReady = null;
          } else if (playing) {
            _this.player.play();
          }
          _this.handleDurationCheck();
        });
        _defineProperty(_assertThisInitialized(_this), "handlePlay", function() {
          _this.isPlaying = true;
          _this.isLoading = false;
          var _this$props2 = _this.props, onStart = _this$props2.onStart, onPlay = _this$props2.onPlay, playbackRate = _this$props2.playbackRate;
          if (_this.startOnPlay) {
            if (_this.player.setPlaybackRate && playbackRate !== 1) {
              _this.player.setPlaybackRate(playbackRate);
            }
            onStart();
            _this.startOnPlay = false;
          }
          onPlay();
          if (_this.seekOnPlay) {
            _this.seekTo(_this.seekOnPlay);
            _this.seekOnPlay = null;
          }
          _this.handleDurationCheck();
        });
        _defineProperty(_assertThisInitialized(_this), "handlePause", function(e) {
          _this.isPlaying = false;
          if (!_this.isLoading) {
            _this.props.onPause(e);
          }
        });
        _defineProperty(_assertThisInitialized(_this), "handleEnded", function() {
          var _this$props3 = _this.props, activePlayer = _this$props3.activePlayer, loop = _this$props3.loop, onEnded = _this$props3.onEnded;
          if (activePlayer.loopOnEnded && loop) {
            _this.seekTo(0);
          }
          if (!loop) {
            _this.isPlaying = false;
            onEnded();
          }
        });
        _defineProperty(_assertThisInitialized(_this), "handleError", function() {
          var _this$props4;
          _this.isLoading = false;
          (_this$props4 = _this.props).onError.apply(_this$props4, arguments);
        });
        _defineProperty(_assertThisInitialized(_this), "handleDurationCheck", function() {
          clearTimeout(_this.durationCheckTimeout);
          var duration = _this.getDuration();
          if (duration) {
            if (!_this.onDurationCalled) {
              _this.props.onDuration(duration);
              _this.onDurationCalled = true;
            }
          } else {
            _this.durationCheckTimeout = setTimeout(_this.handleDurationCheck, 100);
          }
        });
        _defineProperty(_assertThisInitialized(_this), "handleLoaded", function() {
          _this.isLoading = false;
        });
        return _this;
      }
      _createClass(Player2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.mounted = true;
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          clearTimeout(this.progressTimeout);
          clearTimeout(this.durationCheckTimeout);
          if (this.isReady && this.props.stopOnUnmount) {
            this.player.stop();
            if (this.player.disablePIP) {
              this.player.disablePIP();
            }
          }
          this.mounted = false;
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var _this2 = this;
          if (!this.player) {
            return;
          }
          var _this$props5 = this.props, url = _this$props5.url, playing = _this$props5.playing, volume = _this$props5.volume, muted = _this$props5.muted, playbackRate = _this$props5.playbackRate, pip = _this$props5.pip, loop = _this$props5.loop, activePlayer = _this$props5.activePlayer, disableDeferredLoading = _this$props5.disableDeferredLoading;
          if (!(0, _reactFastCompare["default"])(prevProps.url, url)) {
            if (this.isLoading && !activePlayer.forceLoad && !disableDeferredLoading && !(0, _utils.isMediaStream)(url)) {
              console.warn("ReactPlayer: the attempt to load ".concat(url, " is being deferred until the player has loaded"));
              this.loadOnReady = url;
              return;
            }
            this.isLoading = true;
            this.startOnPlay = true;
            this.onDurationCalled = false;
            this.player.load(url, this.isReady);
          }
          if (!prevProps.playing && playing && !this.isPlaying) {
            this.player.play();
          }
          if (prevProps.playing && !playing && this.isPlaying) {
            this.player.pause();
          }
          if (!prevProps.pip && pip && this.player.enablePIP) {
            this.player.enablePIP();
          }
          if (prevProps.pip && !pip && this.player.disablePIP) {
            this.player.disablePIP();
          }
          if (prevProps.volume !== volume && volume !== null) {
            this.player.setVolume(volume);
          }
          if (prevProps.muted !== muted) {
            if (muted) {
              this.player.mute();
            } else {
              this.player.unmute();
              if (volume !== null) {
                setTimeout(function() {
                  return _this2.player.setVolume(volume);
                });
              }
            }
          }
          if (prevProps.playbackRate !== playbackRate && this.player.setPlaybackRate) {
            this.player.setPlaybackRate(playbackRate);
          }
          if (prevProps.loop !== loop && this.player.setLoop) {
            this.player.setLoop(loop);
          }
        }
      }, {
        key: "getDuration",
        value: function getDuration() {
          if (!this.isReady)
            return null;
          return this.player.getDuration();
        }
      }, {
        key: "getCurrentTime",
        value: function getCurrentTime() {
          if (!this.isReady)
            return null;
          return this.player.getCurrentTime();
        }
      }, {
        key: "getSecondsLoaded",
        value: function getSecondsLoaded() {
          if (!this.isReady)
            return null;
          return this.player.getSecondsLoaded();
        }
      }, {
        key: "seekTo",
        value: function seekTo(amount, type, keepPlaying) {
          var _this3 = this;
          if (!this.isReady) {
            if (amount !== 0) {
              this.seekOnPlay = amount;
              setTimeout(function() {
                _this3.seekOnPlay = null;
              }, SEEK_ON_PLAY_EXPIRY);
            }
            return;
          }
          var isFraction = !type ? amount > 0 && amount < 1 : type === "fraction";
          if (isFraction) {
            var duration = this.player.getDuration();
            if (!duration) {
              console.warn("ReactPlayer: could not seek using fraction – duration not yet available");
              return;
            }
            this.player.seekTo(duration * amount, keepPlaying);
            return;
          }
          this.player.seekTo(amount, keepPlaying);
        }
      }, {
        key: "render",
        value: function render() {
          var Player3 = this.props.activePlayer;
          if (!Player3) {
            return null;
          }
          return _react["default"].createElement(Player3, _extends({}, this.props, {
            onMount: this.handlePlayerMount,
            onReady: this.handleReady,
            onPlay: this.handlePlay,
            onPause: this.handlePause,
            onEnded: this.handleEnded,
            onLoaded: this.handleLoaded,
            onError: this.handleError
          }));
        }
      }]);
      return Player2;
    }(_react.Component);
    exports["default"] = Player;
    _defineProperty(Player, "displayName", "Player");
    _defineProperty(Player, "propTypes", _props.propTypes);
    _defineProperty(Player, "defaultProps", _props.defaultProps);
  }
});

// node_modules/react-player/lib/Preview.js
var require_Preview = __commonJS({
  "node_modules/react-player/lib/Preview.js"(exports) {
    "use strict";
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _react = _interopRequireWildcard(require_react());
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache2 = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache2;
      };
      return cache2;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache2 = _getRequireWildcardCache();
      if (cache2 && cache2.has(obj)) {
        return cache2.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache2) {
        cache2.set(obj, newObj);
      }
      return newObj;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var ICON_SIZE = "64px";
    var cache = {};
    var Preview = function(_Component) {
      _inherits(Preview2, _Component);
      var _super = _createSuper(Preview2);
      function Preview2() {
        var _this;
        _classCallCheck(this, Preview2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "mounted", false);
        _defineProperty(_assertThisInitialized(_this), "state", {
          image: null
        });
        _defineProperty(_assertThisInitialized(_this), "handleKeyPress", function(e) {
          if (e.key === "Enter" || e.key === " ") {
            _this.props.onClick();
          }
        });
        return _this;
      }
      _createClass(Preview2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.mounted = true;
          this.fetchImage(this.props);
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          var _this$props = this.props, url = _this$props.url, light = _this$props.light;
          if (prevProps.url !== url || prevProps.light !== light) {
            this.fetchImage(this.props);
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.mounted = false;
        }
      }, {
        key: "fetchImage",
        value: function fetchImage(_ref) {
          var _this2 = this;
          var url = _ref.url, light = _ref.light, oEmbedUrl = _ref.oEmbedUrl;
          if (_react["default"].isValidElement(light)) {
            return;
          }
          if (typeof light === "string") {
            this.setState({
              image: light
            });
            return;
          }
          if (cache[url]) {
            this.setState({
              image: cache[url]
            });
            return;
          }
          this.setState({
            image: null
          });
          return window.fetch(oEmbedUrl.replace("{url}", url)).then(function(response) {
            return response.json();
          }).then(function(data) {
            if (data.thumbnail_url && _this2.mounted) {
              var image = data.thumbnail_url.replace("height=100", "height=480").replace("-d_295x166", "-d_640");
              _this2.setState({
                image
              });
              cache[url] = image;
            }
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props2 = this.props, light = _this$props2.light, onClick = _this$props2.onClick, playIcon = _this$props2.playIcon, previewTabIndex = _this$props2.previewTabIndex;
          var image = this.state.image;
          var isElement = _react["default"].isValidElement(light);
          var flexCenter = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          };
          var styles = {
            preview: _objectSpread({
              width: "100%",
              height: "100%",
              backgroundImage: image && !isElement ? "url(".concat(image, ")") : void 0,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer"
            }, flexCenter),
            shadow: _objectSpread({
              background: "radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)",
              borderRadius: ICON_SIZE,
              width: ICON_SIZE,
              height: ICON_SIZE,
              position: isElement ? "absolute" : void 0
            }, flexCenter),
            playIcon: {
              borderStyle: "solid",
              borderWidth: "16px 0 16px 26px",
              borderColor: "transparent transparent transparent white",
              marginLeft: "7px"
            }
          };
          var defaultPlayIcon = _react["default"].createElement("div", {
            style: styles.shadow,
            className: "react-player__shadow"
          }, _react["default"].createElement("div", {
            style: styles.playIcon,
            className: "react-player__play-icon"
          }));
          return _react["default"].createElement("div", {
            style: styles.preview,
            className: "react-player__preview",
            onClick,
            tabIndex: previewTabIndex,
            onKeyPress: this.handleKeyPress
          }, isElement ? light : null, playIcon || defaultPlayIcon);
        }
      }]);
      return Preview2;
    }(_react.Component);
    exports["default"] = Preview;
  }
});

// node_modules/react-player/lib/ReactPlayer.js
var require_ReactPlayer = __commonJS({
  "node_modules/react-player/lib/ReactPlayer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.createReactPlayer = void 0;
    var _react = _interopRequireWildcard(require_react());
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _memoizeOne = _interopRequireDefault((init_memoize_one_esm(), __toCommonJS(memoize_one_esm_exports)));
    var _reactFastCompare = _interopRequireDefault(require_react_fast_compare());
    var _props = require_props();
    var _utils = require_utils();
    var _Player3 = _interopRequireDefault(require_Player());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _typeof(obj) {
      "@babel/helpers - typeof";
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof2(obj2) {
          return typeof obj2;
        };
      } else {
        _typeof = function _typeof2(obj2) {
          return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        };
      }
      return _typeof(obj);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
        return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
      if (superClass)
        _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else {
          result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
      }
      return _assertThisInitialized(self);
    }
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self;
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var Preview = (0, _react.lazy)(function() {
      return Promise.resolve().then(function() {
        return _interopRequireWildcard(require_Preview());
      });
    });
    var IS_BROWSER = typeof window !== "undefined" && window.document;
    var IS_GLOBAL = typeof global !== "undefined" && global.window && global.window.document;
    var SUPPORTED_PROPS = Object.keys(_props.propTypes);
    var UniversalSuspense = IS_BROWSER || IS_GLOBAL ? _react.Suspense : function() {
      return null;
    };
    var customPlayers = [];
    var createReactPlayer = function createReactPlayer2(players, fallback) {
      var _class, _temp;
      return _temp = _class = function(_Component) {
        _inherits(ReactPlayer, _Component);
        var _super = _createSuper(ReactPlayer);
        function ReactPlayer() {
          var _this;
          _classCallCheck(this, ReactPlayer);
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _super.call.apply(_super, [this].concat(args));
          _defineProperty(_assertThisInitialized(_this), "state", {
            showPreview: !!_this.props.light
          });
          _defineProperty(_assertThisInitialized(_this), "references", {
            wrapper: function wrapper(_wrapper) {
              _this.wrapper = _wrapper;
            },
            player: function player(_player) {
              _this.player = _player;
            }
          });
          _defineProperty(_assertThisInitialized(_this), "handleClickPreview", function(e) {
            _this.setState({
              showPreview: false
            });
            _this.props.onClickPreview(e);
          });
          _defineProperty(_assertThisInitialized(_this), "showPreview", function() {
            _this.setState({
              showPreview: true
            });
          });
          _defineProperty(_assertThisInitialized(_this), "getDuration", function() {
            if (!_this.player)
              return null;
            return _this.player.getDuration();
          });
          _defineProperty(_assertThisInitialized(_this), "getCurrentTime", function() {
            if (!_this.player)
              return null;
            return _this.player.getCurrentTime();
          });
          _defineProperty(_assertThisInitialized(_this), "getSecondsLoaded", function() {
            if (!_this.player)
              return null;
            return _this.player.getSecondsLoaded();
          });
          _defineProperty(_assertThisInitialized(_this), "getInternalPlayer", function() {
            var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "player";
            if (!_this.player)
              return null;
            return _this.player.getInternalPlayer(key);
          });
          _defineProperty(_assertThisInitialized(_this), "seekTo", function(fraction, type, keepPlaying) {
            if (!_this.player)
              return null;
            _this.player.seekTo(fraction, type, keepPlaying);
          });
          _defineProperty(_assertThisInitialized(_this), "handleReady", function() {
            _this.props.onReady(_assertThisInitialized(_this));
          });
          _defineProperty(_assertThisInitialized(_this), "getActivePlayer", (0, _memoizeOne["default"])(function(url) {
            for (var _i = 0, _arr = [].concat(customPlayers, _toConsumableArray(players)); _i < _arr.length; _i++) {
              var player = _arr[_i];
              if (player.canPlay(url)) {
                return player;
              }
            }
            if (fallback) {
              return fallback;
            }
            return null;
          }));
          _defineProperty(_assertThisInitialized(_this), "getConfig", (0, _memoizeOne["default"])(function(url, key) {
            var config = _this.props.config;
            return _deepmerge["default"].all([_props.defaultProps.config, _props.defaultProps.config[key] || {}, config, config[key] || {}]);
          }));
          _defineProperty(_assertThisInitialized(_this), "getAttributes", (0, _memoizeOne["default"])(function(url) {
            return (0, _utils.omit)(_this.props, SUPPORTED_PROPS);
          }));
          _defineProperty(_assertThisInitialized(_this), "renderActivePlayer", function(url) {
            if (!url)
              return null;
            var player = _this.getActivePlayer(url);
            if (!player)
              return null;
            var config = _this.getConfig(url, player.key);
            return _react["default"].createElement(_Player3["default"], _extends({}, _this.props, {
              key: player.key,
              ref: _this.references.player,
              config,
              activePlayer: player.lazyPlayer || player,
              onReady: _this.handleReady
            }));
          });
          return _this;
        }
        _createClass(ReactPlayer, [{
          key: "shouldComponentUpdate",
          value: function shouldComponentUpdate(nextProps, nextState) {
            return !(0, _reactFastCompare["default"])(this.props, nextProps) || !(0, _reactFastCompare["default"])(this.state, nextState);
          }
        }, {
          key: "componentDidUpdate",
          value: function componentDidUpdate(prevProps) {
            var light = this.props.light;
            if (!prevProps.light && light) {
              this.setState({
                showPreview: true
              });
            }
            if (prevProps.light && !light) {
              this.setState({
                showPreview: false
              });
            }
          }
        }, {
          key: "renderPreview",
          value: function renderPreview(url) {
            if (!url)
              return null;
            var _this$props = this.props, light = _this$props.light, playIcon = _this$props.playIcon, previewTabIndex = _this$props.previewTabIndex, oEmbedUrl = _this$props.oEmbedUrl;
            return _react["default"].createElement(Preview, {
              url,
              light,
              playIcon,
              previewTabIndex,
              oEmbedUrl,
              onClick: this.handleClickPreview
            });
          }
        }, {
          key: "render",
          value: function render() {
            var _this$props2 = this.props, url = _this$props2.url, style = _this$props2.style, width = _this$props2.width, height = _this$props2.height, fallback2 = _this$props2.fallback, Wrapper = _this$props2.wrapper;
            var showPreview = this.state.showPreview;
            var attributes = this.getAttributes(url);
            var wrapperRef = typeof Wrapper === "string" ? this.references.wrapper : void 0;
            return _react["default"].createElement(Wrapper, _extends({
              ref: wrapperRef,
              style: _objectSpread(_objectSpread({}, style), {}, {
                width,
                height
              })
            }, attributes), _react["default"].createElement(UniversalSuspense, {
              fallback: fallback2
            }, showPreview ? this.renderPreview(url) : this.renderActivePlayer(url)));
          }
        }]);
        return ReactPlayer;
      }(_react.Component), _defineProperty(_class, "displayName", "ReactPlayer"), _defineProperty(_class, "propTypes", _props.propTypes), _defineProperty(_class, "defaultProps", _props.defaultProps), _defineProperty(_class, "addCustomPlayer", function(player) {
        customPlayers.push(player);
      }), _defineProperty(_class, "removeCustomPlayers", function() {
        customPlayers.length = 0;
      }), _defineProperty(_class, "canPlay", function(url) {
        for (var _i2 = 0, _arr2 = [].concat(customPlayers, _toConsumableArray(players)); _i2 < _arr2.length; _i2++) {
          var _Player = _arr2[_i2];
          if (_Player.canPlay(url)) {
            return true;
          }
        }
        return false;
      }), _defineProperty(_class, "canEnablePIP", function(url) {
        for (var _i3 = 0, _arr3 = [].concat(customPlayers, _toConsumableArray(players)); _i3 < _arr3.length; _i3++) {
          var _Player2 = _arr3[_i3];
          if (_Player2.canEnablePIP && _Player2.canEnablePIP(url)) {
            return true;
          }
        }
        return false;
      }), _temp;
    };
    exports.createReactPlayer = createReactPlayer;
  }
});

// node_modules/react-player/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-player/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = void 0;
    var _players = _interopRequireDefault(require_players());
    var _ReactPlayer = require_ReactPlayer();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var fallback = _players["default"][_players["default"].length - 1];
    var _default = (0, _ReactPlayer.createReactPlayer)(_players["default"], fallback);
    exports["default"] = _default;
  }
});
export default require_lib();
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)
*/
//# sourceMappingURL=react-player.js.map
