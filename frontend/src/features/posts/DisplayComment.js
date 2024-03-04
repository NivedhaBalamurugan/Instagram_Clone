import { useState } from "react"
import { useGetPostsQuery } from "./postsApiSlice"

const DisplayComment = ({postId}) => {
    
    const {post} = useGetPostsQuery("PostList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
        selectFromResult : ({ data }) => ({                 
            post : data?.entities[postId]
        }),
    })

    const [comt,setComt] = useState('More')
    const [end, setEnd] = useState(2)

    const handleMoreLess = () => {

        if(comt === "More"){
            setComt("Less")
            setEnd(post.comments.length)
        }
        else{
            setComt("More")
            setEnd(2)
        }

    }

    return (
        <>
        {
            post.comments.slice(0,end).map((cmt) => (
                <>
                <p key={cmt._id}>{cmt.com_username}&nbsp;&nbsp;
                    {cmt.text}</p>
                </>
            ))
        }
        <div>
            <button
                onClick={handleMoreLess}
            >
                View {comt}
            </button>
        </div>
        </>
        
        
    )
    

}

export default DisplayComment