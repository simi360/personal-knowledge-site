const skillGroups = [
  {
    title: "Systems & Backend",
    description:
      "Designing performant backend systems and APIs that scale with growing data and complexity.",
    skills: ["C#", "ASP.NET", "Node.js", "Python", "REST APIs", "Distributed systems", "Message queues"]
  },
  {
    title: "Frontend & Interfaces",
    description: "Building responsive, data-driven interfaces that make complex systems intuitive.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind", "UI component systems", "Data visualization"]
  },
  {
    title: "Data & Infrastructure",
    description: "Working with databases and infrastructure to support reliable applications.",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "Cloud platforms"]
  },
  {
    title: "Engineering Craft",
    description: "Practices that support building maintainable software.",
    skills: ["Testing", "System design", "Performance optimization", "Debugging complex systems", "Developer tooling"]
  }
];

export function SkillGrid() {
  return (
    <section className="space-y-8">
      <div id="capabilities" />
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">Capabilities</p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
          Technical range with product awareness
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-white/[0.06]"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{group.title}</p>
            <p className="mt-4 text-sm leading-6 text-slate-300">{group.description}</p>
            <ul className="mt-5 space-y-3">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-white/8 bg-slate-900/70 px-4 py-2 text-sm text-slate-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
