J.extend(function(puppy, dog, log) {
	if (!dog.test) dog.test = { } // make sure it's in the prototype
})

J.load(
	J._.t + "j.test.buildTest.js"
	,	J._.t + "j.test.tools.injectJQuery.js"
	,	J._.t + "j.test.tools.getPage.js"
	,	J._.t + "j.test.tools.loadPage.js"
	,	J._.t + "j.test.tools.objectCompare.js"
	,	J._.t + "j.test.tools.flag.js"
	,	J._.t + "j.test.codeCoverage.js"
	,	J._.t + "j.test.finishedResults.js")

// we are only extending J.test
J.wait(
	"window.console"
	, "test.buildTest"
	, "test.CodeCoverage"
	, "test.tools.loadPage"
	, "test.tools.getPage"
	, "test.tools.objectCompare"
	, "test.tools.flag"
	, "test.tools.injectJQuery"
	, "test.finishedResults"
	, { }
	, function(ref) {

		var dtest = J.test

		if (!dtest.allTestFiles) dtest.allTestFiles = []
		if (!dtest.allTestMapsFlipped) dtest.allTestMapsFlipped = {}
		if (!dtest.allTestMaps) dtest.allTestMaps = {}

		// clean this as we split it up
		;(function(mergeObj) {
			for (var x in mergeObj) dtest[x] = mergeObj[x]
		}({
				results : []

				, buildTest : ref.buildTest
				, injectJQuery : ref.injectJQuery
				, getPage : ref.getPage
				, loadPage : ref.loadPage
				, finishedResults : ref.finishedResults
				, runTest : null // function(path){ return this }
				, runSubTests : null // function(){ return this }
				, runAllTests : null // function() { return this }
				, _onFinished : []
				, onFinished : function(func) { dtest._onFinished.push(func) }
				, activeTests : []
				, index : 0
				, _testData : J._.testData = { }
				, totalPass : 0
				, totalFail : 0
				, codeCoverage : ref.CodeCoverage()
				, hasCodeCoverage : false
			}))

		dtest.onFinished(dtest.finishedResults)

		dtest.integrationTest = function() {
			var args = Array.prototype.slice.call(arguments, 0);
			args.push(true)
			args.unshift("integrationTest")
			dtest.buildTest.apply(this, args)
		}

		dtest.runSubTests = function runSubTests() {
			dtest.results.length = 0
			dtest.activeTests = dtest.activeTests.concat( dtest.allTestFiles )
			console.group("%c🃟%c test details", "font-size:30px; font-weight:normal; color:black; ", "font-size:25px; color:rgb(232, 186, 38); font-weight:bold; ")

			subRunTest( dtest.activeTests.shift() )

			return "running all tests, build created 1-13-2013"
	}

		dtest.runAllTests = dtest.run = function runAllTests() {
			dtest.codeCoverage.start( dtest.runSubTests )
			return "Release the Kraken!"
		}

		function subRunTest(path) {
			dtest.lastTest = path
			J.load(path, true)
			console.group(path)
			console.group("tests")
		}

		dtest.runTest = function runTest (path) {
			dtest.lastTest = path
			dtest.codeCoverage.start( function() {
				dtest.results.length = 0
				J.load(path, true)
				console.group(path)
				console.group("tests")
			})
			return "Release the Kraken!"
		}

})
