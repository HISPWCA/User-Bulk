import {
  ReactFinalForm,
  InputFieldFF,
  hasValue,
  Button,
  SingleSelectFieldFF,
  CheckboxFieldFF,
  dhis2Password,
  createEqualTo,
  email,
  composeValidators,
} from "@dhis2/ui";
import { GrLinkNext } from "react-icons/gr";

const { Field, Form } = ReactFinalForm;
const UsersBasicInformationForm = ({ handleSubmit, setRenderPage, ui, db , initialValue }) => {
  return (
    <div className="bg-white p-4 border max-w-[40%]">
      <div className="font-bold text-lg">Basic informations</div>
      <div className="mt-6">
        <Form onSubmit={handleSubmit} initialValues={initialValue}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <Field
                  name="username"
                  component={InputFieldFF}
                  label="Username *"
                  placeholder="Enter username "
                  validate={hasValue}
                />
              </div>

              <div className="mt-4">
                <Field
                  name="email"
                  component={InputFieldFF}
                  label="Email address"
                  placeholder="Enter email adress"
                  validate={email}
                />
              </div>

              <div className="mt-4">
                <Field
                  name="firstName"
                  component={InputFieldFF}
                  label="First Name *"
                  placeholder="Enter first name "
                  validate={hasValue}
                />
              </div>

              <div className="mt-4">
                <Field
                  name="surname"
                  component={InputFieldFF}
                  label="Last Name *"
                  placeholder="Enter last name "
                  validate={hasValue}
                />
              </div>

              <div className="mt-4">
                <Field
                  className="w-1/3"
                  name="interfaceLang"
                  component={SingleSelectFieldFF}
                  label="Interface language *"
                  placeholder="choose Interface language"
                  validate={hasValue}
                  options={ui.map((u) => ({ label: u.name, value: u.locale }))}
                />
              </div>

              <div className="mt-4">
                <Field
                  className="w-1/3"
                  name="databaseLang"
                  component={SingleSelectFieldFF}
                  label="Database language *"
                  placeholder="choose database language"
                  validate={hasValue}
                  options={db.map((d) => ({ label: d.name, value: d.locale }))}
                />
              </div>

              <div className="mt-4">
                <Field
                  type="checkbox"
                  name="disabled"
                  component={CheckboxFieldFF}
                  initialValue={false}
                  label="Disable this user account"
                />
              </div>

              <div className="mt-4">
                <div className="my-4 text-lg font-bold"> Security</div>
                <div className="mt-2 text-gray-500">
                  Settings for how this user can log in.
                </div>
              </div>

              <div className="mt-4">
                <Field
                  className="w-2/3"
                  name="password"
                  component={InputFieldFF}
                  label="Password *"
                  placeholder="Enter password"
                  type="password"
                  validate={composeValidators(dhis2Password, hasValue)}
                />
              </div>

              <div className="mt-4">
                <Field
                  className="w-2/3"
                  name="repeatPassword"
                  component={InputFieldFF}
                  label="Repeat Password *"
                  placeholder="Enter password once again"
                  type="password"
                  validate={composeValidators(
                    createEqualTo("password"),
                    hasValue
                  )}
                />
              </div>

              {/* <div className="mt-4">
                <Field
                  className="w-1/3"
                  name="accountExpirationDate"
                  component={InputFieldFF}
                  label="Account expiration date"
                  placeholder="Expiration date"
                  type="date"
                />
              </div>

              <div className="mt-4">
                <Field
                  name="oidcMappingValue"
                  component={InputFieldFF}
                  label="OIDC mapping value"
                  placeholder="OIDC mapping value"
                />
              </div>

              <div className="mt-4">
                <Field
                  name="oidcMappingValue"
                  component={InputFieldFF}
                  label="LDAP identifier"
                  placeholder="LDAP identifier"
                />
              </div>

              <div className="mt-4">
                <Field
                  name="externalAuthentication"
                  component={CheckboxFieldFF}
                  label="External authentication only (OpenID / LDAP)"
                />
              </div> */}

              <div className="mt-4">
                <div className="my-4 text-lg font-bold"> Contact details</div>
                <div className="mt-2 text-gray-500">
                  Settings for how this user can log in.
                </div>
              </div>

              <div className="mt-4">
                <Field
                  name="phoneNumber"
                  component={InputFieldFF}
                  label="Mobile phone number"
                  placeholder="Enter mobile phone number"
                />
              </div>

              <div className="mt-4">
                <Field
                  name="whatsApp"
                  component={InputFieldFF}
                  label="Whatsapp"
                  placeholder="Enter whatsapp adress"
                />
              </div>

              <div className="mt-4">
                <Field
                  name="facebookMessenger"
                  component={InputFieldFF}
                  label="Facebook Messenger"
                  placeholder="Enter Facebook Messenger"
                />
              </div>

              <div className="mt-5">
                <Button
                  icon={<GrLinkNext className="text-sm" />}
                  type="submit"
                  primary
                >
                  next
                </Button>
              </div>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
};

export default UsersBasicInformationForm;
