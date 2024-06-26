import {
  Button,
  CircularLoader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableFoot,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";
import { useNavigate } from "react-router-dom";

const UsersTable = ({ users, loading, refetch }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white ">
      {loading && (
        <div className="flex gap-4 bg-white items-center  p-4 border my-2">
          <CircularLoader small />
          <div className="font-bold">Loading informations...</div>
        </div>
      )}
      <div className="p-2">
        <Button small primary onClick={() => navigate("/users/new")}>
          + New User
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRowHead>
            <TableCellHead>Display name</TableCellHead>
            <TableCellHead>Username</TableCellHead>
            <TableCellHead>Last login</TableCellHead>
            <TableCellHead>Status</TableCellHead>
          </TableRowHead>
        </TableHead>
        <TableBody>
          {users?.users?.length === 0 && (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-500">
                No user available !
              </TableCell>
            </TableRow>
          )}
          {users?.users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.userCredentials?.username}</TableCell>
              <TableCell>{user.userCredentials?.lastLogin}</TableCell>
              <TableCell>
                {!user.userCredentials?.disabled ? (
                  <span className="border p-2 bg-green-50 border-green-500">
                    Active
                  </span>
                ) : (
                  <span className="border p-2 bg-red-50 border-red-500">
                    Disabled
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {users?.pager && (
          <TableFoot>
            <TableRow>
              <TableCell colSpan="4">
                <div className="my-2">
                  <Pagination
                    {...users?.pager}
                    onPageChange={(page) => refetch({ ...users.pager, page })}
                    onPageSizeChange={(pageSize) =>
                      refetch({ ...users.pager, pageSize })
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          </TableFoot>
        )}
      </Table>
    </div>
  );
};

export default UsersTable;
