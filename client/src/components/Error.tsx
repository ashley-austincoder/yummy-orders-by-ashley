interface ErrorProps {
  message: string;
}

export const Error = (props: ErrorProps): JSX.Element => {
  return (
    <div className="container center">
      <h2>Uh oh!</h2>
      <img src="./uhOhBaby.png" alt="uh oh baby" width="200" />
      <div>{props.message}</div>
    </div>
  );
};
