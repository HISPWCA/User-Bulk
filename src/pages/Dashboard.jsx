import { Button, CalendarInput, Input } from "@dhis2/ui";

const Dashboard = () => {
  const onDateSelect = (date) => console.log("date: ", date);
  return (
    <div>
      <div className="text-2xl font-bold mb-6">Overview</div>
      <div className="flex  justify-between">
        <div className="w-[40%] flex gap-2 items-center">
          <Input type="date" />
          <div className="p-2 bg-gray-200">
            Currently viewing: Jul 13, 2022 - Jul 20, 2022
          </div>
        </div>
        <Button primary> List users</Button>
      </div>

      <div className="text-2xl text-gray-800 font-bold my-10">Statistics</div>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-l-blue-500 border-l-[8px] p-6 border rounded-lg bg-blue-50">
              <div className="text-gray-500">Total Users</div>
              <div className="mt-4 text-4xl font-extrabold">123</div>
            </div>
            <div className="border-l-green-500 border-l-[8px] p-6 border rounded-lg bg-green-50">
              <div className="text-gray-500">Active Users</div>
              <div className="mt-4 text-4xl font-extrabold">41</div>
            </div>
            <div className="border-l-orange-500 border-l-[8px] p-6 border rounded-lg bg-orange-50">
              <div className="text-gray-500">Not Logged 3 months ago</div>
              <div className="mt-4 text-4xl font-extrabold">0.0%</div>
            </div>
            <div className="border-l-blue-500 border-l-[8px] p-6 border rounded-lg bg-blue-50">
              <div className="text-gray-500">Inative Users</div>
              <div className="mt-4 text-4xl font-extrabold">0.0%</div>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-orange-50 p-6 border rounded-lg">
          <div className="text-gray-700">SATISFACTION RATINGS</div>
          <div className="grid grid-cols-3 gap-4">
            <div className="mt-6 col-span-1">
              <div className="mt-2">Excellent</div>
              <div className="mt-2">Great</div>
              <div className="mt-2">Good</div>
              <div className="mt-2">Okay</div>
              <div className="mt-2">Bad</div>
            </div>
            <div>chart </div>
          </div>
        </div>
        <div className="col-span-1 border rounded-lg bg-white">
          <div className="p-6 border-b flex justify-between">
            <div className="text-gray-700 font-bold">Solved tickets</div>
            <div className="text-gray-500">92</div>
          </div>
          <div className="p-6 border-b flex justify-between">
            <div className="text-gray-700 font-bold">Unsolved tickets</div>
            <div className="text-gray-500">50</div>
          </div>
          <div className="p-6 border-b flex justify-between">
            <div className="text-gray-700 font-bold">Solved tickets</div>
            <div className="text-gray-500">8</div>
          </div>
          <div className="p-6 flex justify-between">
            <div className="text-gray-700 font-bold">Others</div>
            <div className="text-gray-500">89</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
