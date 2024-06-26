import UsersOrganisationUnitForm from "../components/users/UsersOrganisationUnitForm";
import PageHeader from "../components/PageHeader";
import UsersBasicInformationForm from "../components/users/UsersBasicInformationForm";
import { useState } from "react";
import {
  BASIC_INFORMATIONS,
  ORGANISATION_UNIT_ACCESS,
  USER_ROLE_ACCESS,
} from "../utils/constants";
import UserRoleAndRole from "../components/users/UserRoleAndRole";
import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import { v4 as uuid } from "uuid";
import useFetchAlert from "../hooks/useFetchAlert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { basicAuthentication, decodePassword } from "../utils/function";

const query = {
  ui: {
    resource: "locales/ui",
  },
  db: {
    resource: "locales/db",
  },
};

const queryDataStore = {
  instances: {
    resource: `dataStore/${process.env.REACT_APP_DATASTORE_NAME}/${process.env.REACT_APP_DATASTORE_INSTANCES_KEY}`,
  },
};

const CreateUser = () => {
  const engine = useDataEngine();
  const { data: languageData } = useDataQuery(query);
  const { data: dataStoreInstances } = useDataQuery(queryDataStore);

  const [renderPage, setRenderPage] = useState(BASIC_INFORMATIONS);
  const [basicInformation, setBasicInformation] = useState(null);
  const [customInformation, setCustomInformation] = useState([]);
  const [loadingCustomInformation, setLoadingCustomInformation] =
    useState(false);
  const [loadinSaveUser, setLoadinSaveUser] = useState(false);

  const { showSuccess, showError } = useFetchAlert(false);

  const navigate = useNavigate();

  const handleSubmit = (formValues) => {
    loadOganisationUnitInformations(formValues);
    setRenderPage(ORGANISATION_UNIT_ACCESS);
    setBasicInformation({ ...formValues });
  };

  // this is no more using because api route don't support post method
  // const loadOganisationUnitInformations_OLD = async (formValues) => {
  //   try {
  //     setLoadingCustomInformation(true);
  //     const currentInstanceResponse = await engine.query({
  //       organisationUnits: {
  //         resource: "organisationUnits",
  //         params: {
  //           paging: false,
  //           fields: [
  //             "id",
  //             "level",
  //             "path",
  //             "displayName",
  //             "name",
  //             "parent[id,level,name,path,displayName]",
  //           ],
  //         },
  //       },

  //       userRoles: {
  //         resource: "userRoles",
  //         params: {
  //           paging: false,
  //           fields: ["id", "name"],
  //         },
  //       },

  //       userGroups: {
  //         resource: "userGroups",
  //         params: {
  //           paging: false,
  //           fields: ["id", "name"],
  //         },
  //       },
  //     });

  //     let newCustomInformation = [];

  //     newCustomInformation.push({
  //       key: "CURRENT",
  //       id: uuid(),
  //       organisationUnitsList:
  //         currentInstanceResponse?.organisationUnits?.organisationUnits || [],
  //       userRolesList: currentInstanceResponse?.userRoles?.userRoles || [],
  //       userGroupsList: currentInstanceResponse?.userGroups?.userGroups || [],
  //       organisationUnits: [],
  //       dataViewOrganisationUnits: [],
  //       teiSearchOrganisationUnits: [],
  //       selectedUserGroups: [],
  //       selectedUserRoles: [],
  //       ...formValues,
  //     });

  //     for (let instance of dataStoreInstances?.instances) {
  //       const remoteInstanceResponse = await engine.query({
  //         organisationUnits: {
  //           resource: `routes/${instance.organisationUnitsRouteAPI}/run`,
  //           params: {
  //             paging: false,
  //             fields: ["id", "level", "displayName", "path", "name", "parent"],
  //           },
  //         },
  //         userRoles: {
  //           resource: `routes/${instance.userRolesRouteAPI}/run`,
  //           params: {
  //             paging: false,
  //             fields: ["id", "name"],
  //           },
  //         },
  //         userGroups: {
  //           resource: `routes/${instance.userGroupsRouteAPI}/run`,
  //           params: {
  //             paging: false,
  //             fields: ["id", "name"],
  //           },
  //         },
  //       });

  //       newCustomInformation.push({
  //         key: "REMOTE",
  //         id: instance.id,
  //         organisationUnitsList:
  //           remoteInstanceResponse?.organisationUnits?.organisationUnits || [],
  //         userRolesList: remoteInstanceResponse?.userRoles?.userRoles || [],
  //         userGroupsList: remoteInstanceResponse?.userGroups?.userGroups || [],
  //         organisationUnits: [],
  //         dataViewOrganisationUnits: [],
  //         teiSearchOrganisationUnits: [],
  //         selectedUserGroups: [],
  //         selectedUserRoles: [],
  //         ...formValues,
  //       });
  //     }

  //     setCustomInformation(newCustomInformation);

  //     setLoadingCustomInformation(false);
  //   } catch (error) {
  //     console.log("Error: ", error);
  //     setLoadingCustomInformation(false);
  //   }
  // };

  const loadOganisationUnitInformations = async (formValues) => {
    try {
      setLoadingCustomInformation(true);
      const currentInstanceResponse = await engine.query({
        organisationUnits: {
          resource: "organisationUnits",
          params: {
            paging: false,
            fields: [
              "id",
              "level",
              "path",
              "displayName",
              "name",
              "parent[id,level,name,path,displayName]",
            ],
          },
        },

        userRoles: {
          resource: "userRoles",
          params: {
            paging: false,
            fields: ["id", "name"],
          },
        },

        userGroups: {
          resource: "userGroups",
          params: {
            paging: false,
            fields: ["id", "name"],
          },
        },
      });

      let newCustomInformation = [];

      newCustomInformation.push({
        key: "CURRENT",
        id: uuid(),
        organisationUnitsList:
          currentInstanceResponse?.organisationUnits?.organisationUnits || [],
        userRolesList: currentInstanceResponse?.userRoles?.userRoles || [],
        userGroupsList: currentInstanceResponse?.userGroups?.userGroups || [],
        organisationUnits: [],
        dataViewOrganisationUnits: [],
        teiSearchOrganisationUnits: [],
        selectedUserGroups: [],
        selectedUserRoles: [],
        ...formValues,
      });

      for (let instance of dataStoreInstances?.instances) {
        const remoteInstanceOrganisationUnitsResponse = await axios.get(
          `${instance.baseUrl}organisationUnits.json?paging=false&fields=id,level,displayName,path,name,parent`,
          basicAuthentication(
            instance.username,
            decodePassword(instance.password)
          )
        );
        const remoteInstanceUserRolesResponse = await axios.get(
          `${instance.baseUrl}userRoles.json?paging=false&fields=id,name`,
          basicAuthentication(
            instance.username,
            decodePassword(instance.password)
          )
        );

        const remoteInstanceUserGroupsResponse = await axios.get(
          `${instance.baseUrl}userGroups.json?paging=false&fields=id,name`,
          basicAuthentication(
            instance.username,
            decodePassword(instance.password)
          )
        );

        newCustomInformation.push({
          key: "REMOTE",
          id: instance.id,
          organisationUnitsList:
            remoteInstanceOrganisationUnitsResponse?.data?.organisationUnits ||
            [],
          userRolesList: remoteInstanceUserRolesResponse?.data?.userRoles || [],
          userGroupsList:
            remoteInstanceUserGroupsResponse?.data?.userGroups || [],
          organisationUnits: [],
          dataViewOrganisationUnits: [],
          teiSearchOrganisationUnits: [],
          selectedUserGroups: [],
          selectedUserRoles: [],
          ...formValues,
        });
      }

      setCustomInformation(newCustomInformation);

      setLoadingCustomInformation(false);
    } catch (error) {
      console.log("Error: ", error);
      setLoadingCustomInformation(false);
    }
  };

  const handleSelectOrganisationUnits = (value, id) => {
    const currentElement = customInformation?.find((el) => el.id === id);
    if (currentElement) {
      currentElement.organisationUnits = value;

      setCustomInformation(
        customInformation?.map((c) => (c.id === id ? currentElement : c)) || []
      );
    }
  };
  const handleSelectDataOrganisationUnits = (value, id) => {
    const currentElement = customInformation?.find((el) => el.id === id);
    if (currentElement) {
      currentElement.dataViewOrganisationUnits = value;

      setCustomInformation(
        customInformation?.map((c) => (c.id === id ? currentElement : c)) || []
      );
    }
  };
  const handleSelectTeiOrganisationUnits = (value, id) => {
    const currentElement = customInformation?.find((el) => el.id === id);
    if (currentElement) {
      currentElement.teiSearchOrganisationUnits = value;

      setCustomInformation(
        customInformation?.map((c) => (c.id === id ? currentElement : c)) || []
      );
    }
  };

  const onUserRolesChange = (value, id) => {
    const currentElement = customInformation?.find((el) => el.id === id);
    if (currentElement) {
      currentElement.selectedUserRoles = value;

      setCustomInformation(
        customInformation?.map((c) => (c.id === id ? currentElement : c)) || []
      );
    }
  };

  const onUserGroupsChange = (value, id) => {
    const currentElement = customInformation?.find((el) => el.id === id);
    if (currentElement) {
      currentElement.selectedUserGroups = value;

      setCustomInformation(
        customInformation?.map((c) => (c.id === id ? currentElement : c)) || []
      );
    }
  };

  // const handleSaveUser_OLD = async () => {
  //   try {
  //     setLoadinSaveUser(true);
  //     let thereisError = false;

  //     for (let el of customInformation) {
  //       const currentInstancePayload = {
  //         userCredentials: {
  //           username: el.username,
  //           password: el.password,
  //           disabled: el.disabled,
  //           externalAuth: true,
  //           userRoles: el.selectedUserRoles.map((uR) => ({ id: uR })),
  //         },

  //         email: el.email,
  //         firstName: el.firstName,
  //         surname: el.surname,
  //         phoneNumber: el.phoneNumber,
  //         whatsApp: el.whatsApp,
  //         facebookMessenger: el.facebookMessenger,

  //         organisationUnits: el.organisationUnits.map((ou) => ({
  //           id: ou.id,
  //         })),
  //         teiSearchOrganisationUnits: el.teiSearchOrganisationUnits.map(
  //           (ou) => ({ id: ou.id })
  //         ),
  //         dataViewOrganisationUnits: el.dataViewOrganisationUnits.map((ou) => ({
  //           id: ou.id,
  //         })),
  //         userGroups: el.selectedUserGroups.map((uG) => ({ id: uG })),
  //         attributeValues: [],
  //       };

  //       if (el.key === "CURRENT") {
  //         try {
  //           await engine.mutate({
  //             resource: "users",
  //             type: "create",
  //             data: currentInstancePayload,
  //           });
  //         } catch (err) {
  //           console.log(err);
  //           showError(
  //             "Error when creating user: " +
  //               currentInstancePayload.userCredentials.username +
  //               " ( " +
  //               err?.response?.errorReports?.[0]?.message ||
  //               err?.message ||
  //               " ) "
  //           );
  //           thereisError = true;
  //         }
  //       }

  //       if (el.key === "REMOTE") {
  //         try {
  //           await engine.mutate({
  //             resource: `routes/${
  //               dataStoreInstances?.instances?.find(
  //                 (dataInst) => dataInst.id === el.id
  //               )?.usersRouteAPI
  //             }/run`,
  //             type: "create",
  //             data: currentInstancePayload,
  //           });
  //         } catch (err) {
  //           console.log(err);
  //           showError(
  //             "Error when creating user: " +
  //               currentInstancePayload.userCredentials.username +
  //               " ( " +
  //               err?.response?.errorReports?.[0]?.message ||
  //               err?.message ||
  //               " ) "
  //           );
  //           thereisError = true;
  //         }
  //       }
  //     }
  //     !thereisError && showSuccess("Users created successfully !");
  //     !thereisError && navigate("/users");
  //     setLoadinSaveUser(false);
  //   } catch (err) {
  //     console.log(err);
  //     showError(
  //       err?.response?.errorReports?.[0]?.message ||
  //         err?.message ||
  //         "Error : could not proceed !"
  //     );
  //     setLoadinSaveUser(false);
  //   }
  // };

  const handleSaveUser = async () => {
    try {
      setLoadinSaveUser(true);

      for (let el of customInformation) {
        const currentInstancePayload = {
          disabled: el.disabled || false,
          username: el.username,
          password: el.password,
          email: el.email,
          firstName: el.firstName,
          surname: el.surname,
          phoneNumber: el.phoneNumber,
          whatsApp: el.whatsApp,
          facebookMessenger: el.facebookMessenger,

          organisationUnits: el.organisationUnits.map((ou) => ({
            id: ou.id,
          })),
          teiSearchOrganisationUnits: el.teiSearchOrganisationUnits.map(
            (ou) => ({ id: ou.id })
          ),
          dataViewOrganisationUnits: el.dataViewOrganisationUnits.map((ou) => ({
            id: ou.id,
          })),
          userRoles: el.selectedUserRoles.map((uR) => ({ id: uR })),
          userGroups: el.selectedUserGroups.map((uG) => ({ id: uG })),
          attributeValues: [],
        };

        if (el.key === "CURRENT") {
          try {
            await engine.mutate({
              resource: "users",
              type: "create",
              data: currentInstancePayload,
            });
          } catch (err) {
            console.log(err);
            showError(
              "Error when creating user: " +
                currentInstancePayload.userCredentials.username +
                " ( " +
                err?.response?.errorReports?.[0]?.message ||
                err?.message ||
                " ) "
            );
          }
        }

        if (el.key === "REMOTE") {
          try {
            const instance = dataStoreInstances?.instances?.find(
              (dataInst) => dataInst.id === el.id
            );
            await axios.post(
              `${instance?.baseUrl}users.json`,
              currentInstancePayload,
              basicAuthentication(
                instance?.username,
                decodePassword(instance?.password)
              )
            );
          } catch (err) {
            console.log(err);
            showError(
              "Error when creating user: " +
                currentInstancePayload.userCredentials.username +
                " ( " +
                err?.response?.data?.message ||
                err?.message ||
                " ) "
            );
          }
        }
      }
      showSuccess("Users created successfully !");
      navigate("/users");
      setLoadinSaveUser(false);
    } catch (err) {
      console.log(err);
      showError(
        err?.response?.data?.message ||
          err?.message ||
          "Error : could not proceed !"
      );
      setLoadinSaveUser(false);
    }
  };

  return (
    <div>
      <PageHeader>New User</PageHeader>
      {loadingCustomInformation && (
        <div className="flex gap-4 bg-white items-center  p-4 border my-2">
          <CircularLoader small />
          <div className="font-bold">
            Loading resources, that can take a few minutes...
          </div>
        </div>
      )}
      <div>
        {renderPage === BASIC_INFORMATIONS && (
          <UsersBasicInformationForm
            ui={languageData?.ui || []}
            db={languageData?.db || []}
            handleSubmit={handleSubmit}
            setRenderPage={setRenderPage}
            initialValue={basicInformation}
            loadOganisationUnitInformations={loadOganisationUnitInformations}
          />
        )}
        {renderPage === ORGANISATION_UNIT_ACCESS && (
          <UsersOrganisationUnitForm
            setRenderPage={setRenderPage}
            customInformation={customInformation || []}
            loading={loadingCustomInformation}
            handleSelectOrganisationUnits={handleSelectOrganisationUnits}
            handleSelectTeiOrganisationUnits={handleSelectTeiOrganisationUnits}
            handleSelectDataOrganisationUnits={
              handleSelectDataOrganisationUnits
            }
          />
        )}

        {renderPage === USER_ROLE_ACCESS && (
          <UserRoleAndRole
            customInformation={customInformation || []}
            setRenderPage={setRenderPage}
            onUserGroupsChange={onUserGroupsChange}
            onUserRolesChange={onUserRolesChange}
            handleSaveUser={handleSaveUser}
            loadinSaveUser={loadinSaveUser}
          />
        )}
      </div>
    </div>
  );
};

export default CreateUser;
