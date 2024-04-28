import {
  Button,
  CircularLoader,
  Table,
  TableBody,
  TableCell,
  TableCellHead,
  TableHead,
  TableRow,
  TableRowHead,
} from "@dhis2/ui";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Popover } from "antd";

const SettingTable = ({
  instances = [],
  loading,
  setCurrentInstance,
  onDelete,
}) => {
  return (
    <div className=" col-span-2">
      <div className="bg-white p-4 border rounded">
        {loading && (
          <div className="my-2 flex items-center gap-2">
            <CircularLoader small />
            <div>Loading...</div>
          </div>
        )}
        <Table>
          <TableHead>
            <TableRowHead className="bg-green-200">
              <TableCellHead dense>Instance Name</TableCellHead>
              <TableCellHead dense>Base Url</TableCellHead>
              <TableCellHead dense>Created At</TableCellHead>
              <TableCellHead dense>Action</TableCellHead>
            </TableRowHead>
          </TableHead>
          <TableBody>
            {instances.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan="4"
                  className="text-center text-gray-500 text-lg"
                >
                  No configuration !
                </TableCell>
              </TableRow>
            )}
            {instances.map((instance) => (
              <TableRow key={instance.id}>
                <TableCell dense>{instance.name}</TableCell>
                <TableCell dense>{instance.baseUrl}</TableCell>
                <TableCell dense className="text-gray-700">
                  {instance.createdAt}
                </TableCell>
                <TableCell dense>
                  <div className="flex items-center gap-2">
                    <FaRegEdit
                      onClick={() => setCurrentInstance(instance)}
                      className="text-lg text-blue-500 cursor-pointer"
                    />
                    <Popover
                      content={
                        <div>
                          <div className=" bg-gray-200 p-2 my-2 border">
                            Are you sure to delete :
                            <span className="font-bold ml-2 text-red-500">
                              {instance.name} ?
                            </span>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              small
                              destructive
                              onClick={() => {
                                onDelete(instance.id);
                              }}
                            >
                              Yes
                            </Button>
                          </div>
                        </div>
                      }
                      title={
                        <span className="text-red-500 font-bold text-lg">
                          Delete instance
                        </span>
                      }
                      trigger="hover"
                    >
                      <RiDeleteBin5Line className="text-lg text-red-500 cursor-pointer" />
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SettingTable;
