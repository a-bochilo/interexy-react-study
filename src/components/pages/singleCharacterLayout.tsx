import { useEffect, useRef, useState } from "react";

import { NavLink, useParams } from "react-router-dom";

import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import {
    ICharacterData,
    getCharacterById,
} from "../../api/characterApi/characterApi";

const SingleCharcterLayout = () => {
    const { id } = useParams();
    const [characterData, setCharacterData] = useState<null | ICharacterData>();

    useEffect(() => {
        if (!id) return;

        getCharacterById(id).then(
            (characterData: ICharacterData | undefined) => {
                if (!characterData) return;
                setCharacterData(characterData);
            }
        );
    }, [id]);

    const showCharacterCard = ({
        name,
        image,
        gender,
        location,
        species,
        status,
        url,
    }: ICharacterData) => {
        return (
            <Card
                sx={{
                    width: "80%",
                    backgroundColor: "lightgreen",
                    margin: "15px",
                    display: "flex",
                    flexFlow: "row nowrap",
                }}
            >
                <CardMedia image={image} title={name} component={"img"} />
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
                                <TableCell align="right">
                                    {location.name}
                                </TableCell>
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
                                            status === "Alive"
                                                ? "success"
                                                : "error"
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    Learn object look
                                </TableCell>
                                <TableCell align="right">
                                    <NavLink to={url}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                        >
                                            GO!
                                        </Button>
                                    </NavLink>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        );
    };

    return <>{characterData && showCharacterCard(characterData)}</>;
};

export default SingleCharcterLayout;
