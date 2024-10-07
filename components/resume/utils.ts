export const getcolorCode = (message: string) => {
    switch (message) {
        case '草稿':
            return 0;
        case '待筛选':
            return 1;
        case '筛选不通过':
            return 2;
        case '待安排初试':
            return 3;
        case '待初试':
            return 4;
        case '初试通过':
            return 5;
        case '初试不通过':
            return 6;
        case '待安排复试':
            return 7;
        case '待复试':
            return 8;
        case '复试通过':
            return 9;
        case '复试不通过':
            return 10;
        case '待安排终试':
            return 11;
        case '待终试':
            return 12;
        case '终试通过':
            return 13;
        case '终试不通过':
            return 14;
        case '待处理':
            return 15;
        case '挂起':
            return 16;
        case 'ALL':
            return 17;
        default:
            return -1;
    }
}

// export const getColor = (code: number) => {
//   switch (code) {
//       case 0:
//           return 'blue'; // 草稿状态使用蓝色
//       case 1:
//           return 'green'; // 待筛选状态使用绿色
//       case 2:
//           return 'gray'; // 假设筛选不通过状态使用灰色
//       case 3:
//           return 'orange'; // 假设待安排初试状态使用橙色
//       case 4:
//           return 'purple'; // 假设待初试状态使用紫色
//       case 5:
//           return 'geekblue'; // 假设初试通过状态使用极客蓝
//       case 6:
//           return 'volcano'; // 假设初试不通过状态使用火山红
//       case 7:
//           return 'gold'; // 假设待安排复试状态使用金色
//       case 8:
//           return 'lime'; // 假设待复试状态使用青绿色
//       case 9:
//           return 'cyan'; // 假设复试通过状态使用青色
//       case 10:
//           return 'magenta'; // 假设复试不通过状态使用品红色
//       case 11:
//           return 'pink'; // 假设待安排终试状态使用粉色
//       case 12:
//           return 'crimson'; // 假设待终试状态使用深红色
//       case 13:
//           return 'blue'; // 假设终试通过状态使用蓝色
//       case 14:
//           return 'red'; // 假设终试不通过状态使用红色
//       case 15:
//           return 'yellow'; // 假设待处理状态使用黄色
//       case 16:
//           return 'red'; // 挂起状态使用红色
//       case 17:
//           return 'default'; // 所有状态使用默认颜色
//       default:
//           return 'default'; // 默认颜色
//   }
// };

export const getColor = (code: number) => {
    switch (code) {
        case 0:
            return 'blue'; // 草稿状态使用蓝色
        case 1:
            return 'yellow'; // 待筛选状态使用绿色
        case 2:
            return 'red'; // 假设筛选不通过状态使用灰色
        case 3:
            return 'yellow'; // 假设待安排初试状态使用橙色
        case 4:
            return 'yellow'; // 假设待初试状态使用紫色
        case 5:
            return 'green'; // 假设初试通过状态使用极客蓝
        case 6:
            return 'red'; // 假设初试不通过状态使用火山红
        case 7:
            return 'yellow'; // 假设待安排复试状态使用金色
        case 8:
            return 'yellow'; // 假设待复试状态使用青绿色
        case 9:
            return 'green'; // 假设复试通过状态使用青色
        case 10:
            return 'red'; // 假设复试不通过状态使用品红色
        case 11:
            return 'yellow'; // 假设待安排终试状态使用粉色
        case 12:
            return 'yellow'; // 假设待终试状态使用深红色
        case 13:
            return 'green'; // 假设终试通过状态使用蓝色
        case 14:
            return 'red'; // 假设终试不通过状态使用红色
        case 15:
            return 'yellow'; // 假设待处理状态使用黄色
        case 16:
            return 'default'; // 挂起状态使用红色
        default:
            return 'default'; // 默认颜色
    }
};