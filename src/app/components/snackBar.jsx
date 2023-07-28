import React from "react";
import { Snackbar, SnackbarContent } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { removeSnackbarMessage } from "../actions/snackBarAction";

const SnackBar = () => {
    const dispatch = useDispatch();
    const { snackbarMessage, showSnackBar } = useSelector(
        (state) => state.snackBar
    );

    return (
        <React.Fragment>
            {snackbarMessage && (
                <Snackbar
                    open={showSnackBar ? showSnackBar : false}
                    autoHideDuration={4000}
                    anchorOrigin={{
                        horizontal: "left",
                        vertical: "bottom",
                    }}
                    onClose={() => dispatch(removeSnackbarMessage())}
                >
                    <SnackbarContent
                        style={{
                            backgroundColor: "red",
                            fontWeight: 500,
                        }}
                        message={snackbarMessage}
                    />
                </Snackbar>
            )}
        </React.Fragment>
    );
};

export default SnackBar;
