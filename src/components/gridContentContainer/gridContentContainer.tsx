import Grid, { GridProps } from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

interface ICustomGridContainerProps extends GridProps {
    isSideBarOpen?: boolean;
    openedSideBarWidth?: number;
    closedSideBarWidth?: number;
}

let CustomGridContainer = styled(Grid, {
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
})<ICustomGridContainerProps>(
    ({ theme, isSideBarOpen, openedSideBarWidth, closedSideBarWidth }) => ({
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

CustomGridContainer = styled(CustomGridContainer)`
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    flex-grow: 1;

    & > .MuiGrid-container {
        flex-grow: 1;

        .outlet_container {
            flexgrow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px;
        }

        .aside_container {
            height: 100%;
        }
    }
`;

const GridContentContainer = (props: ICustomGridContainerProps) => {
    return <CustomGridContainer {...props} />;
};

export default GridContentContainer;
