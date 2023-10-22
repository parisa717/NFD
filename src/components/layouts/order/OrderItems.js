import React from 'react'
import PrimayTable from '../../share/Table'
const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street"
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street"
    }
  ];
const OrderItems = () => {
    const columns = [
        {
          title: "نام محصول",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "موجودی",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "وضعیت",
          dataIndex: "name",
          key: "name"
        },
       
      ];
  return (
    <div>
              <PrimayTable dataSource={dataSource} columns={columns} />

    </div>
  )
}

export default OrderItems