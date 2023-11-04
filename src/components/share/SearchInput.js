import React from 'react'
import { Input } from 'antd';
const { Search } = Input;
const SearchInput = ({setsearchtext}) => {
    const onSearch = (value, _e, info) => setsearchtext(value.target.value);

  return (
    <div className='SearchInput'>
          <Search placeholder="جستجو"  onChange={onSearch} enterButton />
    </div>
  )
}

export default SearchInput