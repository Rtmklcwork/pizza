import React from 'react';
import { Pagination } from 'antd';
type AppProps = {
    onChangePage: (i: number) => void
}
const App: React.FC<AppProps> = ({ onChangePage }) => <Pagination
    defaultCurrent={1} total={30}
    onChange={onChangePage}
/>;

export default App;