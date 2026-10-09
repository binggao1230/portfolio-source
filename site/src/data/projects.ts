import { getCollection, type CollectionEntry } from 'astro:content';

/** A project entry as authored in `src/content/projects/`. */
export type Project = CollectionEntry<'projects'>;

/** Hidden projects stay in the repository but are never built, listed, or submitted. */
export const isPublished = (project: Project): boolean => !project.data.hidden;

/**
 * Every surface that lists projects (routes, home page, topic hubs, sitemap,
 * RSS, llms.txt, related links) reads through this so `hidden: true` removes a
 * project everywhere at once.
 */
export const getPublishedProjects = async (): Promise<Project[]> =>
  (await getCollection('projects')).filter(isPublished);
