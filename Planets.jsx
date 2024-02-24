import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [next, setNext] = useState("");

  const fetchPlanets = async (url) => {
    try {
      const response = await axios.get(url);
      setPlanets(response.data.results);
      
      setNext(response.data.next);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initialUrl = "https://swapi.dev/api/planets/?format=json";
    fetchPlanets(initialUrl);
  }, []);

    const handleNext = () => {
    fetchPlanets(next);
  };

  return (
    <div className="planets">
      <h1>Star Wars Planets</h1>
      <div className="planets-grid">
        {planets.map((planet) => (
          <Card key={planet.name} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{planet.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {planet.climate}
              </Card.Subtitle>
              <Card.Text>
                Population: {planet.population}
                <br />
                Terrain: {planet.terrain}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              {planet.residents.map((resident) => (
                <ListGroupItem key={resident}>{resident}</ListGroupItem>
              ))}
            </ListGroup>
          </Card>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Planets;
