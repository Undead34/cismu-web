import { Box, CssBaseline } from "@mui/material";
import styles from "../styles/Home.module.css";
import { CismuPlayer } from "../src/components";

export default function Home() {
  return (
    <>
      <CssBaseline />
      <Box className={styles.main}>
        <Box sx={{ gridArea: "page-topbar" }}>Topbar</Box>
        <Box sx={{ gridArea: "page-sidebar" }}>Sidebar</Box>
        <Box sx={{ gridArea: "page-main" }}>
          <button>Play Music</button>
        </Box>
        <Box sx={{ gridArea: "page-player" }}>
          <CismuPlayer />
        </Box>
      </Box>
    </>
  );
} 
