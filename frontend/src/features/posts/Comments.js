import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useUpdatePostsMutation } from "./postsApiSlice"
import DisplayComment from './DisplayComment'
import { IoSendSharp } from "react-icons/io5";

const Comments = ({postId}) => {

    const [updatePosts , {
        isLoading, 
        isSuccess,
        isError,
        error
    }] = useUpdatePostsMutation()

    const {id} = useAuth()
    const [comment, setComment] = useState('')

    const handleComment = async () => { 
        const result = await updatePosts({id: postId , comment, commentedBy: id})
        setComment('')

    }
    const errClass = isError ? "errmsg" : "dont_show"
    const errContent = isError ? (error?.data?.message) : " "

    let content
    if(isLoading)   
        content = <p>Loading...</p>


    else {
        
        content = (
            

            <>
                <p className={errClass}>{errContent}</p>
            
                <div>
                    <DisplayComment postId={postId}/>

                    <form className="comment_form" onSubmit={(e) => e.preventDefault()}>
                        <input 
                            id="comment"
                            type="text"
                            placeholder="Give your comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button 
                            type="button"
                            onClick={handleComment}
                            className="sendicon"
                        >
                            <IoSendSharp />
                        </button>
                    </form>
                    
                </div>
            
            </>
            
        )

        }
    

    return content

}

export default Comments