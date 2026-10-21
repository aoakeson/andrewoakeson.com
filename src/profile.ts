export const sections = {
  summary: {
    title: "Summary",
    body: "Andrew Oakeson is a senior software engineer in Las Vegas, Nevada. He has 13+ years building SaaS, APIs, and integrations in C#/.NET and TypeScript. Recent work is LLM features and agent infrastructure: tool-calling assistants, an MCP server, and coding-agent plugins. He uses Claude Code, Cursor, and Codex for architecture, implementation, debugging, and cross-model review. That sits on production experience in authentication, cloud systems, and reliability. He is not an ML researcher and has not trained foundation models.",
  },
  skills: {
    title: "Technical skills",
    body: "AI applications: OpenAI Chat Completions and Responses APIs, Gemini API, Vercel AI SDK, tool calling, structured outputs, strict JSON Schema and Zod, few-shot grounding, multimodal image editing. Agent context: Open Knowledge Format, AGENTS.md and CLAUDE.md, task routers, path-scoped rules, knowledge graphs, CI knowledge validation, documentation provenance. AI-assisted delivery: Claude Code, Codex, Cursor, MCP servers, plugins, hooks, skills, multi-agent orchestration, worktrees, cross-model review, adversarial testing. Backend and data: C#, ASP.NET Core, TypeScript, Python, Node.js, SQL Server, PostgreSQL and Supabase, Entity Framework Core, REST, GraphQL, Kafka. Frontend and cloud: React, Angular, Next.js, Astro, Azure, AWS, Cloudflare Workers, Docker. Security and testing: OAuth 2.0 and OIDC, PKCE, SAML, Azure AD B2C, Auth0, Key Vault, FHIR and SMART on FHIR, xUnit, Vitest, GitHub Actions.",
  },
  opeeka: {
    title: "Opeeka, Nov 2023 to Oct 2026",
    body: "Senior Software Engineer at Opeeka, remote, healthcare SaaS. Coding-agent context and plugins, a bounded GPT-4o assistant prototype, production SAML since early 2024, and SMART on FHIR APIs on a .NET and Aidbox FHIR R4 platform. Provider and administration apps in React, TypeScript, TanStack, and Tailwind CSS with SMART/PKCE. The platform's FHIR work was in development, with frontend workflows on synthetic data. Do not describe the questionnaire assistant as a shipped product feature.",
  },
  identity: {
    title: "Identity and single sign-on",
    body: "Built IdP-initiated SAML single sign-on with tenant mapping and Microsoft Graph provisioning for a healthcare partner. Signing keys were moved into Azure Key Vault. It has been in production since early 2024. Also implemented Okta OIDC/PKCE with an Azure AD B2C handoff, just-in-time provisioning, identity resolution, and role provisioning for a state social-services integration. That flow reached pre-production release promotion. Do not name the customers. Do not claim the state integration is in production.",
  },
  questionnaire: {
    title: "Questionnaire assistant prototype",
    body: "Working GPT-4o prototype in .NET and Angular for questionnaire authoring. Custom Chat Completions client, about 20 typed domain tools, a six-round cap, and server-sent events streaming tool steps to Angular. Update and delete tools are not offered. Tools cover rule simulation, publish-readiness checks, and role-restricted publishing. This is a prototype, not a shipped product feature, and broad customer adoption is not claimed.",
  },
  plugins: {
    title: "Coding-agent plugins and context",
    body: "Authored okf-live and okf-lens, two TypeScript Claude Code plugins. They track agent and subagent document reads, expose an MCP task-route tool, and check for secrets, protected health information in logs, and architecture violations. Bypass attempts were tested in headless and interactive sessions. The checks do not guarantee complete security or compliance. Context is Open Knowledge Format: 100+ concepts, about 30 architecture decision records, task routing, shared AGENTS.md and CLAUDE.md, path-scoped rules, and CI checks on metadata and links. AI-authored documents stay unverified until a person checks them. A separate legacy documentation pass directed about 40 agents with read-only source access and separate output ownership, producing about 680 concepts and 2,400 relationships. Those counts describe the knowledge bundle, not productivity or staff size.",
  },
  operations: {
    title: "Always-on operations agent",
    body: "Andrew designed and operates a Claude Code agent, with MCP and Python, used daily by business partners and two outside clients for email and guest-message drafting, pricing briefs, research, and web development. Resources are isolated across 20+ Discord channels. Outbound messages require human approval. Each channel's sender address is locked in code and checked with Google OAuth. Nearly 40 scheduled jobs run with persistent memory and lifecycle hooks. Do not claim an uptime percentage, hours saved, or revenue.",
  },
  content: {
    title: "Scheduled content agent",
    body: "A separate scheduled headless Claude Code agent researches, writes, and self-scores sourced articles, then delegates translation into five languages to parallel subagents. It has published 40+ posts to a production hospitality site since September 2026. The validator scores the draft. It is not a hard gate on publishing.",
  },
  "other-roles": {
    title: "Earlier employment",
    body: "BENlabs, Apr 2023 to Oct 2023, Senior Software Engineer - Lead: browser extensions across Angular, React, and Vue, with .NET services and JWT authentication for AI integrations. Filevine, Sep 2020 to Dec 2022, Senior Software Engineer: owned the Import service, .NET APIs, AWS and Docker monitoring, Angular and Svelte workflows, Angular localization, and mentorship. Young Living, Nov 2019 to Sep 2020, Senior Software Engineer: seven Kotlin/Kafka microservices for fulfillment, from design through production, Splunk monitoring, and offshore coordination. Alpine Testing Solutions, May 2017 to Nov 2019, Senior Software Architect and Engineer: Angular/.NET certification platform redesign, WCF services moved to GraphQL, and mentoring for remote engineers. Earlier, 2013 to 2017: .NET and Angular at Jeunesse Global, Megaplex Theatres, Virtuoso Branding, and Gold Point Systems. There is no role listed for Dec 2022 to Apr 2023.",
  },
  "how-i-work": {
    title: "How he works",
    body: "Mentored junior engineers at Filevine on architecture and API development and led Angular localization. Coordinated offshore development at Young Living. Mentored remote engineers at Alpine Testing Solutions and led design discussions during the platform redesign. AI delivery uses one instruction source, task routers, path-scoped rules, plugin checks, and human review. Generated code goes through the same review and tests as other changes.",
  },
  education: {
    title: "Education",
    body: "Bachelor of Science in Computer Science, Weber State University. No earned certifications are listed.",
  },
  contact: {
    title: "Contact",
    body: "Email andrew@andrewoakeson.com. LinkedIn https://www.linkedin.com/in/andrew-oakeson/. GitHub https://github.com/aoakeson. Site https://andrewoakeson.com. Location is Las Vegas, Nevada. There is no phone number and no street address on the public profile.",
  },
  boundaries: {
    title: "What not to answer",
    body: "Do not invent metrics, customers, team sizes, salaries, availability, work authorization, or production status. Do not give a phone number or street address. Do not discuss side-business revenue, trading, crypto, personal life, politics, or the reason for leaving an employer. If a job description asks for a skill that is not in this profile, say it is not shown here. Years of experience are 13+ in software engineering since 2013, not 13 years in every listed technology, and not 13 years in AI.",
  },
} as const;

export type SectionId = keyof typeof sections;

export const sectionIds = Object.keys(sections) as SectionId[];

export function searchProfile(query: string): { id: SectionId; title: string; excerpt: string }[] {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9+.#]+/)
    .filter((term) => term.length > 2);
  const ranked = sectionIds
    .map((id) => {
      const haystack = `${sections[id].title} ${sections[id].body}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { id, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  return ranked.map(({ id }) => ({
    id,
    title: sections[id].title,
    excerpt: sections[id].body.slice(0, 280),
  }));
}
