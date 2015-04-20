J.addWait(
	"Modules.demo2"
	, [ "Constructors.DemoConstructor" ]
	, function (ref) {

	var dog = {
		someNumber : 1234
		, someObj : {
			withThis : true
			, andThis : "fake"
			, andThisDeeperPart : {
				thatHasThis : true
			}
		}
		, demoConstructor : null
	}

	function devil() {
		dog.demoConstructor = ref.DemoConstructor()
	}

	devil()

	return dog

})
.use("test.attach", "j.modules.demo2.test.js", "j.modules.demo2.test2.js")
