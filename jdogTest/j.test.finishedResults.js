J.addWait(
	"test.finishedResults"
	, [ "test" ]
	, function(ref) {

		var dtest = ref.test

		return function finishedResults(results) {

			for(var x = 0; x < dtest.results.length; x++) {
				if (dtest.results[x].result) dtest.totalPass += 1  
				else dtest.totalFail += 1
			}

			var countAsync = 0
				, countSync = 0
				, countPassed = dtest.totalPass
				, countFailed = dtest.totalFail
				, countTotal = Number(dtest.totalPass + dtest.totalFail)
				, countComplete = 0
				, countPossible = 0

			dtest.results.forEach(function(item, index, arr) {
				if (item.type === "sync") countSync++
				if (item.type === "async") countAsync++
			})

			var subCount = String("Σ Total Tests async [" + countAsync + "] -- sync [" + countSync + "]")

			var temp = { }

			temp[subCount] = { count : countTotal }
			temp["✔ Tests Passed"] = { count : countPassed }
			temp["✖ Tests Failed"] = { count : countFailed }

			if (J.exists("test.codeCoverage")) {
				var countsCoverage = dtest.codeCoverage.getTotals()
				temp["Functions found"] = { count : countsCoverage.countPossible }
				temp["Functions covered"] = { count : countsCoverage.countComplete }
			}

			console.groupEnd()

			console.table(temp, [ "count" ])

			dtest.totalPass = 0
			dtest.totalFail = 0

		}

})
