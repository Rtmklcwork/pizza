import React from 'react'

import s from './NotFoundPage.module.scss'

const NotFoundPage: React.FC = () => {
    return (
        <>

            <h1 className={s.root}>
                <span>😕</span>
                <br />
                Ничего не найдено!
            </h1>
        </>
    )
}

export default NotFoundPage
