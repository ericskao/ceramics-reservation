"use-client";

import { Badge, BadgeCheck, BadgeHelp, BadgeX } from "lucide-react";

const IndeterminateCheckbox = ({
  checkedState,
  setCheckedState,
}: {
  checkedState?: boolean | "indeterminate" | undefined;
  setCheckedState?: (newState: boolean | "indeterminate") => void;
}) => {
  return (
    <button
      onClick={() => {
        if (!setCheckedState) {
          return;
        }
        if (checkedState === undefined || checkedState === false) {
          setCheckedState(true);
        } else if (checkedState === true) {
          setCheckedState("indeterminate");
        } else if (checkedState === "indeterminate") {
          setCheckedState(false);
        }
      }}
    >
      {checkedState === undefined && <Badge />}
      {checkedState === "indeterminate" && <BadgeHelp color="grey" />}
      {checkedState === true && <BadgeCheck color="green" />}
      {checkedState === false && <BadgeX color="red" />}
    </button>
  );
};

export default IndeterminateCheckbox;
