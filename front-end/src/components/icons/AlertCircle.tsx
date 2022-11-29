const SvgAlertCircle = ({ size }: { size: number }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={14}
		height={14}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth={2}
		strokeLinecap='round'
		strokeLinejoin='round'
		className='alert-circle_svg__feather alert-circle_svg__feather-alert-circle'
	>
		<circle cx={12} cy={12} r={10} />
		<path d='M12 8v4M12 16h.01' />
	</svg>
)
export default SvgAlertCircle
