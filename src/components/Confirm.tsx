import { FC } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material'
import { useAppSelector } from '../app/hooks'
import { getEntityConfirmationDialog } from '../transformers/dialog'
import { EntityConfirmationDialogOptions } from '../types/common'

const Confirm: FC = () => {
  const confirm = useAppSelector((state) => state.confirm)

  const handleConfirm = () => {
    if (confirm.onConfirm) {
      confirm.onConfirm()
    }
  }

  const handleCancel = () => {
    if (confirm.onCancel) {
      confirm.onCancel()
    }
  }

  const customDialogContent = getEntityConfirmationDialog(
    confirm.customConfirmComponentCode as EntityConfirmationDialogOptions,
    (confirm.customConfirmComponentAttributes || {}) as Record<string, unknown>,
  )

  return (
    <Dialog
      open={!!confirm.open}
      onClose={handleCancel}
      aria-labelledby='confirmation-title'
      PaperProps={
        customDialogContent
          ? {
              sx: { height: '300px', width: '400px', maxWidth: '90%' },
            }
          : {}
      }
    >
      <DialogTitle id='confirmation-title'>{confirm.confirmationTitle}</DialogTitle>
      <DialogContent>
        {customDialogContent ? customDialogContent : <Typography>{confirm.confirmationText}</Typography>}
      </DialogContent>
      {!customDialogContent && (
        <DialogActions>
          <Button onClick={handleConfirm} color='primary' variant='contained'>
            {confirm.confirmButtonLabel}
          </Button>
          <Button onClick={handleCancel} color='error' variant='contained'>
            {confirm.denyButtonLabel}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default Confirm
