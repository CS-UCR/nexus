import React from 'react'
import styles from './card.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function OrganizationCard({
  name,
  tagline,
  image,
}: Organization) {
  return (
    <Link href={`/organizations/${name}`} passHref>
      <div className={styles.card}>
        <div className={styles.header}>
          {image && (
            <Image
              src={image}
              width={50}
              height={50}
              className={styles.thumbnail}
              alt="Thumbnail"
            />
          )}
          <h3 className={styles.title}>{name}</h3>
        </div>
        <h4 className={`${styles.tagline} ${'clamp-2'}`}>{tagline}</h4>
      </div>
    </Link>
  )
}
