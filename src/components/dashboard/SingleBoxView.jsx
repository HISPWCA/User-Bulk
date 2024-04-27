import { CircularLoader } from "@dhis2/ui";

const SingleBoxView = ({
  loading,
  totalUsers,
  title,
  activeUsers,
  notLogged3MonthsAgo,
  inactiveUsers,
  months3Ago,
}) => {
  return (
    <div>
      <div className="text-center my-4 text-2xl text-gray-500 font-extrabold">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-l-blue-500 border-l-[8px] p-6 border rounded-lg h-[120px] bg-blue-50">
          <div className="text-gray-500">Total Users</div>
          <div className="mt-4 text-4xl font-extrabold">
            {loading ? (
              <div className="flex items-center gap-2">
                <CircularLoader small />
                <div className="text-sm font-normal">Loading...</div>
              </div>
            ) : (
              totalUsers
            )}
          </div>
        </div>
        <div className="border-l-green-500 border-l-[8px] p-6 border rounded-lg h-[120px] bg-green-50">
          <div className="text-gray-500">Active Users</div>
          <div className="mt-4 text-4xl font-extrabold">
            {loading ? (
              <div className="flex items-center gap-2">
                <CircularLoader small />
                <div className="text-sm font-normal">Loading...</div>
              </div>
            ) : (
              activeUsers
            )}
          </div>
        </div>
        <div className="border-l-orange-500 border-l-[8px] p-6 border rounded-lg h-[120px] bg-orange-50">
          <div className="text-gray-500">Not Logged 3 months ago</div>
          <div className="mt-4 text-4xl font-extrabold flex items-center">
            {loading ? (
              <div className="flex items-center gap-2">
                <CircularLoader small />
                <div className="text-sm font-normal">Loading...</div>
              </div>
            ) : (
              notLogged3MonthsAgo + "%"
            )}

            {months3Ago && (
              <span className="text-sm text-orange-500 ml-4">
                | {`  ${months3Ago} `}
              </span>
            )}
          </div>
        </div>
        <div className="border-l-blue-500 border-l-[8px] p-6 border rounded-lg h-[120px] bg-blue-50">
          <div className="text-gray-500">Inative Users</div>
          <div className="mt-4 text-4xl font-extrabold">
            {loading ? (
              <div className="flex items-center gap-2">
                <CircularLoader small />
                <div className="text-sm font-normal">Loading...</div>
              </div>
            ) : (
              inactiveUsers + "%"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBoxView;
