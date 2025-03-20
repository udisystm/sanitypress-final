import { groq } from 'next-sanity';

export const seoQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    seo {
      metaTitle,
      metaDescription,
      seoKeywords,
      nofollowAttributes,
      openGraph {
        title,
        description,
        url,
        siteName,
        image {
          asset->{url}
        }
      },
      twitter {
        cardType,
        creator,
        site,
        handle
      },
      additionalMetaTags[] {
        metaAttributes[] {
          attributeKey,
          attributeType,
          attributeValueString,
          attributeValueImage {
            asset->{url}
          }
        }
      }
    }
  }
`;
