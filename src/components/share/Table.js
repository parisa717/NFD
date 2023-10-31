import { Table } from 'antd';
import React from 'react'


const PrimayTable = ({dataSource,columns,rest}) => {

  return (
   <div className='PrimayTable' >
      <Table  {...rest} pagination={{ defaultPageSize: 15, hideOnSinglePage: true }} dataSource={dataSource} columns={columns} />
   </div>

  )
}

export default PrimayTable