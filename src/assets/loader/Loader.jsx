import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const Loader = () => (
    <Spin
        indicator={
            <LoadingOutlined
                style={{
                    fontSize: 100,
                    color: 'orange',
                    left: 500,
                }}
                spin
            />
        }
    />
);
export default Loader;