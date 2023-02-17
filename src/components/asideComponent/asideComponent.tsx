import {
    Box,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

import { useTranslation } from "react-i18next";

import SearchCharacter from "../searchCharacter/searchCharacter";

interface IAccordionData {
    id: string;
    title: string;
    details?: string;
}

let StyledBox = styled(Box)`
    height: 100%;
    padding: 15px;
    background-color: red;

    .css-ffjoah-MuiGrid-root {
        flex-grow: 1;
        align-content: bottom;

        & > *:not(:first-of-type) {
            margin-top: 10px;
        }
    }
`;
StyledBox = styled(StyledBox)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light,
}));

const AsideComponent = () => {
    const { t } = useTranslation();
    const [accordion1, accordion2]: IAccordionData[] = t("aside.accordions", {
        returnObjects: true,
    });

    return (
        <StyledBox>
            <Grid container direction={"column"} spacing={1}>
                <Grid item>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id={accordion1.id}
                        >
                            <Typography>{accordion1.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{accordion1.details}</Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id={accordion2.id}
                        >
                            <Typography>{accordion2.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SearchCharacter />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </StyledBox>
    );
};

export default AsideComponent;
