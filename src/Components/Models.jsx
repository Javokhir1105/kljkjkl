import { Button, Form, Input, Modal, Popconfirm } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function Models() {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [brandId, setBrandId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getModels();
    getBrands();
  }, []);

  const getModels = () => {
    axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/models`)
      .then(res => setModels(res.data.data));
  }

  const getBrands = () => {
    axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/brands`)
      .then(res => setBrands(res.data.data));
  }

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addModel = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand_id', brandId);

    axios({
      url: `https://autoapi.dezinfeksiyatashkent.uz/api/models`,
      method: `POST`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: formData,
    })
    .then((data) => {
      if (data?.data?.success) {
        toast.success("Qo'shildi");
        getModels();
        setIsModalOpen(false);
      } else {
        toast.error("Xatolik");
      }
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const deleteModel = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this model?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        axios({
          url: `https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        })
        .then((data) => {
          if (data?.data?.success) {
            toast.success("O'chirildi");
            getModels();
          } else {
            toast.error("Xatolik");
          }
        });
      },
    });
  };

  return (
    <div>
      <Button style={{ margin: "30px" }} type="primary" onClick={showModal}>
        Add
      </Button>
      <h1>Models</h1>
      <table id="customers">
        <thead>
          <tr>
            <th>nomi</th>
            <th>Brand nomi</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {models.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.brand_title}</td>
              <td>
                  <Button type="primary" danger onClick={() => deleteModel(item.id)}>Delete</Button>
  
              </td>
              <td>
                <Button type="button" style={{ backgroundColor: "blue", color: "white" }}>
                  Tahrirlash
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal title="Modalga hush kelibsiz" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form>
          <Form.Item label="Name" name='name'>
            <Input placeholder='name' required onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Brand" name='brand'>
            <select onChange={(e) => setBrandId(e.target.value)}>
              {brands && brands.map((brand, index) => (
                <option key={index} value={brand.id}>{brand.title}</option>
              ))}
            </select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={addModel} loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Models;
