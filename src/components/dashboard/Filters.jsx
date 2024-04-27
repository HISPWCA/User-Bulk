import { Button, Input } from "@dhis2/ui";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Filters = ({ onDateSelected, selectedDate }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-[40%] flex gap-2 items-center">
          <Input value={selectedDate} onChange={onDateSelected} type="date" />
          <div className="p-2 bg-gray-300 border">
            <span>Currently viewing: </span>
            <span className="ml-4 font-bold">
              {dayjs(selectedDate).format("YYYY-MM-DD")}
            </span>
          </div>
        </div>
        <Button onClick={() => navigate("/users")} primary>
          List users
        </Button>
      </div>
    </div>
  );
};

export default Filters;
