export default function RegisterPage(){ 
    return (
        <form  className="register">
            <h2>REGISTER</h2>
            <input type="text" className="username" placeholder="Username" />
            <input type="password" className="password" placeholder="Password"/>
            <button className="form-btn"> Register </button>
        </form>
    )
}