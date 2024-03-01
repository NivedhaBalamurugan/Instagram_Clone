import UpdateForm from "./UpdateForm";
import { useGetUsersQuery } from "./usersApiSlice";

const User = ({ userId }) => {
  
    const {user} = useGetUsersQuery("UserList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
        selectFromResult : ({ data }) => ({                 //for this u need spineers package
            user : data?.entities[userId]
        }),
    })

    if (user) {

        return (
            <div>
                <h1>{user.username}</h1>
                <p>{user.email}</p>
            </div>
        );
    } else {
        return <p>No user found...</p>;
    }
}

export default User


/* */