type TBuildButtonClassNameProps =
	| {
			mx?: `mx-${string}`;
			my?: `my-${string}`;
			px?: `px-${string}`;
			py?: `py-${string}`;
			fontWeight?: `font-${string}`;
			rounded?: 'rounded' | `rounded-${string}`; // `rounded${'' | `-${string}`}`;
	  }
	| undefined;

const buildButtonClassNameInitProps: TBuildButtonClassNameProps = {
	mx: 'mx-4',
	my: 'my-1',
	px: 'px-4',
	py: 'py-2',
	fontWeight: 'font-bold',
	rounded: `rounded-sm`,
};

export const buildButtonClassName = ({
	mx = buildButtonClassNameInitProps.mx,
	my = buildButtonClassNameInitProps.my,
	px = buildButtonClassNameInitProps.px,
	py = buildButtonClassNameInitProps.py,
	fontWeight = buildButtonClassNameInitProps.fontWeight,
	rounded = buildButtonClassNameInitProps.rounded,
} = buildButtonClassNameInitProps) => {
	return `transition-shadow duration-75 ease-in ${mx} ${my} ${px} ${py} ${rounded} hover:filter hover:brightness-90 focus:ring-2 font-${fontWeight}`;
};
