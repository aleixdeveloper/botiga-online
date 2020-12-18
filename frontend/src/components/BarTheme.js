import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Row} from 'react-bootstrap'
import {getTheme} from '../actions/themeActions'

const BarTheme = (props) => {

    const dispatch = useDispatch()

    const listTheme = useSelector((state) => state.getTheme)
    const { loading, theme } = listTheme

    useEffect(() => {
        dispatch(getTheme())
    }, [dispatch])

    return (
        <Row>
        <div style={{width: '100%', height:props.height, background:theme.background}}></div>
        </Row>
    )
}
BarTheme.defaultProps = {
    height: '10px' 
}

export default BarTheme
