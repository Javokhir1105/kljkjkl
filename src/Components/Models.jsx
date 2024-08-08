import { Button, Form, Input, Modal, Popconfirm, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Models() {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [models, setModels] = useState([])
  const [brands, setbrands] = useState([])
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('')
  const [brandId, setbrandId] = useState('')

  const getModels = () => {
    axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/models`)
      .then(res => setModels(res.data.data))
  }
  const getBrands = () => {
    axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/brands`)
      .then(res => setbrands(res.data.data))
  }
  useEffect(() => {
    getModels()
    getBrands()
  }, [])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (item) => {
    setIsModalOpen(true)
  }
  /// Post 
  const addModal = () =>{
    
    setLoading(true)
    const formData = new FormData()
    formData.append('name',name)
    formData.append('brand_id',brandId)
    axios({
      url:`https://autoapi.dezinfeksiyatashkent.uz/api/models`,
      method: `POST`,
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: formData,
  })
  .then((data) => {
    console.log(data?.data?.message)
    if (data?.data?.success === true) {
   toast.success(data?.data?.message)
        getModels()
        setIsModalOpen(false)
    } else {
        toast.error(data?.data?.message)
    }
})
.finally(() => {
  setLoading(false)
  setIsModalOpen(false)
})

  }
  return (
    <div >
      <Button style={{ margin: "30px" }} type="primary" onClick={showModal}>
        Add
      </Button>
      <h1>Models</h1>
      <table id="customers" >
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
              <td >
                <Popconfirm
                  placement="top"
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  okText="Yes"
                  cancelText="No"
                // onConfirm={deleteBTN}
                >
                  <Button type='primary' danger >Delete</Button>
                </Popconfirm></td>
              <td onClick={() => setclickAdd(true)}>
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
          <Form.Item label="Name" name='name' >
            <Input placeholder='name' required onChange={(e)=>setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Brand" name='brand'>
            <select onChange={(e)=>setbrandId(e.target.value)} >
              {
                brands && brands.map((brand, index) => (
                  <option key={index} value={brand.id}>{brand.title}</option>
                ))
              }
            </select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={addModal} >Submit</Button>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  )
}

export default Models
