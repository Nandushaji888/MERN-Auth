import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody} from 'mdb-react-ui-kit';
import { Container, Badge ,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import { baseUrl,imageUrl } from '../../../config/baseUrl';
import NavbarComponent from './NavbarComponent'
import { useDispatch,useSelector } from 'react-redux';
import { editUser, logout } from '../../actions';
import SearchBar from './SearchBar';


export default function UserTable() {

    const [isActive,setIsActive]=useState(true)
    const [users,setUsers]=useState()
    const [userFilter,setFilter]=useState()
    // const [editUser,setEditUser]=useState()

    const admin=useSelector((state)=>state.user.admin)
    console.log('admin',admin);
    
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const token=admin.token
    
    useEffect(()=>{
        axios.get(`${baseUrl}/admin/userList`,{headers:{'authorization':token}}).then((response)=>{
            setUsers(response.data.users)
            setFilter(response.data.users)

        })
    },[isActive])
    const changeStatus=(target)=>{               
      const formData={
        id:target.attributes.getNamedItem('value').value,
        status:target.innerText
      }
      axios.post(`${baseUrl}/admin/updateUser`,formData,{headers:{'authorization':token}}).then((response)=>{
        setUsers(response.data.users)
        setFilter(response.data.users)
        setIsActive(!isActive)
        dispatch(logout())
      })
    }
    const filterUser=(target)=>{        
      const user=users.filter((item)=>item._id == target.attributes.getNamedItem('value').value)
      dispatch(editUser(user[0]))
      navigate('/manageUser')
    }
    const deleteUser=(target)=>{
      const formData={id:target.attributes.getNamedItem('value').value}
      axios.post(`${baseUrl}/admin/deleteUser`,formData,{headers:{'authorization':token}}).then((response)=>{
        setIsActive(!isActive)
        dispatch(logout())
      })
      
    }

    const searchUser = (target)=>{           
      const regex=new RegExp(target.value)
      const out=users.filter((item)=>regex.test(item.name) || regex.test(item.email))
      setFilter(out)
    }

  return (
    <>
    <NavbarComponent/>
    <Container className='mt-4'>
      <SearchBar onAction={searchUser}/>
     
    </Container>
    <Container className='border mt-5'>
    <Row className='justify-content-md-center mt-5'>
        <h1>User List</h1>
        <hr />
        {/* <Col xs={12} md={6} className='card p-5'> */}
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Status</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {userFilter && userFilter ? userFilter.map((item)=>{
          return(
            <tr key={item._id}>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src={`/${item.image}`}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{item.name}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{item.email}</p>
          </td>
          <td>
            {item.isActive?<MDBBadge value={item._id} onClick={(e)=>changeStatus(e.target)}  color='success' pill style={{cursor:'pointer'}}>
              Active
            </MDBBadge>: <MDBBadge value={item._id} onClick={(e)=>changeStatus(e.target)} color='danger' pill style={{cursor:'pointer'}} >
              Non-active
            </MDBBadge>}
          </td>
          <td>
            {/* <MDBBtn color='link' rounded size='sm'>
              <FaTrash/>
            </MDBBtn> */}
            {/* <MDBBtn  color='link' rounded size='sm'>
              <FaEdit value={item._id} onClick={(e)=>filterUser(e.target)}/>
            </MDBBtn> */}
            <button className='btn btn-danger me-2' value={item._id} onClick={(e)=>deleteUser(e.target)}>Delete</button>
            <button className='btn btn-warning' value={item._id} onClick={(e)=>filterUser(e.target)}>Edit</button>
          </td>
        </tr>
          )
        }): users && users.map((item)=>{
          return(
            <tr key={item._id}>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src={`${imageUrl}/${item.image}`}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{item.name}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{item.email}</p>
          </td>
          <td>
            {item.isActive?<MDBBadge value={item._id} onClick={(e)=>changeStatus(e.target)}  color='success' pill>
              Active
            </MDBBadge>: <MDBBadge value={item._id} onClick={(e)=>changeStatus(e.target)} color='danger' pill>
              Non-active
            </MDBBadge>}
          </td>
          <td>
            {/* <MDBBtn color='link' rounded size='sm'>
              <FaTrash/>
            </MDBBtn> */}
            {/* <MDBBtn  color='link' rounded size='sm'>
              <FaEdit value={item._id} onClick={(e)=>filterUser(e.target)}/>
            </MDBBtn> */}
            <button className='btn btn-danger me-2' value={item._id} onClick={(e)=>deleteUser(e.target)}>Delete</button>
            <button className='btn btn-warning' value={item._id} onClick={(e)=>filterUser(e.target)}>Edit</button>
          </td>
        </tr>
          )
        })}
       
      </MDBTableBody>
    </MDBTable>
    
    </Row>
    </Container>
    </>
  );
}