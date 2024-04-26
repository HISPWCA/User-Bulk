import PropTypes from "prop-types";
import React from "react";
import { Menu, MenuItem } from "@dhis2/ui";
import { useNavigate, useMatch } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";

const NavigationItem = ({ path, label, icon }) => {
  const navigate = useNavigate();

  const routeMatch = useMatch(path);
  const isActive = Boolean(routeMatch);

  const onClick = () => navigate(path);

  return (
    <MenuItem icon={icon} active={isActive} onClick={onClick} label={label} />
  );
};

NavigationItem.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const Navigation = () => (
  <Menu>
    <NavigationItem
      label="Dashboard"
      path="/"
      icon={<LuLayoutDashboard style={{ fontSize: "16px" }} />}
    />

    <NavigationItem
      label="User"
      path="/users"
      icon={<FaUsers style={{ fontSize: "16px" }} />}
    />

    <NavigationItem
      label="Settings"
      path="/settings"
      icon={<IoSettingsOutline style={{ fontSize: "16px" }} />}
    />
  </Menu>
);

export default Navigation;
