import React, { memo } from "react";

import iconPencil from "../../../../assets/icons/pencil.svg";

interface EditButtonProps {
  onClickEditButton: () => void;
}

function EditButton(props: EditButtonProps) {
  const { onClickEditButton } = props;

  return (
    <button
      type="button"
      className="card-edit"
      onClick={() => onClickEditButton()}
    >
      Editar
      <img src={iconPencil} alt="" />
    </button>
  );
}

export default memo(EditButton);
