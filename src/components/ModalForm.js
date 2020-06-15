import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import { Grid, Button } from "@material-ui/core";
import cloneDeep from "lodash/cloneDeep";

const useStyles = makeStyles((theme) => ({
  root: {
    "& h4": {
      textAlign: "center",
      marginBottom: "30px",
    },
    "& .MuiGrid-container": {
      marginBottom: "20px",
      display: "block",
      textAlign: "right",
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      marginBottom: "20px",
    },
    "& .MuiButton-root": {
      marginLeft: "10px",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalForm({
  itemSelected,
  open,
  handleClose,
  handleOk,
}) {
  const classes = useStyles();
  const [dataUpdate, setDataUpdate] = React.useState({});

  React.useEffect(() => {
    setDataUpdate(cloneDeep(itemSelected));
  }, [itemSelected]);

  const handleChange = ({ target }) => {
    setDataUpdate((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleUpdateAndCloseModal = () => {
    handleOk(dataUpdate);
    handleClose();
    setDataUpdate({});
  };

  const handleCloseModal = () => {
    handleClose();
    setDataUpdate({});
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {dataUpdate.name && dataUpdate.point ? (
              <form className={classes.root} noValidate autoComplete="off">
                <h4>Update Information</h4>
                <Grid container spacing={3}>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    value={dataUpdate.name}
                    onChange={handleChange}
                    xs={12}
                    md={4}
                  />
                  <TextField
                    id="point"
                    name="point"
                    label="Point"
                    value={dataUpdate.point}
                    onChange={handleChange}
                    type="number"
                    xs={12}
                    md={4}
                  />
                </Grid>
                <Grid container spacing={3}>
                  <Button variant="contained" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateAndCloseModal}
                  >
                    Update
                  </Button>
                </Grid>
              </form>
            ) : null}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
