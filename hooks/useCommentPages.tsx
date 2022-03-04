import fetcher from '@/lib/fetcher'
import useSWRInfinite from 'swr/infinite'

export function useCommentPages({ eventId = '', limit = 10 } = {}) {
  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData && previousPageData.comments.length === 0)
        return null
      const searchParams = new URLSearchParams()
      searchParams.set('limit', limit.toString())

      if (index !== 0) {
        const before = new Date(
          new Date(
            previousPageData.comments[
              previousPageData.comments.length - 1
            ].createdAt
          ).getTime()
        )

        searchParams.set('before', before.toJSON())
      }

      return `/api/events/${eventId}/comments?${searchParams.toString()}`
    },
    fetcher,
    {
      refreshInterval: 1000,
      revalidateAll: false,
    }
  )
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.comments?.length < limit)

  return {
    data,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  }
}
