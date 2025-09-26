import { LiveMatch, TeamStanding, ScheduledMatch } from './types';

interface AppData {
  liveMatch: LiveMatch;
  upcomingMatch: LiveMatch;
  pointsTable: TeamStanding[];
  schedule: ScheduledMatch[];
}

export const dummyData: AppData = {
  liveMatch: {
    id: 1,
    status: 'live' as const,
    venue: "Wankhede Stadium, Mumbai",
    matchType: "Match 45, IPL 2025",
    teamA: { name: "Mumbai Indians", shortName: "MI", logo: "https://placehold.co/50x50/004B8D/FFFFFF?text=MI" },
    teamB: { name: "Chennai Super Kings", shortName: "CSK", logo: "https://placehold.co/50x50/FDB913/000000?text=CSK" },
    scoreA: { runs: 185, wickets: 4, overs: 18.2 },
    scoreB: { runs: 190, wickets: 5, overs: 20 },
    startTime: "2025-09-25T19:30:00Z",
    commentary: "Mumbai Indians need 6 runs in 10 balls. What a thriller!",
  },
  upcomingMatch: {
    id: 2,
    status: 'upcoming' as const,
    venue: "M. Chinnaswamy Stadium, Bengaluru",
    matchType: "Match 46, IPL 2025",
    teamA: { name: "Royal Challengers Bengaluru", shortName: "RCB", logo: "https://placehold.co/50x50/EC1C24/000000?text=RCB" },
    teamB: { name: "Kolkata Knight Riders", shortName: "KKR", logo: "https://placehold.co/50x50/3A225D/FFFFFF?text=KKR" },
    startTime: "2025-09-26T19:30:00Z",
    commentary: "The Knight Riders take on RCB in a high-stakes clash tomorrow.",
  },
  pointsTable: [
    { position: 1, team: { name: "Rajasthan Royals", shortName: "RR", logo: "https://placehold.co/40x40/004D98/FFFFFF?text=RR" }, played: 12, won: 9, lost: 3, points: 18, nrr: "+0.562" },
    { position: 2, team: { name: "Kolkata Knight Riders", shortName: "KKR", logo: "https://placehold.co/40x40/3A225D/FFFFFF?text=KKR" }, played: 11, won: 8, lost: 3, points: 16, nrr: "+1.453" },
    { position: 3, team: { name: "Chennai Super Kings", shortName: "CSK", logo: "https://placehold.co/40x40/FDB913/000000?text=CSK" }, played: 12, won: 7, lost: 5, points: 14, nrr: "+0.710" },
    { position: 4, team: { name: "Sunrisers Hyderabad", shortName: "SRH", logo: "https://placehold.co/40x40/F26522/FFFFFF?text=SRH" }, played: 12, won: 7, lost: 5, points: 14, nrr: "+0.406" },
    { position: 5, team: { name: "Delhi Capitals", shortName: "DC", logo: "https://placehold.co/40x40/004C93/FFFFFF?text=DC" }, played: 12, won: 6, lost: 6, points: 12, nrr: "-0.154" },
    { position: 6, team: { name: "Lucknow Super Giants", shortName: "LSG", logo: "https://placehold.co/40x40/005999/FFFFFF?text=LSG" }, played: 12, won: 6, lost: 6, points: 12, nrr: "-0.789" },
    { position: 7, team: { name: "Mumbai Indians", shortName: "MI", logo: "https://placehold.co/40x40/004B8D/FFFFFF?text=MI" }, played: 12, won: 5, lost: 7, points: 10, nrr: "-0.212" },
    { position: 8, team: { name: "Royal Challengers Bengaluru", shortName: "RCB", logo: "https://placehold.co/40x40/EC1C24/000000?text=RCB" }, played: 12, won: 4, lost: 8, points: 8, nrr: "-0.345" },
    { position: 9, team: { name: "Punjab Kings", shortName: "PBKS", logo: "https://placehold.co/40x40/D71920/FFFFFF?text=PBKS" }, played: 11, won: 4, lost: 7, points: 8, nrr: "-0.423" },
    { position: 10, team: { name: "Gujarat Titans", shortName: "GT", logo: "https://placehold.co/40x40/1B2133/FFFFFF?text=GT" }, played: 12, won: 3, lost: 9, points: 6, nrr: "-1.112" },
  ],
  schedule: [
    { id: 1, matchNumber: 47, teamA: { name: "Sunrisers Hyderabad", shortName: "SRH", logo: "https://placehold.co/40x40/F26522/FFFFFF?text=SRH" }, teamB: { name: "Rajasthan Royals", shortName: "RR", logo: "https://placehold.co/40x40/004D98/FFFFFF?text=RR" }, venue: "Hyderabad", date: "Sep 27, 2025", time: "7:30 PM" },
    { id: 2, matchNumber: 48, teamA: { name: "Mumbai Indians", shortName: "MI", logo: "https://placehold.co/40x40/004B8D/FFFFFF?text=MI" }, teamB: { name: "Delhi Capitals", shortName: "DC", logo: "https://placehold.co/40x40/004C93/FFFFFF?text=DC" }, venue: "Mumbai", date: "Sep 28, 2025", time: "3:30 PM" },
    { id: 3, matchNumber: 49, teamA: { name: "Punjab Kings", shortName: "PBKS", logo: "https://placehold.co/40x40/D71920/FFFFFF?text=PBKS" }, teamB: { name: "Gujarat Titans", shortName: "GT", logo: "https://placehold.co/40x40/1B2133/FFFFFF?text=GT" }, venue: "Mohali", date: "Sep 28, 2025", time: "7:30 PM" },
    { id: 4, matchNumber: 50, teamA: { name: "Lucknow Super Giants", shortName: "LSG", logo: "https://placehold.co/40x40/005999/FFFFFF?text=LSG" }, teamB: { name: "Chennai Super Kings", shortName: "CSK", logo: "https://placehold.co/40x40/FDB913/000000?text=CSK" }, venue: "Lucknow", date: "Sep 29, 2025", time: "7:30 PM" },
  ],
};
