J.addWait(
	"test.tools.getPage"
	, [ "test" ]
	, function(ref) {

		return function getPage ($iframe, callback) {
			$iframe.each(function() {
				var _elmIFrame = $(this)[0]
				typeof callback === "function" && callback( _elmIFrame, _elmIFrame.contentWindow )
			})
		}

})
