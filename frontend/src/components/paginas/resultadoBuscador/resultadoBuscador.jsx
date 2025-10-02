import { useParams } from "react-router-dom";

function ResultadoBuscador() {

    const { query } = useParams();

    return(
        <div>
            <h1>Resultados para: {decodeURIComponent(query)}</h1>
        </div>
    )
}

export default ResultadoBuscador;