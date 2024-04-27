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
      icon={<LuLayoutDashboard className="text-green-500 font-bold text-lg" />}
    />

    <NavigationItem
      label="User"
      path="/users"
      icon={<FaUsers className="text-red-500 font-bold text-lg" />}
    />

    <NavigationItem
      label="Settings"
      path="/settings"
      icon={<IoSettingsOutline className="text-blue-500 font-bold text-lg" />}
    />
  </Menu>
);

export default Navigation;
