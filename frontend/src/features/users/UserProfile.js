import { useParams } from "react-router-dom"
import ins from '../../images/ins.jpg'
import { useGetUsersQuery } from "./usersApiSlice"
import Post from "../posts/Post"
import GetPosts from "../posts/GetPosts"

const UserProfile = () => {
    
    const {id} = useParams()

    const {user} = useGetUsersQuery("UserList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
        selectFromResult : ({ data }) => ({                 
            user : data?.entities[id]
        }),
    })

   
    const {posts, isLoading, isSuccess, isError, error } = GetPosts()


    let content
    if(!user)
        content = <p>Loading...</p>
    if(isLoading)
        content = <p>Loading...</p>
    if(isError)
        content = <p className="errmsg">{error?.data?.message}</p>
    
    const {ids} = posts


    if(isSuccess) 
    {
        content= (
            <>
                <div className='profile'>
                    <div className='pp_img'>
                        <img  className='profile_img' src={ins} />
                    </div>
                    <div className='profile_con' >
                        <div className='firstline'>    
                            <h2>{user.username}</h2>
                        </div>
                        <div className='secline'>
                            <li>0 posts</li>
                            <li>10 followers</li>
                            <li>199 following</li>
                        </div>
                        <div className='bio'>
                            {user.bio}
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Posts</h3>
                    {
                       ids.map((postId) => <Post key={postId} postId={postId} userId = {id}/>)
                    }
                </div>
            </>
        )
    }
    

    return content

}

export default UserProfile

