const EmailTemplate = ({
  name,
  message,
  email,
}: {
  name: string;
  message: string;
  email: string;
}) => {
  return (
    <>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div>Message: {message}</div>
    </>
  );
};
export default EmailTemplate;
