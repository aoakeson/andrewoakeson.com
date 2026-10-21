import experience from "./knowledge/experience.md";
import guidance from "./knowledge/guidance.md";
import positioning from "./knowledge/positioning.md";
import projects from "./knowledge/projects.md";
import skills from "./knowledge/skills.md";

function body(markdown: string) {
  return markdown.replace(/^# .+\n+/, "").trim();
}

export const sections = {
  positioning: { title: "Positioning", body: body(positioning) },
  skills: { title: "Technical skills", body: body(skills) },
  experience: { title: "Experience", body: body(experience) },
  projects: { title: "Selected AI projects", body: body(projects) },
} as const;

export type SectionId = keyof typeof sections;

export const sectionIds = Object.keys(sections) as SectionId[];

export const answerGuidance = body(guidance);

export function searchProfile(query: string): { id: SectionId; title: string }[] {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9+.#]+/)
    .filter((term) => term.length > 2);
  return sectionIds
    .map((id) => {
      const haystack = `${sections[id].title} ${sections[id].body}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.split(term).length - 1), 0);
      return { id, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ id }) => ({ id, title: sections[id].title }));
}
