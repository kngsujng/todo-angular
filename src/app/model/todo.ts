export type TodoItem = {
  id: string;
  todo: string;
  status: TodoStatus;
  createdAt: Date;
};

export type TodoStatus = 'TODO' | 'INPROGRESS' | 'COMPLETED';

export type OrderBy = '최신순' | '등록순' | '가나다순';
