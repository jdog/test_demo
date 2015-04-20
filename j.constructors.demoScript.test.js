J.test.buildTest(
	"Constructors.DemoConstructor"
	, function(thingToTest, ref, tools) {

	// use ref as is to continue to use external libraries.
	// To mock libraries create a new object or
	// simply modify the ref properties to suit your needs

	tools.Test("Build Constructor", function() {
		// var demo = thingToTest(meta.ref)
		var demo = thingToTest(ref)
			, constr = demo()
		return !!constr
	})

	tools.TestWaiter("Series of tests, async", function(series, go, call) {

		var demo = thingToTest(ref)
			, constr = demo()

		series.push(function() {
			call({ name : "example", result : true  })
			go()
		})

		series.push(function() {
			call({ name : "example 2", result : !!constr  })
			go()
		})

		go()

	})

})
