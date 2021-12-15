import Head from 'next/head'
import Image from 'next/image'
import ListAllEvents from '@/components/Events/ListAllEvents'
import Layout from '@/components/Layout'
import styles from '@/styles/events.module.css'

export default function EventsPage() {
  return (
    <Layout>
      <Head>
        <title>Nexus | Events</title>
      </Head>
      <section>
        <div className={styles.hero}>
          <div className={styles.content}>
            <h1>Events</h1>
            <p>
              This is where you&#39;ll be able to see all of the ongoing and
              future events of our clubs and organizations. Events are sorted by
              the date and time that they end. If you&#39;re a club organizer,
              feel free to post your own event!
            </p>
          </div>
          <Image
            src={'/assets/calendar.svg'}
            height={300}
            width={300}
            alt="Calendar Image"
          />
        </div>
        <h2>Recent Events</h2>
        <ListAllEvents />
      </section>
    </Layout>
  )
}
