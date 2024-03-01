import { useState ,useEffect, useRef} from "react"
import { useNavigate} from "react-router-dom"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import { useDispatch } from "react-redux"

const Login = () => {

    

    const emailRef = useRef()
    const errref = useRef()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login , {
        isLoading
    }] = useLoginMutation()

  /*  useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {       //after showing err msg, when user starts to type mial, it should go off
        setErrMsg('')
    },[email,password])*/

    const handleSubmit = async () => {
        
        
        try {
            const {accessToken} = await login({email,password}).unwrap()
            dispatch(setCredentials({accessToken}))
            setEmail('')
            setPassword('')
            navigate('/posts')
        }   catch(err) {
                if (!err.status) {
                    setErrMsg('No Server Response');
                } else if (err.status === 400) {
                    setErrMsg('Missing email or Password');
                } else if (err.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg(err.data?.message);
                }
              //  errref.current.focus()
        }

    }

    const errclass = errMsg ? "errmsg" : "offscreen"
    
    let content 

    if(isLoading)   
        content = <p>Loading..</p>
    else{

        content = ( 
            <section className="login">
                <h1>Login to your account</h1>
                <main>
                    <p className={errclass} aria-live="assertive">{errMsg}</p>
                    <form className="form" onSubmit={(e) => e.preventDefault()}>

                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            className="form_iput"
                        // ref={emailRef}
                            value={email}
                            autoComplete="off"
                            required
                        />

                        <label htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            className="form_iput"
                            value={password}
                            required
                        />

                        <button
                            type="button"
                            className="form_submit"
                            onClick={handleSubmit}
                        >Log In </button>


                    </form>
                </main>
            </section>
        )
    }

    return content

}

export default Login