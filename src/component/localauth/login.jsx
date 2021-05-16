import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom"
import { useCookies } from "react-cookie"
import Googlelogin from './googlelogin';
import { USER_DETAILS } from '../../constant'
import { PROFILE_PATH } from "../../path"
import { toast } from 'react-toastify';
function Login() {
    const [cookie, setCookie] = useCookies([USER_DETAILS])

    const history = useHistory()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = ({ email, password }) => {


        if (email === process.env.REACT_APP_EMAIL && password === process.env.REACT_APP_PASSWORD) {
            const data = JSON.stringify({ email,password })
            toast("successfully login")
            localStorage.setItem(USER_DETAILS , data)
            setCookie(USER_DETAILS, data)
            history.push(PROFILE_PATH)
        } else {
             if(email !==process.env.REACT_APP_EMAIL && password !== process.env.REACT_APP_PASSWORD ){
                toast("user does not exist")
             }else if (email !== process.env.REACT_APP_EMAIL) {
                toast("Invalid email")

            } else if (password !== process.env.REACT_APP_PASSWORD) {
                toast("Incorrect password");
            }
        }
    }
    
    useEffect(() => {
            const userData = localStorage.getItem(USER_DETAILS)
            
        if (cookie[USER_DETAILS] && cookie[USER_DETAILS].email && cookie[USER_DETAILS].password) {
            history.push(PROFILE_PATH)
        }
    }, [cookie[USER_DETAILS]])

        return (
            <div className="login" >
                <div className="login_container">
                    <h2 className="heading"> Log In</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="main_div">
                    <div className="">
                        <label className="">Email</label>
                        <input

                            className=""
                            {...register(
                                "email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "invalid email address",
                                },
                            })}
                            type="text"
                            placeholder="Enter email here..."
                        />
                        <span className={"text-danger"}>
                            {errors.email &&
                                errors.email.type === "required" &&
                                "Email is required"}
                        </span>
                        <span className={"text-danger"}>
                            {errors.email && errors.email.message}
                        </span>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input

                            className=""

                            {...register("password", { required: true })}
                            type="password"
                            placeholder="********"
                        />
                        <span className={"text-danger"}>
                            {errors.password &&
                                errors.password.type === "required" &&
                                "Password is required"}
                        </span>
                    </div>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <button type="submit"  className="button_submit">
                        Submit
                     </button>
                </form>
                
                <Googlelogin  />
                </div>
                
            </div>
        )
    }

    export default Login
