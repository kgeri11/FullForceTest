import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import style from './main.module.scss'
import Navbar from '../../components/Navbar'
import { Octokit } from 'octokit'
import Search from '../../components/Search'
import { useDispatch } from 'react-redux'
import { addResponse } from '../../features/responseSlice'
import History from '../../components/History'
import { addQuery } from '../../features/querySlice'
import { useAppSelector } from '../../app/hooks'

const Main = (): JSX.Element => {
  type sort = 'stars' | 'forks' | 'help-wanted-issues' | 'updated' | undefined
  type order = 'desc' | 'asc' | undefined
  const dispatch = useDispatch()

  const historyResponses = useAppSelector((state) => {
    return [state.responseReducer.responses]
  })

  const [page, setPage] = useState<string>('search')
  const [sortBy, setSortBy] = useState<string>('default')
  const [orderBy, setOrderBy] = useState<string>('desc')
  const [activeHistorySearch, setActiveHistorySearch] = useState<number>()
  const [total, setTotal] = useState<number>(1)
  const [pagination, setPagination] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<any>()
  const [activeHistoryResponse, setActiveHistoryResponse] = useState<any>()
  const [formData, setFormData] = useState({
    search: '',
    username: '',
    organization: ''
  })

  useEffect(() => {
    if (formData.search !== '') {
      getRepos(formData.search, orderBy as order, sortBy as sort, pagination)
    }
  }, [orderBy, sortBy])

  useEffect(() => {
    if (formData.search !== '') {
      getRepos(formData.search, orderBy as order, sortBy as sort, pagination)
    }
  }, [pagination])

  useEffect(() => {
    const activeResponse = historyResponses[0].find(({id}) => id === activeHistorySearch)
    console.log(historyResponses[0])
    console.log(activeResponse)
    setActiveHistoryResponse(activeResponse)
  }, [activeHistorySearch])

  const octokit = new Octokit({
    auth: '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'
  })

  const getRepos = (query: string, orderBy: order, sortBy: sort, page: number) => {
    try {
      setIsLoading(true)
      const result = octokit
        .request('GET /search/repositories', {
          q: query,
          sort: sortBy as sort,
          order: orderBy as order,
          per_page: 10,
          page: page,
          in: 'readme',
          headers: {
            'x-github-api-version': '2022-11-28'
          }
        })
        .then(async (resp) => resp.data)
        .then((data) => {
          const pageCalc = data.total_count / 25
          setTotalPages(parseInt(pageCalc.toString()))
          setTotal(data.total_count)
          setResponse(data.items)
          dispatch(addResponse(data.items))
          dispatch(
            addQuery({
              query: query,
              orderBy: orderBy,
              sortBy: sortBy
            })
          )
          setIsLoading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const handleNav = (page: string) => {
    setPage(page)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const onSortChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value)
  }

  const onOrderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOrderBy(event.target.value)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getRepos(formData.search, orderBy as order, sortBy as sort, pagination)
  }

  const onReset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResponse(null)
    setFormData({
      search: '',
      username: '',
      organization: ''
    })
    setTotal(0)
  }

  const nextPage = () => {
    const current = pagination
    if (current < totalPages) {
      setPagination(current + 1)
    }
  }

  const prevPage = () => {
    const current = pagination
    if (current > 1) {
      console.log('előzőt kérem')
      setPagination(current - 1)
    }
  }

  const selectActiveSearch = (id: number) => {
    console.log(id)
    setActiveHistorySearch(id)
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.navbar}>
          <Navbar
            page={page}
            handleNav={handleNav}
          />
        </div>
        {page === 'search' ? (
          <Search
            isLoading={isLoading}
            orderBy={orderBy}
            sortBy={sortBy}
            total={total}
            response={response}
            onReset={onReset}
            onSubmit={onSubmit}
            handleChange={handleChange}
            onSortChange={onSortChange}
            onOrderChange={onOrderChange}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        ) : (
          <History
            selectActiveSearch={selectActiveSearch}
            activeHistoryResponse={activeHistoryResponse}
          />
        )}
      </div>
    </>
  )
}

export default Main
