import {
  ReactFinalForm,
  InputFieldFF,
  hasValue,
  Button,
  Divider,
} from "@dhis2/ui";
import { IoSaveOutline } from "react-icons/io5";

const { Field, Form } = ReactFinalForm;

const SettingForm = ({
  onSubmit,
  setTesting,
  loading,
  isTesting,
  currentInstance,
  setCurrentInstance,
}) => {
  const handleTestInstance = (_) => {
    setTesting(true);
  };

  return (
    <div className=" col-span-1">
      <div className="bg-white p-4 border rounded">
        <div className="font-bold">New Instance</div>
        {console.log("current : ", currentInstance)}
        <Divider />
        <Form
          onSubmit={onSubmit}
          initialValues={
            currentInstance
              ? {
                  instanceName: currentInstance.name,
                  instanceUrl: currentInstance.baseUrl,
                  username: currentInstance.username,
                }
              : null
          }
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div>
                  <Field
                    name="instanceName"
                    component={InputFieldFF}
                    label="Instance Name"
                    placeholder="Name"
                    validate={hasValue}
                  />
                </div>
                <div className="mt-4">
                  <Field
                    name="instanceUrl"
                    component={InputFieldFF}
                    label="Instance Url ( must end with api ) "
                    placeholder="https://your-remote-server/api"
                    validate={hasValue}
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <Field
                    name="username"
                    component={InputFieldFF}
                    label="Username"
                    placeholder="Enter username"
                    validate={hasValue}
                  />
                  <Field
                    name="password"
                    component={InputFieldFF}
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    validate={hasValue}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {currentInstance && (
                  <Button destructive onClick={() => setCurrentInstance(null)}>
                    Cancel
                  </Button>
                )}
                <Button
                  onClick={handleTestInstance}
                  type="submit"
                  loading={isTesting ? loading : false}
                >
                  Test instance
                </Button>

                <Button
                  type="submit"
                  icon={<IoSaveOutline className="text-sm" />}
                  primary
                  onClick={() => setTesting(false)}
                  loading={isTesting ? false : loading}
                >
                  {currentInstance ? "Update" : "Save"}
                </Button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default SettingForm;
