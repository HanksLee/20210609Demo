import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableRow, Dialog, DialogTitle } from '@material-ui/core';

export default function SimpleDialog(props) {
    // const classes = useStyles();
    const { onClose, data, open } = props;
  
    const handleClose = () => {
      onClose();
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{data.name} Info</DialogTitle>
        <Table>
            <TableBody>
            <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell>{data.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>alpha2Code</TableCell>
                    <TableCell>{data.alpha2Code}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>alpha3Code</TableCell>
                    <TableCell>{data.alpha3Code}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>nativeName</TableCell>
                    <TableCell>{data.nativeName}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>altSpellings</TableCell>
                    <TableCell>{data.altSpellings.join("、")}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>callingCodes</TableCell>
                    <TableCell>{data.callingCodes.join("、")}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>area</TableCell>
                    <TableCell>{data.area}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>borders</TableCell>
                    <TableCell>{data.borders.join("、")}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>capital</TableCell>
                    <TableCell>{data.capital}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>cioc</TableCell>
                    <TableCell>{data.cioc}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>demonym</TableCell>
                    <TableCell>{data.demonym}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>gini</TableCell>
                    <TableCell>{data.gini}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>latlng</TableCell>
                    <TableCell>{data.latlng.join("、")}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>numericCode</TableCell>
                    <TableCell>{data.numericCode}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>population</TableCell>
                    <TableCell>{data.population}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>region</TableCell>
                    <TableCell>{data.region}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>subregion</TableCell>
                    <TableCell>{data.subregion}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>timezones</TableCell>
                    <TableCell>{data.timezones.join("、")}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
      </Dialog>
    );
  }