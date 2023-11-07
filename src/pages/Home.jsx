import React from 'react'

import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Categories from "../components/Categories";


const Home = ({ value }) => {
    // const url = "https://65448feb5a0b4b04436c8365.mockapi.io/items"
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0)
    const [sort, setSort] = React.useState({
        name: 'Популярности',
        sort: 'rating'
    })
    React.useEffect(() => {

        setIsLoading(true)
        const search = value ? `&search = ${value}` : '';

        fetch(`https://65448feb5a0b4b04436c8365.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}${search}&sortBy=${sort.sort}&order=desc&search=${value}`)
            .then((res) => res.json()
            )
            .then((arr) => {
                setItems(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sort])
    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id}  {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} changeCategory={(id) => setCategoryId(id)} />
                <Sort value={sort} changeSort={(i) => setSort(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeleton
                        :
                        pizzas
                }
            </div>
        </div>
    )
}

export default Home
