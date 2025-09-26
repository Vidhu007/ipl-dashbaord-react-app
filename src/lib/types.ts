export interface Team {
  name: string;
  shortName: string;
  logo: string;
}

export interface LiveMatch {
  id: number;
  status: 'live' | 'upcoming' | 'completed';
  venue: string;
  matchType: string;
  teamA: Team;
  teamB: Team;
  scoreA?: { runs: number; wickets: number; overs: number };
  scoreB?: { runs: number; wickets: number; overs: number };
  startTime: string;
  commentary: string;
}

export interface TeamStanding {
  position: number;
  team: Team;
  played: number;
  won: number;
  lost: number;
  points: number;
  nrr: string;
}

export interface ScheduledMatch {
  id: number;
  matchNumber: number;
  teamA: Team;
  teamB: Team;
  venue: string;
  date: string;
  time: string;
}

export type Tab = 'live' | 'points' | 'schedule';
