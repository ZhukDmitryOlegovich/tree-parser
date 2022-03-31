/* eslint-disable no-console */
import { readFileSync } from 'fs';
import style from 'chalk';
import { parse } from './markdown';

parse(readFileSync('./README.md', { encoding: 'utf8' })).forEach(({ name, value }) => {
	if (name === '') {
		console.log(style.bold.blue('_:'), '[', style.gray(`<${value.length} empty item${value.length === 1 ? '' : 's'}>`), ']');
	} else if (value.length === 0) {
		console.log(style.bold.blue(`${name}:`), '[]');
	} else {
		// console.log(style.bold.blue(`${name}:`), '[');
		// value.forEach((string) => console.log(`  ${style.green(`'${string}'`)}`));
		// console.log(']');
		console.log(style.bold.blue(`${name}:`), value);
	}
});
