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
        if (checkedState === undefined) {
          setCheckedState(true);
        } else if (checkedState === false) {
          setCheckedState("indeterminate");
        } else if (checkedState === true) {
          setCheckedState(false);
        } else if (checkedState === "indeterminate") {
          setCheckedState(true);
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
