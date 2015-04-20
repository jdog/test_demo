// this is part of the suit for j.test
// we only need the part that attaches tests
// keep this file small since it doesn't do anything but attach

J.addWait(
	"test.tools.objectCompare"
	, [ "window.console", "test" ]
	, function(ref) {

		function toShortString(obj) {
			var split = obj.toString().split("()")[0].split("function ")[1]
			if (split === "(e,t){return new x.fn.init(e,t,r)}") {
				return "jQuery"
			} else {
				return split
			}
		}

		return function comparer(module, propertiesWithTypes) {

			var truthy = true
			, run = true

			console.groupCollapsed("%ccomparer details", "color:gray; font-weight:normal")

			if (!module) {
				console.error("length: ", x, "\u2716")
				return console.groupEnd()
			}

			for (var x in propertiesWithTypes) {
				run = true

				if (!propertiesWithTypes[x].empty && module[x] === undefined) {
					console.error(x + " is undefined", x, "\u2716")
					truthy = false
					run = false
				}

				if (typeof propertiesWithTypes[x].empty !== "undefined") {
					if (module[x] !== undefined) {
						console.error("value: ", x, "\u2716")
						console.info("value should be undefined")
						truthy = false
					} else {
						console.log("value: ", x, "\u2714")
					}
				}

				if (run && propertiesWithTypes[x].like) {
					if (module[x].constructor.toString() !== propertiesWithTypes[x].like.constructor.toString()) {
						console.error("likeness: ", x, "\u2716")
						console.info("value should be:", toShortString(module[x].constructor))
						truthy = false
					} else {
						console.log(x, "likeness: ", "\u2714", toShortString(module[x].constructor))
					}
				}
				if (run && propertiesWithTypes[x].length) {
					if (module[x].length !== propertiesWithTypes[x].length) {
						console.error("length: ", x, "\u2716")
						console.info("value should be:", module[x].length)
						truthy = false
					} else {
						console.log(x, "length: ", "\u2714", module[x].length)
					}
				}
				if (run && typeof propertiesWithTypes[x].value !== "undefined") {
					if (module[x] !== propertiesWithTypes[x].value) {
						console.error("value: ", x, "\u2716")
						console.info("value should be:", propertiesWithTypes[x].value)
						truthy = false
					} else {
						console.log(x, "value: ", "\u2714", propertiesWithTypes[x].value)
					}
				}
			}

			console.groupEnd()

			return truthy

		}

	})


