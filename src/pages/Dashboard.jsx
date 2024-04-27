import { useState, useEffect } from "react";
import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import Filters from "../components/dashboard/Filters";
import SingleBoxView from "../components/dashboard/SingleBoxView";
import dayjs from "dayjs";
import axios from "axios";
import { basicAuthentication, decodePassword } from "../utils/function";

const queryDataStore = {
  instances: {
    resource: `dataStore/${process.env.REACT_APP_DATASTORE_NAME}/${process.env.REACT_APP_DATASTORE_INSTANCES_KEY}`,
  },
};

const Dashboard = () => {
  const engine = useDataEngine();
  const { data: dataStoreInstances } = useDataQuery(queryDataStore);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [remoteInstanceData, setRemoteInstanceData] = useState([]);
  const [loadingRemoteInstanceData, setLoadingRemoteInstanceData] =
    useState(false);
  const [currentInstanceData, setCurrentInstanceData] = useState({
    loading: false,
    title: "Current instance",
    totalUsers: 0,
    activeUsers: 0,
    notLogged3MonthsAgo: 0,
    inactiveUsers: 0,
  });

  const onDateSelected = ({ value }) => setSelectedDate(value);

  const formatResponse = (instances) => {
    return [];
  };

  const loadRemoteInstancesData = async () => {
    try {
      setLoadingRemoteInstanceData(true);
      const newRemoteData = [];

      for (let instance of dataStoreInstances?.instances) {
        const response = await axios.get(
          `${instance.baseUrl}/users.json?paging=false&fields=id,lastLogin,disabled`,
          basicAuthentication(
            instance.username,
            decodePassword(instance.password)
          )
        );

        const users = response?.data?.users || [];

        const months3Ago = dayjs(selectedDate)
          .subtract(3, "month")
          .format("YYYY-MM-DD");

        const totalUsers = users?.length || 0;
        const activeUsers = users?.filter((u) => !u.disabled)?.length || 0;
        const inactiveUsers = Math.round(
          ((totalUsers - activeUsers) * 100) / totalUsers
        );

        const notLogged3MonthsAgoNumber =
          users?.filter((u) =>
            u.lastLogin ? dayjs(u.lastLogin).isBefore(months3Ago) : false
          )?.length || 0;

        const notLogged3MonthsAgo = Math.round(
          (notLogged3MonthsAgoNumber * 100) / totalUsers
        );
        console.log("notLogged3MonthsAgo: ", notLogged3MonthsAgoNumber);

        newRemoteData.push({
          id: instance.id,
          title: instance.name,
          totalUsers,
          activeUsers,
          months3Ago,
          inactiveUsers,
          notLogged3MonthsAgo,
        });
      }

      setRemoteInstanceData(newRemoteData);
      setLoadingRemoteInstanceData(false);
    } catch (error) {
      console.log(error);
      setLoadingRemoteInstanceData(false);
    }
  };

  const loadCurrentInstancesData = async () => {
    try {
      setCurrentInstanceData({
        ...currentInstanceData,
        loading: true,
      });

      const response = await engine.query({
        users: {
          resource: "users",
          params: {
            paging: false,
            fields: ["id", "lastLogin", "disabled"],
          },
        },
      });

      const months3Ago = dayjs(selectedDate)
        .subtract(3, "month")
        .format("YYYY-MM-DD");

      const totalUsers = response?.users?.users?.length || 0;
      const activeUsers =
        response?.users?.users?.filter((u) => !u.disabled)?.length || 0;

      const inactiveUsers = Math.round(
        ((totalUsers - activeUsers) * 100) / totalUsers
      );

      const notLogged3MonthsAgoNumber =
        response?.users?.users?.filter((u) =>
          u.lastLogin ? dayjs(u.lastLogin).isBefore(months3Ago) : false
        )?.length || 0;

      const notLogged3MonthsAgo = Math.round(
        (notLogged3MonthsAgoNumber * 100) / totalUsers
      );

      setCurrentInstanceData({
        ...currentInstanceData,
        totalUsers,
        activeUsers,
        months3Ago,
        inactiveUsers,
        notLogged3MonthsAgo,
        loading: false,
      });
    } catch (error) {
      console.log(error);

      setCurrentInstanceData({
        ...currentInstanceData,
        loading: false,
      });
    }
  };

  const loadData = () => {
    loadCurrentInstancesData();
    dataStoreInstances?.instances?.length > 0 && loadRemoteInstancesData();
  };

  useEffect(() => {
    loadData();
  }, [dataStoreInstances, selectedDate]);

  return (
    <div>
      <div className="text-2xl font-bold mb-6">Overview</div>
      <Filters onDateSelected={onDateSelected} selectedDate={selectedDate} />
      <div className="text-2xl text-gray-800 font-bold my-10">Statistics</div>
      <div className="grid grid-cols-3 gap-10">
        <SingleBoxView {...currentInstanceData} />
        {dataStoreInstances?.instances?.map((item) => (
          <SingleBoxView
            {...remoteInstanceData.find((r) => r.id === item.id)}
            title={item.name}
            loading={loadingRemoteInstanceData}
            key={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
