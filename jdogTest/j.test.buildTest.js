J.addWait(
"test.buildTest"
, [ 
	"window.console"
	, "test" 
]
, function(ref) {

	var dtest = J.test

	// it's here twice
	function subRunTest(path) {
		dtest.lastTest = path
		J.load(path, true)
		console.group(path)
		console.group("tests")
	}

	return function buildTest(/* path, func (Constructor, Test, TestWaiter, tools), isIntegration */) {

		var map = J.mapArguments(arguments)
			, path = map.Str && map.Str[0]
			, func = map.Fun && map.Fun[0]
			, isIntegration = map.Boo && map.Boo[0]
			, metaInfo = J.exists("test.allTestMaps." + path)
			, isAddWaitAttach = (metaInfo && metaInfo.fun)
			, isAddAttached = (metaInfo && !metaInfo.fun && metaInfo.thing)
			, thingToTest


			ref.test.codeCoverage


		var scout = {
			syncTests : []
			, asyncTests : []
		}

		// lets load all of the tools dynamically
		// this means that if they are loaded into
		// J.test.tools they will show up here
		// this allows anyone to add their own testing tools
		var tools = J.test.tools
		tools.metaInfo = metaInfo
		delete tools.flag

		var Test = tools.Test = function Test(testName, resultFunc) {

			scout.syncTests.push(function() {
				var result = {
					name : testName
					, result : resultFunc()
					, test : resultFunc
					, construct : path
					, func : func
					, type : "sync"
					, testName : testName
					, testPath : dtest.lastTest
				}
				dtest.results.push(result)

				// handles external call
				if (dtest.externalCall) {
					dtest.externalCall(result)
				}

				if (result.result) {
					console.groupCollapsed("%c " + result.name + "%c \u2714", "color:gray; font-weight:normal;", "color:rgb(54, 231, 54)")
					console.log(result)
					console.groupEnd()


				} else {
					console.error(result.name + " \u2716 FAILED")
					console.log(result)
				}
			})

			scout.syncTests.shift()()

		}

		var TestWaiter = tools.TestWaiter = function TestWaiter(testName, resultFunc /* (series, go, call) */ ) {
			var series = scout.asyncTests

			function go() {
				if (series.length > 0) {

					if (typeof series[0] === "number") {

						setTimeout(function() {
							call({ name : "delay for " + series[0] + " ms", result : true })
							go()
						}, series[0])

					} else {
						series[0].apply(this, arguments)
					}

				}
			}

			function call(arg) {

				var result = arg

				result.type = "async"
				result.testName = testName
				result.seriesCount = series.length
				result.testPath = dtest.lastTest
				dtest.results.push(result)

				// handles external call
				if (dtest.externalCall) {
					dtest.externalCall(result)
				}

				if (result.result) {
					console.groupCollapsed("%c " + testName + ": " + result.name + "%c \u2714", "color:gray; font-weight:normal;", "color:rgb(54, 231, 54)")
					console.log(result)
					console.groupEnd()
				} else {
					console.error(testName + ": ", result.name, "\u2716 failed")
					console.error(result)
				}
				series.shift()
			}

			resultFunc(series, go, call)
		}

		// this is here to help when a test group is finished, clear it up
		var interval = setInterval(function() {
			if (!scout.asyncTests.length) {
				clearInterval(interval)

				if (J.exists("test.codeCoverage")) {
					;(function() {
						var countsCoverage = dtest.codeCoverage.getTotals()
						var temp = {}
						var lastTest = dtest.lastTest
						if (!lastTest) { return alert("oop") }

						var lastTestMap = dtest.allTestMapsFlipped[lastTest]
						var lastConstructorCounts = dtest.codeCoverage.getByPath( lastTestMap.path )

						temp["functions found"] = lastConstructorCounts ? { count : lastConstructorCounts.totalPoints } : 0
						temp["functions tested"] = lastConstructorCounts ? { count : lastConstructorCounts.hitsCount } : 0
						temp["functions missed"] = lastConstructorCounts ? { count : lastConstructorCounts.hitsMissed } : 0
						console.groupEnd()
						console.group("Code Coverage")
						console.table(temp, [ "count" ])

						lastTestMap.coverage = lastConstructorCounts

						console.group("%c Coverage Info", "font-weight:normal; color:#aaa;")

						;(function() {
							var tempMissesList = {}

							if (!lastTestMap.coverage) return

							var misses = lastTestMap.coverage.misses

							for(var x in misses) {
								tempMissesList[x] = {
									lineNumber : misses[x].loc.start.line
									, column : misses[x].loc.start.column
									, name : misses[x].name
								}
							}

							console.group("Misses")
							console.table(tempMissesList, ["name", "lineNumber", "column"])
							console.groupEnd()

						}())

						;(function() {
							var tempHitsList = {}

							if (!lastTestMap.coverage) return

							var hits = lastTestMap.coverage.hits

							for(var x in hits) {
								tempHitsList[x] = {
									lineNumber : hits[x].lineNumber
									, name : hits[x].name
								}
							}

							console.groupCollapsed("Hits")
							console.table(tempHitsList, ["name", "lineNumber"])
							console.groupEnd()

						}())

						console.groupEnd()
						console.groupEnd()
					}())
				}

				console.groupEnd()

				if (dtest.activeTests.length) {
					subRunTest(dtest.activeTests.shift())
				} else {
					for(var x = 0; x < dtest._onFinished.length; x++) {
						dtest._onFinished[x](dtest.results)
					}
				}

			}


		}, 1000)


		if (isAddAttached) {
			thingToTest = ref.test.codeCoverage.mapPoints(path, metaInfo.thing)
			return func( thingToTest, tools )
		}

		if (isAddWaitAttach) {
			thingToTest = ref.test.codeCoverage.mapPoints(path, metaInfo.fun)
			return func( thingToTest, metaInfo.ref, tools )
		}

		if (isIntegration) {
			return func(Test, TestWaiter, tools )
		} 
		
		else {
			return J.wait(path, function(Constructor) {
				func( ref.test.codeCoverage.mapPoints(path, Constructor), Test, TestWaiter, tools )
			})
		}

	}

})
