import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, Paper, InputAdornment, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";
import { api_url } from "../constantes/index"
import CircularProgress from '@mui/material/CircularProgress';
import '../index.css'

function Profile() {
    const [carregando, setCarregando] = useState(false)
    const [description, setDescription] = useState(null)
    const [profile, setProfile] = useState("")
    const [erro, setErro] = useState("")

    async function searchProfile() {
        setCarregando(true)
        setErro("")
        setDescription(null)

        try {
            const response = await fetch(`${api_url}/${profile}`)

            if (!response.ok) {
                setErro("Perfil não encontrado 😕")
                setCarregando(false)
                return
            }

            const result = await response.json()
            setDescription(result)
        } catch (e) {
            setErro("Erro ao buscar perfil.")
        }

        setCarregando(false)
    }

    return (
    <Box
        sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            // 🔵 Fundo igual ao da imagem
            backgroundColor: "#1a1a1a",
            backgroundImage: `
                radial-gradient(circle at 85% 20%, rgba(0, 102, 255, 0.6) 0%, rgba(0,0,0,0) 40%),
                radial-gradient(circle at 10% 80%, rgba(0, 102, 255, 0.6) 0%, rgba(0,0,0,0) 45%)
            `,
            backgroundRepeat: "no-repeat",
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
                    <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
                        Perfil <span style={{ color: "#b0b0b0" }}>GitHub</span>
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Lucas Mendes"
                    variant="outlined"
                    onChange={(e) => setProfile(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    sx={{
                                        backgroundColor: "#007bff",
                                        "&:hover": { backgroundColor: "#0062cc" },
                                        color: "#fff",
                                        borderRadius: "8px",
                                    }}
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
                        height: "200px",
                        backgroundColor: "#e6e6e6",
                        borderRadius: 2,
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 2
                    }}
                >

                    {/* Carregando */}
                    {carregando && <CircularProgress />}

                    {/* Erro */}
                    {!carregando && erro && (
                        <Typography color="error" fontWeight="bold">
                            {erro}
                        </Typography>
                    )}

                    {/* Resultado */}
                    {!carregando && description && (
                        <Box display="flex" alignItems="center" width="100%">
                            <Avatar
                                src={description.avatar_url}
                                sx={{ width: 80, height: 80, mr: 2, border: "3px solid #007bff" }}
                            />

                            <Box display="flex" flexDirection="column" alignItems="flex-start">
                                <Typography variant="h6" fontWeight="bold">
                                    {description.name || description.login}
                                </Typography>

                                <Typography variant="body2" sx={{ textAlign: "left", color: "#333" }}>
                                    {description.bio || "Nenhuma bio disponível."}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                </Paper>
            </Paper>
        </Box>
    );
}

export default Profile;
