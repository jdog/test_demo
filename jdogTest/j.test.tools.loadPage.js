J.addWait(
	"test.tools.loadPage"
	, [ 
		"test" 
		, "test.tools.getPage" 
	]
	, function(ref) {

		return function loadPage($iframe, url, callback) {
			$iframe[0].src = url
			ref.tools.getPage($iframe, callback)
		}

})
