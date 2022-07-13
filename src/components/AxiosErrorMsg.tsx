import { AxiosError } from "axios";
import { FC } from "react";

type Props = {
  error: AxiosError;
};

const AxiosErrorMsg: FC<Props> = ({ error }) => {
  return error instanceof AxiosError ? (
    <span>
      Error - {error.response?.status}
      <hr /> {error.response?.data?.message}
    </span>
  ) : null;
};

export default AxiosErrorMsg;
