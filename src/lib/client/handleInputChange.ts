import { Dispatch, SetStateAction } from "react";

export const handleInputChange = <T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<T>>
) => {
  const { name, value, type, files } = e.target;

  let newValue: unknown = value;

  if (type === "file" && files) {
    newValue = files[0];
  }

  if (type === "date") {
    newValue = value ? new Date(value) : null;
  }

  setState((prevState) => ({
    ...prevState,
    [name]: newValue,
  }));
};
