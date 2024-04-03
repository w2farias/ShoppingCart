import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Checkout() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const initialItems = JSON.parse(decodeURIComponent(searchParams.get('items')))
    const initialTotal = parseFloat(searchParams.get('total'))
    const navigate = useNavigate()

    const [items, setItems] = useState(initialItems)
    const [total, setTotal] = useState(initialTotal)

    useEffect(() => {
        let newTotal = 0;
        items.forEach(item => {
            newTotal += item.quantity * item.price;
        });
        setTotal(newTotal);
    }, [items]);

    const handleRemoveItem = (index) => {
        const updatedItems = [...items]
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity -= 1
            updatedItems[index].price -= updatedItems[index].price / (updatedItems[index].quantity + 1)
        } else {
            updatedItems.splice(index, 1)
        }
        setItems(updatedItems)
    }

    return (
        <>
            <h2>Lista de Checagem</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <p> {item.quantity} x {item.title} - ${item.price.toFixed(2)} </p>
                        <button onClick={() => handleRemoveItem(index)}>Remover</button>
                    </li>
                ))}
            </ul>
            <p id='total'>Total: ${total.toFixed(2)}</p>

            <button id='Pagar' onClick>Pagamento</button>
            <br /><br /><br />
            <button onClick={() => navigate(-1)}>Voltar</button>
        </>
    )
}

export default Checkout
