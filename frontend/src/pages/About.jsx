import React from "react";
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";

const About = () => {
  const styles = `
  .card{

  }
  
  `;

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
      <div>
        <style>{styles}</style>
        <Card className="card" sx={{ backgroundColor: "white" }}>
          <Container maxWidth="sm">
            <Typography variant="h2" gutterBottom>
              Who Built This Page?
            </Typography>
            <Typography variant="body1" paragraph>
              <a href="https://bento.me/osbyrne">Osbyrne</a>
              <br />
              Augustin
              <br />
              <a href="https://open.spotify.com/artist/3TE5es7xrFu5OljNnZOHkw?si=kwpECrQjSsS3bq05sNKl2g">
                Izzeic
              </a>
              <br />
            </Typography>

            <Typography variant="h2" gutterBottom>
              Why Did We Start Findit?
            </Typography>
            <Typography variant="body1" paragraph>
              We started Findit because we wanted to make a difference in the
              world. Aslo, the template was directly useful to our project in
              multiple classes including Web Development, Software Engineering,
              and Database Management. Find'it also shines a light on the real
              needs of real people, such as hospital workers; many as they would
              stand to benefit from the advances of computers and networks, if
              we didn't spend all of our time building Javascript frameworks.
            </Typography>

            <Typography variant="h2" gutterBottom>
              How to Use This Website?
            </Typography>
            <Typography variant="body1" paragraph>
              <ol>
                <li>Don't; it's in Beta - and will break when you need it</li>
                <li>
                  If you must, you can use the navbar to navigate to the Users
                  page
                </li>
                <li>
                  From there, you can add a user, update a user, delete a user
                  and possibly modify a User
                </li>
              </ol>
            </Typography>
          </Container>
        </Card>
      </div>
    </div>
  );
};

export { About };
