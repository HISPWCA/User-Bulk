import { useDataQuery } from "@dhis2/app-runtime";
import PageHeader from "../components/PageHeader";
import UsersTable from "../components/users/UsersTable";
import UsersFilters from "../components/users/UsersFilters";

const query = {
  users: {
    resource: "users",
    params: ({ page, pageSize, query }) => ({
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
      page: page || 1,
      pageSize: pageSize || 10,
      query: query || "",
    }),
  },
};

const User = () => {
  const { data: userDatas, loading, refetch } = useDataQuery(query);
  return (
    <>
      <PageHeader>User Management</PageHeader>
      <div className="mt-4">
        <UsersFilters refetch={refetch} />
        <UsersTable
          loading={loading}
          refetch={refetch}
          users={userDatas?.users}
        />
      </div>
    </>
  );
};

export default User;
