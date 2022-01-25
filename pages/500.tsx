import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { LottieWrapper } from '@/components/LottieWrapper'
import styles from '@/styles/404.module.css'
import emptyAnimationData from '@/lotties/404-1.json'

export default function Custom500() {
  return (
    <Layout>
      <Head>
        <title>Nexus | 500</title>
        <link rel="icon" href="/NexusLogo.svg" />
      </Head>
      <h1>Hmm... how did you get here?</h1>
      <p>
        It seems you tried to reach a page which does not exist{' '}
        <i>on our backend</i>. We recommend using pages that do exist 😄.
      </p>
      <Link href={'/'} passHref>
        <a>Go back home</a>
      </Link>
      <div className={styles.animationWrapper}>
        <LottieWrapper animationData={emptyAnimationData} />
      </div>
    </Layout>
  )
}
