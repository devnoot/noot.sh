import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
    return (
        <>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <Layout>
                <article>
                    <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                    <div className={utilStyles.lightText}>
                        <Date dateString={postData.date} />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                </article>
            </Layout>
        </>
    )
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const postIds = getAllPostIds()
    return { paths: postIds, fallback: false }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id)
    return { props: { postData } }
}