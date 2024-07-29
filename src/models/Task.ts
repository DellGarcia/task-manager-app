export interface Task {
    id?: number,
    title: string,
    description: string,
    status: string,
    deadline: Date,
    createdAt?: Date
}