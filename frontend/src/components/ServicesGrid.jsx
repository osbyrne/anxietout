import React from "react";
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";

const services = [
  {
    title: "Items Storage",
    description:
      "Efficient storage solutions for hospital items with our state-of-the-art facilities.",
  },
  {
    title: "Access Control",
    description:
      "Secure access control systems to manage and monitor logistics operations effectively.",
  },
  {
    title: "Smart Inventory",
    description:
      "Smart inventory management systems to optimize inventory levels and reduce costs.",
  },
  {
    title: "Hospital Logistics",
    description:
      "Hospital logistics solutions to improve efficiency and reduce costs.",
  },
];

const styles = `
card {
  
    margin: 7px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    opacity:0.75;
}
.card:hover{
  transition : all 0.3s ease;
  background-color: rgba(128, 128, 128, 0.6);
  transform:scale(1.1);
}
`;

const ServicesGrid = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "40px" }}>
      <style>{styles}</style>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card className="card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export { ServicesGrid };
