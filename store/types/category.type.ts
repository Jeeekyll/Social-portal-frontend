export interface Category {
  id: number
  name: string
  cover: string
}

export interface CategoryResponse {
  data: Category[]
}
