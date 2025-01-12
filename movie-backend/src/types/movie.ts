export interface Movie {
    id: number;
    title: string;
    description: string;
    image: string;
    releaseYear: number;
    type: 'action' | 'comedy' | 'drama' | 'horror' | 'sci-fi';
  }
  