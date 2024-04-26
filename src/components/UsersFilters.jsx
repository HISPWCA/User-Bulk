import { SingleSelect, SingleSelectOption, Input, Checkbox } from "@dhis2/ui";


const UsersFilters = () => {
  return (
    <div className="my-2 items-center flex gap-2">
      <Input placeholder="Search by name " />

      <SingleSelect
        className="select"
        onChange={(value) => console.log("value: ", value)}
        placeholder="Organisation Unit "
      >
        <SingleSelectOption label="option one" value="1" />
        <SingleSelectOption label="option two" value="2" />
        <SingleSelectOption label="option three" value="3" />
      </SingleSelect>

      <SingleSelect
        className="select"
        onChange={(value) => console.log("value: ", value)}
        placeholder="Time inactive "
      >
        <SingleSelectOption label="option one" value="1" />
        <SingleSelectOption label="option two" value="2" />
        <SingleSelectOption label="option three" value="3" />
      </SingleSelect>

      <SingleSelect
        className="select"
        onChange={(value) => console.log("value: ", value)}
        placeholder="Invitation"
      >
        <SingleSelectOption label="option one" value="1" />
        <SingleSelectOption label="option two" value="2" />
        <SingleSelectOption label="option three" value="3" />
      </SingleSelect>

      <Checkbox
        checked
        label="Show self-registrations"
        name="selfRegistrations"
        // onBlur={onBlur}
        // onFocus={onFocus}
        // onChange={onChange}
        value="checked"
      />
    </div>
  );
};

export default UsersFilters;
