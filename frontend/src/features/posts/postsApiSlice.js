import {  createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const postsAdapter = createEntityAdapter({})

const initialState = postsAdapter.getInitialState()

export const postsApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        getPosts : builder.query({

            query: () => '/posts',
            validateStatus : (response, result) => {
                return response.status === 200 && !result.isError 
            },
            transformResponse: (responseData) => {
                
                    const loadedPosts = responseData.map((post) => {
                        post.id = post._id;
                        return post;
                    });
                   
                    return postsAdapter.setAll(initialState, loadedPosts);
                
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        {type: 'Post' , id: 'LIST' },
                        ...result.ids.map((id) => ({type:'Post' , id }))
                    ]
                    
                }
                else
                    return [{ type: 'Post' , id : 'LIST' }]
            }
        }) , 


        updatePosts : builder.mutation ({

            query: (initialPostData) => ({
                url: '/posts',
                method : 'PATCH',
                body : {
                    ...initialPostData,
                }
            }),
            invalidatesTags : (result, err, arg) => [
                {type: 'Post' , id: arg.id}
            ]

        })

    })


})

export const {
    useGetPostsQuery,
    useUpdatePostsMutation
} = postsApiSlice

