import React from 'react'

type CategoriesProps = {
    value: number;
    changeCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(({ value, changeCategory }) => {

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
})

export default Categories
