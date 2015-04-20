J.load(
	J._.t + "esprima.js"
	, J._.t + "esmorph.js"
	, J._.t + "escodegen.browser.js")

	// add esprima for parsing js files
	// adding code for code traversal, and appending the global function
	// add escodegen for writing new modified code

J.addWait(
	"~test.CodeCoverage"
	, [
		"window.esprima"
		, "window.esmorph"
		, "window.escodegen"
	]
	, function load_codeCoverage (ref) {

		return function CodeCoverage () {

			var dog = {
				results : { } // "Constructors.SomeConstructor" : { totalPoints : 123, hits : {}, misses : {} }

				, start : function start(func) {
					func()
						// mapAllConstructors(func)
					return this
				}

				, getTotals : function() {

					var countComplete = 0
						, countPossible = 0
						, countMissed = 0

					for(var a in dog.results) {
						countPossible += dog.results[a].totalPoints
					}

					for(var b in dog.results) {
						for (var y in dog.results[b].hits) countComplete += 1
						for (var z in dog.results[b].misses) countMissed += 1
					}


					for(var x in dog.results) {
						dog.results[x].hitsCount = countComplete
					}

					return {
						countComplete : countComplete
						, countPossible : countPossible
						, countMissed : countPossible - countComplete
					}

				}

				, getByPath : function(path) {
					var results = dog.results[path]

					if (!results) return

					results.hitsMissed = (function() {
						var missed = 0
						for (var x in results.misses) missed++
						return missed
					}())

					results.hitsCount = (function() {
						var count = 0
						for (var x in results.hits) count++
						return count
					}())

					if (!results) return undefined
					return results
				}

				, ref : ref

			}
			, f = new Function()


			// Ahh, a beautiful piece of code from esprima.org. Modified to return fuller object
			// http://esprima.org/demo/functiontrace.html
			// requires esprima, and esmorph
			function traceInstrument(code, path) {
				var tracer, signature, converted

				tracer = esmorph.Tracer.FunctionEntrance(function (fn) {
					signature =  'J.test.trace.enterFunction({ '
					signature += 'name: "' + fn.name + '"'
					signature += ', lineNumber: ' + fn.loc.start.line
					signature += ', range: [' + fn.range[0] + ',' + fn.range[1] + ']'
					signature += ', path: "' + path + '"'
					signature += ' });'
					return signature
				})

				converted = esmorph.modify(code, tracer)

				// modified to return full object with count
				return converted
			}

			var mapAllConstructors = dog.mapAllConstructors = function mapAllConstructors(callback) {
				for (var x in J.Constructors) mapPoints("Constructors." + x)
				;(callback || f)()
			}

			var mapPoints = dog.mapPoints = function mapPoints(path, script) {

				var cleanPath = path.replace(".","_")
					, fun = { }
					, manualMode = !!script

				if (!manualMode)
					script = J.exists(path)

				if (!script) return

				var modifiedScript = traceInstrument( "var " + cleanPath + " = fun." + cleanPath + " = " + script, path )

				dog.results[path] = { totalPoints : modifiedScript.functionList.length, hits : {}, misses : {} }

				modifiedScript.functionList.forEach(function( element ) {
					dog.results[path].misses[ element.loc.start.line ] = element
				})

				eval(modifiedScript.code)

				if (manualMode)
					// return Constructor
					return fun[cleanPath]
				else
					// return J.add(path, Constructor)
					return J.add(path, fun[cleanPath])

			}

			J.test.trace = {
				enterFunction : function(obj) {
					/* var obj = {
						lineNumber: 1
						, name: "Constructor"
						, path: "Constructors.DoubleClickDoubleSelect"
						, range: Array[2]
					} */
					if (obj && obj.path) {
						var subKey = obj.lineNumber
						dog.results[obj.path].hits[subKey] = obj
						delete dog.results[obj.path].misses[subKey]
					}
				}
			}

			return dog

		}

})
