J.test.buildTest(
	"Modules.demo2"
	, function(thingToTest, meta, tools) {

		tools.Test("Even more wacky stuff", function() {

			var demo2 = thingToTest({ 

				DemoConstructor : function() {
					return { /* our mock object */ }
				}

			})

			return true
		})

		tools.Test("strange test 5", function() {
			return true
		})

	})

