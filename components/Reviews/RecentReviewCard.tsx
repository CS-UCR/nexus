import { format } from 'date-fns'
import styles from './card.module.css'

export default function RecentReviewCard({
  author,
  review,
  professor,
  course,
  taken,
  difficulty,
  timestamp,
  anonymous,
}: Review) {
  return (
    <div className={styles.card}>
      <span className={styles.header}>
        <h3 className={styles.title}>{course}</h3>

        <h3 className={styles.difficulty}>{difficulty}</h3>
      </span>
      <div className={styles.review}>
        <strong>Review:</strong> <br />
        <div dangerouslySetInnerHTML={{ __html: `${review}` }} />
        <p>
          <strong>Professor:</strong> {professor}
        </p>
        <p>
          <strong>Taken:</strong> {taken}
        </p>
        <p className={styles.author}>
          {anonymous === true ? <>Anonymous</> : <>{author}</>}{' '}
          {format(new Date(timestamp), "'at' h:mm bbb")}{' '}
        </p>
      </div>
    </div>
  )
}
