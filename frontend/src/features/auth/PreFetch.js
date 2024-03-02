import {store} from '../../app/store'
import { useEffect } from 'react'
import { postsApiSlice } from '../posts/postsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {

    useEffect(() => {
        console.log("Subscribing")
        const posts = store.dispatch(postsApiSlice.util.prefetch('getPosts' , 'PostList' , {force : true}))
        const users = store.dispatch(usersApiSlice.util.prefetch('getUsers' , 'UserList' , {force : true}))
    },[])
    return <Outlet />
}

export default Prefetch


//manually subscribing to make sure that page doesnt go out after 60 sec,making it remain active, then unsubscribe after we leave check usersapislice = keepunuseddata

//log - subs , unsubs, subs

//prefetch all the details 


//wrap this around dash from where we start getting data from backend