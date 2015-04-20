// this is part of the suit for j.test
// we only need the part that attaches tests
// keep this file small since it doesn't do anything but attach

J.addWait(
	"test.tools.flag"
	, [ "window.console" , "test" ]
	, function(ref) {

		return function flag() {

			function outputFlag() {

				console.log("%c🃟%cJDOҨ ","padding-left:10px; font-size:42px; font-weight:normal; background-color:rgb(117, 228, 29); color:black; ", "padding-left:10px; font-size:42px; color:rgb(229, 229, 209); font-weight:normal; background-color:rgb(117, 228, 29); color:white; ")
			}

			outputFlag()
			console.dir(J)

		}

	})


