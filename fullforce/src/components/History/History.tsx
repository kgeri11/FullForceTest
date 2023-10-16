import style from './history.module.scss'
import Card from '../Card'
import { useAppSelector } from '../../app/hooks'
import { HistoryProps } from './History.types'

const History = ({ selectActiveSearch, activeHistoryResponse }: HistoryProps): JSX.Element => {
  const queries = useAppSelector((state) => {
    return state.queryReducer.queries
  })

  const totalReq = useAppSelector((state) => {
    return state.queryReducer.queries.length
  })

  return (
    <>
      <div className={style.container}>
        <div className={style.historyContainer}>
          <p>Total requests: {totalReq}</p>
          {queries.map((data: Array<{ id: string; text: { query: string; sortBy: string; orderBy: string } }>) => {
            return (
              <div
                key={data.id}
                className={style.queryCard}
                onClick={() => selectActiveSearch(data.id)}
              >
                <div>Search query: {data.text.query}</div>
                <div>SortBy: {data.text.sortBy}</div>
                <div>OrderBy: {data.text.orderBy}</div>
                <div>In: ? ? ?</div>
              </div>
            )
          })}
        </div>
        <div className={style.responseContainer}>
          {activeHistoryResponse
            ? activeHistoryResponse.text.map((data: Array<any>) => {
                console.log(data)
                return (
                  <div
                    key={data.id}
                    className={style.cardContainer}
                  >
                    <Card
                      repoName={data.full_name}
                      ownerUrl={data.owner.html_url}
                      ownerName={data.owner?.login}
                      description={data.description}
                      picture={data.owner?.avatar_url}
                      url={data?.html_url}
                      stars={data.score}
                      watchers={data.watchers}
                      forks={data.forks}
                      issues={data.open_issues}
                      created={data.created_at}
                    />
                  </div>
                )
              })
            : null}
        </div>
      </div>
    </>
  )
}

export default History
