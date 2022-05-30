type State = {
  name: string;
  usn: string;
  validated: string;
  resume: string;
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
        resume: string;
        validated: "notvalidated" | "pending" | "validated";
      };
    }
  | {
      type: "sendForValidation";
    };

export const initialValue: State = {
  name: "",
  usn: "",
  validated: "",
  resume: "",
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
        validated: "pending",
      };
    default:
      throw new Error(`Unknown action type: ${action["type"]}`);
  }
};

export default reducer;
