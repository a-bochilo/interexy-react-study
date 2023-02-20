import { NavLink } from "react-router-dom";

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
    TableRow,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { ICharacterData } from "../../api/characterApi/characterApi";

type SingleCharacterKeys = {
    name: string;
    gender: string;
    location: string;
    species: string;
    status: string;
    objLinkTitle: string;
    buttonLabel: string;
};

type SingleCharacterEntries = {
    [K in keyof SingleCharacterKeys]: [K, SingleCharacterKeys[K]];
}[keyof SingleCharacterKeys][];

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

        .name {
            th,
            td {
                font-size: 20px;
                font-weight: 700;
            }
        }
    }
`;

const SingleCharcterCard = ({ character }: { character: ICharacterData }) => {
    const { t } = useTranslation();

    const keysObj: SingleCharacterKeys = t("singleCharacterPage", {
        returnObjects: true,
    });
    const keysEntries: SingleCharacterEntries = Object.entries(
        keysObj
    ) as SingleCharacterEntries;

    const TableRowsView = ({ character }: { character: ICharacterData }) => {
        return (
            <>
                {keysEntries.map(([key, text]) => {
                    if (key === "buttonLabel" || key === "objLinkTitle")
                        return null;
                    return (
                        <TableRow
                            key={key}
                            className={key === "name" ? "name" : ""}
                        >
                            <TableCell component="th" scope="row">
                                {text}:
                            </TableCell>
                            <TableCell align="right">
                                {key === "status" ? (
                                    <Chip
                                        label={character[key]}
                                        color={
                                            character[key] === "Alive"
                                                ? "success"
                                                : "error"
                                        }
                                    />
                                ) : (
                                    character[key]
                                )}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </>
        );
    };

    return (
        <StyledCard>
            <CardMedia
                image={character.image}
                title={character.name}
                component={"img"}
            />
            <TableContainer component={CardContent}>
                <Table aria-label="Character data">
                    <TableBody>
                        {<TableRowsView character={character} />}
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {keysObj.objLinkTitle}:
                            </TableCell>
                            <TableCell align="right">
                                <NavLink to={character.url}>
                                    <Button variant="contained" size="small">
                                        {keysObj.buttonLabel}
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

export default SingleCharcterCard;
