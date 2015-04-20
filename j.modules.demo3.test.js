J.test.buildTest(
	"Modules.demo3"
	, function(thingToTest, ref, tools) {

		tools.Test("something else", function() {
			var thing = thingToTest(ref)
			return true
		})

		tools.Test("something else", function() {
			var thing = thingToTest(ref)
			return true
		})

	})
