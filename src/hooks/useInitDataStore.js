import { useState } from "react";

import { useDataMutation, useDataQuery } from "@dhis2/app-runtime";

const instancesQuery = {
  instances: {
    resource: `dataStore/${process.env.REACT_APP_DATASTORE_NAME}/${process.env.REACT_APP_DATASTORE_INSTANCES_KEY}`,
  },
};

const instancesMutation = {
  type: "create",
  resource: `dataStore/${process.env.REACT_APP_DATASTORE_NAME}/${process.env.REACT_APP_DATASTORE_INSTANCES_KEY}`,
  data: ({ data }) => data,
};

export default function useInitDataStore() {
  const [instancesMutate] = useDataMutation(instancesMutation);
  const [isAppsInitialized, setIsAppsInitialized] = useState(false);
  const [appLoading, setAppLoading] = useState(false);

  const { loading } = useDataQuery(instancesQuery, {
    onComplete: () => setIsAppsInitialized(true),
    onError: async (err) => {
      try {
        setAppLoading(true);
        await instancesMutate({ data: [] });
        setIsAppsInitialized(true);
        setAppLoading(false);
      } catch (err) {}
    },
  });

  return {
    isInitialized: isAppsInitialized,
    loading: !appLoading && !loading ? false : true,
  };
}
