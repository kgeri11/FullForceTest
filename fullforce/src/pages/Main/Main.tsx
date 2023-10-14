import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import style from './main.module.scss'
import Navbar from '../../components/Navbar'
import { Octokit } from 'octokit'
import Search from '../../components/Search'
import { description } from '../../components/Card/card.module.scss'

const Main = (): JSX.Element => {
  type sort = 'stars' | 'forks' | 'help-wanted-issues' | 'updated' | undefined
  type order = 'desc' | 'asc' | undefined

  const [page, setPage] = useState<string>('search')
  const [sortBy, setSortBy] = useState<string>('default')
  const [orderBy, setOrderBy] = useState<string>('desc')
  const [total, setTotal] = useState<number>(1)
  const [pagination, setPagination] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<any>()
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
    console.log(isLoading)
  }, [isLoading])

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
    //TODO history to state
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
        ) : null}
      </div>
    </>
  )
}

export default Main
