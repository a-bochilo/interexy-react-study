import { useEffect, useState } from "react";

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
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import {
    ICharacterData,
    getCharacterById,
} from "../../api/characterApi/characterApi";

interface ISingleCharacterPageKeys {
    name: string;
    gender: string;
    location: string;
    species: string;
    status: string;
    objLinkTitle: string;
    buttonLabel: string;
}

const StyledCard = styled(Card)`
    width: 80%;
    background-color: lightgreen;
    margin: 15px;
    display: flex;
    flex-flow: row nowrap;
    table {
        * {
            font-size: 17px;
        }

        thead th {
            font-size: 20px;
            font-weight: 700;
        }
    }
`;

const SingleCharcterPage = () => {
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

    const { t } = useTranslation("", {
        keyPrefix: "singleCharacterPage",
    });

    const renderCharacterCard = ({
        name,
        image,
        gender,
        location,
        species,
        status,
        url,
    }: ICharacterData) => {
        return (
            <StyledCard>
                <CardMedia image={image} title={name} component={"img"} />
                <TableContainer component={CardContent}>
                    <Table aria-label="Character data">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("name")}</TableCell>
                                <TableCell align="right">{name}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t("gender")}
                                </TableCell>
                                <TableCell align="right">{gender}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t("location")}
                                </TableCell>
                                <TableCell align="right">
                                    {location.name}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t("species")}
                                </TableCell>
                                <TableCell align="right">{species}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {t("status")}
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
                                    {t("objLinkTitle")}
                                </TableCell>
                                <TableCell align="right">
                                    <NavLink to={url}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                        >
                                            {t("buttonLabel")}
                                        </Button>
                                    </NavLink>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </StyledCard>
        );
    };

    return <>{characterData && renderCharacterCard(characterData)}</>;
};

export default SingleCharcterPage;
