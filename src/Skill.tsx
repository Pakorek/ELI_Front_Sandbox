import React from "react";
import { Badge } from "./styles/elements";

type SkillProps = {
  title: string
  votes: number
}

function Skill({ title, votes }: SkillProps) {
  return (
    <li>
      {title}
      <Badge votes={votes}>{votes}</Badge>
    </li>
  );
}

export default Skill;
