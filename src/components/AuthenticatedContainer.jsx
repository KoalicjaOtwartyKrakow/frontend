import React from "react";
import { Container, Jumbotron } from 'reactstrap';

const AuthenticatedContainer = ({ children }) => {
  return (
      <>
          <Jumbotron>
              <Container>
                  <h1 className="display-3">#KoalicjaOtwartyKraków</h1>
                  <p className="lead">Mieszkańcy Krakowa na pomoc Ukrainie</p>
              </Container>
          </Jumbotron>
          <Container>
              { children }
          </Container>
      </>
  );
};

export default AuthenticatedContainer;