export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export const posts: Post[] = [
  {
    slug: 'three-pillars',
    title: 'Requirements for AI-Driven Software Engineering',
    date: '2026-04-22',
    summary: 'What tooling is actually required to leverage AI in the pre-ASI era.',
  },
];
