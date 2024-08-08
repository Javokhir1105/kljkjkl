import { Button, Form, Input, Modal, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Cities() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [userEdit,setuserEdit] = useState(null)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const getApi = () => {
        setLoading(true);
        fetch('https://autoapi.dezinfeksiyatashkent.uz/api/cities')
            .then(res => res.json())
            .then(data => {
                setUser(data?.data);
            })
            .catch(error => {
                console.error('Xatolik', error);
            });
        setLoading(false);
    };

    const handleSubmit = (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('text', values.text);
        formData.append('images', image)


        axios({
            url: userEdit?`https://autoapi.dezinfeksiyatashkent.uz/api/cities/${userEdit.id}`:`https://autoapi.dezinfeksiyatashkent.uz/api/cities`,
            method: userEdit?`PUT`:`POST`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: formData,
        })
            .then((data) => {
                console.log(data?.data?.message)
                if (data?.data?.success === true) {
                  userEdit?  toast.success("O'zgartirildi"):  toast.success(data?.data?.message)
                    getApi()
                    setIsModalOpen(false)
                } else {
                    toast.error(data?.data?.message)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    };

    useEffect(() => {
        // if (!token) {
        //     navigate('/login')
        // }
        getApi();
    }, []);
    /// Delete api

    const deleteCity = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                axios({
                    url: `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${id}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }).then((res) => {
                    toast.success("O'chirildi")
                    getApi()
                }).catch((err) => {
                    toast.error("O'chirishda xato")
                })
            },
        });
    };



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Text',
            dataIndex: 'Text',
            key: 'Text',
        },
        {
            title: 'images',
            dataIndex: 'images',
            key: 'images',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
        },
    ];

    const dataSource = user.map((item, index) => ({

        key: index,
        ID:index+1,
        name: item.name,
        Text: item.text,
        images: (<img width={120} src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`} />),
        Action: (<><Button type='primary'onClick={()=>showModal(item)} >Edit</Button>
            <Button danger onClick={() => deleteCity(item.id)}>Delete</Button>
        </>),
    }));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (item) => {
        setIsModalOpen(true);
        setuserEdit(item)
        form.setFieldValue({
            name:item.name,
            text:item.text,
            images:[{uid:item.id, name:'image', url:`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}]
        })
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Button style={{ margin: "30px" }} type="primary" onClick={()=>setIsModalOpen(true)}>
                Add
            </Button>
            <Table dataSource={dataSource}    pagination={{ pageSize: 10,}} columns={columns} loading={loading} />
            <Modal title="Modalga hush kelibsiz" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form onFinish={handleSubmit}>
                    <Form.Item label="Name" name='name'>
                        <Input placeholder='name' required />
                    </Form.Item>
                    <Form.Item label="Text" name='text'>
                        <Input placeholder='Text' required />
                    </Form.Item>
                    <Form.Item label="Images" name='image'>
                        <Input type='file' placeholder='images' onChange={(e) => setImage(e.target.files[0])} required />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <ToastContainer />

        </div>
    );
}

export default Cities;
