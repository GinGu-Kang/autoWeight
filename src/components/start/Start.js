import React, { Component } from 'react';
import Header from "../header/header"
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
const menuButton ={
  width: {xs:"300px",md:"600px"},
  height: {xs:"60px",md:"80px"},
  borderRadius: "500px",
  fontSize:{xs:"16px",md:"25px"},
  border: "1px solid",
  boxShadow: "10px 10px 10px grey",
  "&:hover": {border: "1px solid"}
}

class Start extends Component {
  render() {
    function Nav(){
      return (

          <Grid height="80vh" 
          container  
          direction="column"
          justifyContent="space-evenly"
          alignItems="center">
            <Button sx={menuButton} href='/plan' color='info' variant="outlined">생산 계획<EditNoteIcon sx={{pl:5, fontSize:{xs:"25px",md:"35px"}}}></EditNoteIcon></Button>
            <Button sx={menuButton} color='info' variant="outlined">작업 이력<PsychologyIcon  sx={{pl:5, fontSize:{xs:"25px",md:"35px"}}}></PsychologyIcon></Button>
            <Button sx={menuButton} color='info' variant="outlined">환경 설정<SettingsIcon  sx={{pl:5, fontSize:{xs:"25px",md:"35px"}}}></SettingsIcon></Button>
          </Grid>
      )
    }
    return (
      <Container maxWidth={false} sx={{ padding: 0 }} disableGutters={true} >
        <Header></Header>
        <Grid container>
          <Grid item xs="12">
            <Nav></Nav>
          </Grid>
        </Grid>
      </Container>
    );
  }
}



export default Start;