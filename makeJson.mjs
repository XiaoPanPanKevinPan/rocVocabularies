const input = (await import("input")).default;
const fs = await import("node:fs");

const [sourcePath, resultPath] = process.argv.slice(2);
let source = sourcePath
	? fs.readFileSync(sourcePath).toString()
	: await input.text("Source：");
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

let result = JSON.stringify(resultArray);

if(resultPath){
	let file = fs.openSync(resultPath, "wx");
	fs.writeSync(file, result);
}else{
	console.log(result);
}


