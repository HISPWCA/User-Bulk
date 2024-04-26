import { useDataQuery } from "@dhis2/app-runtime";
import PageHeader from "../components/PageHeader";
import UsersFilters from "../components/UsersFilters";
import UsersTable from "../components/UsersTable";

const query = {
  users: {
    resource: "users",
    params: {
      fields: [
        "id",
        "displayName",
        "access",
        "email",
        "twoFactorEnabled",
        "userCredentials[username,disabled,lastLogin]",
        "teiSearchOrganisationUnits[id,path]",
      ],
      order: "created:desc",
      userOrgUnits: true,
      includeChildren: true,
      selfRegistered: false,
    },
  },
};
const User = () => {
  const { data: userDatas, loading , refetch } = useDataQuery(query);
  return (
    <>
      {console.log(userDatas)}
      <PageHeader>User Management</PageHeader>
      <div className="mt-4">
        <UsersFilters />
        <UsersTable loading={loading} refetch={refetch} users={userDatas?.users?.users || []} />
      </div>
    </>
  );
};

export default User;
