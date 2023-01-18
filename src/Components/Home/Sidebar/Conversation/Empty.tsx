import { Box, Typography } from "@mui/material";
import Rive from "@rive-app/react-canvas";

//Styles
const styles = {
    Container: {
        width: "160px",
        height: "160px",
        mx: "auto"
    },
    Text: {
        textAlign: "center",
        fontSize: "18px",
        opacity: 0.4
    }
}

const Empty = () => {
    return (
        <Box sx={styles.Container}>
            <Box sx={{ pt: "2rem" }} />
            <Rive src="https://res.cloudinary.com/dub0dpenl/raw/upload/v1672939526/Pie%20chat/rive/581-1114-empty_eub1gm.riv" />
            <Typography variant="body1" component="p" sx={styles.Text}>
                No Conversations!
            </Typography>
        </Box>
    );
};
export default Empty;