import { urlFor } from "@/sanity/lib/image";

export default function Awards({
  heading,
  subheading,
  cards,
}: Partial<{
  heading: string;
  subheading: string;
  cards: {
    titles: string[]; // Array of titles
    description?: string; // Optional description
    logo?: any; // Image object from Sanity
    buttonText?: string;
    buttonLink?: string;
    isHeading?: boolean;
  }[];
}>) {
  return (
    <section className=" max-w-4xl mx-auto">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-[2.75rem] font-sans font-bold text-gray-900 mb-6">
            {heading}
          </h1>
          <p className="text-[20px] font-sans text-gray-600">{subheading}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards?.map((card, index) =>
            card.isHeading ? (
              <h2
                key={index}
                className="text-4xl font-sans font-bold text-gray-800 lg:col-span-4 text-center "
              >
                {card.titles?.[0] || "No Title"}
              </h2>
            ) : (
              <AwardCard
                key={index}
                titles={card.titles}
                description={card.description}
                logo={card.logo}
                buttonText={card.buttonText}
                buttonLink={card.buttonLink}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}

function AwardCard({
  titles,
  description,
  logo,
  buttonText,
  buttonLink,
}: {
  titles: string[];
  description?: string;
  logo?: any; // Image object from Sanity
  buttonText?: string;
  buttonLink?: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-lg">
      {logo && (
        <img
          src={urlFor(logo).url()} // Generates the URL for the image
          alt={`${titles?.[0]} logo`}
          className="h-[45px]  mb-4"
        />
      )}
      <div className="mb-4">
        {titles?.map((title, index) => (
          <h3 key={index} className="text-[14px] font-sans  font-semibold mb-3">
            {title}
          </h3>
        ))}
      </div>
      {description && <p className="text-gray-600 font-sans">{description}</p>}
      {buttonText && buttonLink && (
        <a href={buttonLink} className="text-blue-600 hover:underline">
          {buttonText}
        </a>
      )}
    </div>
  );
}
