J.addWait$(
	"Modules.demo3"
	, [ /* nothing to wait for yet */ ]
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
		, $body : $("body")
	}

	return dog

})
.use("test.attach", "j.modules.demo3.test.js")
