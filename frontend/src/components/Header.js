import { useNavigate } from 'react-router-dom'
import ins from '../images/ins.jpg'
import { IoLogOut } from "react-icons/io5"
import { FaUser } from "react-icons/fa"
import { useLogoutMutation } from '../features/auth/authApiSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


const Header = () => {


    const navigate = useNavigate()

    const [logout , {
        isLoading,
        isSuccess,
        isError, 
        error
    }]  = useLogoutMutation()


    useEffect(() => {
        if(isSuccess)
            navigate('/')
    } , [isSuccess, navigate])

    const onClickLogOut = async () => {
        await logout()
    }



    return(
        <div className="header">
            <img className="headimg" src={ins} />
            <div className='headtitle'>Instagram</div>
            <div className='headcon'>
                <div className='headbody'>Socialize yourself</div>
            </div>
            <div className='navname'>
                    <button
                        title="logout"
                        onClick={onClickLogOut}
                        className='navname'
                    >
                        <IoLogOut />
                    </button> 
            </div>
            <div className='navname'>
                <Link to="/users/profile">
                    <button
                                title="logout"
                                className='navname'
                    >
                        <FaUser />
                    </button> 
                </Link>
            </div>
        </div>
    )
}

export default Header

