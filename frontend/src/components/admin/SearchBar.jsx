import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


function SearchBar({onAction}) {
    const [value,setValue]=useState('')

  return (
    <div>
      <InputGroup  className="mb-3">
        <Form.Control
          placeholder="Search"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={value}
          onChange={(e)=>{setValue(e.target.value),onAction(e.target)}}
        />
         <InputGroup.Text id="basic-addon2" className='bg-dark text-light'>@search</InputGroup.Text>
      </InputGroup>
    </div>
  )
}

export default SearchBar
