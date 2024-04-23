export type TodoItem = {
  id: string;
  content: string;
  location?: string;
  status: TodoStatus;
  createdAt: Date;
};

export type TodoStatus = 'TODO' | 'INPROGRESS' | 'COMPLETED';

export type OrderBy = '최신순' | '등록순' | '가나다순';

export type NewItemFactor = { content: string; location: string; }