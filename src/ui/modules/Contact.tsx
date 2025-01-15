'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';

interface FormField {
	name: string;
	label: string;
	type: 'text' | 'email' | 'tel' | 'textarea';
}

interface Feature {
	title: string;
	description: string;
}

interface BookingFormProps {
	subheadline?: string;
	headline?: string;
	features?: Feature[];
	formFields?: FormField[];
	buttonText?: string;
	poweredByText?: string;
}

export default function BookingForm({
	subheadline,
	headline,
	features,
	formFields,
	buttonText,
	poweredByText,
}: BookingFormProps) {
	const [formData, setFormData] = useState<Record<string, string>>(
		formFields?.reduce((acc, field) => {
			acc[field.name] = '';
			return acc;
		}, {} as Record<string, string>) || {}
	);
	const [loading, setLoading] = useState(false); // Loading state

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true); // Start loading
		console.log('Submitting form data:', formData);

		try {
			const response = await emailjs.send(
				'service_0v46cwg', // Replace with your service ID
				'template_g4sw0k6', // Replace with your template ID
				{
					from_name: formData.name,
					from_email: formData.email,
					message: JSON.stringify(formData, null, 2),
				},
				'sIGuM1KgWGl6wTt2PwEz0' // Replace with your public key
			);
			console.log('Email sent successfully:', response);
			alert('Form submitted successfully!');
		} catch (error) {
			console.error('Error sending email:', error);
			alert('Error submitting form!');
		} finally {
			setLoading(false); // Stop loading
		}
	};

	const renderHeadline = () => {
		if (!headline) return null;

		const splitWord = 'Team';
		const splitIndex = headline.indexOf(splitWord);

		if (splitIndex === -1) {
			return <h1 className="text-3xl font-[500]">{headline}</h1>;
		}

		const splitEndIndex = splitIndex + splitWord.length;
		const beforeTeam = headline.substring(0, splitEndIndex);
		const afterTeam = headline.substring(splitEndIndex).trim();

		return (
			<h1 className="text-5xl max-md:text-3xl font-sans font-[700]">
				{beforeTeam}
				{afterTeam && (
					<>
						<br />
						<span className="text-blue-500">{afterTeam}</span>
					</>
				)}
			</h1>
		);
	};

	return (
		<section className="min-h-screen flex items-center bg-gray-50 py-12">
			<div className="container mx-auto px-4 max-w-7xl">
				<div className="grid md:grid-cols-2 gap-8 items-start">
					<div className="space-y-8">
						<div className="space-y-4">
							{subheadline && (
								<p className="text-md text-gray-700 font-sans lg:text-[25px]">
									{subheadline}
								</p>
							)}
							{renderHeadline()}
						</div>

						<div className="space-y-6">
							{features?.map((feature, index) => (
								<div key={index} className="flex gap-4">
									<div className="flex-shrink-0 w-5 h-5 mt-1">
										<svg
											className="w-5 h-5 text-blue-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
									<div>
										<h3 className="font-semibold mb-1">{feature.title}</h3>
										<p className="text-gray-600">{feature.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="bg-white rounded-lg shadow-sm p-6">
						<form onSubmit={handleSubmit} className="space-y-6">
							{formFields?.map((field, index) => (
								<div key={index}>
									<label
										htmlFor={field.name}
										className="block text-sm font-medium mb-2"
									>
										{field.label}
									</label>
									{field.type === 'textarea' ? (
										<textarea
											id={field.name}
											name={field.name}
											value={formData[field.name]}
											onChange={handleChange}
											rows={4}
											className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
											required
										/>
									) : (
										<input
											type={field.type}
											id={field.name}
											name={field.name}
											value={formData[field.name]}
											onChange={handleChange}
											className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
											required
										/>
									)}
								</div>
							))}

							<button
								type="submit"
								className="w-full flex justify-center items-center gap-2 rounded-md bg-[#febd01] text-[20px] px-6 py-2 text-black font-bold hover:bg-[#ffcd35]"
								disabled={loading}
							>
								{loading ? 'Submitting...' : buttonText || 'Submit'}
							</button>

							<div className="text-center text-xs text-gray-500">
								{poweredByText || 'Powered by Typeform'}
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
