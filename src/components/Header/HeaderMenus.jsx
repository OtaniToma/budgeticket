import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MenuIcon from '@material-ui/icons/Menu';
import { getUserId } from '../../reducks/users/selectors';
import { push } from 'connected-react-router'

const HeaderMenus = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  return (
    <>
      <IconButton onClick={() => dispatch(push('/cart'))}>
        <Badge color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton onClick={() => dispatch(push('/liked'))}>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default HeaderMenus