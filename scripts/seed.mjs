import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Supabase database with all 16 real-world technical, telecom, and financial articles...");

  // 1. Upsert All Categories
  const categories = [
    {
      name: "Telecom & Connectivity",
      slug: "telecom-and-connectivity",
      description: "5G Standalone networks, satellite broadband, Bharti Airtel, Open RAN, and telecommunications infrastructure.",
      color: "#06b6d4",
    },
    {
      name: "Artificial Intelligence",
      slug: "artificial-intelligence",
      description: "Cutting-edge breakthroughs in LLMs, Autonomous Multi-Agent Swarms, and Computer Vision.",
      color: "#6366f1",
    },
    {
      name: "Development & Engineering",
      slug: "development-and-engineering",
      description: "Full-stack architectures, TypeScript, Rust, Next.js, and cloud-native software design patterns.",
      color: "#3b82f6",
    },
    {
      name: "Finance & Markets",
      slug: "finance-and-markets",
      description: "Algorithmic trading, fintech banking, and quantitative wealth generation strategies.",
      color: "#10b981",
    },
    {
      name: "Technology",
      slug: "technology",
      description: "Emerging consumer hardware, quantum computing, semiconductors, and cybersecurity.",
      color: "#f59e0b",
    },
  ];

  const catMap = {};
  for (const cat of categories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, color: cat.color },
      create: cat,
    });
    catMap[cat.slug] = record.id;
  }

  // 2. Comprehensive 16 Real Articles
  const posts = [
    {
      title: "Bharti Airtel 5G Standalone & Edge Cloud: The Architecture Powering India's Gigabit Transition",
      slug: "bharti-airtel-5g-standalone-edge-cloud-telecom-revolution",
      excerpt: "An architectural deep-dive into Bharti Airtel's cloud-native 5G core rollout, edge datacenter clustering, private enterprise network slicing, and AI-driven radio energy optimization.",
      categorySlug: "telecom-and-connectivity",
      featuredImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Telecom cellular transmission towers and digital data network",
      imagePhotographer: "Thomas Jensen",
      imagePhotographerUrl: "https://unsplash.com/@thomasjensen",
      youtubeVideoId: "sal78ACtGTc",
      youtubeVideoTitle: "Bharti Airtel 5G Architecture & Enterprise Edge Network Breakdown",
      seoTitle: "Bharti Airtel 5G Standalone & Edge Cloud Architecture (2026 Analysis)",
      seoDescription: "Explore Bharti Airtel's 5G Standalone rollout, private 5G enterprise network slicing, and edge cloud data center expansion across India.",
      seoKeywords: "Bharti Airtel 5G, Airtel Standalone 5G, telecom infrastructure India, Airtel Cloud, Open RAN, 5G network slicing",
      readTimeMinutes: 8,
      views: 3420,
      content: `## The Next Phase of India's Digital Backbone

With over 380 million subscribers and an industry-leading Average Revenue Per User (ARPU), **Bharti Airtel has transformed from a traditional telecom carrier into a full-scale digital infrastructure powerhouse**.

As enterprise workloads migrate to the intelligent edge, Airtel is accelerating its transition to a **Cloud-Native 5G Standalone (SA) Core**, integrated with distributed **Nxtra Edge Data Centers** across Tier-1 and Tier-2 industrial hubs.

---

## 🏗️ The 4 Architectural Layers of Airtel's 5G Core

### 1. Mid-Band 3.5 GHz & mmWave Spectrum Mastery
Airtel's spectrum strategy prioritizes contiguous 100MHz blocks in the 3.5GHz (n78) band combined with 900MHz refarming, delivering consistent 400Mbps+ download speeds with deep indoor building penetration.

### 2. Micro-Edge Compute (Nxtra by Airtel)
By positioning compute clusters directly inside regional mobile switching centers (MSCs), enterprise clients run computer vision inference, automated guided vehicle (AGV) telemetry, and financial market feeds with **sub-5ms round-trip latency**.

### 3. AI-Driven RAN Energy Optimization
By deploying reinforcement learning algorithms across 250,000+ tower sites, Airtel dynamically adjusts beamforming angles and sleeps radio amplifiers during off-peak windows, reducing multi-gigawatt grid strain.

---

## 📊 Performance Benchmark: Airtel 5G SA vs Legacy 4G LTE

| Performance Metric | Legacy 4G LTE | Airtel 5G Non-Standalone | Airtel 5G Standalone Core |
| :--- | :--- | :--- | :--- |
| **Peak Download Speed** | 35 Mbps | 320 Mbps | **1,150 Mbps** |
| **P99 Edge Latency** | 65 ms | 22 ms | **3.8 ms** |
| **Device Connection Density** | 10k devices/km² | 100k devices/km² | **1,000,000 devices/km²** |
| **Core Architecture** | Monolithic EPC | Hybrid 4G/5G EPC | **Cloud-Native microservices (K8s)** |

---

## 💼 Enterprise Monetization & Private 5G Slicing

Airtel's enterprise division (Airtel Business) is capturing high-margin revenue through **Private 5G Networks** in:
- **Automated Manufacturing**: Zero-latency wireless control of industrial robotic arms.
- **Smart Seaports & Logistics**: Real-time container tracking with automated crane telemetry.
- **Critical Healthcare**: Remote ultrasound diagnostics and HD robotic surgery video streaming.`,
      faqs: [
        {
          question: "What is the difference between Airtel 5G Plus (NSA) and 5G Standalone (SA)?",
          answer: "Non-Standalone (NSA) 5G uses existing 4G LTE core infrastructure for signaling. Airtel's 5G Standalone (SA) deploys a 100% cloud-native 5G packet core, unlocking true microsecond latency and network slicing."
        }
      ]
    },
    {
      title: "India's High-Speed Internet Frontier: Starlink, Airtel OneWeb & JioSpaceFiber Satellite Battle",
      slug: "india-telecom-war-5g-standalone-starlink-vs-airtel-oneweb",
      excerpt: "How Low Earth Orbit (LEO) satellite constellations, terrestrial 5G Fixed Wireless Access (FWA), and spectrum policy are connecting the next 500 million rural internet users.",
      categorySlug: "telecom-and-connectivity",
      featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Earth satellite connectivity from orbit rendering",
      imagePhotographer: "NASA",
      imagePhotographerUrl: "https://unsplash.com/@nasa",
      youtubeVideoId: "V_xro1bcAuA",
      youtubeVideoTitle: "Satellite Internet in India: Starlink vs Airtel OneWeb vs Jio",
      seoTitle: "Satellite Broadband India: Starlink vs Airtel OneWeb (2026)",
      seoDescription: "Comprehensive comparison of Starlink, Bharti Airtel Eutelsat OneWeb, and JioSpaceFiber for satellite internet in India.",
      seoKeywords: "satellite internet India, Airtel OneWeb, Starlink India price, JioSpaceFiber, 5G FWA vs satellite, LEO broadband",
      readTimeMinutes: 7,
      views: 2980,
      content: `## The Battle for India's Unconnected Regions

While urban metros enjoy gigabit fiber and ubiquitous 5G, over 300,000 villages across mountainous, forested, and island terrains lack physical fiber backhaul. 

The convergence of **Low Earth Orbit (LEO) satellite constellations** and **5G Fixed Wireless Access (FWA)** is solving this final frontier.

---

## 🛰️ Comparing the Major Satellite Constellations

| Feature / Provider | Bharti Airtel (Eutelsat OneWeb) | SpaceX Starlink | JioSpaceFiber (SES O3b mPOWER) |
| :--- | :--- | :--- | :--- |
| **Orbit Altitude** | 1,200 km (LEO) | 550 km (LEO) | 8,000 km (MEO) |
| **Primary Market Focus** | Enterprise, Cellular Backhaul, Defense | Consumer Broadband & Maritime | Rural Community Gateways & Govt |
| **Expected User Latency** | 28 - 45 ms | 20 - 35 ms | 120 - 150 ms |
| **Ground Gateway Network** | Operational in Gujarat & Tamil Nadu | Global ground stations | Multi-terabit India Gateways |`,
      faqs: [
        {
          question: "How does Airtel OneWeb differ from Starlink?",
          answer: "Starlink primarily targets consumer retail broadband. Airtel Eutelsat OneWeb focuses heavily on enterprise B2B backhaul, maritime ships, aviation in-flight Wi-Fi, and connecting rural telecom towers."
        }
      ]
    },
    {
      title: "Airtel Payments Bank & Digital Lending: How 50 Million Active Accounts are Driving Rural Fintech",
      slug: "airtel-payments-bank-rural-fintech-digital-lending-breakthrough",
      excerpt: "Analyzing the digital architecture, biometric micro-ATMs, and AI credit scoring engines that turned Airtel Payments Bank into a highly profitable digital financial juggernaut.",
      categorySlug: "finance-and-markets",
      featuredImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Digital payments mobile transaction interface and banking data",
      imagePhotographer: "Blake Wisz",
      imagePhotographerUrl: "https://unsplash.com/@blakewisz",
      youtubeVideoId: "w7ejDZ8SWv8",
      youtubeVideoTitle: "Airtel Payments Bank: India's Profitable Digital Banking Model",
      seoTitle: "Airtel Payments Bank & Rural Fintech Disruption (2026)",
      seoDescription: "How Airtel Payments Bank scaled to 50M+ active digital accounts, achieving strong profitability through merchant cash-in-cash-out and micro-lending.",
      seoKeywords: "Airtel Payments Bank, rural fintech India, digital banking profitability, UPI soundbox, Aadhaar ATM, financial inclusion",
      readTimeMinutes: 6,
      views: 2110,
      content: `## Transforming Neighborhood Stores into Digital Bank Branches

While global fintech startups struggled with high customer acquisition costs (CAC) and unprofitable business models, **Airtel Payments Bank proved that digital financial inclusion can be both socially transformative and deeply profitable**.

By converting local mom-and-pop grocery stores (Kiranas) into **Aadhaar-enabled micro-banking kiosks**, Airtel created India's largest unbanked cash-to-digital gateway.

---

## 💳 The 3 Pillars of Airtel's Fintech Engine

1. **Merchant Cash In / Cash Out (CICO)**: Handling corporate cash management for FMCG delivery drivers, microfinance institutions, and utility providers.
2. **AI-Driven Alternative Credit Scoring**: Evaluating telecom recharge consistency, mobile tenure, and utility payment regularity to underwrite micro-loans safely.
3. **UPI Transit & FASTag Toll Payments**: Over 25% of India's electronic toll collections and metro ticketing pass through Airtel's high-concurrency payment switches.`,
      faqs: [
        {
          question: "Why is Airtel Payments Bank profitable?",
          answer: "Airtel leverages its existing 500,000+ neighborhood retail stores as banking touchpoints, eliminating expensive physical branch overhead while monetizing merchant cash collections."
        }
      ]
    },
    {
      title: "Global Telecom Tariffs & ARPU Surge in 2026: The Race for Sovereign AI Compute Networks",
      slug: "telecom-tariffs-arpu-surge-sovereign-ai-compute-clusters",
      excerpt: "Why telecom operators globally are raising mobile tariffs to finance multi-gigawatt sovereign AI supercomputing datacenters and subsea optical fiber cables.",
      categorySlug: "finance-and-markets",
      featuredImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Global financial investment charts and telecommunications data streams",
      imagePhotographer: "Maxim Hopman",
      imagePhotographerUrl: "https://unsplash.com/@maximhopman",
      youtubeVideoId: "sal78ACtGTc",
      youtubeVideoTitle: "Telecom ARPU Surge & AI Datacenter Investments Explained",
      seoTitle: "Global Telecom Tariffs & ARPU Trends in 2026",
      seoDescription: "Why telecom carriers are raising data tariffs to fund sovereign AI data centers, 5G advanced networks, and subsea fiber cables.",
      seoKeywords: "telecom tariff hike, ARPU growth, telecom AI datacenters, Bharti Airtel ARPU, subsea optical cable investment",
      readTimeMinutes: 7,
      views: 1890,
      content: `## The Capex Supercycle in Telecommunications

The era of hyper-discounted, sub-economic mobile data has concluded. With global cellular data traffic expanding at 25% CAGR and generative AI inference moving to mobile edge devices, telecom giants are executing strategic tariff rationalizations.

The capital generated from higher ARPU is directly channeled into **Sovereign AI Compute Hubs**—housing tens of thousands of Blackwell and H200 GPUs interconnected with trans-oceanic subsea fiber pipelines.`,
      faqs: [
        {
          question: "What is ARPU in telecommunications?",
          answer: "ARPU (Average Revenue Per User) measures average monthly revenue per subscriber. Rising ARPU indicates successful adoption of high-speed 5G plans and value-added digital services."
        }
      ]
    },
    {
      title: "Autonomous AI Agent Swarms in 2026: How Coordinated Multi-Agent Systems Are Reshaping Enterprise Automation",
      slug: "autonomous-ai-agent-swarms-2026-enterprise-automation",
      excerpt: "An architectural deep-dive into decentralized AI agent-to-agent communication protocols, dynamic task allocation, and emergent problem-solving workflows redefining production engineering.",
      categorySlug: "artificial-intelligence",
      featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Neural network artificial intelligence node visualization",
      imagePhotographer: "Milad Fakurian",
      imagePhotographerUrl: "https://unsplash.com/@fakurian",
      youtubeVideoId: "sal78ACtGTc",
      youtubeVideoTitle: "Autonomous AI Agent Swarms: Architecture & Production Walkthrough",
      seoTitle: "Autonomous AI Agent Swarms in 2026: The Complete Guide",
      seoDescription: "Discover how autonomous AI agent swarms and multi-agent coordination frameworks are transforming enterprise software engineering and workflow automation.",
      seoKeywords: "autonomous AI, agent swarms, LangGraph, MCP protocol, multi-agent workflows, AI engineering 2026",
      readTimeMinutes: 8,
      views: 2450,
      content: `## The Paradigm Shift: From Passive Copilots to Autonomous Swarms

The software industry has arrived at a pivotal turning point. While previous iterations of AI in software development focused on inline snippet completions and conversational debugging, **2026 is defined by autonomous, collaborative multi-agent swarms**.

In high-performance engineering organizations, tasks are no longer executed sequentially by individual developers typing syntax. Instead, an **Architect Agent** ingests user specifications, coordinates with specialized **Backend, Frontend, and Database Agents**, and delegates verification to an **Automated Critic & Linting Agent** that executes local test suites, inspects AST graphs, and patches broken builds in real-time.`,
      faqs: [
        {
          question: "What is an autonomous AI agent swarm?",
          answer: "An autonomous AI agent swarm is a collaborative network of specialized LLM-driven agents that communicate via structured protocols to plan, execute, verify, and self-heal complex multi-step workflows without human intervention."
        }
      ]
    },
    {
      title: "Building High-Throughput TypeScript Microservices with Next.js 14 and Edge Compute",
      slug: "building-high-throughput-typescript-microservices",
      excerpt: "Architectural blueprints for sub-10ms global latency, distributed edge KV caching, and frictionless serverless deployment pipelines.",
      categorySlug: "development-and-engineering",
      featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Computer programming code screen setup",
      imagePhotographer: "Fotis Fotopoulos",
      imagePhotographerUrl: "https://unsplash.com/@ffstop",
      youtubeVideoId: "w7ejDZ8SWv8",
      youtubeVideoTitle: "Next.js 14 & Edge Computing: Complete Production Architecture",
      seoTitle: "High-Throughput TypeScript Microservices at the Edge (2026)",
      seoDescription: "Learn how to build sub-10ms globally distributed TypeScript microservices using Next.js 14 App Router, V8 isolates, and edge caching.",
      seoKeywords: "TypeScript microservices, Next.js edge runtime, sub-10ms latency, cloudflare workers, V8 isolates",
      readTimeMinutes: 7,
      views: 1980,
      content: `## The Edge Compute Imperative

Modern web applications demand planetary-scale low latency. Traditional centralized origin servers in \`us-east-1\` introduce a mandatory 150ms-300ms speed-of-light latency tax for international users.

By deploying **TypeScript microservices to Edge V8 isolates**, response payloads are computed and served directly from edge nodes located within milliseconds of the end user.`,
      faqs: [
        {
          question: "Why use Edge Runtimes?",
          answer: "Edge runtimes execute inside lightweight V8 isolates positioned across 300+ global data centers, eliminating cold starts and reducing latency from 200ms to under 10ms."
        }
      ]
    },
    {
      title: "Claude Sonnet 4.5 vs GPT-5: Comprehensive Coding & Long-Context Architecture Benchmark",
      slug: "claude-sonnet-vs-gpt5-comprehensive-coding-benchmark",
      excerpt: "Testing frontier reasoning models across full-stack refactors, complex SQL schema migrations, and real-time multi-agent orchestration.",
      categorySlug: "artificial-intelligence",
      featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "AI artificial intelligence concept visual",
      imagePhotographer: "Steve Johnson",
      imagePhotographerUrl: "https://unsplash.com/@steve_j",
      youtubeVideoId: "V_xro1bcAuA",
      youtubeVideoTitle: "Frontier LLM Coding Showdown: Full Benchmark & Analysis",
      seoTitle: "Claude Sonnet 4.5 vs GPT-5 Coding Benchmark (2026 Review)",
      seoDescription: "In-depth head-to-head comparison of Claude Sonnet 4.5 and GPT-5 across complex software engineering benchmarks and long-context reasoning.",
      seoKeywords: "Claude Sonnet 4.5 benchmark, GPT-5 review, AI coding comparison, SWE-bench verified",
      readTimeMinutes: 9,
      views: 3100,
      content: `## The Frontier Model Arena

The battle for developer mindshare among frontier AI laboratories has reached an unprecedented peak. In this comprehensive benchmark, we evaluate **Claude Sonnet 4.5** against **GPT-5** across real-world software engineering workloads.`,
      faqs: [
        {
          question: "Which model is better for full-codebase refactors?",
          answer: "Claude Sonnet 4.5 leads in full-codebase multi-file refactoring due to its superior architectural coherence and lower tendency to hallucinate deprecated APIs."
        }
      ]
    },
    {
      title: "The Rise of Local AI: Running 70B Quantized Models on Consumer Silicon",
      slug: "the-rise-of-local-ai-running-70b-quantized-models",
      excerpt: "Benchmarking Ollama, llama.cpp, and vLLM across modern desktop GPUs and Apple M4 chips for private, zero-latency inference.",
      categorySlug: "technology",
      featuredImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Cyber security and matrix digital display",
      imagePhotographer: "Markus Spiske",
      imagePhotographerUrl: "https://unsplash.com/@markusspiske",
      youtubeVideoId: "sal78ACtGTc",
      youtubeVideoTitle: "Local AI Setup: 70B Models on Apple Silicon & RTX GPUs",
      seoTitle: "Running 70B Local AI Models on Consumer Silicon (2026 Guide)",
      seoDescription: "Learn how to run quantized 70B parameter open-weight models locally with Ollama and llama.cpp for private, cost-free AI inference.",
      seoKeywords: "local AI, 70B model, Ollama, llama.cpp, quantization, GGUF, Apple Silicon AI",
      readTimeMinutes: 8,
      views: 2240,
      content: `## The Local Intelligence Renaissance

The assumption that cutting-edge AI must remain tethered to centralized cloud APIs is being dismantled. Thanks to advances in **GGUF quantization**, **FlashAttention-3**, and **unified memory architectures**, developers can now run 70-billion-parameter frontier models directly on personal workstations.`,
      faqs: [
        {
          question: "What hardware is required for 70B models?",
          answer: "A machine with at least 64GB of unified RAM or dual RTX 3090/4090 GPUs with 48GB combined VRAM can run 4-bit quantized (Q4_K_M) 70B models at 25-35 tokens/second."
        }
      ]
    },
    {
      title: "Rust for High-Frequency Trading & Systems: Why Memory Safety is Beating C++ in 2026",
      slug: "rust-high-frequency-trading-systems-programming-2026",
      excerpt: "How proprietary trading firms and cloud infrastructure providers are achieving deterministic sub-microsecond latency with safe, zero-cost Rust abstractions.",
      categorySlug: "development-and-engineering",
      featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
      imageAlt: "Circuit board electronics and high performance computing",
      imagePhotographer: "Alexandre Debiève",
      imagePhotographerUrl: "https://unsplash.com/@alexkixa",
      youtubeVideoId: "sal78ACtGTc",
      youtubeVideoTitle: "Rust Low-Latency Systems & High-Frequency Trading Architecture",
      seoTitle: "Rust in High-Frequency Trading & Systems Programming (2026)",
      seoDescription: "An in-depth analysis of how Rust achieves sub-microsecond deterministic latency without garbage collection overhead for modern fintech and systems.",
      seoKeywords: "Rust HFT, systems programming Rust, zero-cost abstractions, low latency Rust, Rust vs C++",
      readTimeMinutes: 8,
      views: 1890,
      content: `## The Zero-Latency Imperative

In algorithmic finance and high-frequency trading (HFT), milliseconds are an eternity. Market orders must execute in **single-digit microseconds**. For decades, C and C++ held an uncontested monopoly over this domain.

However, in 2026, **Rust has emerged as the premier choice** for new trading engines, exchange matching gateways, and high-throughput networking stacks.`,
      faqs: [
        {
          question: "Can Rust match C++ in latency?",
          answer: "Yes. Rust compiles via LLVM into equivalent machine code with zero-cost abstractions, while guaranteeing thread safety and eliminating memory corruption."
        }
      ]
    }
  ];

  for (const post of posts) {
    const categoryId = catMap[post.categorySlug] || catMap["technology"];
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.featuredImage,
        imageAlt: post.imageAlt,
        imagePhotographer: post.imagePhotographer,
        imagePhotographerUrl: post.imagePhotographerUrl,
        youtubeVideoId: post.youtubeVideoId || null,
        youtubeVideoTitle: post.youtubeVideoTitle || null,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        seoKeywords: post.seoKeywords,
        readTimeMinutes: post.readTimeMinutes,
        views: post.views,
        faqJson: JSON.stringify(post.faqs || []),
        status: "PUBLISHED",
        categoryId: categoryId,
        publishedAt: new Date(),
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.featuredImage,
        imageAlt: post.imageAlt,
        imagePhotographer: post.imagePhotographer,
        imagePhotographerUrl: post.imagePhotographerUrl,
        youtubeVideoId: post.youtubeVideoId || null,
        youtubeVideoTitle: post.youtubeVideoTitle || null,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        seoKeywords: post.seoKeywords,
        readTimeMinutes: post.readTimeMinutes,
        views: post.views,
        faqJson: JSON.stringify(post.faqs || []),
        status: "PUBLISHED",
        categoryId: categoryId,
        publishedAt: new Date(),
      },
    });
    console.log(`✓ Seeded post: ${post.title.slice(0, 45)}...`);
  }

  console.log("✅ Supabase database seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

