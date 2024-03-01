import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({

    baseUrl: 'http://localhost:3500',
        credentials: 'include',
        prepareHeaders: (headers ,{getState}) => {
            const token = getState().auth.token
            if(token)
            {
                headers.set("authorization" , `Bearer ${token}`)
            }
            return headers
        }
    
})



const baseQueryWithReauth = async(args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)
    if(result?.error?.status === 403)  {

      
        const refreshresult = await baseQuery('/auth/refresh' , api, extraOptions)
        if(refreshresult?.data)   {
          
            api.dispatch(setCredentials({ accessToken : refreshresult.data })) 
            result = await baseQuery(args, api, extraOptions)
            return result
        }
        else{
            if(refreshresult?.error?.status === 403)
                refreshresult.error.data.message = "Your refresh token expired "
            return refreshresult
        }
        
    }
    else
        return result

}


export const apiSlice = createApi({

    baseQuery : baseQueryWithReauth,
    tagTypes : ['Post' , 'User'],
    endpoints : builder => ({
        
    })

})


