export interface getUserCondition {
  batchId: number | null;
  grade?: number | null;
  name?: null | string;
  pageNo?: number | null;
  pageSize?: number | null;
  status?: number | null;
  [property: string]: any;
}

export interface userResponse {
  pages: number;
  records: Record[];
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
  "stuInfoSendList[0].email": string;
  "stuInfoSendList[0].stuName"?: string;
  "stuInfoSendList[0].userId": number;
  /**
   * 消息标题
   */
  tittle: string;
  [property: string]: any;
}