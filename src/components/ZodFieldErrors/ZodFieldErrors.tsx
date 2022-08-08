import { FC } from "react";

interface Props {
  fieldErrors: any;
}

const ZodFieldErrors: FC<Props> = ({ fieldErrors }) => {
  return (
    <>
      {Object.keys(fieldErrors).map((fieldError) => {
        return (
          <p key={fieldError}>
            {fieldError}: {fieldErrors[fieldError].join(", ")}
          </p>
        );
      })}
    </>
  );
};

export default ZodFieldErrors;

// TODO : use this and convert into proper types
// {
//     "name": [
//         "Name must be 3 or more characters long"
//     ],
//     "personalEmail": [
//         "Invalid email"
//     ]
// }
