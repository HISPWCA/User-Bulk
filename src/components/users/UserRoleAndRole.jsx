import { Button } from "@dhis2/ui";
import { useDataQuery } from "@dhis2/app-runtime";
import { GrLinkPrevious } from "react-icons/gr";
import { ORGANISATION_UNIT_ACCESS } from "../../utils/constants";
import UserRoleAndRoleForm from "./UserRoleAndRoleForm";
import { TfiSave } from "react-icons/tfi";

const dataStoreQuery = {
  instances: {
    resource: `dataStore/${process.env.REACT_APP_DATASTORE_NAME}/${process.env.REACT_APP_DATASTORE_INSTANCES_KEY}`,
  },
};

const UserRoleAndRole = ({
  setRenderPage,
  customInformation,
  onUserRolesChange,
  onUserGroupsChange,
  handleSaveUser,
  loadinSaveUser
}) => {
  const { data: instanceData } = useDataQuery(dataStoreQuery);

  return (
    <div>
      <div className="bg-white p-4 border">
        <div className="font-bold text-lg">Roles and groups</div>
        <div className=" text-gray-500 mt-2">
          Manage what roles and groups this user is a member of.
        </div>
      </div>

      <div className="grid grid-cols-4 mt-2 gap-2">
        <UserRoleAndRoleForm
          currentElement={customInformation?.find((cI) => cI.key === "CURRENT")}
          title="Current Instance"
          onUserRolesChange={onUserRolesChange}
          onUserGroupsChange={onUserGroupsChange}
        />
        {instanceData?.instances?.map((instance) => (
          <>
            <UserRoleAndRoleForm
              title={instance.name}
              onUserRolesChange={onUserRolesChange}
              onUserGroupsChange={onUserGroupsChange}
              currentElement={customInformation
                .filter((cI) => cI.key === "REMOTE")
                .find((i) => i.id === instance.id)}
            />
          </>
        ))}
      </div>

      <div className="mt-5 flex gap-5">
        <Button
          onClick={() => setRenderPage(ORGANISATION_UNIT_ACCESS)}
          icon={<GrLinkPrevious className="text-sm" />}
        >
          Previous
        </Button>
        <Button
          icon={<TfiSave className="text-sm" />}
          onClick={handleSaveUser}
          primary
          loading={loadinSaveUser}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default UserRoleAndRole;
