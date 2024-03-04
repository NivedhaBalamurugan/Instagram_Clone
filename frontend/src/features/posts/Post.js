import { useGetPostsQuery } from "./postsApiSlice"
import ins from '../../images/ins.jpg'
import { FaRegUserCircle } from "react-icons/fa"
import { parseISO, formatDistanceToNow } from 'date-fns'
import Reactions from './Reactions'

const Post = ({ postId , userId}) => {
  
    const {post} = useGetPostsQuery("PostList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
        selectFromResult : ({ data }) => ({                 //for this u need spineers package
            post : data?.entities[postId]
        }),
    })


    if (post) {

        const timeago = (timestamp) => {

            if(timestamp) {
                const crtdate = parseISO(timestamp) //created time
                const timePeriod = formatDistanceToNow(crtdate) 
                return `${timePeriod} ago`
            }
            return '';
        }

        let content = (
            <div className="posts-container">
                    <div className="postcon">
                        <div className="postinfo">
                            <p><FaRegUserCircle />{post.username}</p>
                            <p>{timeago(post.createdAt)}</p>
                        </div>
                        <div className="postdet">
                            <div className="posttitle">{post.title}</div>
                            <img className="postimg" src={ins}/>
                            <p>{post.body}</p>
                        </div>
                        <Reactions postId = {postId} likes={post.likes}/>
                    </div>
                </div>
        )

        if(userId)
        {
            if(post.postedBy !== userId) 
                return null
           
            else 
                return content
        }
        else    
            return content
        
    }
    else 
        return <p>No post found...</p>;
    
}

export default Post
