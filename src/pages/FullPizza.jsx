import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Loader from '../assets/loader/Loader'

const FullPizza = () => {
    const { id } = useParams()
    console.log(id);
    const [pizza, setPizza] = useState()
    const navigate = useNavigate()
    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://65448feb5a0b4b04436c8365.mockapi.io/items/` + id)
                setPizza(data)
                console.log(data);
            } catch (error) {
                alert('Error')
            }
        }
        fetchPizza()
    }, [])

    return (
        <>
            {!pizza ?
                <div>
                    <Loader />
                </div>
                :
                <div className='container'>
                    <img src={pizza.imageUrl} />
                    <h2>{pizza.title}</h2>
                    <p>{pizza.price}р</p>
                </div>
            }
        </>
    )
}

export default FullPizza
