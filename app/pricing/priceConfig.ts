export enum PricingPlans {
  HOBBY = "Hobby",
  PRO = "Pro",
  ENTERPRISE = "Enterprise",
}

export interface IPricingPlanDetails {
  name: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
  secondaryCta?: string;
  popular?: boolean;
}

export const PricingPlansDetails: Record<PricingPlans, IPricingPlanDetails> = {
  [PricingPlans.HOBBY]: {
    name: "Hobby",
    description: "Everything you need to kickstart your web project.",
    price: "Free",
    features: [
      "Import your repo, deploy in seconds",
      "Automatic CI/CD",
      "Serverless Compute",
      "Traffic & performance insights",
      "DDoS Mitigation",
      "Web Application Firewall",
      "Community Support",
    ],
    cta: "Start Deploying",
  },
  [PricingPlans.PRO]: {
    name: "Pro",
    description: "Collaborate with a team for growing projects.",
    price: "$20 /month, per member",
    features: [
      "Everything in Hobby, plus:",
      "Secure team collaboration",
      "Frontend Observability tools",
      "Advanced Protection",
      "Scales with you",
      "Spend management",
      "Email support",
    ],
    cta: "Upgrade now",
    popular: true,
  },
  [PricingPlans.ENTERPRISE]: {
    name: "Enterprise",
    description: "Critical security, performance, observability and support.",
    price: "Custom pricing",
    features: [
      "Everything in Pro, plus:",
      "Guest & Team access controls",
      "SCIM & Directory Sync",
      "Managed WAF Rulesets",
      "Multi-region compute & failover",
      "99.99% SLA",
      "Advanced Support",
    ],
    cta: "Contact Sales",
    secondaryCta: "Request Trial",
  },
};

export interface IPricingBenefit {
  metric: string;
  description: string;
  company: string;
}

export const PricingBenefits: IPricingBenefit[] = [
  {
    metric: "20 days saved",
    description: "on daily builds.",
    company: "NETFLIX",
  },
  {
    metric: "98% faster time",
    description: "to market.",
    company: "Tripadvisor",
  },
  {
    metric: "300% increase",
    description: "in SEO.",
    company: "box",
  },
  {
    metric: "6× faster to",
    description: "build + deploy.",
    company: "ebay",
  },
];
