import React from "react";
import blank_profile from "./icons/blank-profile-picture-female.png";
import Skill from "./Skill";
import { Card, List } from "./styles/elements";

type WilderProps = {
  city: string
  justAdded: boolean
  name:string
  skills: any[]
}

function Wilder({ city, justAdded, name, skills }:WilderProps) {
  return (
    <Card newCard={justAdded}>
      <img src={blank_profile} alt={`${name} Profile`} />
      <h3>{name}</h3>
      <h4>City</h4>
      <p>{city}</p>
      <h4>Wild Skills</h4>
      <List>
        {skills.map((skill) => (
          <Skill key={skill._id} {...skill} />
        ))}
      </List>
    </Card>
  );
}

export default Wilder;
