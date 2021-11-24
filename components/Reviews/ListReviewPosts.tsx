import React, { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import ReviewPostCard from '@/components/Reviews/ReviewPostCard'
import TimeAgo from 'react-timeago'
import Loader from '@/components/Skeleton'
import styles from '@/styles/form.module.css'

// Component: ListReviewPosts({course})
// Params: course
// Purpose: To list the review posts specific to
// the course on that route. This component live updates every second

export default function ListReviewPosts({ courseId }) {
  const { data, error } = useSWR(`/api/reviewposts/${courseId}`, fetcher, {
    refreshInterval: 1000,
  })
  const [searchValue, setSearchValue] = useState('')
  if (error) {
    return (
      <div className={styles.serverdown}>
        <p>
          Oops. Looks like the reviews are not being fetched right now. If this
          persists, please let us know.
        </p>
        <Image
          src={'/assets/server.svg'}
          height={500}
          width={500}
          alt="Server Down Image"
        />
      </div>
    )
  }
  if (!data) {
    return <Loader />
  }
  const filteredReviews = Object(data.reviewPosts).filter(
    (reviewPost) =>
      reviewPost.reviewProfessor
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      reviewPost.reviewPost.toLowerCase().includes(searchValue.toLowerCase()) ||
      reviewPost.taken.toLowerCase().includes(searchValue.toLowerCase())
  )
  return (
    <div>
      {data.reviewPosts.length === 0 ? (
        <div className={styles.noreviews}>
          <p>Be the first one to write a review!</p>

          <Image
            src={'/assets/post2.svg'}
            height={300}
            width={300}
            alt="Post Image"
          />
        </div>
      ) : (
        <div className={styles.searchWrapper}>
          <input
            aria-label="Enabled Searchbar"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by quarter, professor or review"
            className={styles.search}
          />
          <svg className={styles.searchIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </svg>
        </div>
      )}
      {!filteredReviews.length && data.reviewPosts.length !== 0 && (
        <>
          <p>
            No reviews found!
            <br />
            <cite>— Robert</cite>
          </p>
        </>
      )}
      {filteredReviews.map((post) => (
        <ReviewPostCard
          key={post._id}
          reviewPostId={post._id}
          creator={post.creator}
          creatorEmail={post.creatorEmail}
          creatorId={post.creatorId}
          courseId={post.courseId}
          course={post.course}
          reviewPost={post.reviewPost}
          reviewProfessor={post.reviewProfessor}
          taken={post.taken}
          difficulty={post.difficulty}
          anonymous={post.anonymous}
          timestamp={<TimeAgo date={post.createdAt} />}
        />
      ))}
    </div>
  )
}
