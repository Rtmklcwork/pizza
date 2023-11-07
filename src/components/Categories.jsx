import React from 'react'

const Categories = ({ value, changeCategory }) => {

    const [activeIndex, setActiveIndex] = React.useState(0)
    const activeCategoty = (index) => {
        setActiveIndex(index)
    }

    const categories = ['Все', 'Мясные', 'Вегетарианские', 'Закрытые', 'Острые', 'Гриль']


    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => changeCategory(index)}
                            className={value === index ? 'active' : ''}>
                            {item}
                        </li>
                    ))
                }
            </ul>
        </div >
    )
}

export default Categories
