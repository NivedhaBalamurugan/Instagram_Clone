import { useGetUsersQuery } from "./usersApiSlice";
import User from './User'
import useAuth from "../../hooks/useAuth";

const UserList = () => {

    const {
        data:users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery ( 'UserList' ,
         {
            pollingInterval: 30000,
            refetchOnFocus : true,
            refetchOnMountOrArgChange: true
        }
    )

    const {id} = useAuth()

    let content 
    if(isLoading)
        content = <p>Loading...</p>
    if(isError)
        content = <p className="errmsg">{error?.data?.message}</p>
    if(isSuccess){

       if (users?.ids?.length) {

            content = users.ids
                .filter(userId => userId !== id)
                .map(userId => <User key={userId} userId={userId} />)
        
        } 
        else {
            content = <p>No users found...</p>;
        }


    }

    return content

}

export default UserList