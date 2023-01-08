import { promisify } from 'node:util';
import g from 'glob';
const glob = promisify(g);

import fs from 'node:fs/promises';

run();
async function run(){
	var allFonts = await glob('fonts/**/*.{ttf,otf}');
	allFonts = allFonts.filter(font=>!font.includes('Fallback Fonts'));
	console.log(allFonts);
	//write list to file

	/*@font-face {
		font-family:"Name-Of-Font";
		src: url("yourfont.ttf") format("truetype");
	  }
	  */
	var html = allFonts.map(font=>{
		//get the last part of the path, without the extension
		var fontName = font.split('/');
		fontName = fontName[fontName.length-1];
		var extension = fontName.split('.')[1];
		fontName = fontName.split('.')[0];
		
		return `@font-face {
	font-family:"${fontName}";
	src: url("${font}") format("${extension=='ttf' ? 'truetype' : 'opentype'}");
	}`;})
	console.log(html.join('\n'));
	//write to file
	await fs.writeFile('fonts.css',html.join('\n'));
	}