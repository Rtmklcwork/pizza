import React from 'react';
import { Pagination } from 'antd';



const App = ({ onChangePage }) => {
    return (
        <Pagination
            defaultCurrent={1}
            total={30}
            onChange={onChangePage}
        />
    )

}



export default App;