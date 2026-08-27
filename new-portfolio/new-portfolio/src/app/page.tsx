import { SiteNav } from '@/components/site-nav';
import { GitHubIcon, LinkedInIcon } from '@/components/icons';
import { experience, interests, links, profile } from '@/content/site';

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-4 mb-32 mt-10 flex max-w-5xl flex-col md:mx-auto md:mt-24 md:flex-row lg:mt-32">
      <SiteNav />

      <main className="mt-10 min-w-0 flex-auto md:mt-0">
        <h1 className="mb-14 hidden text-sm uppercase tracking-[0.14em] text-fg md:block">
          Azande Porter
        </h1>

        <div className="md:w-10/12">
          {/* About */}
          <section id="about" aria-labelledby="about-heading">
            <h2 id="about-heading" className="sr-only">
              About
            </h2>
            <div className="prose-ap">
              <p>
                I&rsquo;m a <span className="text-fg">Site Reliability Engineer II</span> at{' '}
                <span className="text-fg">LexisNexis Risk Solutions</span> in {profile.location}.
              </p>
              <p>
                I build and run cloud infrastructure across several production platforms. That
                means defining Azure environments in Terraform, running services on AKS, and
                delivering them with Helm, Argo CD, and GitHub Actions. The platforms share a
                common foundation, but each has its own applications, topology, and failure modes.
                My job is to keep production stable and make deploys routine, so teams can ship
                without wondering what will break.
              </p>
              <p>
                Outside of work I build{' '}
                <a href={links.distinctful} target="_blank" rel="noopener noreferrer">
                  Distinctful
                </a>
                , my software product, and I write{' '}
                <a href={links.founderFrames} target="_blank" rel="noopener noreferrer">
                  Founder Frames
                </a>
                , a newsletter about the founders behind companies I find interesting.
                Entrepreneurship fascinates me: how an idea becomes a product, and how a product
                becomes a business.
              </p>
              <p>
                Before LexisNexis I interned at <span className="text-fg">SAS</span>, where I
                worked on the CI/CD and release tooling behind SAS Viya, and at{' '}
                <span className="text-fg">TIAA</span>, where I built an internal system for
                managing data center workflows.
              </p>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" aria-labelledby="experience-heading" className="mt-20">
            <h2 id="experience-heading" className="label border-b border-line pb-3">
              Experience
            </h2>

            <ol className="mt-10 space-y-12">
              {experience.map((role) => (
                <li key={`${role.company}-${role.role}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="text-[15px] text-fg">
                      {role.role}
                      {role.current && <span className="sr-only"> (current role)</span>}
                    </h3>
                    {/* The live dot sits with the dates: a status light on the
                        time column reads cleaner than a badge beside the title. */}
                    <p
                      className={`flex shrink-0 items-center gap-2 font-mono text-xs sm:text-right ${
                        role.current ? 'text-muted' : 'text-faint'
                      }`}
                    >
                      {role.current && (
                        <span aria-hidden className="relative flex h-[5px] w-[5px] shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                          <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-accent" />
                        </span>
                      )}
                      {role.period}
                    </p>
                  </div>

                  <p className="mt-1 text-sm text-muted">
                    {role.company} <span className="text-line">·</span> {role.location}
                  </p>

                  <ul className="prose-ap mt-4 space-y-2 text-[16px]">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent/60" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          {/* Interests */}
          <section id="interests" aria-labelledby="interests-heading" className="mt-20">
            <h2 id="interests-heading" className="label border-b border-line pb-3">
              Interests
            </h2>

            <dl className="mt-8 space-y-4">
              {interests.map((row) => (
                <div key={row.group} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                  <dt className="w-36 shrink-0 text-sm text-faint">{row.group}</dt>
                  <dd className="text-sm text-muted">{row.items}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Contact */}
          <section id="contact" aria-labelledby="contact-heading" className="mt-20">
            <h2 id="contact-heading" className="label border-b border-line pb-3">
              Contact
            </h2>

            <ul className="mt-8 flex items-center gap-5">
              <li>
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-muted transition-colors hover:text-accent"
                >
                  <LinkedInIcon className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-muted transition-colors hover:text-accent"
                >
                  <GitHubIcon className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </li>
            </ul>
          </section>

          <footer className="mt-24 border-t border-line pt-6 text-xs text-faint">
            © {year} Azande Porter
          </footer>
        </div>
      </main>
    </div>
  );
}
