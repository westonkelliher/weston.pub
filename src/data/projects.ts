export type ProjectCategory = 'games' | 'platform';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  githubUrl: string;
  /** One line for the homepage list */
  summary: string;
}

export const projects: Project[] = [
  {
    slug: 'q',
    title: 'Q',
    category: 'games',
    githubUrl: 'https://github.com/westonkelliher/Q',
    summary:
      'Procedural world RPG in Rust: infinite deterministic 2D worlds with biomes, crafting, combat, and a web frontend MVP.',
  },
  {
    slug: 'archers',
    title: 'Archers',
    category: 'games',
    githubUrl: 'https://github.com/westonkelliher/Archers',
    summary:
      'Local multiplayer top-down archery in Godot for the GameNite console, with phone-based controllers.',
  },
  {
    slug: 'rqn',
    title: 'rqn',
    category: 'platform',
    githubUrl: 'https://github.com/westonkelliher/rqn',
    summary:
      'Linux console stack (Requin): game loader, control pad server, OTA updates, and related tooling.',
  },
  {
    slug: 'antlers',
    title: 'Antlers',
    category: 'platform',
    githubUrl: 'https://github.com/westonkelliher/Antlers',
    summary: 'Procedural antlers via L-systems in WebGL.',
  },
  {
    slug: 'weston-pub',
    title: 'weston.pub',
    category: 'platform',
    githubUrl: 'https://github.com/westonkelliher/weston.pub',
    summary: 'This site — Astro on Cloudflare Workers.',
  },
];

export function projectsInCategory(cat: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === cat);
}
