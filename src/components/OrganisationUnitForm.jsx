import { NoticeBox } from "@dhis2/ui";
import { useState } from "react";
import OrganisationUnitsTree from "./OrganisationUnitsTree";

const OrganisationUnitForm = ({
  title,
  orgUnits,
  loading,
  handleSelectOrganisationUnits,
  handleSelectTeiOrganisationUnits,
  handleSelectDataOrganisationUnits,
  currentElement,
}) => {
  const [organisationUnits, setOrganisationUnits] = useState([]);
  const [selectedOrganisationUnit, setSelectedOrganisationUnit] =
    useState(null);
  const [loadingOrganisationUnits, setLoadingOrganisationUnits] =
    useState(false);

  return (
    <div className="bg-white p-4 border">
      <div>
        <div className="text-xl font-bold mb-2">{title} </div>
      </div>
      <NoticeBox title="Organisation unit selections are recursive">
        Selecting a unit gives access to all units in its sub-hierarchy.
      </NoticeBox>
      <div className="p-4 border rounded mt-4">
        <div>
          <div className="font-bold">Data capture and maintenance</div>
          <div className="my-2 text-gray-500 text-sm">
            The organisation units that this user can enter and edit data for.
          </div>
          <OrganisationUnitsTree
            meOrgUnitId={null}
            orgUnits={currentElement?.organisationUnitsList || []}
            currentOrgUnits={currentElement?.organisationUnits || []}
            setCurrentOrgUnits={setSelectedOrganisationUnit}
            loadingOrganisationUnits={loadingOrganisationUnits || loading}
            multiple
            onChange={(value) => {
              handleSelectOrganisationUnits(value, currentElement?.id);
            }}
          />
        </div>

        <div className="mt-4">
          <div className="font-bold">Data output and analysis</div>
          <div className="my-2 text-gray-500 text-sm">
            The organisation units that this user can export and analyse.
          </div>
          <OrganisationUnitsTree
            meOrgUnitId={null}
            orgUnits={currentElement?.organisationUnitsList || []}
            currentOrgUnits={currentElement?.dataViewOrganisationUnits || []}
            setCurrentOrgUnits={setSelectedOrganisationUnit}
            loadingOrganisationUnits={loadingOrganisationUnits || loading}
            multiple
            onChange={(value) => {
              handleSelectDataOrganisationUnits(value, currentElement?.id);
            }}
          />
        </div>

        <div className="mt-4">
          <div className="font-bold">Search</div>
          <div className="my-2 text-gray-500 text-sm">
            The organisation that this user can search for and in.
          </div>
          <OrganisationUnitsTree
            meOrgUnitId={null}
            orgUnits={currentElement?.organisationUnitsList || []}
            currentOrgUnits={currentElement?.teiSearchOrganisationUnits || []}
            setCurrentOrgUnits={setSelectedOrganisationUnit}
            loadingOrganisationUnits={loadingOrganisationUnits || loading}
            multiple
            onChange={(value) => {
              handleSelectTeiOrganisationUnits(value, currentElement?.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrganisationUnitForm;
