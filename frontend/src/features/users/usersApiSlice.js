import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getUsers : builder.query({

            query: () => '/users',
            validateStatus : (response, result) => {
                return response.status === 200 && !result.isError 
            },
            transformResponse: (responseData) => {
                const loadedusers = responseData.map((user) => {
                    user.id =user._id
                    return user;
                });
                return usersAdapter.setAll(initialState,loadedusers)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        {type: 'User' , id: 'LIST' },
                        ...result.ids.map((id) => ({type:'User' , id }))
                    ]
                    
                }
                else
                    return [{ type: 'User' , id : 'LIST' }]
            }
        }),

        updateProfile : builder.mutation({

            query: (initialUserData) => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags : (result, err, arg) => [
                {type: 'User' , id : arg.id}
            ]


        })

    })


})

export const {
    useGetUsersQuery,
    useUpdateProfileMutation
} = usersApiSlice

