import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../component/assets/bgimg.jpeg";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const styles = {
        labelStyle : `block mb-2 text-sm font-medium text-gray-900 dark:text-green-400`,
        todoStyle:`flex items-center mb-6 text-2xl font-extrabold text-gray-900 dark:text-white`,
        signinBox:`p-6 space-y-4 md:space-y-6 sm:p-8`,
        signinStyleContainer:`w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`,
        signinStyle:`text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center`,
        emailStyle:`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
        CredStyle: `bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
        rmbMe:`text-gray-500 dark:text-gray-300`,
        forgetStyle:`text-sm font-medium text-primary-600 hover:underline dark:text-gray-300`,
        submit:`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`,
        errorMsg:`"mt-2 text-sm text-red-600 dark:text-red-400 text-center`

    }
    
    const validEmail = "saqlain@gmail.com";
    const validPassword = "abc1234";
    const navigate = useNavigate();

    localStorage.setItem("email",validEmail)
    localStorage.setItem("password",validPassword)
    
    const handleLogin = (e) => {
    e.preventDefault();
       
    const getemail=localStorage.getItem("email")
    const getpassword=localStorage.getItem("password")

    console.log("getemail", getemail)
    console.log("getpassword", getpassword)

    if (email === validEmail && password === validPassword) {
        navigate('/home');
       
    } else {
        setErrorMessage("Invalid email or password");
      }
    };
  return (
    <>  
  <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: '100%',}}>
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className={styles.todoStyle}>
                    Todo App   
                </a>
                <div className={styles.signinStyleContainer}>
                    <div className={styles.signinBox}>
                        <h1 className={styles.signinStyle}>
                            Sign in 
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label for="email" className={styles.labelStyle}>Your email</label>
                                 <input type="email" name="email" id="email" className={styles.emailStyle} placeholder="name@company.com" required=""  value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label for="password" className={styles.labelStyle}>Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className={styles.CredStyle} required=""  value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className={styles.CredStyle} required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="remember" className={styles.rmbMe}>Remember me</label>
                                    </div>
                                </div>
                                <a href="/" className={styles.forgetStyle}>Forgot password?</a>
                            </div>
                            <button type="submit" className={styles.submit}>Sign in</button>
                            {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </>
  )
}
export default Login