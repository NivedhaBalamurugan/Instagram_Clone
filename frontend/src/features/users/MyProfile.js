import ins from '../../images/ins.jpg'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { useGetUsersQuery } from "./usersApiSlice"
import GetPosts from '../posts/GetPosts'
import Post from '../posts/Post'

const MyProfile = () => {

    const {id} = useAuth()
   
    const {userdet} = useGetUsersQuery("UserList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
        selectFromResult : ({ data }) => ({                 
            userdet : data?.entities[id]
        }),
    })

    const {posts, isLoading, isSuccess, isError, error } = GetPosts()    

    const {ids} = posts

    let content

    if(isLoading)
        content = <p>Loading...</p>
    if(isError)
        content = <p className="errmsg">{error?.data?.message}</p>

    if(isSuccess) {

        content = (
            <>
                <div className='profile'>
                    <div className='pp_img'>
                        <img  className='profile_img' src={ins} />
                    </div>
                    <div className='profile_con' >
                        <div className='firstline'>    
                            <h2>{userdet.username}</h2>
                            <Link to="./update" >
                                <button 
                                    className='edit_btn'
                                >
                                    <span>Edit Profile</span> 
                                </button> 
                            </Link>
                        </div>
                        <div className='secline'>
                            <li>0 posts</li>
                            <li>10 followers</li>
                            <li>199 following</li>
                        </div>
                        <div className='bio'>
                            {userdet.bio}
                        </div>
                    </div>
                </div>
                <div>
                    <h3>My Posts</h3>
                    {
                           ids.map((postId) => <Post key={postId} postId={postId} userId = {userdet.id}/>)
                    }
                </div>
            </>
        )

    }

    return content
    
}

export default MyProfile