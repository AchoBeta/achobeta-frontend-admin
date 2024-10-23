export interface getUserCondition {
  batchId: number | null;
  grade?: number | null;
  pageNo?: number | null;
  pageSize?: number | null;
  status?: number | null;
  [property: string]: any;
}

export interface userResponse {
  pages: number;
  list: Record[];
  total: number;
  [property: string]: any;
}

export interface Record {
  email: string;
  gender: number;
  grade: number;
  name: string;
  status: number;
  userId: number;
  [property: string]: any;
}

export interface messageFormat {
  /**
   * 消息内容
   */
  content: string;
  batchId: string;
  userIds: number[];
  tittle: string;
  attachments?: File[];
  [property: string]: any;
}

export interface Template {
  id: number,
  templateTitle: string;
  templateContent: string;
  [property: string]: any;
}