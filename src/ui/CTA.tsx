import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'

interface CTAProps extends Sanity.CTA {
	isBlueButton?: boolean // Ensure isBlueButton is included in the prop types
	className?: string
	text?: string
	url?: string
}

export default function CTA({
	link,
	style,
	className,
	children,
	text,
	url,
	_type,
	_key,
	isBlueButton, // Add isBlueButton prop
	...rest
}: CTAProps & ComponentProps<'a'>) {
	// Define common props
	const props = {
		className:
			cn(
				stegaClean(style),
				className,
				isBlueButton &&
				'rounded-lg bg-blue-600 px-4 py-2 text-white bg-black shadow-md transition hover:bg-blue-700', // BlueButton styles
			) || undefined,
		children:
			children ||
			link?.label ||
			text ||
			link?.internal?.title ||
			link?.external,
		...rest,
	}

	// Handle internal link
	if (link?.type === 'internal' && link.internal) {
		return (
			<Link
				href={processUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
				style={{ backgroundColor: 'transparent' }}
			/>
		)
	}

	// Handle external link
	if (link?.type === 'external' && link.external) {
		return <a href={stegaClean(link.external)} {...props} />
	}

	// Fallback div
	return <div {...(props as ComponentProps<'div'>)} />
}
