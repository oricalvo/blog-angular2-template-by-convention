(function() {
    "use strict";

    var stack = [];

    var SystemJSExtensions = window.SystemJSExtensions = {
        getExecutingModule: function() {
            return stack[stack.length-1];
        }
    };

    hook(System.constructor.prototype, "instantiate", function(original) {
        return function(load) {
            var promise = original.apply(this, arguments);

            hook(load.metadata.entry, "execute", function(original) {
                return function () {
                    stack.push(load);

                    var res = original.apply(this, arguments);

                    stack.pop();

                    return res;
                };
            });

            return promise;
        }
    });

    function hook(obj, name, func) {
        var original = obj[name];
        obj[name] = func(original);
    }
})();
