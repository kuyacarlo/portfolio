// src/lib/schema.ts
// Centralized TypeScript Schemas for kuyacarlo-portfolio data models

export interface Project {
  name: string;
  emoji: string;
  desc: string;
  tech: string[];
  url: string;
  live: string | null;
  img: string | null;
}

export interface Hackathon {
  place: string;
  name: string;
  proj: string;
  desc: string;
}

export interface HomelabService {
  name: string;
  desc: string;
  up: boolean;
}

export interface KeyValuePair {
  label: string;
  value: string;
}
