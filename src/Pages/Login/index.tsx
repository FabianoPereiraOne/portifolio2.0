import { usePortfolioContext } from "../../contexts"
import { app } from '../../services/firebase'
import { useEffect } from "react"

export const Login = () =>{
    const useContext = usePortfolioContext()

    useEffect(() => {
        app()
    },[])

    return(
        <section>
            <h1>Pagina de login</h1>
            <button onClick={() => useContext.handleSigin('teste','teste') }>Entrar</button>
        </section>
    )
}

