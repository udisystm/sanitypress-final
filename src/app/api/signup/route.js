import { NextResponse } from 'next/server'
import emailjs from 'emailjs-com'

export async function POST(req) {
	const body = await req.json()
	console.log('Received data:', body)

	// Replace with your EmailJS service and template IDs
	const serviceID = 'service_0v46cwg'
	const templateID = 'template_g4sw0k6'
	const publicKey = 'l-fYYsKag9ZuFZYBE'

	const templateParams = {
		from_name: body.name,
		from_email: body.email,
		message: JSON.stringify(body, null, 2),
	}

	try {
		const response = await emailjs.send(
			serviceID,
			templateID,
			templateParams,
			publicKey,
		)
		console.log('Email sent successfully', response)

		return NextResponse.json({ message: 'Email sent successfully' })
	} catch (error) {
		console.error('Error sending email:', error)
		return NextResponse.json(
			{ message: 'Error sending email', error: error.message },
			{ status: 500 },
		)
	}
}
