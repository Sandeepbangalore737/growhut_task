"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/eventemitter3";
exports.ids = ["vendor-chunks/eventemitter3"];
exports.modules = {

/***/ "(ssr)/./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\nvar has = Object.prototype.hasOwnProperty, prefix = \"~\";\n/**\n * Constructor to create a storage for our `EE` objects.\n * An `Events` instance is a plain object whose properties are event names.\n *\n * @constructor\n * @private\n */ function Events() {}\n//\n// We try to not inherit from `Object.prototype`. In some engines creating an\n// instance in this way is faster than calling `Object.create(null)` directly.\n// If `Object.create(null)` is not supported we prefix the event names with a\n// character to make sure that the built-in object properties are not\n// overridden or used as an attack vector.\n//\nif (Object.create) {\n    Events.prototype = Object.create(null);\n    //\n    // This hack is needed because the `__proto__` property is still inherited in\n    // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.\n    //\n    if (!new Events().__proto__) prefix = false;\n}\n/**\n * Representation of a single event listener.\n *\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} [once=false] Specify if the listener is a one-time listener.\n * @constructor\n * @private\n */ function EE(fn, context, once) {\n    this.fn = fn;\n    this.context = context;\n    this.once = once || false;\n}\n/**\n * Add a listener for a given event.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} once Specify if the listener is a one-time listener.\n * @returns {EventEmitter}\n * @private\n */ function addListener(emitter, event, fn, context, once) {\n    if (typeof fn !== \"function\") {\n        throw new TypeError(\"The listener must be a function\");\n    }\n    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;\n    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;\n    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);\n    else emitter._events[evt] = [\n        emitter._events[evt],\n        listener\n    ];\n    return emitter;\n}\n/**\n * Clear event by name.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} evt The Event name.\n * @private\n */ function clearEvent(emitter, evt) {\n    if (--emitter._eventsCount === 0) emitter._events = new Events();\n    else delete emitter._events[evt];\n}\n/**\n * Minimal `EventEmitter` interface that is molded against the Node.js\n * `EventEmitter` interface.\n *\n * @constructor\n * @public\n */ function EventEmitter() {\n    this._events = new Events();\n    this._eventsCount = 0;\n}\n/**\n * Return an array listing the events for which the emitter has registered\n * listeners.\n *\n * @returns {Array}\n * @public\n */ EventEmitter.prototype.eventNames = function eventNames() {\n    var names = [], events, name;\n    if (this._eventsCount === 0) return names;\n    for(name in events = this._events){\n        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);\n    }\n    if (Object.getOwnPropertySymbols) {\n        return names.concat(Object.getOwnPropertySymbols(events));\n    }\n    return names;\n};\n/**\n * Return the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Array} The registered listeners.\n * @public\n */ EventEmitter.prototype.listeners = function listeners(event) {\n    var evt = prefix ? prefix + event : event, handlers = this._events[evt];\n    if (!handlers) return [];\n    if (handlers.fn) return [\n        handlers.fn\n    ];\n    for(var i = 0, l = handlers.length, ee = new Array(l); i < l; i++){\n        ee[i] = handlers[i].fn;\n    }\n    return ee;\n};\n/**\n * Return the number of listeners listening to a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Number} The number of listeners.\n * @public\n */ EventEmitter.prototype.listenerCount = function listenerCount(event) {\n    var evt = prefix ? prefix + event : event, listeners = this._events[evt];\n    if (!listeners) return 0;\n    if (listeners.fn) return 1;\n    return listeners.length;\n};\n/**\n * Calls each of the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Boolean} `true` if the event had listeners, else `false`.\n * @public\n */ EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {\n    var evt = prefix ? prefix + event : event;\n    if (!this._events[evt]) return false;\n    var listeners = this._events[evt], len = arguments.length, args, i;\n    if (listeners.fn) {\n        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);\n        switch(len){\n            case 1:\n                return listeners.fn.call(listeners.context), true;\n            case 2:\n                return listeners.fn.call(listeners.context, a1), true;\n            case 3:\n                return listeners.fn.call(listeners.context, a1, a2), true;\n            case 4:\n                return listeners.fn.call(listeners.context, a1, a2, a3), true;\n            case 5:\n                return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;\n            case 6:\n                return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;\n        }\n        for(i = 1, args = new Array(len - 1); i < len; i++){\n            args[i - 1] = arguments[i];\n        }\n        listeners.fn.apply(listeners.context, args);\n    } else {\n        var length = listeners.length, j;\n        for(i = 0; i < length; i++){\n            if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);\n            switch(len){\n                case 1:\n                    listeners[i].fn.call(listeners[i].context);\n                    break;\n                case 2:\n                    listeners[i].fn.call(listeners[i].context, a1);\n                    break;\n                case 3:\n                    listeners[i].fn.call(listeners[i].context, a1, a2);\n                    break;\n                case 4:\n                    listeners[i].fn.call(listeners[i].context, a1, a2, a3);\n                    break;\n                default:\n                    if (!args) for(j = 1, args = new Array(len - 1); j < len; j++){\n                        args[j - 1] = arguments[j];\n                    }\n                    listeners[i].fn.apply(listeners[i].context, args);\n            }\n        }\n    }\n    return true;\n};\n/**\n * Add a listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */ EventEmitter.prototype.on = function on(event, fn, context) {\n    return addListener(this, event, fn, context, false);\n};\n/**\n * Add a one-time listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */ EventEmitter.prototype.once = function once(event, fn, context) {\n    return addListener(this, event, fn, context, true);\n};\n/**\n * Remove the listeners of a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn Only remove the listeners that match this function.\n * @param {*} context Only remove the listeners that have this context.\n * @param {Boolean} once Only remove one-time listeners.\n * @returns {EventEmitter} `this`.\n * @public\n */ EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {\n    var evt = prefix ? prefix + event : event;\n    if (!this._events[evt]) return this;\n    if (!fn) {\n        clearEvent(this, evt);\n        return this;\n    }\n    var listeners = this._events[evt];\n    if (listeners.fn) {\n        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {\n            clearEvent(this, evt);\n        }\n    } else {\n        for(var i = 0, events = [], length = listeners.length; i < length; i++){\n            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {\n                events.push(listeners[i]);\n            }\n        }\n        //\n        // Reset the array, or remove it completely if we have no more listeners.\n        //\n        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;\n        else clearEvent(this, evt);\n    }\n    return this;\n};\n/**\n * Remove all listeners, or those of the specified event.\n *\n * @param {(String|Symbol)} [event] The event name.\n * @returns {EventEmitter} `this`.\n * @public\n */ EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {\n    var evt;\n    if (event) {\n        evt = prefix ? prefix + event : event;\n        if (this._events[evt]) clearEvent(this, evt);\n    } else {\n        this._events = new Events();\n        this._eventsCount = 0;\n    }\n    return this;\n};\n//\n// Alias methods names because people roll like that.\n//\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\nEventEmitter.prototype.addListener = EventEmitter.prototype.on;\n//\n// Expose the prefix.\n//\nEventEmitter.prefixed = prefix;\n//\n// Allow `EventEmitter` to be imported as module namespace.\n//\nEventEmitter.EventEmitter = EventEmitter;\n//\n// Expose the module.\n//\nif (true) {\n    module.exports = EventEmitter;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBLElBQUlBLE1BQU1DLE9BQU9DLFNBQVMsQ0FBQ0MsY0FBYyxFQUNyQ0MsU0FBUztBQUViOzs7Ozs7Q0FNQyxHQUNELFNBQVNDLFVBQVU7QUFFbkIsRUFBRTtBQUNGLDZFQUE2RTtBQUM3RSw4RUFBOEU7QUFDOUUsNkVBQTZFO0FBQzdFLHFFQUFxRTtBQUNyRSwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGLElBQUlKLE9BQU9LLE1BQU0sRUFBRTtJQUNqQkQsT0FBT0gsU0FBUyxHQUFHRCxPQUFPSyxNQUFNLENBQUM7SUFFakMsRUFBRTtJQUNGLDZFQUE2RTtJQUM3RSx1RUFBdUU7SUFDdkUsRUFBRTtJQUNGLElBQUksQ0FBQyxJQUFJRCxTQUFTRSxTQUFTLEVBQUVILFNBQVM7QUFDeEM7QUFFQTs7Ozs7Ozs7Q0FRQyxHQUNELFNBQVNJLEdBQUdDLEVBQUUsRUFBRUMsT0FBTyxFQUFFQyxJQUFJO0lBQzNCLElBQUksQ0FBQ0YsRUFBRSxHQUFHQTtJQUNWLElBQUksQ0FBQ0MsT0FBTyxHQUFHQTtJQUNmLElBQUksQ0FBQ0MsSUFBSSxHQUFHQSxRQUFRO0FBQ3RCO0FBRUE7Ozs7Ozs7Ozs7Q0FVQyxHQUNELFNBQVNDLFlBQVlDLE9BQU8sRUFBRUMsS0FBSyxFQUFFTCxFQUFFLEVBQUVDLE9BQU8sRUFBRUMsSUFBSTtJQUNwRCxJQUFJLE9BQU9GLE9BQU8sWUFBWTtRQUM1QixNQUFNLElBQUlNLFVBQVU7SUFDdEI7SUFFQSxJQUFJQyxXQUFXLElBQUlSLEdBQUdDLElBQUlDLFdBQVdHLFNBQVNGLE9BQzFDTSxNQUFNYixTQUFTQSxTQUFTVSxRQUFRQTtJQUVwQyxJQUFJLENBQUNELFFBQVFLLE9BQU8sQ0FBQ0QsSUFBSSxFQUFFSixRQUFRSyxPQUFPLENBQUNELElBQUksR0FBR0QsVUFBVUgsUUFBUU0sWUFBWTtTQUMzRSxJQUFJLENBQUNOLFFBQVFLLE9BQU8sQ0FBQ0QsSUFBSSxDQUFDUixFQUFFLEVBQUVJLFFBQVFLLE9BQU8sQ0FBQ0QsSUFBSSxDQUFDRyxJQUFJLENBQUNKO1NBQ3hESCxRQUFRSyxPQUFPLENBQUNELElBQUksR0FBRztRQUFDSixRQUFRSyxPQUFPLENBQUNELElBQUk7UUFBRUQ7S0FBUztJQUU1RCxPQUFPSDtBQUNUO0FBRUE7Ozs7OztDQU1DLEdBQ0QsU0FBU1EsV0FBV1IsT0FBTyxFQUFFSSxHQUFHO0lBQzlCLElBQUksRUFBRUosUUFBUU0sWUFBWSxLQUFLLEdBQUdOLFFBQVFLLE9BQU8sR0FBRyxJQUFJYjtTQUNuRCxPQUFPUSxRQUFRSyxPQUFPLENBQUNELElBQUk7QUFDbEM7QUFFQTs7Ozs7O0NBTUMsR0FDRCxTQUFTSztJQUNQLElBQUksQ0FBQ0osT0FBTyxHQUFHLElBQUliO0lBQ25CLElBQUksQ0FBQ2MsWUFBWSxHQUFHO0FBQ3RCO0FBRUE7Ozs7OztDQU1DLEdBQ0RHLGFBQWFwQixTQUFTLENBQUNxQixVQUFVLEdBQUcsU0FBU0E7SUFDM0MsSUFBSUMsUUFBUSxFQUFFLEVBQ1ZDLFFBQ0FDO0lBRUosSUFBSSxJQUFJLENBQUNQLFlBQVksS0FBSyxHQUFHLE9BQU9LO0lBRXBDLElBQUtFLFFBQVNELFNBQVMsSUFBSSxDQUFDUCxPQUFPLENBQUc7UUFDcEMsSUFBSWxCLElBQUkyQixJQUFJLENBQUNGLFFBQVFDLE9BQU9GLE1BQU1KLElBQUksQ0FBQ2hCLFNBQVNzQixLQUFLRSxLQUFLLENBQUMsS0FBS0Y7SUFDbEU7SUFFQSxJQUFJekIsT0FBTzRCLHFCQUFxQixFQUFFO1FBQ2hDLE9BQU9MLE1BQU1NLE1BQU0sQ0FBQzdCLE9BQU80QixxQkFBcUIsQ0FBQ0o7SUFDbkQ7SUFFQSxPQUFPRDtBQUNUO0FBRUE7Ozs7OztDQU1DLEdBQ0RGLGFBQWFwQixTQUFTLENBQUM2QixTQUFTLEdBQUcsU0FBU0EsVUFBVWpCLEtBQUs7SUFDekQsSUFBSUcsTUFBTWIsU0FBU0EsU0FBU1UsUUFBUUEsT0FDaENrQixXQUFXLElBQUksQ0FBQ2QsT0FBTyxDQUFDRCxJQUFJO0lBRWhDLElBQUksQ0FBQ2UsVUFBVSxPQUFPLEVBQUU7SUFDeEIsSUFBSUEsU0FBU3ZCLEVBQUUsRUFBRSxPQUFPO1FBQUN1QixTQUFTdkIsRUFBRTtLQUFDO0lBRXJDLElBQUssSUFBSXdCLElBQUksR0FBR0MsSUFBSUYsU0FBU0csTUFBTSxFQUFFQyxLQUFLLElBQUlDLE1BQU1ILElBQUlELElBQUlDLEdBQUdELElBQUs7UUFDbEVHLEVBQUUsQ0FBQ0gsRUFBRSxHQUFHRCxRQUFRLENBQUNDLEVBQUUsQ0FBQ3hCLEVBQUU7SUFDeEI7SUFFQSxPQUFPMkI7QUFDVDtBQUVBOzs7Ozs7Q0FNQyxHQUNEZCxhQUFhcEIsU0FBUyxDQUFDb0MsYUFBYSxHQUFHLFNBQVNBLGNBQWN4QixLQUFLO0lBQ2pFLElBQUlHLE1BQU1iLFNBQVNBLFNBQVNVLFFBQVFBLE9BQ2hDaUIsWUFBWSxJQUFJLENBQUNiLE9BQU8sQ0FBQ0QsSUFBSTtJQUVqQyxJQUFJLENBQUNjLFdBQVcsT0FBTztJQUN2QixJQUFJQSxVQUFVdEIsRUFBRSxFQUFFLE9BQU87SUFDekIsT0FBT3NCLFVBQVVJLE1BQU07QUFDekI7QUFFQTs7Ozs7O0NBTUMsR0FDRGIsYUFBYXBCLFNBQVMsQ0FBQ3FDLElBQUksR0FBRyxTQUFTQSxLQUFLekIsS0FBSyxFQUFFMEIsRUFBRSxFQUFFQyxFQUFFLEVBQUVDLEVBQUUsRUFBRUMsRUFBRSxFQUFFQyxFQUFFO0lBQ25FLElBQUkzQixNQUFNYixTQUFTQSxTQUFTVSxRQUFRQTtJQUVwQyxJQUFJLENBQUMsSUFBSSxDQUFDSSxPQUFPLENBQUNELElBQUksRUFBRSxPQUFPO0lBRS9CLElBQUljLFlBQVksSUFBSSxDQUFDYixPQUFPLENBQUNELElBQUksRUFDN0I0QixNQUFNQyxVQUFVWCxNQUFNLEVBQ3RCWSxNQUNBZDtJQUVKLElBQUlGLFVBQVV0QixFQUFFLEVBQUU7UUFDaEIsSUFBSXNCLFVBQVVwQixJQUFJLEVBQUUsSUFBSSxDQUFDcUMsY0FBYyxDQUFDbEMsT0FBT2lCLFVBQVV0QixFQUFFLEVBQUV3QyxXQUFXO1FBRXhFLE9BQVFKO1lBQ04sS0FBSztnQkFBRyxPQUFPZCxVQUFVdEIsRUFBRSxDQUFDa0IsSUFBSSxDQUFDSSxVQUFVckIsT0FBTyxHQUFHO1lBQ3JELEtBQUs7Z0JBQUcsT0FBT3FCLFVBQVV0QixFQUFFLENBQUNrQixJQUFJLENBQUNJLFVBQVVyQixPQUFPLEVBQUU4QixLQUFLO1lBQ3pELEtBQUs7Z0JBQUcsT0FBT1QsVUFBVXRCLEVBQUUsQ0FBQ2tCLElBQUksQ0FBQ0ksVUFBVXJCLE9BQU8sRUFBRThCLElBQUlDLEtBQUs7WUFDN0QsS0FBSztnQkFBRyxPQUFPVixVQUFVdEIsRUFBRSxDQUFDa0IsSUFBSSxDQUFDSSxVQUFVckIsT0FBTyxFQUFFOEIsSUFBSUMsSUFBSUMsS0FBSztZQUNqRSxLQUFLO2dCQUFHLE9BQU9YLFVBQVV0QixFQUFFLENBQUNrQixJQUFJLENBQUNJLFVBQVVyQixPQUFPLEVBQUU4QixJQUFJQyxJQUFJQyxJQUFJQyxLQUFLO1lBQ3JFLEtBQUs7Z0JBQUcsT0FBT1osVUFBVXRCLEVBQUUsQ0FBQ2tCLElBQUksQ0FBQ0ksVUFBVXJCLE9BQU8sRUFBRThCLElBQUlDLElBQUlDLElBQUlDLElBQUlDLEtBQUs7UUFDM0U7UUFFQSxJQUFLWCxJQUFJLEdBQUdjLE9BQU8sSUFBSVYsTUFBTVEsTUFBSyxJQUFJWixJQUFJWSxLQUFLWixJQUFLO1lBQ2xEYyxJQUFJLENBQUNkLElBQUksRUFBRSxHQUFHYSxTQUFTLENBQUNiLEVBQUU7UUFDNUI7UUFFQUYsVUFBVXRCLEVBQUUsQ0FBQ3lDLEtBQUssQ0FBQ25CLFVBQVVyQixPQUFPLEVBQUVxQztJQUN4QyxPQUFPO1FBQ0wsSUFBSVosU0FBU0osVUFBVUksTUFBTSxFQUN6QmdCO1FBRUosSUFBS2xCLElBQUksR0FBR0EsSUFBSUUsUUFBUUYsSUFBSztZQUMzQixJQUFJRixTQUFTLENBQUNFLEVBQUUsQ0FBQ3RCLElBQUksRUFBRSxJQUFJLENBQUNxQyxjQUFjLENBQUNsQyxPQUFPaUIsU0FBUyxDQUFDRSxFQUFFLENBQUN4QixFQUFFLEVBQUV3QyxXQUFXO1lBRTlFLE9BQVFKO2dCQUNOLEtBQUs7b0JBQUdkLFNBQVMsQ0FBQ0UsRUFBRSxDQUFDeEIsRUFBRSxDQUFDa0IsSUFBSSxDQUFDSSxTQUFTLENBQUNFLEVBQUUsQ0FBQ3ZCLE9BQU87b0JBQUc7Z0JBQ3BELEtBQUs7b0JBQUdxQixTQUFTLENBQUNFLEVBQUUsQ0FBQ3hCLEVBQUUsQ0FBQ2tCLElBQUksQ0FBQ0ksU0FBUyxDQUFDRSxFQUFFLENBQUN2QixPQUFPLEVBQUU4QjtvQkFBSztnQkFDeEQsS0FBSztvQkFBR1QsU0FBUyxDQUFDRSxFQUFFLENBQUN4QixFQUFFLENBQUNrQixJQUFJLENBQUNJLFNBQVMsQ0FBQ0UsRUFBRSxDQUFDdkIsT0FBTyxFQUFFOEIsSUFBSUM7b0JBQUs7Z0JBQzVELEtBQUs7b0JBQUdWLFNBQVMsQ0FBQ0UsRUFBRSxDQUFDeEIsRUFBRSxDQUFDa0IsSUFBSSxDQUFDSSxTQUFTLENBQUNFLEVBQUUsQ0FBQ3ZCLE9BQU8sRUFBRThCLElBQUlDLElBQUlDO29CQUFLO2dCQUNoRTtvQkFDRSxJQUFJLENBQUNLLE1BQU0sSUFBS0ksSUFBSSxHQUFHSixPQUFPLElBQUlWLE1BQU1RLE1BQUssSUFBSU0sSUFBSU4sS0FBS00sSUFBSzt3QkFDN0RKLElBQUksQ0FBQ0ksSUFBSSxFQUFFLEdBQUdMLFNBQVMsQ0FBQ0ssRUFBRTtvQkFDNUI7b0JBRUFwQixTQUFTLENBQUNFLEVBQUUsQ0FBQ3hCLEVBQUUsQ0FBQ3lDLEtBQUssQ0FBQ25CLFNBQVMsQ0FBQ0UsRUFBRSxDQUFDdkIsT0FBTyxFQUFFcUM7WUFDaEQ7UUFDRjtJQUNGO0lBRUEsT0FBTztBQUNUO0FBRUE7Ozs7Ozs7O0NBUUMsR0FDRHpCLGFBQWFwQixTQUFTLENBQUNrRCxFQUFFLEdBQUcsU0FBU0EsR0FBR3RDLEtBQUssRUFBRUwsRUFBRSxFQUFFQyxPQUFPO0lBQ3hELE9BQU9FLFlBQVksSUFBSSxFQUFFRSxPQUFPTCxJQUFJQyxTQUFTO0FBQy9DO0FBRUE7Ozs7Ozs7O0NBUUMsR0FDRFksYUFBYXBCLFNBQVMsQ0FBQ1MsSUFBSSxHQUFHLFNBQVNBLEtBQUtHLEtBQUssRUFBRUwsRUFBRSxFQUFFQyxPQUFPO0lBQzVELE9BQU9FLFlBQVksSUFBSSxFQUFFRSxPQUFPTCxJQUFJQyxTQUFTO0FBQy9DO0FBRUE7Ozs7Ozs7OztDQVNDLEdBQ0RZLGFBQWFwQixTQUFTLENBQUM4QyxjQUFjLEdBQUcsU0FBU0EsZUFBZWxDLEtBQUssRUFBRUwsRUFBRSxFQUFFQyxPQUFPLEVBQUVDLElBQUk7SUFDdEYsSUFBSU0sTUFBTWIsU0FBU0EsU0FBU1UsUUFBUUE7SUFFcEMsSUFBSSxDQUFDLElBQUksQ0FBQ0ksT0FBTyxDQUFDRCxJQUFJLEVBQUUsT0FBTyxJQUFJO0lBQ25DLElBQUksQ0FBQ1IsSUFBSTtRQUNQWSxXQUFXLElBQUksRUFBRUo7UUFDakIsT0FBTyxJQUFJO0lBQ2I7SUFFQSxJQUFJYyxZQUFZLElBQUksQ0FBQ2IsT0FBTyxDQUFDRCxJQUFJO0lBRWpDLElBQUljLFVBQVV0QixFQUFFLEVBQUU7UUFDaEIsSUFDRXNCLFVBQVV0QixFQUFFLEtBQUtBLE1BQ2hCLEVBQUNFLFFBQVFvQixVQUFVcEIsSUFBSSxLQUN2QixFQUFDRCxXQUFXcUIsVUFBVXJCLE9BQU8sS0FBS0EsT0FBTSxHQUN6QztZQUNBVyxXQUFXLElBQUksRUFBRUo7UUFDbkI7SUFDRixPQUFPO1FBQ0wsSUFBSyxJQUFJZ0IsSUFBSSxHQUFHUixTQUFTLEVBQUUsRUFBRVUsU0FBU0osVUFBVUksTUFBTSxFQUFFRixJQUFJRSxRQUFRRixJQUFLO1lBQ3ZFLElBQ0VGLFNBQVMsQ0FBQ0UsRUFBRSxDQUFDeEIsRUFBRSxLQUFLQSxNQUNuQkUsUUFBUSxDQUFDb0IsU0FBUyxDQUFDRSxFQUFFLENBQUN0QixJQUFJLElBQzFCRCxXQUFXcUIsU0FBUyxDQUFDRSxFQUFFLENBQUN2QixPQUFPLEtBQUtBLFNBQ3JDO2dCQUNBZSxPQUFPTCxJQUFJLENBQUNXLFNBQVMsQ0FBQ0UsRUFBRTtZQUMxQjtRQUNGO1FBRUEsRUFBRTtRQUNGLHlFQUF5RTtRQUN6RSxFQUFFO1FBQ0YsSUFBSVIsT0FBT1UsTUFBTSxFQUFFLElBQUksQ0FBQ2pCLE9BQU8sQ0FBQ0QsSUFBSSxHQUFHUSxPQUFPVSxNQUFNLEtBQUssSUFBSVYsTUFBTSxDQUFDLEVBQUUsR0FBR0E7YUFDcEVKLFdBQVcsSUFBSSxFQUFFSjtJQUN4QjtJQUVBLE9BQU8sSUFBSTtBQUNiO0FBRUE7Ozs7OztDQU1DLEdBQ0RLLGFBQWFwQixTQUFTLENBQUNtRCxrQkFBa0IsR0FBRyxTQUFTQSxtQkFBbUJ2QyxLQUFLO0lBQzNFLElBQUlHO0lBRUosSUFBSUgsT0FBTztRQUNURyxNQUFNYixTQUFTQSxTQUFTVSxRQUFRQTtRQUNoQyxJQUFJLElBQUksQ0FBQ0ksT0FBTyxDQUFDRCxJQUFJLEVBQUVJLFdBQVcsSUFBSSxFQUFFSjtJQUMxQyxPQUFPO1FBQ0wsSUFBSSxDQUFDQyxPQUFPLEdBQUcsSUFBSWI7UUFDbkIsSUFBSSxDQUFDYyxZQUFZLEdBQUc7SUFDdEI7SUFFQSxPQUFPLElBQUk7QUFDYjtBQUVBLEVBQUU7QUFDRixxREFBcUQ7QUFDckQsRUFBRTtBQUNGRyxhQUFhcEIsU0FBUyxDQUFDb0QsR0FBRyxHQUFHaEMsYUFBYXBCLFNBQVMsQ0FBQzhDLGNBQWM7QUFDbEUxQixhQUFhcEIsU0FBUyxDQUFDVSxXQUFXLEdBQUdVLGFBQWFwQixTQUFTLENBQUNrRCxFQUFFO0FBRTlELEVBQUU7QUFDRixxQkFBcUI7QUFDckIsRUFBRTtBQUNGOUIsYUFBYWlDLFFBQVEsR0FBR25EO0FBRXhCLEVBQUU7QUFDRiwyREFBMkQ7QUFDM0QsRUFBRTtBQUNGa0IsYUFBYUEsWUFBWSxHQUFHQTtBQUU1QixFQUFFO0FBQ0YscUJBQXFCO0FBQ3JCLEVBQUU7QUFDRixJQUFJLElBQTZCa0MsRUFBRTtJQUNqQ0EsT0FBT0MsT0FBTyxHQUFHbkM7QUFDbkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaGFkY24tZGFzaGJvYXJkLy4vbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanM/NGMzZiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgcHJlZml4ID0gJ34nO1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIHN0b3JhZ2UgZm9yIG91ciBgRUVgIG9iamVjdHMuXG4gKiBBbiBgRXZlbnRzYCBpbnN0YW5jZSBpcyBhIHBsYWluIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBldmVudCBuYW1lcy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEV2ZW50cygpIHt9XG5cbi8vXG4vLyBXZSB0cnkgdG8gbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuIEluIHNvbWUgZW5naW5lcyBjcmVhdGluZyBhblxuLy8gaW5zdGFuY2UgaW4gdGhpcyB3YXkgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBgT2JqZWN0LmNyZWF0ZShudWxsKWAgZGlyZWN0bHkuXG4vLyBJZiBgT2JqZWN0LmNyZWF0ZShudWxsKWAgaXMgbm90IHN1cHBvcnRlZCB3ZSBwcmVmaXggdGhlIGV2ZW50IG5hbWVzIHdpdGggYVxuLy8gY2hhcmFjdGVyIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBidWlsdC1pbiBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90XG4vLyBvdmVycmlkZGVuIG9yIHVzZWQgYXMgYW4gYXR0YWNrIHZlY3Rvci5cbi8vXG5pZiAoT2JqZWN0LmNyZWF0ZSkge1xuICBFdmVudHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvL1xuICAvLyBUaGlzIGhhY2sgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGBfX3Byb3RvX19gIHByb3BlcnR5IGlzIHN0aWxsIGluaGVyaXRlZCBpblxuICAvLyBzb21lIG9sZCBicm93c2VycyBsaWtlIEFuZHJvaWQgNCwgaVBob25lIDUuMSwgT3BlcmEgMTEgYW5kIFNhZmFyaSA1LlxuICAvL1xuICBpZiAoIW5ldyBFdmVudHMoKS5fX3Byb3RvX18pIHByZWZpeCA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvbmNlPWZhbHNlXSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCBlbWl0dGVyLCBvbmNlKVxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdKSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IGxpc3RlbmVyLCBlbWl0dGVyLl9ldmVudHNDb3VudCsrO1xuICBlbHNlIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0uZm4pIGVtaXR0ZXIuX2V2ZW50c1tldnRdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gW2VtaXR0ZXIuX2V2ZW50c1tldnRdLCBsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIGVtaXR0ZXI7XG59XG5cbi8qKlxuICogQ2xlYXIgZXZlbnQgYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2dCBUaGUgRXZlbnQgbmFtZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNsZWFyRXZlbnQoZW1pdHRlciwgZXZ0KSB7XG4gIGlmICgtLWVtaXR0ZXIuX2V2ZW50c0NvdW50ID09PSAwKSBlbWl0dGVyLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIGVsc2UgZGVsZXRlIGVtaXR0ZXIuX2V2ZW50c1tldnRdO1xufVxuXG4vKipcbiAqIE1pbmltYWwgYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgbGlzdGluZyB0aGUgZXZlbnRzIGZvciB3aGljaCB0aGUgZW1pdHRlciBoYXMgcmVnaXN0ZXJlZFxuICogbGlzdGVuZXJzLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgdmFyIG5hbWVzID0gW11cbiAgICAsIGV2ZW50c1xuICAgICwgbmFtZTtcblxuICBpZiAodGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHJldHVybiBuYW1lcztcblxuICBmb3IgKG5hbWUgaW4gKGV2ZW50cyA9IHRoaXMuX2V2ZW50cykpIHtcbiAgICBpZiAoaGFzLmNhbGwoZXZlbnRzLCBuYW1lKSkgbmFtZXMucHVzaChwcmVmaXggPyBuYW1lLnNsaWNlKDEpIDogbmFtZSk7XG4gIH1cblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHJldHVybiBuYW1lcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhldmVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBuYW1lcztcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSByZWdpc3RlcmVkIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuIFtdO1xuICBpZiAoaGFuZGxlcnMuZm4pIHJldHVybiBbaGFuZGxlcnMuZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gaGFuZGxlcnMubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gaGFuZGxlcnNbaV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBsaXN0ZW5pbmcgdG8gYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24gbGlzdGVuZXJDb3VudChldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiAwO1xuICBpZiAobGlzdGVuZXJzLmZuKSByZXR1cm4gMTtcbiAgcmV0dXJuIGxpc3RlbmVycy5sZW5ndGg7XG59O1xuXG4vKipcbiAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMsIGVsc2UgYGZhbHNlYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChsaXN0ZW5lcnMub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgY2FzZSA0OiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyLCBhMyk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghYXJncykgZm9yIChqID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaV0uY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIGZhbHNlKTtcbn07XG5cbi8qKlxuICogQWRkIGEgb25lLXRpbWUgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGxpc3RlbmVycyBvZiBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBtYXRjaCB0aGlzIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBoYXZlIHRoaXMgY29udGV4dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lcnMuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIHRoaXM7XG4gIGlmICghZm4pIHtcbiAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChcbiAgICAgIGxpc3RlbmVycy5mbiA9PT0gZm4gJiZcbiAgICAgICghb25jZSB8fCBsaXN0ZW5lcnMub25jZSkgJiZcbiAgICAgICghY29udGV4dCB8fCBsaXN0ZW5lcnMuY29udGV4dCA9PT0gY29udGV4dClcbiAgICApIHtcbiAgICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGV2ZW50cyA9IFtdLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgbGlzdGVuZXJzW2ldLmZuICE9PSBmbiB8fFxuICAgICAgICAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpIHx8XG4gICAgICAgIChjb250ZXh0ICYmIGxpc3RlbmVyc1tpXS5jb250ZXh0ICE9PSBjb250ZXh0KVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBSZXNldCB0aGUgYXJyYXksIG9yIHJlbW92ZSBpdCBjb21wbGV0ZWx5IGlmIHdlIGhhdmUgbm8gbW9yZSBsaXN0ZW5lcnMuXG4gICAgLy9cbiAgICBpZiAoZXZlbnRzLmxlbmd0aCkgdGhpcy5fZXZlbnRzW2V2dF0gPSBldmVudHMubGVuZ3RoID09PSAxID8gZXZlbnRzWzBdIDogZXZlbnRzO1xuICAgIGVsc2UgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBbZXZlbnRdIFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0O1xuXG4gIGlmIChldmVudCkge1xuICAgIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG4gICAgaWYgKHRoaXMuX2V2ZW50c1tldnRdKSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cbi8vXG5FdmVudEVtaXR0ZXIucHJlZml4ZWQgPSBwcmVmaXg7XG5cbi8vXG4vLyBBbGxvdyBgRXZlbnRFbWl0dGVyYCB0byBiZSBpbXBvcnRlZCBhcyBtb2R1bGUgbmFtZXNwYWNlLlxuLy9cbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG4iXSwibmFtZXMiOlsiaGFzIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwcmVmaXgiLCJFdmVudHMiLCJjcmVhdGUiLCJfX3Byb3RvX18iLCJFRSIsImZuIiwiY29udGV4dCIsIm9uY2UiLCJhZGRMaXN0ZW5lciIsImVtaXR0ZXIiLCJldmVudCIsIlR5cGVFcnJvciIsImxpc3RlbmVyIiwiZXZ0IiwiX2V2ZW50cyIsIl9ldmVudHNDb3VudCIsInB1c2giLCJjbGVhckV2ZW50IiwiRXZlbnRFbWl0dGVyIiwiZXZlbnROYW1lcyIsIm5hbWVzIiwiZXZlbnRzIiwibmFtZSIsImNhbGwiLCJzbGljZSIsImdldE93blByb3BlcnR5U3ltYm9scyIsImNvbmNhdCIsImxpc3RlbmVycyIsImhhbmRsZXJzIiwiaSIsImwiLCJsZW5ndGgiLCJlZSIsIkFycmF5IiwibGlzdGVuZXJDb3VudCIsImVtaXQiLCJhMSIsImEyIiwiYTMiLCJhNCIsImE1IiwibGVuIiwiYXJndW1lbnRzIiwiYXJncyIsInJlbW92ZUxpc3RlbmVyIiwidW5kZWZpbmVkIiwiYXBwbHkiLCJqIiwib24iLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJvZmYiLCJwcmVmaXhlZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/eventemitter3/index.js\n");

/***/ })

};
;