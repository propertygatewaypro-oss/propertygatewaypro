# Property Gateway — Monorepo Workspace

Real Estate Dynamic Web Platform and Secure Admin Portal for **Property Gateway** by **Strategy 360 Digital Marketing Agency**.

---

## 📁 Repository Structure

```
property_gateway/
├── docs/                           # Comprehensive Specifications & Hardening Guides
│   ├── PROJECT_SPECIFICATION.md    # Scope, quotation terms, and Chennai benchmarks
│   ├── PRODUCTION_SCALE_HARDENING.md # 10,000+ user scalability & Firestore limits
│   ├── UI_DESIGN_AND_MOTION_STANDARDS.md # Tokens, motion rules, and WCAG AA
│   └── README.md                   # Documentation index
│
├── .agents/skills/                 # Installed Agent Skills & Best Practices
│   ├── anti-vibe-coded-ui          # Anti-vibe-coded UI standards & visual thesis
│   ├── production-scale-hardening  # Database bounds, bot trap, and image compression
│   ├── animate & microinteractions # Emil Kowalski motion craft & tactile feedback
│   ├── tailwind-css-patterns       # Modern Tailwind utility standards
│   ├── vercel-react-best-practices # High performance React rendering
│   └── firebase-*                  # Auth, Firestore, and Storage patterns
│
├── website/                        # Public React/Vite portal (Port 3000)
└── admin/                          # Firebase Auth admin portal (Port 3001)
```

---

## 🚀 Quick Reference
* **Documentation:** See [docs/README.md](file:///c:/Users/dhine/Documents/Strategy_360/property_gateway/docs/README.md)
* **Master Specification:** See [docs/PROJECT_SPECIFICATION.md](file:///c:/Users/dhine/Documents/Strategy_360/property_gateway/docs/PROJECT_SPECIFICATION.md)
* **Scalability Guide:** See [docs/PRODUCTION_SCALE_HARDENING.md](file:///c:/Users/dhine/Documents/Strategy_360/property_gateway/docs/PRODUCTION_SCALE_HARDENING.md)

## Local development

Copy `website/.env.example` and `admin/.env.example` to `.env` files in their
respective folders, set the Firebase project values, then run `npm install` in
the root and each app folder. Start both apps with `npm run dev`, or build both
with `npm run build`.

Before deploying changed Firebase rules or site queries, follow
[FIREBASE_ROLLOUT.md](FIREBASE_ROLLOUT.md). The admin portal requires an
`admin: true` Firebase Auth custom claim.
