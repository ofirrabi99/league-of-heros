import { Grid } from "@chakra-ui/react";
import TeamModel from "../../pages/api/graphql/team/team.model";
import Team from "./Team";

interface Props {
  teamsList: TeamModel[];
  onEditClick: (team: TeamModel) => void;
  onAfterDeleteClick: (teams: TeamModel[]) => void;
}

export default function TeamsList({
  teamsList,
  onEditClick,
  onAfterDeleteClick,
}: Props) {
  return (
    <Grid
      templateColumns="repeat(auto-fill, 15rem)"
      gap={4}
      justifyContent="space-around"
      mx={4}
    >
      {teamsList.map((team) => (
        <Team
          key={team._id}
          team={team}
          onEditClick={onEditClick}
          onAfterDeleteClick={onAfterDeleteClick}
        />
      ))}
    </Grid>
  );
}
