import { cn } from '@/lib/utils'
import CTA from './CTA'

export default function CTAList({
	ctas,
	className,
	style,
}: {
	ctas?: Sanity.CTA[]
} & React.ComponentProps<'div'>) {
	if (!ctas?.length) return null;

	return (
		<div
			style={style}
			className={cn(
				'flex flex-wrap items-center gap-[.5em]',
				className,
				'base-styles'
			)}
		>
			{ctas?.map((cta, key) => (
				<CTA
					className={cn('max-sm:w-full', className)}
					{...cta}
					key={key}
				/>
			))}
		</div>
	);
}

