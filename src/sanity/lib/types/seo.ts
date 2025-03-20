export type SeoType = {
    metaTitle?: string;
    metaDescription?: string;
    seoKeywords?: string[];
    nofollowAttributes?: boolean;
    openGraph?: OpenGraphType;
    twitter?: TwitterType;
    additionalMetaTags?: MetaTagType[];
  };
  
  export type OpenGraphType = {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    image?: {
      asset?: {
        url?: string;
      };
    };
  };
  
  export type TwitterType = {
    cardType?: string;
    creator?: string;
    site?: string;
    handle?: string;
  };
  
  export type MetaTagType = {
    metaAttributes?: MetaAttributeType[];
  };
  
  export type MetaAttributeType = {
    attributeKey?: string;
    attributeType?: string;
    attributeValueString?: string;
    attributeValueImage?: {
      asset?: {
        url?: string;
      };
    };
  };
  