/**
 * Single source of truth for every piece of copy rendered on the site.
 * Keeping it here means updating a role or a link never requires touching layout code.
 */

export const profile = {
  name: "Azande Porter",
  role: "Site Reliability Engineer II",
  company: "LexisNexis Risk Solutions",
  location: "Atlanta, GA",
} as const;

export const links = {
  linkedin: "https://linkedin.com/in/azandeporter",
  github: "https://github.com/azandeporter",
  distinctful: "https://distinctful.com",
  founderFrames: "https://www.founderframes.co/",
} as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "LexisNexis Risk Solutions",
    role: "Site Reliability Engineer II",
    period: "June 2026 – Present",
    location: "Atlanta, GA",
    current: true,
    points: [
      "Operate three production platforms on Azure Kubernetes Service, including the payment processing platform behind its payment APIs and services. Each carries its own applications, namespaces, node pools, and environment topology on a shared platform foundation.",
      "Manage infrastructure as code in Terraform and ship workloads with Helm, Argo CD, and GitHub Actions, keeping environments reproducible and drift-free rather than hand-tuned.",
      "Run ingress through Azure Application Gateway and Envoy Gateway and service-to-service traffic through Linkerd, tuning routing and exposure for production load.",
      "Deliver secrets with External Secrets and Akeyless so credentials stay out of source control and rotate without a redeploy.",
      "Maintain observability and security coverage with Grafana, Loki, Alloy, Fluent Bit, and Wiz, so failures surface with context instead of guesswork.",
    ],
  },
  {
    company: "LexisNexis Risk Solutions",
    role: "Software Engineer I",
    period: "June 2025 – June 2026",
    location: "Atlanta, GA",
    points: [
      "Provisioned Azure infrastructure with Terraform, including cross-subscription VNet peering and network configuration supporting enterprise-scale analytics workflows.",
      "Built GitHub Actions pipeline foundations with parameterized workflows and Vault OIDC authentication for secure, repeatable deployments.",
      "Standardized reusable infrastructure and deployment patterns, cutting manual configuration and drift between environments.",
    ],
  },
  {
    company: "SAS",
    role: "DevOps Software Developer Intern",
    period: "May 2024 – August 2024",
    location: "Cary, NC",
    points: [
      "Extended a RESTful service in the CI/CD path to improve artifact promotion, supporting 1,000+ concurrent builds for SAS Viya.",
      "Automated functional and integration coverage in Python with pytest, reducing manual validation before release.",
      "Contributed to Kubernetes deployment automation for internal delivery systems, improving packaging and release efficiency by roughly 30%.",
    ],
  },
  {
    company: "TIAA",
    role: "Software Engineer Intern",
    period: "June 2023 – August 2023",
    location: "Charlotte, NC",
    points: [
      "Built features for an internal workflow management system with Python, Flask, JavaScript, and REST APIs to streamline data center operations.",
      "Integrated backend API workflows to improve reliability and performance across multi-data-center processes.",
      "Worked in a 9-person engineering team on Git-based workflows to support higher operational load.",
    ],
  },
];

export const interests: { group: string; items: string }[] = [
  { group: "Cloud", items: "Azure, AWS, Linux" },
  { group: "Infrastructure", items: "Terraform, Kubernetes, AKS, Docker" },
  { group: "Delivery", items: "Argo CD, Helm, GitHub Actions, Git" },
  { group: "Networking", items: "Envoy Gateway, Azure Application Gateway, Linkerd" },
  { group: "Secrets", items: "External Secrets, Akeyless, HashiCorp Vault" },
  { group: "Languages", items: "Python, Go, TypeScript, Bash" },
  { group: "Observability", items: "Grafana, Loki, Alloy, Fluent Bit, Wiz" },
  { group: "Design", items: "system design, user experience, architecture tradeoffs" },
];
