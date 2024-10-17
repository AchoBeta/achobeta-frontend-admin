type StatusList = {
  [property: number]: Status;
}

type Status = {
  key: string,
  name: string,
  value: number,
  color: string,
}

export const INTERVIEW_STATUS: StatusList = {
  0: {
    key: '0',
    name: '未开始',
    value: 0,
    color: 'orange'
  },
  1: {
    key: '1',
    name: '进行中',
    value: 1,
    color: 'processing'
  },
  2: {
    key: '2',
    name: '已结束',
    value: 2,
    color:'red'
  },
}

type EventList = {
  [property: number]: Event;
}

type Event = {
  key: string,
  name: string,
  value: number,
}

export const INTERVIEW_EVENT: EventList = {
  1: {
    key: '1',
    name: '面试开始',
    value: 1,
  }, 
  2: {
    key: '2',
    name: '面试结束',
    value: 2,
  },
  3: {
    key: '3',
    name: '面试重新开始',
    value: 3,
  },
  4: {
    key: '4',
    name: '面试通知',
    value: 4,
  },
  5: {
    key: '5',
    name: '面试总结',
    value: 5,
  },
  6: {
    key: '6',
    name: '面试经历',
    value: 6,
  },
}