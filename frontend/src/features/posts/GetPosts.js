///this is only to get the posts and not is used in the frontend
//to get the posts and pass to postlist and user pofile

import { useGetPostsQuery } from "./postsApiSlice"

const GetPosts = () => {

    const {
        data:posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery ( 'PostList' ,
         {
            pollingInterval: 30000,
            refetchOnFocus : true,
            refetchOnMountOrArgChange: true
        }
    )

    return {posts, isLoading, isSuccess, isError, error}

}

export default GetPosts