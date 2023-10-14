import style from './results.module.scss'
import Card from '../../components/Card'
import { ResultsProps } from './Results.props'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Results = ({
  onSortChange,
  onOrderChange,
  prevPage,
  nextPage,
  sortBy,
  orderBy,
  data,
  total
}: ResultsProps): JSX.Element => {
  return (
    <div className={style.container}>
      <div className={style.sort}>
        <div className={style.form}>
          <p>Sort by:</p>
          <label htmlFor='default'>
            <input
              type='radio'
              id='default'
              value='default'
              checked={sortBy === 'default'}
              onChange={onSortChange}
            />
            default
          </label>
          <label htmlFor='stars'>
            <input
              type='radio'
              id='stars'
              value='stars'
              checked={sortBy === 'stars'}
              onChange={onSortChange}
            />
            stars
          </label>

          <p>Sort by:</p>
          <label htmlFor='desc'>
            <input
              type='radio'
              id='desc'
              value='desc'
              checked={orderBy === 'desc'}
              onChange={onOrderChange}
            />
            desc
          </label>
          <label htmlFor='asc'>
            <input
              type='radio'
              id='asc'
              value='asc'
              checked={orderBy === 'asc'}
              onChange={onOrderChange}
            />
            asc
          </label>
        </div>
        <div>Total: {total}</div>
      </div>
      <div className={style.results}>
        {data?.map((data) => {
          return (
            <div className={style.cardContainer}>
              <Card
                repoName={data?.full_name}
                ownerUrl={data?.owner.html_url}
                ownerName={data?.owner.login}
                description={data?.description}
                picture={data?.owner.avatar_url}
                url={data?.html_url}
                stars={data?.score}
                watchers={data?.watchers}
                forks={data?.forks}
                issues={data?.open_issues}
                created={data?.created_at}
              />
            </div>
          )
        })}
      </div>
      <div className={style.pagination}>
        <div
          className={style.chevrons}
          onClick={prevPage}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div
          className={style.chevrons}
          onClick={nextPage}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  )
}

export default Results
