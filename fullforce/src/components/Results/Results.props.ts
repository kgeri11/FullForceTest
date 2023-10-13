export interface ResultsProps {
  onSortChange: () => void
  onOrderChange: () => void
  nextPage: () => void
  prevPage: () => void
  sortBy: string
  orderBy: string
  total: number
  data: Array<any>
}
