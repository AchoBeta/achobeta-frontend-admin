type StatusList = {
  [property: number]: Status;
}

type Status = {
  name: string,
  value: number,
  color: string
}

export const RESUME_STATUES: StatusList = {
  0: {
    name: "草稿",
    value: 0,
    color: 'blue'
  },
  1: {
    name: "待筛选",
    value: 1,
    color: 'green'

  },
  2: {
    name: "筛选不通过",
    value: 2,
    color: 'gray'
  },
  3: {
    name: "待安排初试",
    value: 3,
    color: 'orange'
  },
  4: {
    name: "待初试",
    value: 4,
    color: 'purple'
  },
  5: {
    name: "初试通过",
    value: 5,
    color: 'geekblue'
  },
  6: {
    name: "初试不通过",
    value: 6,
    color: 'volcano'
  },
  7: {
    name: "待安排复试",
    value: 7,
    color: 'gold'

  },
  8: {
    name: "待复试",
    value: 8,
    color: 'lime'
  },
  9: {
    name: "复试通过",
    value: 9,
    color: 'cyan'
  },
  10: {
    name: "复试不通过",
    value: 10,
    color:'magenta'
  },
  11: {
    name: "待安排终试",
    value: 11,
    color: 'pink'
  },
  12: {
    name: "待终试",
    value: 12,
    color: 'crimson'
  },
  13: {
    name: "终试通过",
    value: 13,
    color:'red'
  },
  14: {
    name: "终试不通过",
    value: 14,
    color:'red'

  },
  15: {
    name: "待处理",
    value: 15,
    color: 'yellow'
  },
  16: {
    name: "挂起",
    value: 16,
    color: 'orange'
  }
}