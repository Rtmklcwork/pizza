import React, { useCallback } from 'react'
import { useRef } from 'react'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import icon from '../../assets/img/4115230_cancel_close_delete_icon.svg'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice.ts'


const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [value, setValue] = React.useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    const clearInput = () => {
        dispatch(setSearchValue(''))
        setValue('')
        inputRef.current?.focus()
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchValue(e.target.value)
    }
    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))

        }, 500),
        []
    )
    return (
        <div className={styles.root}>
            <svg height="512px" id="Layer_1"
                className={styles.icon}
                version="1.1"
                viewBox="0 0 512 512"
                width="512px"
                xmlns="http://www.w3.org/2000/svg" >
                <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
            </svg>
            <input
                ref={inputRef}
                className={styles.input}
                placeholder='Поиск пиццы...'
                value={value}
                onChange={onChangeInput}
            />
            {value && <img
                onClick={clearInput}
                className={styles.deleteIcon}
                width="38" src={icon}
                alt="delete"
            />}

        </div>
    )
}

export default Search
