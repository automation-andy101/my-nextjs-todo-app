export interface Todo {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: number; 
    dueDate?: Date;
    createdAt: Date;
    updatedAt?: Date;
    userId: string;
}

export type Priority = 1 | 2 | 3 | 4;

export interface CreateTodoDTO {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: Date;
}

export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: Priority;
  dueDate?: Date;
}

