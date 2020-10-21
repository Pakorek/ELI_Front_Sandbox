import React from "react";
import blank_profile from "./icons/blank-profile-picture-female.png";
import Skill, { SkillProps } from "./Skill";
import { Card, List } from "./styles/elements";

export type WilderProps = {
  _id: string;
  city: string;
  justAdded: boolean;
  name: string;
  skills: SkillProps[];
};

function Wilder({ city, justAdded, name, skills }: WilderProps): JSX.Element {
  return (
    <Card newCard={justAdded}>
      <img src={blank_profile} alt={`${name} Profile`} />
      <h3>{name}</h3>
      <h4>City</h4>
      <p>{city}</p>
      <h4>Wild Skills</h4>
      <List>
        {skills.map((skill) => (
          <Skill
            // eslint-disable-next-line no-underscore-dangle
            key={skill._id}
            // eslint-disable-next-line no-underscore-dangle
            _id={skill._id}
            title={skill.title}
            votes={skill.votes}
          />
        ))}
      </List>
    </Card>
  );
}

export default Wilder;
