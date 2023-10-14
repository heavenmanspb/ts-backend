export type TPagination = {
    limit?: number
    offset?: number
}

export type TPaginatedList<T> = {
    items: T[]
    total: number
} & TPagination

export type TEntityWithoutIdAndTimestamps<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>
