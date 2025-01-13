import Img from '@/ui/Img';


export default function Services({
  heading,
  subheading,
  cards,
}: Partial<{
  pretitle: string;
  heading: string;
  subheading: string;
  cards: {
    title: string;
    description: string;
    icon: Sanity.Image;
    buttonText: string;
    buttonLink: string;
    isHeading: boolean;
  }[];
}>) {
  return (
    <section className="bg-[#fbfbfb]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-[52px] leading-[55px] font-[900]  font-sans tracking-tight  md:text-6xl lg:text-[72px]">{heading}</h1>
          <p className="text-[20px] font-[400] lg:text-[26px] font-sans mt-4">{subheading}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {cards?.map((card, index) =>
            card.isHeading ? (
              <h1
                key={index}
                className="text-[32px] font-[900] font-sans lg:col-span-1"
              >
                {card.title}
              </h1>
            ) : (
              <ServiceCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
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

function ServiceCard({
  title,
  description,
  icon,
  buttonText,
  buttonLink,
}: {
  title: string;
  description: string;
  icon: Sanity.Image;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div className="bg-[#1d2852] rounded-xl p-6 flex flex-col justify-between shadow-md">
      <div>
        {icon && (
          <div className="mb-4">
            <Img className="w-8 h-8 object-contain" image={icon} alt={title} />
          </div>
        )}
        <h3 className="text-xl text-white font-sans font-semibold mb-3">{title}</h3>
        <p className="text-white font-script">{description}</p>
      </div>
      {buttonText && buttonLink && (
        <a
          href={buttonLink}
          className="group font-Helvetica hover:text-[#ffcd35] text-white font-sen inline-flex items-center gap-2 rounded-md  text-[14px]  mt-5  py-1    font-Helvetica font-bold "
        >
          {buttonText}
          <svg
            className="w-4 h-4 ml-1"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
