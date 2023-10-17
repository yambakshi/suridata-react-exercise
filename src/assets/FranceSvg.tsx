export const FranceSvg = ({ width = 75, height = 50, ...props }: { width?: number, height?: number }) => {
	return (
		<svg {...props} width={width} height={height} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
			<path fill="#EC1920" d="M0 0h3v2H0z" />
			<path fill="#fff" d="M0 0h2v2H0z" />
			<path fill="#051440" d="M0 0h1v2H0z" />
		</svg>
	)
}

