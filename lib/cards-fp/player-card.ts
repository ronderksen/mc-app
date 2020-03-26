import {Resources} from "../constants";

export type PlayerCardProps = {
  cost: number
  resourceCount: number
  resourceType: Resources
}

export interface PlayerCard {
  owner?: any,
  cost: number,
  resourceCount: number,
  resourceType: Resources
}

export function playerCard({ cost, resourceCount, resourceType}: PlayerCardProps): PlayerCard {
  return ({
    cost,
    resourceCount,
    resourceType
  });
}

