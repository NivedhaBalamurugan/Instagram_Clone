import { useGetPostsQuery } from "./postsApiSlice";
import Post from './Post'

const PostList = () => {

    const {
        data:posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery ( 'PostList' ,
         {
            pollingInterval: 15000,
            refetchOnFocus : true,
            refetchOnMountOrArgChange: true
        }
    )

    let content 
    if(isLoading)
        content = <p>Loading...</p>
    if(isError)
        content = <p className="errmsg">{error?.data?.message}</p>
    if(isSuccess){

       if(posts && posts.ids && posts.ids.length)
        {
                const {ids} = posts
                content = ids.map((postId) => <Post key={postId} postId={postId} />)
                
        }
        else
            content = <p>No posts found...</p>

    }

    return content

}

export default PostList