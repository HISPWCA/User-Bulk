import { Button } from "@dhis2/ui";
import OrganisationUnitForm from "./OrganisationUnitForm";
import { useDataQuery } from "@dhis2/app-runtime";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { BASIC_INFORMATIONS, USER_ROLE_ACCESS } from "../utils/constants";

const dataStoreQuery = {
  instances: {
    resource: `dataStore/${process.env.REACT_APP_DATASTORE_NAME}/${process.env.REACT_APP_DATASTORE_INSTANCES_KEY}`,
  },
};

const UsersOrganisationUnitForm = ({
  setRenderPage,
  customInformation,
  loading,
  handleSelectOrganisationUnits,
  handleSelectTeiOrganisationUnits,
  handleSelectDataOrganisationUnits,
}) => {
  const { data: instanceData } = useDataQuery(dataStoreQuery);

  return (
    <div>
      <div className="bg-white p-4 border">
        <div className="font-bold text-lg">Organisation unit access</div>
        <div className=" text-gray-500 mt-2">
          Customise the organisation units this user has access to for
          searching, capturing and managing data.
        </div>
      </div>

      <div className="grid grid-cols-4 mt-2 gap-2">
        <OrganisationUnitForm
          title="Current Instance"
          currentElement={
            customInformation?.find((cI) => cI.key === "CURRENT") || []
          }
          loading={loading}
          handleSelectOrganisationUnits={handleSelectOrganisationUnits}
          handleSelectTeiOrganisationUnits={handleSelectTeiOrganisationUnits}
          handleSelectDataOrganisationUnits={handleSelectDataOrganisationUnits}
        />
        {instanceData?.instances?.map((instance) => (
          <>
            <OrganisationUnitForm
              currentElement={
                customInformation
                  .filter((cI) => cI.key === "REMOTE")
                  .find((i) => i.id === instance.id) || []
              }
              key={instance.id}
              title={instance.name}
              loading={loading}
              handleSelectOrganisationUnits={handleSelectOrganisationUnits}
              handleSelectTeiOrganisationUnits={
                handleSelectTeiOrganisationUnits
              }
              handleSelectDataOrganisationUnits={
                handleSelectDataOrganisationUnits
              }
            />
          </>
        ))}
      </div>

      <div className="mt-5 flex gap-5">
        <Button
          onClick={() => setRenderPage(BASIC_INFORMATIONS)}
          icon={<GrLinkPrevious className="text-sm" />}
          type="submit"
        >
          Previous
        </Button>
        <Button
          onClick={() => setRenderPage(USER_ROLE_ACCESS)}
          icon={<GrLinkNext className="text-sm" />}
          type="submit"
          primary
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default UsersOrganisationUnitForm;
