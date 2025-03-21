import { NextSchemaScript, type Schema } from '@operationnation/sanity-plugin-schema-markup/nextSchemaScript';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const HomePageSchemaMarkup = () => {
  const schema: Schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "type": "WebPage", // ✅ Added type property to satisfy Schema type requirements
    "@id": "https://www.scalemarketer.com/#webpage",
    "url": "https://www.scalemarketer.com/",
    "name": "Growth Marketing Consultant | Performance Marketing | Scale Marketer",
    "datePublished": new Date("2022-09-08T11:02:17+00:00"), // ✅ Fixed Date type
    "dateModified": new Date("2022-09-13T00:50:14+00:00"), // ✅ Fixed Date type
    "description": "Strategic growth marketing and performance marketing consulting to scale your business with proven ROI-focused digital strategies by Madhukar.",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://www.scalemarketer.com/#website",
      "url": "https://www.scalemarketer.com/",
      "name": "Scale Marketer",
      "inLanguage": "en-US",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.scalemarketer.com/?s={search_term_string}"
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            "valueRequired": "http://schema.org/True",
            "valueName": "search_term_string"
          }
        },
        {
          "@type": "ReadAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.scalemarketer.com/"
          }
        }
      ]
    }
  };

  return <NextSchemaScript schema={[schema]} projectId={projectId} dataset={dataset} />;
};

export default HomePageSchemaMarkup;
