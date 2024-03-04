import Post from './Post'
import GetPosts from './GetPosts'

const PostList = () => {

    const {posts, isLoading, isSuccess, isError, error } = GetPosts()

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