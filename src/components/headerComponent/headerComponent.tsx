import { useState } from "react";

import {
    Typography,
    Toolbar,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";

import { useTranslation } from "react-i18next";
import WorkerComponent from "../workerComponent/workerComponent";

const CustomToolBar = styled(Toolbar)`
    display: flex;
    justify-content: space-between;

    button {
        background-color: ${({ theme }) => theme.palette.success.light};
        color: ${({ theme }) => theme.palette.common.white};

        &[aria-pressed="true"] {
            background-color: ${({ theme }) => theme.palette.common.white};
        }
    }
`;

const HeaderComponent = () => {
    const [language, setLanguage] = useState<"en" | "de">("en");

    const { t, i18n } = useTranslation();

    const handleLanguageChange = (
        event: React.MouseEvent<HTMLElement>,
        newLanguage: "en" | "de"
    ) => {
        if (!newLanguage) return;
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <AppBar color="primary" position="sticky">
            <CustomToolBar>
                <Typography variant="h5" component="div">
                    {t("header.label")}
                </Typography>
                <WorkerComponent />
                <ToggleButtonGroup
                    value={language}
                    exclusive
                    onChange={handleLanguageChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="en">En</ToggleButton>
                    <ToggleButton value="de">De</ToggleButton>
                </ToggleButtonGroup>
            </CustomToolBar>
        </AppBar>
    );
};

export default HeaderComponent;
