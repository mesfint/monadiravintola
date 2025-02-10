export interface Review {
    id: string;
    author: string;
    text: string;
    ratings: {
      food: number;
      service: number;
      atmosphere?: number;
    };
    date: string;
    source: string;
  }