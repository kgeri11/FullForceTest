import style from './search.module.scss'
import Form from '../../components/Form'
import Results from '../../components/Results'
import { SearchProps } from './Search.types'

const Search = ({
  handleChange,
  onSortChange,
  onOrderChange,
  onSubmit,
  onReset,
  prevPage,
  nextPage,
  response,
  orderBy,
  sortBy,
  total,
  isLoading
}: SearchProps): JSX.Element => {
  return (
    <>
      <div className={style.formContainer}>
        <Form
          onSubmit={onSubmit}
          onReset={onReset}
          onFieldChange={handleChange}
        />
      </div>
      {isLoading ? (
        'LOADINGLOADINGLOADINGLOADINGLOADINGLOADING'
      ) : response ? (
        <Results
          data={response}
          sortBy={sortBy}
          orderBy={orderBy}
          total={total}
          onSortChange={onSortChange}
          onOrderChange={onOrderChange}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      ) : null}
    </>
  )
}

export default Search
