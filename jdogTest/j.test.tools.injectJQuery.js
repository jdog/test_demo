J.addWait(
	"test.tools.injectJQuery"
	, [ "test.tools.getPage" ]
	, function(ref) {

		var dtest = J.test

		return dtest.injectJQuery = function injectJQuery (ref, go, call) {

			// this initializes the page in the frame, take a look
			dtest.getPage(ref.$iframe, function(innerWindow, innerJS) {

				// pass the innerJS to our local object for future use
				ref.innerJS = innerJS

				// pass the innerWindow
				ref.innerWindow = innerWindow

				// make sure there is content in innerHTML
				J.waitExists("document.body.innerHTML", ref.innerJS, function() {

					// now, inject some jQuery so it's easier to find things and click things
					J.loadFile("//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js", ref.innerJS.document)

					// let's wait till it's actually loaded
					J.wait("window.jQuery", ref.innerJS, function(jQuery) {
						ref.$ = jQuery

						// now we do the regular document.ready for jQuery
						ref.innerJS.jQuery(ref.innerJS.document).ready(function() {
							call({ name : "loaded page and injected jQuery", result : true })
							go(ref)
						})
					})
				})
			})
		}

})
