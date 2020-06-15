import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Levelbar from "./Levelbar";
import StarIcon from "@material-ui/icons/Star";
import ModalForm from "./ModalForm";

const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "point", numeric: true, disablePadding: false, label: "Point" },
  { id: "level", numeric: true, disablePadding: false, label: "Level" },
  { id: "star", numeric: true, disablePadding: false, label: "Star" },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === "name" ? "left" : "center"}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            <TableSortLabel onClick={createSortHandler(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  rowCount: PropTypes.number,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { selected, handleDelete, handleUpdate, itemSelected } = props;
  const [showModalForm, setShowModalForm] = React.useState(false);

  return (
    <>
      <ModalForm
        open={showModalForm}
        handleClose={() => setShowModalForm(false)}
        handleOk={handleUpdate}
        itemSelected={itemSelected}
      />

      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: selected.length > 0,
        })}
      >
        {selected.length > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Stage 1
          </Typography>
        )}

        {selected.length === 1 && (
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              onClick={() => setShowModalForm(true)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {selected.length > 0 && (
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(selected)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  selected: PropTypes.array,
  handleDelete: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "50px",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function Stage({
  rankList,
  handleDelete,
  handleUpdate,
  handleChange,
}) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [itemSelected, setItemSelected] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    setSelected([]);
  }, [rankList]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setItemSelected({});
      const newSelecteds = rankList.map((n) => n.no);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, no) => {
    const selectedIndex = selected.indexOf(no);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);

    if (newSelected.length === 1) {
      let dataIndex = rankList.findIndex((item) => item.no === newSelected[0]);
      setItemSelected(rankList[dataIndex]);
    } else {
      setItemSelected({});
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (no) => selected.indexOf(no) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rankList.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          selected={selected}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          itemSelected={itemSelected}
          handleChange={handleChange}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rankList.length}
            />
            <TableBody>
              {rankList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.no);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.no)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.no}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="center">{row.point}</TableCell>
                      <TableCell align="center">
                        <Levelbar percent={row.level} />
                      </TableCell>
                      <TableCell align="center">
                        {index < 3 &&
                          Array.from(Array(3 - index)).map((ic, ik) => (
                            <StarIcon
                              key={row.no + "-icon-" + ik}
                              color="primary"
                            />
                          ))}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} align="center">
                    There is no item in the list.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rankList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
