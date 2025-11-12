import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, Paper, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";
import { api_url } from "../constantes/index"
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
function Profile() {
    const [carregando, setCarregando] = useState(false)
    const [profile, setProfile] = useState('')
    async function searchProfile(){
        const response = await fetch(`${api_url}/${profile}`)
        setCarregando(true)
    }

    return (
        <Box
            sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundImage: "linear-gradient(to right, #000000cc 40%, #000000cc 50%)",
            }}
        >
            <Paper
            elevation={6}
            sx={{
                width: "600px",
                padding: 4,
                textAlign: "center",
                backgroundColor: "#000",
                borderRadius: 2,
            }}
            >
            <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
                <GitHubIcon sx={{ color: "#fff", fontSize: 40, mr: 1 }} />
                <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: "bold" }}
                >
                Perfil <span style={{ color: "#b0b0b0" }}>GitHub</span>
                </Typography>
            </Box>

            <TextField
                fullWidth
                placeholder="Lucas Mendes"
                variant="outlined"
                onChange={(e) => setValue(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        sx={{
                            backgroundColor: "#007bff",
                            "&:hover": { backgroundColor: "#0062cc" },
                            color: "#fff",
                            borderRadius: "8px",
                        }
                    }
                    onClick={searchProfile}
                        >
                        <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                    ),
                    sx: {
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    },
                }}
            />

            {/* Caixa de resultado */}
            <Paper
                elevation={0}
                sx={{
                mt: 4,
                height: "180px",
                backgroundColor: "#e6e6e6",
                borderRadius: 2,
                }}
                
            />
            {/* <CircularProgress /> */}
                {/* <LinearProgress /> */}
            </Paper>
        </Box>
    );
}

export default Profile