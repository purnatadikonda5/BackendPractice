export default function LoginPage(){ 
    return (
        <form  className="login">
            <h2>LOGIN</h2>
            <input type="text" className="username" placeholder="Username" />
            <input type="password" className="password" placeholder="Password"/>
            <button className="form-btn"> Login </button>
        </form>
    )
}