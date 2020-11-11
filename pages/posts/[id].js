import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

export async function getStaticPaths() {
  //Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(paths) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(paths.params.id);
  return {
    props: {
      postData,
    },
  };
}

/*
Next.js does code splitting automatically, 
so each page only loads what’s necessary for that page. 
That means when the homepage is rendered, 
the code for other pages is not served initially.

whenever Link components appear in the browser’s viewport,
 Next.js automatically prefetches the code for the linked page in the background. 
 By the time you click the link, the code for the destination page will already be loaded in the background, 
 and the page transition will be near-instant!
*/
