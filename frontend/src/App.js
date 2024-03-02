import {Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import OuterLayout from './components/OuterLayout'
import Login from './features/auth/Login'
import PostList from './features/posts/PostList'
import UserList from  './features/users/UserList'
import MyProfile from './features/users/MyProfile'
import UpdateForm from './features/users/UpdateForm'
import Prefetch from './features/auth/PreFetch'
import UserProfile from './features/users/UserProfile'

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
                        <Route path=':id' element = { < UserProfile/> } />
                        <Route path="profile" >
                            <Route index element = { <MyProfile /> } />
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

