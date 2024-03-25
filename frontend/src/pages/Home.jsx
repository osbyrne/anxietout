import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Typography, Button, Grid } from "@mui/material";

import { ServicesGrid } from "../components/ServicesGrid";

const HeroSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(8, 0),
  textAlign: "center",
}));

const redirectToURL = () => {
  window.location.href = "/about";
};

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/background.webp')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom>
            Findit Hospital Logistics
          </Typography>
          <Typography variant="body1" gutterBottom>
            Accelerating hospital efficiency through smart logistics solutions.
          </Typography>
          <Button
            onClick={() => redirectToURL()}
            variant="contained"
            color="primary"
            size="large"
          >
            Learn more
          </Button>
        </Container>
      </HeroSection>
      <section>
        <Container maxWidth="lg" style={{ padding: "80px 0" }}>
          <Grid container spacing={4} justifyContent="center">
            <ServicesGrid />
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export { Home };
