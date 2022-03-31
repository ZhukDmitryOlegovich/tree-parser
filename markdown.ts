type MdNode = P | Blockquote | Code | EmptyLine | UnorderedList | OrderedList | Header // | SimpleString;

type TempNode<Name> = {
	name: Name,
	value: string[];
};

type P = TempNode<'p'>;

type Blockquote = TempNode<'blockquote'>;

type Code = TempNode<'pre>code'>;

// type SimpleString = TempNode<'"', string>;

type EmptyLine = TempNode<''>;

type UnorderedList = TempNode<'ul'>;

type OrderedList = TempNode<'ol'>;

type Header = H1 | H2 | H3 | H4 | H5 | H6;
type H1 = TempNode<'h1'>;
type H2 = TempNode<'h2'>;
type H3 = TempNode<'h3'>;
type H4 = TempNode<'h4'>;
type H5 = TempNode<'h5'>;
type H6 = TempNode<'h6'>;

type TypeDefenition = {
	reg: RegExp,
	change?: ((s: string) => string),
};

const TYPE_DEFENITION: Record<MdNode['name'], TypeDefenition> = {
	blockquote: { reg: /^>/, change: (s) => s.replace(/^>[ \t]?/, '') },
	'pre>code': { reg: /^( {4}|\t)/, change: (s) => s.replace(/^( {4}|\t)/, '') },
	'': { reg: /^[ \t]*$/, change: () => '' },
	ul: { reg: /^[*-+] / },
	ol: { reg: /^\d+\. / },
	h6: { reg: /^ *#{6}/, change: (s) => s.replace(/^ *#{6}/, '').replace(/[# \t]+$/, '') },
	h5: { reg: /^ *#{5}/, change: (s) => s.replace(/^ *#{5}/, '').replace(/[# \t]+$/, '') },
	h4: { reg: /^ *#{4}/, change: (s) => s.replace(/^ *#{4}/, '').replace(/[# \t]+$/, '') },
	h3: { reg: /^ *#{3}/, change: (s) => s.replace(/^ *#{3}/, '').replace(/[# \t]+$/, '') },
	h2: { reg: /^ *#{2}/, change: (s) => s.replace(/^ *#{2}/, '').replace(/[# \t]+$/, '') },
	h1: { reg: /^ *#{1}/, change: (s) => s.replace(/^ *#{1}/, '').replace(/[# \t]+$/, '') },
	p: { reg: /[^ \t]/ },
	// '"': { reg: /[^ \t]/ },
};

const ORDER_TYPE_DEFENITION: MdNode['name'][] = [
	'blockquote',
	'pre>code',
	'',
	'h6',
	'h5',
	'h4',
	'h3',
	'h2',
	'h1',
	'ol',
	'ul',
	'p',
];

export const parse = (text: string) => {
	// eslint-disable-next-line no-unused-expressions
	1 + 2;
	// const arr: Node = [];
	// const currentType: MdNode['name'] | null = null;
	return text.split('\n')
		.reduce<[MdNode['name'], string][]>((arr, line) => {
			const suitableTypes = ORDER_TYPE_DEFENITION
				.filter((name) => TYPE_DEFENITION[name].reg.test(line));
			const last = arr.at(-1)?.[0];
			const type = last && suitableTypes.includes(last) ? last : suitableTypes[0];

			arr.push([type, TYPE_DEFENITION[type].change?.(line) ?? line]);
			return arr;
		}, [])
		.reduce<MdNode[]>((arr, [type, line]) => {
			const last = arr.at(-1);
			if (last?.name === type) {
				last.value.push(line);
			} else {
				arr.push({ name: type, value: [line] });
			}
			return arr;
		}, []);
};

export const build = (t: any) => { };
