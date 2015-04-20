// using extend, puppy is instance, dog is prototype, and log is logging
PAGE.extend(function(puppy, dog, log) {

	// this is part of the suit for j.test
	// we only need the part that attaches tests
	// keep this file small since it doesn't do anything but attach

	if (!dog.test) dog.test = { }
	var dtest = dog.test

	if (!dtest.allTestFiles) dtest.allTestFiles = []
	if (!dtest.allTestMapsFlipped) dtest.allTestMapsFlipped = {}
	if (!dtest.allTestMaps) dtest.allTestMaps = {}

	// attach tests after adding an object
	dtest.attach = function attachTestToNewlyAdded (lastSnap, testsArray) {

		while(testsArray.length) (function(test) {

			dtest.allTestFiles.push(test)

			lastSnap.test = test

			dtest.allTestMapsFlipped[test] = J.add("allTestMaps." + lastSnap.path, lastSnap, dtest)
			// dtest.allTestMapsFlipped[test] = dtest.allTestMaps[lastSnap.path] = lastSnap

		}(testsArray.shift()))

		return puppy
	}

	// attach tests manually
	dtest.setTests = function (arr) {
		dtest.allTestFiles = dtest.allTestFiles.concat(arr)
	}

})

