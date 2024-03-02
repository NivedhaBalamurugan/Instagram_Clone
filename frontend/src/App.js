import {Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import OuterLayout from './components/OuterLayout'
import Login from './features/auth/Login'
import PostList from './features/posts/PostList'
import UserList from  './features/users/UserList'
import Profile from './features/users/Profile'
import UpdateForm from './features/users/UpdateForm'
import Prefetch from './features/auth/PreFetch'

const App = () => {
    return (

        <Routes>
            <Route path="/" element = { <OuterLayout /> } >

                <Route index element = { <Login /> } />

                <Route element = { <Prefetch /> } >
                
                <Route element = { <Layout /> } >

                    <Route path ="posts" >
                        
                        <Route index element = { <PostList /> } />
                
                    </Route>
                    
                    <Route path="users" >

                        <Route index element = { <UserList /> } />
                        <Route path="profile" >
                            <Route index element = { <Profile /> } />
                            <Route path="update" element = { <UpdateForm /> } />
                        </Route>

                    </Route>

                </Route>    

                </Route>

            </Route>
        </Routes>

    )   
}

export default App

