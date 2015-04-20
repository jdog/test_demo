J.addWait(
	"Constructors.DemoConstructor"
	, [ /* nothing to wait for yet */ ]
	, function (ref) {
	
		return function DemoConstructor (e_root, options) {

			var dog = {
				someNumber : 1234
				, someObj : {
					withThis : true
					, andThis : "fake"
					, andThisDeeperPart : {
						thatHasThis : true
					}
				}
				, frank : function frank () {
					return 123
				}
			}

			function god() {
				ref.AnalyserNode
			}

			// lazy load only on instantiation
			ref.J.wait(
				"window.alert"
				, "window.AnalyserNode"
				, ref
				, god)

			return dog

		}

})
.use("test.attach", "j.constructors.demoScript.test.js")
