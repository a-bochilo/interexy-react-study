import { NavLink } from "react-router-dom";

import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { ICharacterData } from "../../api/characterApi/characterApi";

const CharacterCard = ({
    characterData,
}: {
    characterData: ICharacterData;
}) => {
    const { name, image, gender, location, species, status, url } =
        characterData;

    return (
        <Card sx={{ width: 350, backgroundColor: "lightgreen" }}>
            <CardMedia
                sx={{ height: 150 }}
                image={image}
                title={name}
                component={"img"}
            />
            <TableContainer component={CardContent}>
                <Table aria-label="Character data">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">{name}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Gender
                            </TableCell>
                            <TableCell align="right">{gender}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Location
                            </TableCell>
                            <TableCell align="right">{location.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Species
                            </TableCell>
                            <TableCell align="right">{species}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Status
                            </TableCell>
                            <TableCell align="right">
                                <Chip
                                    label={status}
                                    color={
                                        status === "Alive" ? "success" : "error"
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <CardActions>
                <NavLink to={url}>
                    <Button size="small">Learn object look</Button>
                </NavLink>
            </CardActions>
        </Card>
    );
};

export default CharacterCard;
