PAGE.wait("test", function(test) {

	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search)
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
	}

	var job = getParameterByName("job")

	if (job) {

		test.onFinished(function() {

			var results = test.results || [ ]
				, passed = true

			for (var x = 0; x < results.length; x++) {
				if (!results[x].result) {
					passed = false
					break
				}
			}

			$.ajax({
				url : "http://localhost:5000/jdog/" + job + "/finish"
				, type : "GET"
				, data : { result : passed }
			})

		})

	}

})
