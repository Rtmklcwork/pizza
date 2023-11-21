import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { list } from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from '../components/Pagination';
import { setCategory, setFilter, setPageCount } from '../redux/slices/filterSlice';



const Home = ({ value }) => {
    const { categoryId, sort, pageCount } = useSelector((state) => state.filter)
    const navigate = useNavigate()

    const sortType = sort.sortProperty
    const dispatch = useDispatch()
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const fetchPizzas = () => {
        setIsLoading(true)
        const sortBy = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        axios.get(
            `https://65448feb5a0b4b04436c8365.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${searchValue}`
        ).then((res) => {
            setItems(res.data)
            setIsLoading(false)
        })
    }

    const searchValue = value
    const onChangePage = (i) => {
        dispatch(setPageCount(i))
    }
    const onChangeCategory = (id) => {
        dispatch(setCategory(id))
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = list.find((obj) => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilter({
                    ...params,
                    sort
                })
            )
        }
        isSearch.current = true
    })

    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [categoryId, sortType, searchValue, pageCount])

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                pageCount,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
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
                    isLoading ? skeleton
                        :
                        pizzas
                }
            </div>
            <Pagination onChangePage={onChangePage} />
        </div>
    )
}

export default Home
