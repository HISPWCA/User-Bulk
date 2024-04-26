import { useState } from "react";
import { MultiSelect, MultiSelectOption } from "@dhis2/ui";

const UserRoleAndRoleForm = ({
  title,
  onUserRolesChange,
  onUserGroupsChange,
  currentElement,
}) => {
  return (
    <div className="bg-white p-4 border">
      <div>
        <div className="text-xl font-bold mb-2">{title} </div>
      </div>
      <div className="p-4 border rounded mt-4">
        <div>
          <div className="font-bold">User roles </div>
          <div className="my-2 text-gray-500 text-sm">
            Select all user roles this user is a member of
          </div>
          <div>
            <MultiSelect
              selected={currentElement?.selectedUserRoles || []}
              onChange={({ selected }) =>
                onUserRolesChange(selected, currentElement?.id)
              }
              placeholder="Select user roles"
              filterable
              noMatchText="No match found"
            >
              {currentElement?.userRolesList?.map((userRole) => (
                <MultiSelectOption
                  key={userRole.id}
                  label={userRole.name}
                  value={userRole.id}
                />
              ))}
            </MultiSelect>
          </div>
        </div>

        <div className="mt-4">
          <div className="font-bold">User groups</div>
          <div className="my-2 text-gray-500 text-sm">
            Select all user groups this user is a member of
          </div>
          <div>
            <MultiSelect
              selected={currentElement?.selectedUserGroups || []}
              onChange={({ selected }) =>
                onUserGroupsChange(selected, currentElement?.id)
              }
              placeholder="Select user groups"
              filterable
              noMatchText="No match found"
            >
              {currentElement?.userGroupsList?.map((userGroup) => (
                <MultiSelectOption
                  key={userGroup.id}
                  label={userGroup.name}
                  value={userGroup.id}
                />
              ))}
            </MultiSelect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoleAndRoleForm;
