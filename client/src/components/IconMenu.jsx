import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/user/CurrentUserSlice';
import { useNavigate } from 'react-router-dom';

export default function IconMenu() {

  const {currentUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogOut(){
    dispatch(loginSuccess(""))
    localStorage.setItem('auth-token', "")
    navigate('/signup')
  }

  return (
    <Paper id="icon-menu" className='absolute hidden right-2 top-10' sx={{ width: 250, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem onClick={handleLogOut}>
          <LogoutOutlinedIcon className='text-gray-500 mr-2'>
            <ContentCut fontSize="small" />
          </LogoutOutlinedIcon>
          <ListItemText>Logout</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}