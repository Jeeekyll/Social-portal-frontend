import React, { FC } from "react"
import { IconButton } from "@mui/material"
import EditOffIcon from "@mui/icons-material/EditOff"
import ModeEdit from "@mui/icons-material/ModeEdit"
import styles from "./Settings.module.scss"

interface EditButtonProps {
  isActive: boolean
  activateField: () => void
  discardFiled: () => void
}

const EditButton: FC<EditButtonProps> = ({
  isActive,
  activateField,
  discardFiled,
}) => (
  <>
    {isActive ? (
      <div className={styles.settings__item__edit} onClick={discardFiled}>
        <IconButton color='primary' size='small' style={{ marginLeft: "auto" }}>
          <EditOffIcon />
        </IconButton>
        <span>Discard</span>
      </div>
    ) : (
      <div className={styles.settings__item__edit} onClick={activateField}>
        <IconButton color='primary' size='small' style={{ marginLeft: "auto" }}>
          <ModeEdit />
        </IconButton>
        <span>Change</span>
      </div>
    )}
  </>
)

export default EditButton
