type State = {
  name: string;
  usn: string;
  email: string;
  validated: string;
};

type Action =
  | {
      type: "textInput";
      payload: {
        key: string;
        value: string;
      };
    }
  | {
      type: "init";
      payload: {
        name: string;
        usn: string;
        email: string;
        validated: "NOTVALIDATED" | "PENDING" | "VALIDATED";
      };
    }
  | {
      type: "sendForValidation";
    };

export const initialValue: State = {
  name: "",
  usn: "",
  email: "",
  validated: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "init":
      return {
        ...action.payload,
      };
    case "textInput":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case "sendForValidation":
      return {
        ...state,
        validated: "PENDING",
      };
    default:
      throw new Error(`Unknown action type: ${action["type"]}`);
  }
};

export default reducer;
