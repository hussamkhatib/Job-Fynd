import { FC } from "react";
interface Props {
  fieldErrors: {
    [x: string]: string[] | undefined;
    [x: number]: string[] | undefined;
    [x: symbol]: string[] | undefined;
  };
}

const ZodFieldErrors: FC<Props> = ({ fieldErrors }) => {
  return (
    <>
      {Object.keys(fieldErrors).map((fieldError) => {
        const err = fieldErrors[fieldError];
        err ? (
          <p key={fieldError}>
            {fieldError}: {err.join(", ")}
          </p>
        ) : null;
      })}
    </>
  );
};

export default ZodFieldErrors;
