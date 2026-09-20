export const siteConfig = {
  name: "Dr. Pratush Kumar",
  title: "Researcher & Academic",
  description:
    "Academic portfolio showcasing research, publications, and scholarly work in computational science and technology.",
  url: "https://pratush.vercel.app",
  email: "pratush@example.com",
  social: {
    github: "https://github.com/pratush",
    linkedin: "https://linkedin.com/in/pratush",
    twitter: "https://twitter.com/pratush",
    googleScholar: "https://scholar.google.com/citations?user=pratush",
    orcid: "https://orcid.org/0000-0000-0000-0000",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export const aboutData = {
  bio: `I am a researcher and academic with a passion for leveraging technology to solve complex problems. My work spans across computational science, machine learning, and data-driven approaches to understanding natural phenomena.

With years of experience in both academic research and practical application, I strive to bridge the gap between theoretical foundations and real-world implementations. My research has been published in leading journals and conferences, contributing to advances in the field.

I am particularly interested in interdisciplinary approaches that combine domain expertise with cutting-edge computational methods to create innovative solutions for pressing challenges.`,
  education: [
    {
      degree: "Ph.D. in Computer Science",
      institution: "Indian Institute of Technology",
      year: "2020 - 2024",
      description: "Dissertation: Advanced Machine Learning Methods for Scientific Data Analysis",
    },
    {
      degree: "M.Tech in Data Science",
      institution: "National Institute of Technology",
      year: "2018 - 2020",
      description: "Specialized in statistical learning and computational methods",
    },
    {
      degree: "B.Tech in Computer Science",
      institution: "University of Technology",
      year: "2014 - 2018",
      description: "First class with distinction, Gold medalist",
    },
  ],
  skills: [
    { name: "Machine Learning", level: 95 },
    { name: "Python / PyTorch", level: 92 },
    { name: "Data Analysis", level: 90 },
    { name: "Scientific Computing", level: 88 },
    { name: "Deep Learning", level: 85 },
    { name: "Statistical Modeling", level: 87 },
    { name: "Research Methodology", level: 93 },
    { name: "Technical Writing", level: 90 },
  ],
  awards: [
    "Best Paper Award — International Conference on Machine Learning (2023)",
    "University Gold Medal — B.Tech Computer Science (2018)",
    "National Science Fellowship — Department of Science and Technology (2020-2024)",
    "Outstanding Research Contribution — IEEE Young Researcher Award (2022)",
  ],
};

export const researchData = [
  {
    id: "ml-scientific-discovery",
    title: "Machine Learning for Scientific Discovery",
    status: "Active" as const,
    period: "2022 - Present",
    description:
      "Developing novel deep learning architectures for accelerating scientific simulations and enabling data-driven discovery in physics and materials science.",
    tags: ["Deep Learning", "Scientific Computing", "Physics-Informed ML"],
    highlights: [
      "Developed a graph neural network model achieving 100x speedup over traditional simulations",
      "Published 3 papers in top-tier venues",
      "Collaborating with 5 international research groups",
    ],
  },
  {
    id: "nlp-research-mining",
    title: "NLP for Research Literature Mining",
    status: "Active" as const,
    period: "2023 - Present",
    description:
      "Building intelligent systems that automatically extract, summarize, and synthesize knowledge from vast scientific literature corpora.",
    tags: ["NLP", "Information Extraction", "Knowledge Graphs"],
    highlights: [
      "Created a literature mining pipeline processing 1M+ papers",
      "Achieved state-of-the-art results on scientific NER benchmarks",
      "Open-sourced tools adopted by 50+ research labs",
    ],
  },
  {
    id: "fair-ml",
    title: "Fairness and Interpretability in ML",
    status: "Completed" as const,
    period: "2020 - 2022",
    description:
      "Investigated methods for ensuring fairness, accountability, and transparency in machine learning systems deployed in high-stakes decision making.",
    tags: ["Fairness", "Explainable AI", "Ethics in AI"],
    highlights: [
      "Proposed a novel fairness metric adopted by 2 industry partners",
      "Published comprehensive survey with 200+ citations",
      "Organized a workshop at NeurIPS 2021",
    ],
  },
  {
    id: "time-series-forecasting",
    title: "Advanced Time Series Forecasting",
    status: "Completed" as const,
    period: "2019 - 2021",
    description:
      "Developed robust forecasting models for non-stationary and multi-variate time series data with applications in climate science and finance.",
    tags: ["Time Series", "Forecasting", "Transformers"],
    highlights: [
      "Won first place in M5 Forecasting Competition",
      "Models deployed by 3 organizations for operational forecasting",
      "Published methodology in Nature Communications",
    ],
  },
];

export type Publication = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  type: "Journal" | "Conference" | "Preprint";
  doi: string;
  citations: number;
  abstract: string;
};

export const publicationsData: Publication[] = [
  {
    id: "pub-1",
    title: "Graph Neural Networks for Accelerated Molecular Dynamics Simulations",
    authors: "P. Kumar, A. Singh, R. Sharma, M. Patel",
    journal: "Nature Machine Intelligence",
    year: 2024,
    type: "Journal" as const,
    doi: "10.1038/s42256-024-00001",
    citations: 45,
    abstract: "We present a novel graph neural network architecture that learns to predict molecular forces with ab initio accuracy, enabling molecular dynamics simulations that are 100x faster than conventional methods.",
  },
  {
    id: "pub-2",
    title: "A Survey on Fairness in Machine Learning: Concepts, Metrics, and Methods",
    authors: "P. Kumar, J. Chen",
    journal: "ACM Computing Surveys",
    year: 2023,
    type: "Journal" as const,
    doi: "10.1145/3616855.3616861",
    citations: 218,
    abstract: "This comprehensive survey covers the landscape of fairness in machine learning, cataloging 50+ fairness definitions, evaluation metrics, and mitigation strategies across different application domains.",
  },
  {
    id: "pub-3",
    title: "Transformer-Based Approaches for Multi-Horizon Time Series Forecasting",
    authors: "P. Kumar, R. Gupta, S. Verma",
    journal: "Nature Communications",
    year: 2023,
    type: "Journal" as const,
    doi: "10.1038/s41467-023-12345",
    citations: 156,
    abstract: "We propose a modified transformer architecture with temporal attention mechanisms that achieves state-of-the-art performance on multi-horizon forecasting tasks across diverse domains.",
  },
  {
    id: "pub-4",
    title: "SciLitMiner: An Automated Pipeline for Scientific Knowledge Extraction",
    authors: "P. Kumar, L. Wang, D. Brown",
    journal: "Proceedings of ACL 2024",
    year: 2024,
    type: "Conference" as const,
    doi: "10.18653/v1/2024.acl-long.123",
    citations: 28,
    abstract: "We introduce SciLitMiner, an end-to-end pipeline that combines named entity recognition, relation extraction, and knowledge graph construction for mining scientific literature at scale.",
  },
  {
    id: "pub-5",
    title: "Physics-Informed Neural Networks for Partial Differential Equations",
    authors: "P. Kumar, A. Singh",
    journal: "ICML 2023",
    year: 2023,
    type: "Conference" as const,
    doi: "10.5555/3618408.3618512",
    citations: 89,
    abstract: "We present an improved physics-informed neural network framework that incorporates adaptive loss weighting and curriculum learning for solving complex PDEs with improved convergence.",
  },
  {
    id: "pub-6",
    title: "Interpretable Machine Learning for Clinical Decision Support",
    authors: "P. Kumar, M. Patel, K. Reddy",
    journal: "Proceedings of NeurIPS 2022",
    year: 2022,
    type: "Conference" as const,
    doi: "10.5555/3600270.3601234",
    citations: 72,
    abstract: "We develop an interpretable ML framework combining attention mechanisms with rule extraction to provide transparent clinical decision support in diagnostic settings.",
  },
  {
    id: "pub-7",
    title: "Adversarial Robustness in Scientific Machine Learning",
    authors: "P. Kumar",
    journal: "arXiv preprint",
    year: 2024,
    type: "Preprint" as const,
    doi: "10.48550/arXiv.2024.12345",
    citations: 12,
    abstract: "This work investigates the vulnerability of scientific ML models to adversarial perturbations and proposes defense mechanisms tailored to physical constraints.",
  },
];

export const researchInterests = [
  "Physics-informed machine learning",
  "Scientific knowledge graphs",
  "Fair and interpretable AI",
  "Large-scale literature mining",
];
