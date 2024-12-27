export default function LoginPage(){ 
    return (
        <form  className="login" method="post" action="http://localhost:8080/login">
            <h2>LOGIN</h2>
            <input type="text" name="username" className="username" placeholder="Username" />
            <input type="password" name="password" className="password" placeholder="Password"/>
            <button className="form-btn"> Login </button>
        </form>
    )
}