import ins from '../../images/ins.jpg'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { useGetUsersQuery } from "./usersApiSlice"

const Profile = () => {

    const {username, email,id} = useAuth()
    console.log(id)
    const {userdet} = useGetUsersQuery("UserList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
        selectFromResult : ({ data }) => ({                 
            userdet : data?.entities[id]
        }),
    })
console.log(userdet)


    return (
        <>
            <div className='profile'>
                <div className='pp_img'>
                    <img  className='profile_img' src={ins} />
                </div>
                <div className='profile_con' >
                    <div className='firstline'>    
                        <h2>{username}</h2>
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
            </div>
        </>
    )
}

export default Profile