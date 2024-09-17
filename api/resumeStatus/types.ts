type ResumeStatus = {
  code: number,
  message: string,
}
export interface ResumeStatu {

  code: number,
  data: Array<ResumeStatus>,
}

export interface ResumeEvent {
  event: number,
  description: string,
}

export interface eventData {
  memberDTO: MemberDTO,
}

export interface MemberDTO {
  username: string,
  password: string,
}