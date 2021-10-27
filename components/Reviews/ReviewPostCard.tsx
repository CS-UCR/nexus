import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import styles from '@/styles/reviewposts.module.css'

export default function ReviewPostCard({
  reviewee,
  reviewPost,
  reviewProfessor,
  course,
  difficulty,
  timestamp,
  anonymous,
  reviewPostId,
}) {
  const { data: session } = useSession()

  const deleteReviewPost = async (event) => {
    if (session) {
      const res = await fetch('/api/reviewposts/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewPostData: reviewPostId }),
      })
      await res.json()
      if (res.status === 200) {
        toast.success('Deleted entry!')
      } else {
        toast.error('Uh oh. Something went wrong.')
      }
    }
  }

  return (
    <div>
      <p>
        <strong>Course: {course}</strong>
        <br />
        <strong>Review:</strong> {reviewPost}
        <br />
        <strong>Professor:</strong> {reviewProfessor}
        <br />
        <strong>Difficulty: {difficulty}</strong>
        <br />
        <span className={styles.author}>
          <strong>Author: </strong>
          {anonymous === true ? <>Anonymous</> : <>{reviewee}</>} about{' '}
          {timestamp}
        </span>
        <br />
        {session && session.user.name === reviewee && (
          <>
            {/* <button className={styles.modify}>Modify</button> */}
            <button onClick={deleteReviewPost} className={styles.delete}>
              Delete
            </button>
          </>
        )}
      </p>
    </div>
  )
}