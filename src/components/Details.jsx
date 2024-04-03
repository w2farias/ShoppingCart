import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import logo from '../pages/Logo.gif'
import { useNavigate } from 'react-router-dom'

function Details() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))

    }, [id])

    if (!product) return null

    return (

        <div>
            <img width='250px' src={logo} alt="Logo" />
            <br /><br />
            <h2>{product.title}</h2>
            <img width='200px' src={product.image} alt={product.title} />
            <p>Preço: ${product.price}</p>
            <p >Descrição: {product.description}</p>
            <p>Avaliações: {product.rating.rate} ({product.rating.count} reviews)</p>
            <button onClick={() => navigate(-1)}>Voltar</button>
        </div>
    )
}

export default Details
