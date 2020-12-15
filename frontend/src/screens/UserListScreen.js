import React, {useEffect} from 'react'
/* import {Link} from 'react-router-dom' */
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {LinkContainer} from 'react-router-bootstrap'
import {listUsers, deleteUser} from '../actions/userActions'

const UserListScreen = ({history}) => {
    
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {error,loading,users} = userList
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success:successDelete} = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }

    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if(window.confirm('Estàs segur d\'esborrar l\'usuari?')){
            dispatch(deleteUser(id))
        }

    }

    return (
        <>
         <h1>Usuaris</h1>
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
             <Table className='table-sm text-center' striped bordered hover responsive>
                 <thead>
                     <tr>
                         <th>ID</th>
                         <th>NOM</th>
                         <th>EMAIL</th>
                         <th>ADMIN</th>
                         <th></th>
                     </tr>
                 </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.isAdmin ? (<i className='fas fa-check text-success'></i>) : (<i className='fas fa-times text-danger'></i>)}</td>
                            <td className="text-center">
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='info' className='btn-sm mx-1'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm mx-1' onClick={() => deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </Table>
         )}   
        </>
    )
}

export default UserListScreen
