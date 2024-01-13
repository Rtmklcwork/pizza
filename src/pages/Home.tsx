import React from 'react'
import { useSelector } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock.tsx';
import Skeleton from "../components/PizzaBlock/Skeleton.tsx";
import Sort from "../components/Sort.tsx";
import Categories from "../components/Categories.tsx";
import App from '../components/Pagination/index.tsx';
import { filterSelector, setCategory, setPageCount } from '../redux/slices/filterSlice.ts';
import { fetchPizzas, pizzasSelector } from '../redux/slices/pizzasSlice.ts'
import { useAppDispatch } from '../redux/store.ts';



const Home: React.FC = () => {
    const { categoryId, sort, pageCount, searchValue } = useSelector(filterSelector)


    const { items, status } = useSelector(pizzasSelector)
    const sortType = sort.sortProperty
    const dispatch = useAppDispatch()

    const getPizza = async () => {
        const sortBy = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                searchValue,
                pageCount: String(pageCount),
            }))
    }


    const onChangePage = (i: number) => {
        dispatch(setPageCount(i))
    }

    const onChangeCategory = React.useCallback((id: number) => {
        dispatch(setCategory(id))
    }, [])

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
            <App onChangePage={onChangePage} />
        </div>
    )
}

export default Home
