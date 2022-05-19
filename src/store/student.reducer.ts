type State = {
  name: string;
  usn: string;
  email: string;
  branch: string;
};

type Action =
  | {
      type: "textInput";
      payload: {
        key: string;
        value: string;
      };
    }
  | { type: "init"; payload: any };

export const initialValue = {
  name: "",
  usn: "",
  email: "",
  branch: "",
};

const reducer = (state: State, action: Action) => {
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
    default:
      throw new Error(`Unknown action type: ${action["type"]}`);
  }
};

export default reducer;
