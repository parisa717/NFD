import { formatStrategyValues } from 'rc-tree-select/lib/utils/strategyUtil'
import React from 'react'
import Input from '../../share/Input'

const PropertyvalueBox = ({label,name,control,errors,edit,value}) => {

  return (
    <div>
        <div>
        <Input
          name={name}
          control={control}
          errors={errors}
          label={label}
          className="seconadary-input  my-[20px]"
          type="text"
          register={{
            required: " اجباری است "
          }}
          defaultValue={edit ? value:""}
        />


        </div>
    </div>
  )
}

export default PropertyvalueBox