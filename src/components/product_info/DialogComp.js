import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const DialogComp = ({open, handleClose}) => {

return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >

        <DialogTitle id="alert-dialog-title">
            Please, you mush select quantity for the product
        </DialogTitle>
    
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                The quantity of the product is zero now you must select at least one quantity.
            </DialogContentText>
        </DialogContent>

        <DialogActions>
            <Button variant="contained" onClick={handleClose} autoFocus>
                Agree
            </Button>
        </DialogActions>
    </Dialog>
)
}

export default React.memo(DialogComp)