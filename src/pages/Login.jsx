
import { Form, useNavigate } from "react-router-dom"
import { useState } from "react"
import logo from '../pages/Logo.gif'



function Login() {
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(true)


    const handONchange = (event) => {
        const { value } = event.target
        setEmail(value)


        const emailEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        setValid(emailEx.test(value))
    }



    const handleClick = () => {

        if (password.length >= 8) {
            navigate('/products')
        }

    }

    return (
        <div>

            <img width='250px' src={logo} alt="Logo" />

            <h2>seja um revendedor!</h2>
            <h1>Entrar</h1>
            <label htmlFor="">Email:   <input placeholder="exemplo@exemplo.com" type="email" value={email} onChange={handONchange} />
            </label>
            {!valid && <p style={{ color: 'red' }}>Por favor, insira um e-mail válido.</p>}
            <br />
            <label htmlFor="">Senha:    <input placeholder="maior ou igual 8 caracteres" onChange={({ target: { value } }) => setPassword(value)} type="password" />
            </label>
            <br /> <br />
            <button disabled={!(password.length >= 8)} onClick={handleClick} >Login</button>


        </div>
    )



}

export default Login