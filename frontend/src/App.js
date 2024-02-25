import {Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import OuterLayout from './components/OuterLayout'
import Login from './features/auth/Login'
import PostList from './features/posts/PostList'
import UserList from  './features/users/UserList'

const App = () => {
    return (

        <Routes>
            <Route path="/" element = { <OuterLayout /> } >

                <Route index element = { <Login /> } />
                
                <Route element = { <Layout /> } >

                    <Route path ="posts" >
                        
                        <Route index element = { <PostList /> } />
                
                    </Route>
                    
                    <Route path="users" >

                        <Route index element = { <UserList /> } />

                    </Route>
                </Route>

            </Route>
        </Routes>

    )   
}

export default App

