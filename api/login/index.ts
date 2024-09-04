import request from '@/axios'
import type { UserType } from './types'

export const loginApi = (data: UserType): Promise<IResponse<UserType>> => {

    let newdata: any = {
        login_type: "password",
        password_params: {
            username: data.username,
            password: data.password
        }
    }


    data = newdata
    return request.post({ url: '/api/v1/auth/login', data })
    // return {
    //   code: 200,
    //   data: {
    //     Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjEsIk9wZW5JRCI6ImFkbWluIiwiVXNlcm5hbWUiOiJhZG1pbiIsIkF1dGhvcml0eUlkIjpbMV0sIkJ1ZmZlclRpbWUiOjg2NDAwLCJpc3MiOiJQT1NURVIiLCJhdWQiOlsiQ0MiXSwiZXhwIjoxNzIzMTIzNTgwLCJuYmYiOjE3MjI1MTg3ODB9.gFtTwZO82jyEO-JW6sk-GUaMdsX00sZqzsfNoeUlJHY',
    //     user: data
    //   }
    // }
}
