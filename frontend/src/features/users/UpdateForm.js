import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { useUpdateProfileMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { useGetUsersQuery } from "./usersApiSlice"

const UpdateForm = () => {

    const {username, email,id} = useAuth()

    const {userdet} = useGetUsersQuery("UserList" , {         //we have only id here, instead of getting all data using this query, we use a method to get the data for that noteid alone
        selectFromResult : ({ data }) => ({                 
            userdet : data?.entities[id]
        }),
    })


    const [user,setUser] = useState(username)
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState(userdet.bio)
    const [gender, setGender] = useState(userdet.gender)

    const navigate = useNavigate()
    const gender_values = ['Male' , 'Female' , 'Dont Want to Specify']



    const [UpdateProfile, {
        isLoading,
        isSuccess,
        isError,
        error
    } ] = useUpdateProfileMutation()

    useEffect(() => {
        if(isSuccess)
            navigate('/users/profile')
    },[isSuccess, navigate])

    const onClickUpdateProfile = async () => {

        const result = await UpdateProfile({username:user, email, password,gender, bio })
    }

    const errClass = isError ? "errmsg" : "dont_show"
    const errContent = (error?.data?.message)

    return(

        <>
        <p className={errClass}>{errContent}</p>

        <div>
            <h2>Update Profile</h2>
            <form className="update_form" onSubmit={(e) => e.preventDefault()}>
            
                <label 
                    className="label"
                    htmlFor="username"
                >
                    Username
                </label>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    id="username"
                />

                <label 
                    className="label"
                    htmlFor="username"
                >
                    Email
                </label>
                <input
                    type="text"
                    value={email}
                    id="email"
                    disabled
                />

                <label 
                    className="label"
                    htmlFor="username"
                >
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                />

                <label 
                    className="label"
                    htmlFor="bio"
                >
                    Bio
                </label>
                <textarea 
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />


                <label 
                     className="label"
                     htmlFor="gender" >
                    Gender
                </label>
                <br></br>
                {
                    gender_values.map((val) => (
                        <label
                            className="genderradio"
                        >
                            {val}
                            <input
                                type="radio"
                                id={val}
                                name="gender"
                                key={val}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <span className="checkmark"></span>
                        </label>
                    ))
                }

                <button
                    onClick={onClickUpdateProfile}
                >
                    Submit
                </button>


            </form>
        </div>
        </>
    )
}


export default UpdateForm
