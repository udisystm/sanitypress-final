import { NextSchemaScript, type Schema } from '@operationnation/sanity-plugin-schema-markup/nextSchemaScript';

type Props = {
  post: {
    title?: string;
    metadata: {
      image?: any;
      title: string;
      description: string;
      slug: { current: string };
    };
    authors?: { name: string; url?: string }[];
    categories?: { title: string }[];
    publishDate: any;
    ogimage?: string;
  };
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

const SchemaMarkup = ({ post }: Props) => {
  if (!post || !post.metadata?.slug?.current) return null;



  // ✅ Use only the first author, since schema prefers a single object
  const authorData = post.authors?.length
    ? {
        type: 'Person',
        name: post.authors[0].name,
        url: post.authors[0].url || undefined,
      }
    : undefined;

  // ✅ Ensure categories are properly formatted
  const categoryData = post.categories?.map((cat) => cat.title) || undefined;

  const schema: Schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "type": "Article", 
    "headline": post.metadata.title || "Untitled Post",
    "description": post.metadata?.description || "",
    "datePublished": post.publishDate, 
    "author": authorData, 
    "articleSection": categoryData, 
    "image": [post.metadata.image],
    "url": `https://yourwebsite.com/blog/${post.metadata.slug.current}`,
  };
  

  return <NextSchemaScript schema={[schema]} projectId={projectId} dataset={dataset} />;
};

export default SchemaMarkup;
