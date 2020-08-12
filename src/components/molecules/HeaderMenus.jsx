import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MenuIcon from "@material-ui/icons/Menu";
import { getIsSignedIn, getUserId } from "../../reducks/users/selectors";
import { push } from "connected-react-router";

const HeaderMenus = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  return (
    <>
      {isSignedIn && (
        <div>
          <IconButton onClick={() => dispatch(push("/user/liked"))}>
            <Badge badgeContent={props.ticketNumbers} color="secondary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
            <MenuIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default HeaderMenus;
