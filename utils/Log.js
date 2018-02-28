var clc = require('cli-color');

var now = require('./Util').now;

var mapping = {
  log: clc.white,
	info: clc.blue,
	warn: clc.yellow,
  error: clc.red
};

// https://stackoverflow.com/questions/14172455/get-name-and-line-of-calling-function-in-node-js
Object.defineProperty(global, '__stack', {
	get: function() {
		var orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function(_, stack) {
			return stack;
		};

		var err = new Error();
		Error.captureStackTrace(err, arguments.callee);

		var stack = err.stack;
		Error.prepareStackTrace = orig;

		return stack;
	}
});

Object.defineProperty(global, '__file', {
	get: function() {
		return __stack[2].getFileName();
  }
});
Object.defineProperty(global, '__line', {
	get: function() {
		return __stack[2].getLineNumber();
  }
});
Object.defineProperty(global, '__column', {
	get: function() {
		return __stack[2].getColumnNumber();
  }
});
Object.defineProperty(global, '__function', {
	get: function() {
  	return __stack[2].getFunctionName() || 'anonymous';
  }
});
Object.defineProperty(global, '__method', {
	get: function() {
  	return __stack[2].getMethodName() || 'anonymous';
  }
});


['log', 'info', 'warn', 'error'].forEach(function(method) {
    var oldMethod = console[method].bind(console);
    console[method] = function() {
			var time = now();

			var letter;
			switch (method) {
				case 'info':
					letter = 'I';
					break;
				case 'warn':
					letter = 'W';
					break;
				case 'error':
					letter = 'E';
					break;
				default:
					letter = 'L';
			}

			var result = [mapping[method](letter+'  '+time)];

			if (method == 'warn' || method == 'error') {
				result.push(mapping[method](__file+':'+__line));
			}

			for (var i in arguments) {
				result.push(arguments[i]);
			}

      oldMethod.apply(console, result);
    };
});
