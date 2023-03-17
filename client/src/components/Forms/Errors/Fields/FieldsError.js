import "./FieldsError.scss";

const FieldsError = ({ msg }) => (
  <p className="field-error">{msg ? msg : ""}</p>
);
export default FieldsError;
