export interface SearchProps {
  onSubmit: () => void
  onReset: () => void
  onOrderChange: () => void
  onSortChange: () => void
  handleChange: () => void
  nextPage: () => void
  prevPage: () => void
  response: Array<any>
  orderBy: string
  sortBy: string
  total: number
  isLoading: boolean
}
