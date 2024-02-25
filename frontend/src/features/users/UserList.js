import { useGetUsersQuery } from "./usersApiSlice";
import User from './User'

const UserList = () => {

    const {
        data:users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery ( 'UserList' ,
         {
            pollingInterval: 15000,
            refetchOnFocus : true,
            refetchOnMountOrArgChange: true
        }
    )

    let content 
    if(isLoading)
        content = <p>Loading...</p>
    if(isError)
        content = <p className="errmsg">{error?.data?.message}</p>
    if(isSuccess){

       if(users && users.ids && users.ids.length)
        {
                const {ids} = users
                content = ids.map((userId) => <User key={userId} userId={userId} />)
                
        }
        else
            content = <p>No users found...</p>

    }

    return content

}

export default UserList