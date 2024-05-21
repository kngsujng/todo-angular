export type TodoItem = {
  id: string;
  content: string;
  location?: string;
  status: TodoStatus;
  createdAt: Date;
};

export type TodoStatus = 'TODO' | 'INPROGRESS' | 'COMPLETED';