import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Cities from '../Cities';
import "./home.css"
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }}
    ,[])
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout >
            <Sider  trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu 
                    active
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '0',
                            label: (<><h1>JavokhirAdmin</h1></>)
                        },
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: (<><NavLink to='/' active>Dashboard</NavLink></>),
                        },
                        {
                            key: '3',
                            icon: <VideoCameraOutlined />,
                            label: (<><NavLink to='/brands'active >Brands</NavLink></>),
                        },
                        {
                            key: '4',
                            icon: < BarChartOutlined/>,
                            label: (<><NavLink to='/models' active>Models</NavLink></>),
                        },
                        {
                            key: '5',
                            icon: <CloudOutlined/>,
                            label: (<><NavLink to='/location' active>Location</NavLink></>),
                        },
                        {
                            key: '6',
                            icon: <AppstoreOutlined />,
                            label: (<><NavLink to='/cities' active >Cities</NavLink></>),
                        },
                        {
                            key: '7',
                            icon: <UploadOutlined />,
                            label: (<><NavLink to='/cars' active>Cars</NavLink></>),
                        },
                        {
                            key: '2',
                            icon: < MenuUnfoldOutlined />,
                            label: (<><NavLink to='/settings' active >Settings</NavLink></>),
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        width: '100%',
                        zIndex: 2,
                        top: 0,
                        position: 'fixed',
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 56,
                            height: 40,
                            color: '#fff',
                            background: '#1677ff',
                            marginLeft: 30,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        overflow:scrollY,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default Home;