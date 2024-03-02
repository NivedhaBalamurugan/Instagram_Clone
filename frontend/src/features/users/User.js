import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";

const User = ({ userId }) => {


    const {user} = useGetUsersQuery("UserList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
        selectFromResult : ({ data }) => ({                 //for this u need spineers package
            user : data?.entities[userId]
        }),
    })

    const navigate = useNavigate()

    const handleProfile = () => {
        navigate(`/users/${userId}`)
    }

    if (user) {
       
        return (
            <div>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
                <button
                    onClick={handleProfile}
                >
                    View Profile
                </button>
            </div>
        );
    } else {
        return <p>No user found...</p>;
    }
}

export default User


/* */