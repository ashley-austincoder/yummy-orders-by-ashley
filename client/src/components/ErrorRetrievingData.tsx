interface ErrorProps {
    message: string;
}

export const ErrorRetrievingData = (props: ErrorProps): JSX.Element => {
    return (
        <div className="container">
            <h2>Uh oh!</h2>
            <img src="./uhOhBaby.png" alt="uh oh baby" width="200" /> 
            <div>{props.message}</div>
        </div>
    )
}