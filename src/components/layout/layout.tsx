import { useState } from "react";
import { Outlet } from "react-router-dom";
import Grid, { GridProps } from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import FooterComponent from "../footerComponent/footerComponent";
import HeaderComponent from "../headerComponent/headerComponent";
import SideBar from "../sideBar/sideBar";
import AsideComponent from "../asideComponent/asideComponent";

interface IGridContentContainerProps extends GridProps {
    isSideBarOpen?: boolean;
    openedSideBarWidth?: number;
    closedSideBarWidth?: number;
}

const GridContentContainer = styled(Grid, {
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
})<IGridContentContainerProps>(
    ({ theme, isSideBarOpen, openedSideBarWidth, closedSideBarWidth }) => ({
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexFlow: "column",
        justifyContent: "space-between",
        flexGrow: 1,
        marginLeft: closedSideBarWidth,
        width: `calc(100% - ${closedSideBarWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(isSideBarOpen && {
            marginLeft: openedSideBarWidth,
            width: `calc(100% - ${openedSideBarWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
);

const Layout = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const openedSideBarWidth = 240;
    const closedSideBarWidth = 50;

    return (
        <Grid container sx={{ flexGrow: 1 }}>
            <SideBar
                isSideBarOpen={isSideBarOpen}
                openedSideBarWidth={openedSideBarWidth}
                closedSideBarWidth={closedSideBarWidth}
                setIsSideBarOpen={setIsSideBarOpen}
            />
            <GridContentContainer
                item
                isSideBarOpen={isSideBarOpen}
                openedSideBarWidth={openedSideBarWidth}
                closedSideBarWidth={closedSideBarWidth}
            >
                <HeaderComponent />
                <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                    <Grid
                        item
                        xs={10}
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Outlet />
                    </Grid>
                    <Grid item xs={2} sx={{ height: "100%" }}>
                        <AsideComponent />
                    </Grid>
                </Grid>
                <FooterComponent />
            </GridContentContainer>
        </Grid>
    );
};

export default Layout;
