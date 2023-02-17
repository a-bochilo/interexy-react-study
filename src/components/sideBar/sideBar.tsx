import * as React from "react";
import { NavLink } from "react-router-dom";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiList from "@mui/material/List";
import {
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";

import { useTranslation } from "react-i18next";

interface IDrawerProps extends DrawerProps {
    openedSideBarWidth: number;
    closedSideBarWidth: number;
}

interface ILinks {
    label: string;
    url: string;
}

const openedMixin = (theme: Theme, sideBarWidth: number): CSSObject => ({
    width: sideBarWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme, sideBarWidth: number): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: sideBarWidth,
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => {
        switch (prop) {
            case "isSideBarOpen":
            case "openedSideBarWidth":
            case "closedSideBarWidth":
                return false;
            default:
                return true;
        }
    },
})<IDrawerProps>(({ theme, open, openedSideBarWidth, closedSideBarWidth }) => ({
    color: "white",
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme, openedSideBarWidth),
        "& .MuiDrawer-paper": openedMixin(theme, openedSideBarWidth),
    }),
    ...(!open && {
        ...closedMixin(theme, closedSideBarWidth),
        "& .MuiDrawer-paper": closedMixin(theme, closedSideBarWidth),
    }),
}));
const List = styled(MuiList)(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.primary.light,
}));

interface ISideBarProps {
    isSideBarOpen: boolean;
    openedSideBarWidth: number;
    closedSideBarWidth: number;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({
    isSideBarOpen,
    openedSideBarWidth,
    closedSideBarWidth,
    setIsSideBarOpen,
}: ISideBarProps) => {
    const { t } = useTranslation();
    const linksArray: ILinks[] = t("navigation.links", {
        returnObjects: true,
    });

    const handleSideBarOpen = () => {
        setIsSideBarOpen(true);
    };

    const handleSideBarClose = () => {
        setIsSideBarOpen(false);
    };

    const MyDrawerHeader = () => {
        return (
            <DrawerHeader>
                {isSideBarOpen ? (
                    <IconButton onClick={handleSideBarClose}>
                        <ChevronLeftIcon htmlColor="white" />
                    </IconButton>
                ) : (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleSideBarOpen}
                        edge="start"
                    >
                        <MenuIcon htmlColor="white" />
                    </IconButton>
                )}
            </DrawerHeader>
        );
    };

    const MyLinksList = () => {
        return (
            <List>
                {linksArray.map(({ label, url }) => (
                    <ListItem
                        key={label}
                        disablePadding
                        sx={{ display: isSideBarOpen ? "block" : "none" }}
                    >
                        <NavLink to={url}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                }}
                            >
                                <ListItemText
                                    primary={label}
                                    primaryTypographyProps={{
                                        color: "white",
                                        fontSize: "17px",
                                        fontWeight: 700,
                                    }}
                                />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <Drawer
            variant="permanent"
            open={isSideBarOpen}
            openedSideBarWidth={openedSideBarWidth}
            closedSideBarWidth={closedSideBarWidth}
        >
            <MyDrawerHeader />
            <MyLinksList />
        </Drawer>
    );
};

export default SideBar;
