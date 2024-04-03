import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../pages/Logo.gif'

function Products() {
    const [data, setData] = useState([])
    const [shop, setShop] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [menuVisible, setMenuVisible] = useState(false)
    const [cartHidden, setcartHidden] = useState(false)
    const [cartItemStyle, setcartItemStyle] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setData(data)
                const uniqueCategories = [...new Set(data.map(item => item.category))]
                setCategories(uniqueCategories)
            })
    }, [])

    useEffect(() => {
        const price = shop.reduce((total, item) => total + item.price * item.quantity, 0)
        setTotalPrice(price)

        const itemCount = shop.reduce((total, item) => total + item.quantity, 0)
        setcartItemStyle(itemCount)
    }, [shop])

    const addShop = (product) => {
        const existingItem = shop.find(item => item.id === product.id)
        if (existingItem) {
            const updatedShop = shop.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
            setShop(updatedShop)
        } else {
            setShop([...shop, { ...product, quantity: 1 }])
        }
    }

    const removeItem = (id) => {
        const updatedShop = shop.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0)
        setShop(updatedShop)
    }

    const filterByCategory = (category) => {
        setSelectedCategory(category)
        alterMenu()
    }

    const alterMenu = () => {
        setMenuVisible(!menuVisible)
    }

    const toggleCartVisibility = () => {
        setcartHidden(!cartHidden)
    }

    const handleCheckout = () => {
        navigate(`/checkout?items=${encodeURIComponent(JSON.stringify(shop))}&total=${totalPrice}`)
    }

    return (
        <>
            <img width='250px' src={logo} alt="Logo" />
            <br /><br />
            <button onClick={alterMenu}>Categorias</button>

            <button onClick={toggleCartVisibility}>Carrinho de Compras ({cartItemStyle})</button>
            <br /><br /><br />
            {menuVisible && (
                <div className="menu">
                    <ul>
                        {categories.map(category => (
                            <li key={category}>
                                <button onClick={() => filterByCategory(category)}>
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <br /><br />
            <div>
                {cartHidden && (
                    <div>
                        <h2>Carrinho de compras</h2>
                        <ul>
                            {shop.map(item => (
                                <li key={item.id}>
                                    {item.quantity} - {item.title} - ${item.price}
                                    <button id='re' onClick={() => removeItem(item.id)}>Remover</button>
                                </li>
                            ))}
                        </ul>
                        <p id='total'>Total: ${totalPrice}</p>
                        <button onClick={handleCheckout}>Finalizar Compra</button>
                    </div>
                )}
            </div>
            <br />
            <div>
                <h2>Produtos</h2>
                {data
                    .filter(product => !selectedCategory || product.category === selectedCategory)
                    .map(product => (
                        <div key={product.id}>
                            <p>{product.title}</p>
                            <button onClick={() => navigate(`/details/${product.id}`)}>
                                <img width='250px' src={product.image} alt={product.title} />
                            </button>
                            <p>Price: ${product.price}</p>
                            <button onClick={() => addShop(product)}>Adicionar</button>
                        </div>
                    ))}
            </div>
            <br /><br /><br />
            <button onClick={() => navigate(-1)}>Voltar</button>
        </>
    )
}

export default Products
