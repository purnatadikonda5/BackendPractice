export default function RegisterPage(){ 
    return (
        <form  className="register" method="post" action="http://localhost:8080/register">
            <h2>REGISTER</h2>
            <input type="text" name="email" className="Email" placeholder="Email" />
            <input type="text" name="username" className="username" placeholder="Username" />
            <input type="password" name="password" className="password" placeholder="Password"/>
            <button className="form-btn"> Register </button>
        </form>
    )
}