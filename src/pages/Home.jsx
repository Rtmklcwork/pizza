import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from '../components/Pagination';
import { filterSelector, setCategory, setPageCount } from '../redux/slices/filterSlice';
import { fetchPizzas, pizzasSelector } from '../redux/slices/pizzasSlice'



const Home = ({ value }) => {
    const { categoryId, sort, pageCount, searchValue } = useSelector(filterSelector)
    const { items, status } = useSelector(pizzasSelector)
    const sortType = sort.sortProperty
    const dispatch = useDispatch()

    const getPizza = async () => {
        const sortBy = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        dispatch(fetchPizzas({
            sortBy,
            order,
            category,
            pageCount,
            searchValue,
        }))
    }


    const onChangePage = (i) => {
        dispatch(setPageCount(i))
    }

    const onChangeCategory = (id) => {
        dispatch(setCategory(id))
    }

    React.useEffect(() => {
        getPizza()
    }, [categoryId, sortType, searchValue, pageCount])

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id}  {...obj} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} changeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    status === 'loading' ? skeleton
                        :
                        pizzas
                }
            </div>
            <Pagination onChangePage={onChangePage} />
        </div>
    )
}

export default Home
