import SettingForm from "../components/settings/SettingForm";
import SettingTable from "../components/settings/SettingTable";
import useFetchAlert from "../hooks/useFetchAlert";
import { useState } from "react";

import {
  useDataEngine,
  useDataMutation,
  useDataQuery,
} from "@dhis2/app-runtime";

import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import axios from "axios";
import {
  basicAuthentication,
  encodePassword,
  resolveUrl,
} from "../utils/function";

const dataStoreQuery = {
  instances: {
    resource: `dataStore/${process.env.REACT_APP_DATASTORE_NAME}/${process.env.REACT_APP_DATASTORE_INSTANCES_KEY}`,
  },
};

const dataStoreMutation = {
  resource: `dataStore/${process.env.REACT_APP_DATASTORE_NAME}/${process.env.REACT_APP_DATASTORE_INSTANCES_KEY}`,
  type: "update",
  data: ({ payload }) => payload,
};

const Settings = () => {
  const { showSuccess, showError } = useFetchAlert();
  const [isTesting, setTesting] = useState(false);
  const [loadingSaveRoute, setLoadingSaveRoute] = useState(false);
  const {
    data,
    loading: loadingDatastore,
    refetch,
  } = useDataQuery(dataStoreQuery);
  const [currentInstance, setCurrentInstance] = useState(null);

  const [dataStoreMutate] = useDataMutation(dataStoreMutation, {
    onError: (error) => showError("Error :", error.message),
  });

  // this is no more using because api route don't support post method
  // const onSubmit_OLD = async (values) => {
  //   try {
  //     setLoadingSaveRoute(true);

  //     if (data?.instances?.find((i) => i.name === values.instanceName))
  //       throw new Error("Instance already exists !");

  //     const responseOrganisations = await engine.mutate({
  //       resource: "routes",
  //       type: "create",
  //       data: {
  //         name: `${values.instanceName} ${uuid()}`.slice(0, 49),
  //         code: `${resolveCode(values.instanceName)} ${uuid()}`.slice(0, 49),
  //         disabled: false,
  //         url: `${resolveUrl(
  //           values.instanceUrl
  //         )}api/organisationUnits.json?paging=false&fields=id,code,name,displayName,path,level,parent[id,code,name,displayName,level,path]`,
  //         auth: {
  //           type: "http-basic",
  //           username: values.username,
  //           password: values.password,
  //         },
  //       },
  //     });

  //     const responseUserRoles = await engine.mutate({
  //       resource: "routes",
  //       type: "create",
  //       data: {
  //         name: `${values.instanceName} ${uuid()}`.slice(0, 49),
  //         code: `${resolveCode(values.instanceName)} ${uuid()}`.slice(0, 49),
  //         disabled: false,
  //         url: `${resolveUrl(
  //           values.instanceUrl
  //         )}api/userRoles.json?paging=false`,
  //         auth: {
  //           type: "http-basic",
  //           username: values.username,
  //           password: values.password,
  //         },
  //       },
  //     });

  //     const responseUsers = await engine.mutate({
  //       resource: "routes",
  //       type: "create",
  //       data: {
  //         name: `${values.instanceName} ${uuid()}`.slice(0, 49),
  //         code: `${resolveCode(values.instanceName)} ${uuid()}`.slice(0, 49),
  //         disabled: false,
  //         url: `${resolveUrl(values.instanceUrl)}api/users.json`,
  //         auth: {
  //           type: "http-basic",
  //           username: values.username,
  //           password: values.password,
  //         },
  //       },
  //     });

  //     const responseUserGroups = await engine.mutate({
  //       resource: "routes",
  //       type: "create",
  //       data: {
  //         name: `${values.instanceName} ${uuid()}`.slice(0, 49),
  //         code: `${resolveCode(values.instanceName)} ${uuid()}`.slice(0, 49),
  //         disabled: false,
  //         url: `${resolveUrl(
  //           values.instanceUrl
  //         )}api/userGroups.json?paging=false`,
  //         auth: {
  //           type: "http-basic",
  //           username: values.username,
  //           password: values.password,
  //         },
  //       },
  //     });

  //     const responseMe = await engine.mutate({
  //       resource: "routes",
  //       type: "create",
  //       data: {
  //         name: `${values.instanceName} ${uuid()}`.slice(0, 49),
  //         code: `${resolveCode(values.instanceName)} ${uuid()}`.slice(0, 49),
  //         disabled: false,
  //         url: `${resolveUrl(values.instanceUrl)}api/me.json`,
  //         auth: {
  //           type: "http-basic",
  //           username: values.username,
  //           password: values.password,
  //         },
  //       },
  //     });

  //     if (
  //       !responseOrganisations?.response?.uid ||
  //       !responseUserRoles?.response?.uid ||
  //       !responseUserGroups?.response?.uid ||
  //       !responseUsers?.response?.uid ||
  //       !responseMe?.response?.uid
  //     )
  //       throw new Error("Could not access the instance !");

  //     const routeApiUIDForOrganisation = responseOrganisations.response.uid;
  //     const routeApiUIDForUserRoles = responseUserRoles.response.uid;
  //     const routeApiUIDForUserGroups = responseUserGroups.response.uid;
  //     const routeApiUIDForMe = responseMe.response.uid;
  //     const routeApiUIDForUsers = responseUsers.response.uid;

  //     const meResultatFromRemoteServer = await engine.query({
  //       me: {
  //         resource: `routes/${routeApiUIDForMe}/run/`,
  //         params: { fields: ["id"] },
  //       },
  //     });

  //     if (isTesting) {
  //       console.log("me : ", meResultatFromRemoteServer);
  //       if (meResultatFromRemoteServer?.me) {
  //         showSuccess("Connection successful !");
  //       } else {
  //         showError("Connection failed !");
  //       }
  //     } else {
  //       const payloadList = data?.instances ? data.instances : [];
  //       await dataStoreMutate({
  //         payload: [
  //           ...payloadList,
  //           {
  //             id: uuid(),
  //             name: values.instanceName,
  //             meRouteAPI: routeApiUIDForMe,
  //             organisationUnitsRouteAPI: routeApiUIDForOrganisation,
  //             userGroupsRouteAPI: routeApiUIDForUserGroups,
  //             usersRouteAPI: routeApiUIDForUsers,
  //             userRolesRouteAPI: routeApiUIDForUserRoles,
  //             baseUrl: values.instanceUrl,
  //             createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  //           },
  //         ],
  //       });

  //       await refetch();

  //       showSuccess("Saved successfully !");
  //     }

  //     setLoadingSaveRoute(false);
  //   } catch (err) {
  //     console.log("Error : ", err.data);
  //     showError(
  //       err?.response?.errorReports?.[0]?.message ||
  //         err?.message ||
  //         "Error : could not proceed !"
  //     );
  //     setLoadingSaveRoute(false);
  //   }
  // };

  const onSubmit = async (values) => {
    try {
      setLoadingSaveRoute(true);

      if (data?.instances?.find((i) => i.name === values.instanceName) && !currentInstance)
        throw new Error("Instance already exists !");

      const responseMe = await axios.get(
        `${resolveUrl(values.instanceUrl)}me.json`,
        basicAuthentication(values.username, values.password)
      );

      const me = responseMe?.data;

      if (isTesting) {
        if (me) {
          showSuccess("Connection successful !");
        } else {
          showError("Connection failed !");
        }
      } else {
        const payloadList = data?.instances ? data.instances : [];

        let payload = [];

        if (currentInstance) {
          payload = payloadList.map((i) => {
            if (i.id === currentInstance.id) {
              return {
                ...i,
                name: values.instanceName,
                baseUrl: resolveUrl(values.instanceUrl),
                username: values.username,
                password: encodePassword(values.password),
                createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              };
            }

            return i;
          });
        } else {
          payload = [
            ...payloadList,
            {
              id: uuid(),
              name: values.instanceName,
              baseUrl: resolveUrl(values.instanceUrl),
              username: values.username,
              password: encodePassword(values.password),
              createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            },
          ];
        }

        await dataStoreMutate({
          payload,
        });

        refetch();
        showSuccess("Saved successfully !");
      }

      setLoadingSaveRoute(false);
    } catch (err) {
      console.log("Error : ", err);
      showError(
        err?.response?.data?.message ||
          err?.message ||
          "Error : could not proceed !"
      );
      setLoadingSaveRoute(false);
    }
  };

  const onDelete = async (id) => {
    try {
      await dataStoreMutate({
        payload: data?.instances?.filter((i) => i.id !== id),
      });
      refetch();
      showSuccess("Delete successfully !");
    } catch (err) {
      console.log("Error : ", err);
      showError(err?.message || "Error : could not proceed !");
    }
  };

  return (
    <>
      <div className="font-bold text-2xl">Settings</div>
      <div className="text-gray-700 my-2">instances configuration</div>
      <div className="grid grid-cols-4 gap-4 mt-5">
        <SettingForm
          loading={loadingSaveRoute}
          setTesting={setTesting}
          isTesting={isTesting}
          onSubmit={onSubmit}
          setCurrentInstance={setCurrentInstance}
          currentInstance={currentInstance}
        />

        <SettingTable
          loading={loadingDatastore}
          instances={data?.instances || []}
          setCurrentInstance={setCurrentInstance}
          onDelete={onDelete}
        />
      </div>
    </>
  );
};

export default Settings;
