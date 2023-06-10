const input = (await import("input")).default;

let source = await input.text("Source：");
/* e.g.
```
	..., bake, bark, be (is, am, are, was, were), book, boss, ..., have (had, had), heat, ...
```
*/

let resultArray = source
	.split(/, (?![^(]*\))/g)
	.map(str => {
		let word = "", aliases = [];
		if(str.indexOf('(') >= 0) {
			let aliasStr = "";
			[word, aliasStr] = str.replace(")", "").split('(');
			word = word.trim();
			aliases = aliasStr
				.split(", ")
				.map(str => str.trim());
			return { word, aliases };
		} else {
			word = str.trim();
			return { word }
		}
	});

console.log(JSON.stringify(resultArray));


