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
    TableRow,
    CircularProgress,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import {
    ICharacterData,
    getCharacterById,
} from "../../api/characterApi/characterApi";

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

    const { t } = useTranslation();

    const keysObj: SingleCharacterKeys = t("singleCharacterPage", {
        returnObjects: true,
    });

    const keysEntries: SingleCharacterEntries = Object.entries(
        keysObj
    ) as SingleCharacterEntries;

    const renerTableRows = (character: ICharacterData) => {
        return (
            <>
                {keysEntries.map(([key, text]) => {
                    if (key === "buttonLabel" || key === "objLinkTitle") return;
                    return (
                        <TableRow
                            key={character.id}
                            className={key === "name" ? "name" : ""}
                        >
                            <TableCell component="th" scope="row">
                                {text}:
                            </TableCell>
                            <TableCell align="right">
                                {key === "location" ? (
                                    character[key].name
                                ) : key === "status" ? (
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

    const CharacterCardView = ({
        character,
    }: {
        character: ICharacterData;
    }) => {
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
                            {renerTableRows(character)}
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {keysObj.objLinkTitle}:
                                </TableCell>
                                <TableCell align="right">
                                    <NavLink to={character.url}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                        >
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

    return (
        <>
            {!characterData ? (
                <CircularProgress />
            ) : (
                <CharacterCardView character={characterData} />
            )}
        </>
    );
};

export default SingleCharcterPage;
