import * as React from "react"

const SvgPlusCircle = (props: any) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		width={props.size ?? 50}
		height={props.size ?? 50}
		{...props}
	>
		<path d='M12.75 7.75a.75.75 0 00-1.5 0v3.5h-3.5a.75.75 0 000 1.5h3.5v3.5a.75.75 0 001.5 0v-3.5h3.5a.75.75 0 000-1.5h-3.5v-3.5z'></path>
		<path
			fill-rule='evenodd'
			d='M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z'
		></path>
	</svg>
)

export default SvgPlusCircle
