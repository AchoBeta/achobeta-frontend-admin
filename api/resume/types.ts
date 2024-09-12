interface QueryResumeOfUserDTO {
    userId: number;
    batchId: number;
}



interface StuAttachmentVO {
    filename: string;
    attachment: string;
}

// 定义学生简单简历信息的类型
interface StuSimpleResumeVO {
    batchId: number;
    studentId: string;
    name: string;
    gender: number;
    grade: number;
    major: string;
    className: string;
    email: string;
    phoneNumber: string;
    reason: string;
    introduce: string;
    experience: string;
    image: string;
    awards: string;
    remark: string;
    status: number;
}
export interface batchlistResponse {
    code: number;
    data: batchDatum[];
    message: string;
    [property: string]: any;
}

export interface batchDatum {
    /**
     * 招新届数
     */
    batch?: number;
    /**
     * 截止时间
     */
    deadline?: string;
    /**
     * 招新批次 id
     */
    id?: number;
    /**
     * 是否开始
     */
    isRun?: boolean;
    /**
     * 招新批次标题
     */
    title?: string;
    [property: string]: any;
}

// 定义整个对象的结构
export interface ResumeRequest {
    resumeId: number;
    queryResumeOfUserDTO: QueryResumeOfUserDTO;
}

// 定义整个简历响应对象的类型
export interface ResumeResponst {
    stuAttachmentVOList: StuAttachmentVO[];
    stuSimpleResumeVO: StuSimpleResumeVO;
}