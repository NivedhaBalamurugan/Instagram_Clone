import { FaHeart } from "react-icons/fa"
import { useUpdatePostsMutation } from "./postsApiSlice"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import { useGetPostsQuery } from "./postsApiSlice"

const Reactions = ({postId , likes}) => {

    const [updatePosts , {
        isLoading, 
        isSuccess, 
        isError, 
        error
    }] = useUpdatePostsMutation()

    const {id} = useAuth()

    const [like, setlike] = useState('')

    useEffect(() => {

        if(likes.indexOf(id) === -1) 
            setlike("dislike") 
        else    
            setlike("like")
    
    },[])    


    const handleReaction = async () => {

        if(like === "dislike" ){
            const result = await updatePosts({id : postId , likedBy:id}) 
            setlike("like")
        }   
        else{
            const result = await updatePosts({id : postId , dislikedBy:id}) 
            setlike("dislike")
        }
        
    }

    const errClass = isError ? "errmsg" : "dont_show"
    const errContent = isError ? (error?.data?.message) : " "
 
    return (


        <div>
            <p className={errClass} > {errContent} </p>
            {
            
                    
                        <div
                            className="reactionButton"
                            onClick={handleReaction}
                        >
                        <span className={like}> <FaHeart /> </span>
                        </div>
                    
            
            
            }
        </div>

    )


}

export default Reactions