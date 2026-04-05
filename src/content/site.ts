export const brand = {
  name: "EpyxDerma",
  tagline: "Advanced Dermatology Hospital",
  description:
    "A dedicated dermatology brand inspired by Neo Vision & Skin Hospital's dermatology practice, spanning clinical skin care, cosmetology, hair treatments, and procedure-led care.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  phoneDisplay: process.env.NEXT_PUBLIC_PRIMARY_PHONE || "+91 90306 05737",
  secondaryPhoneDisplay: "+91 89776 95689",
  phoneLink: "tel:+919030605737",
  secondaryPhoneLink: "tel:+918977695689",
  email: process.env.NEXT_PUBLIC_PRIMARY_EMAIL || "info@neovisionandskin.com",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919030605737",
  address:
    "Plot No: 776, Midhilapuri VUDA Colony, 100 Feet Road, Kushi Junction, Madhurawada, Visakhapatnam - 530041",
  hours: "Mon - Sun, 10:00 AM to 9:00 PM",
  city: "Visakhapatnam",
  region: "Andhra Pradesh",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/clinical-dermatology", label: "Clinical" },
  { href: "/aesthetic-dermatology", label: "Aesthetic" },
  { href: "/hair-scalp", label: "Hair & Scalp" },
  { href: "/contact", label: "Contact" },
];

export const doctorProfile = {
  name: "Dr. A. Suhasini",
  title: "MD, DDVL - Skin Specialist & Cosmetologist",
  image: "/legacy/dr-suhasini.jpg",
  summary:
    "Dr. A. Suhasini completed MBBS from Andhra Medical College and MD in Dermatology with DDVL from NRI Medical College. The existing practice positions her across skin, hair, nail, oral mucosa, and cosmetology care, and this new brand site now gives that dermatology work its own dedicated presence.",
};

export const legacyGalleryImages = [
  {
    src: "/legacy/skin-gallery-1.jpg",
    alt: "Dermatology clinic gallery image from the existing Neo Vision and Skin site",
  },
  {
    src: "/legacy/skin-gallery-2.jpg",
    alt: "Skin care treatment room image from the existing Neo Vision and Skin site",
  },
  {
    src: "/legacy/skin-gallery-3.jpg",
    alt: "Dermatology facility visual from the existing Neo Vision and Skin site",
  },
];

export const homeHighlights = [
  {
    index: "01",
    title: "Exact diagnosis and root-cause-led care",
    description:
      "The existing hospital emphasizes exact diagnosis, treating the root cause, and educating patients so skin concerns can be managed more confidently and efficiently.",
  },
  {
    index: "02",
    title: "One stop answer for skin, hair, and laser issues",
    description:
      "Your current dermatology practice already spans acne, pigmentation, hair clinic care, laser-adjacent cosmetology, PRP, and chronic condition support under one roof.",
  },
  {
    index: "03",
    title: "A richer brand for the same real-world business",
    description:
      "This website keeps your actual Madhurawada dermatology practice details while replacing the previous mixed eye-and-skin presentation with a stronger skin-first identity.",
  },
];

export const spotlightPrograms = [
  {
    category: "Clinical dermatology",
    title: "Acne, pigmentation, vitiligo, and psoriasis care",
    description:
      "Grounded in the current service line, with clinical support for common and chronic skin concerns in a more focused dermatology narrative.",
  },
  {
    category: "Cosmetology",
    title: "Chemical peels and beauty-focused skin refinement",
    description:
      "Your current cosmetology treatments are carried over into the new brand with a more premium consultation-led presentation.",
  },
  {
    category: "Hair and scalp",
    title: "Hair clinic support with PRP-centered recovery options",
    description:
      "Hair treatment remains a major conversion route and now has stronger dedicated placement across the site.",
  },
];

export const homeMetrics = [
  { value: "10+", label: "existing skin services brought into the new brand" },
  { value: "7d", label: "weekly opening schedule from the current clinic" },
  { value: "10y", label: "dermatology experience highlighted on the current site" },
  { value: "100%", label: "new site focused on skin without eye-care overlap" },
];

export const patientJourneys = [
  {
    category: "Patient testimonial",
    title: "Skin-care trust rebuilt through calm, detailed consultation",
    description:
      "One current testimonial highlights that the doctor is polite, calm, professional, and gives enough time to patients before treatment decisions are made.",
  },
  {
    category: "Hair-care testimonial",
    title: "Visible hair-fall improvement over five months",
    description:
      "The existing website includes feedback from a hair-treatment patient who reported reduced hair fall and better volume over time.",
  },
  {
    category: "Brand promise",
    title: "A true partner in your journey",
    description:
      "This line from the current site is retained as part of the emotional tone, but now expressed within a dedicated dermatology brand language.",
  },
];

export const testimonials = [
  {
    name: "Radha",
    focus: "Skin Care",
    quote:
      "The consultation felt calm, detailed, and trustworthy. The doctor gave enough time and the results felt genuinely encouraging.",
  },
  {
    name: "Pranav",
    focus: "Hair Care",
    quote:
      "Hair-fall improvement became visible over the first few months, and the overall treatment experience felt supportive and result-focused.",
  },
];

export const aboutPillars = [
  {
    title: "Dermatology-first identity",
    description:
      "The existing hospital serves eye and skin patients, but this new website gives the dermatology practice its own focused brand voice and visual world.",
  },
  {
    title: "Personalized care",
    description:
      "The source site emphasizes personalized care, trained specialists, and patient education. Those ideas now shape the public narrative of EpyxDerma.",
  },
  {
    title: "Growth-ready digital foundation",
    description:
      "The frontend is now ready for richer doctor content, appointment intake, media publishing, and WhatsApp-based client communication workflows.",
  },
];

export const treatmentFamilies = [
  {
    category: "Clinical dermatology",
    title: "Acne, pigmentation, and skin disease care",
    description:
      "Adapted directly from the existing site's skin-services list, with clearer positioning around consults, diagnosis, and long-term skin confidence.",
  },
  {
    category: "Hair clinic",
    title: "Hair clinic and platelet-rich plasma therapy",
    description:
      "Hair concerns from the current site stay prominent in the new brand through dedicated hair-clinic positioning and PRP-centered support.",
  },
  {
    category: "Cosmetology",
    title: "Chemical peels and skin refinement planning",
    description:
      "Cosmetology remains part of the business, but is now framed within a more premium and more focused dermatology experience.",
  },
  {
    category: "Procedural dermatology",
    title: "Mole, wart, and corn or callosity removal",
    description:
      "Procedure-led services are easier to browse in the new site and can later grow into dedicated service detail pages.",
  },
  {
    category: "Condition-specific care",
    title: "Vitiligo treatment and psoriasis management",
    description:
      "Chronic and visible skin conditions from the current practice are preserved and given more thoughtful digital positioning.",
  },
  {
    category: "Diagnostics",
    title: "Punch biopsy and evaluation-led treatment planning",
    description:
      "Diagnostic seriousness from the existing practice now supports a stronger medical-trust story across the brand.",
  },
];

export const clinicalPrograms = [
  "Acne (pimples)",
  "Pigmentation",
  "Skin and nail diseases",
  "Vitiligo treatment",
  "Psoriasis treatment",
  "Punch biopsy",
];

export const aestheticPrograms = [
  "Chemical peel",
  "Pigmentation-focused cosmetology consultations",
  "Texture and glow improvement planning",
  "Laser issue consultation pathway",
  "Beauty-led skin refinement",
  "Premium maintenance journeys",
];

export const hairPrograms = [
  "Hair clinic consultations",
  "Platelet-rich plasma therapy",
  "Scalp review and diagnosis",
  "Hair-fall treatment planning",
  "Long-term restoration support",
  "Follow-up-led maintenance",
];

export const adminModules = [
  {
    title: "Protected admin route",
    description:
      "The `/epyxdermaadmin` route now serves as the working staff workspace for login, client data, media uploads, and campaign drafting.",
  },
  {
    title: "Campaign broadcasting",
    description:
      "Campaign posts can be drafted for opted-in clients with message content, segment tags, and uploaded image or video references.",
  },
  {
    title: "Mongo-ready architecture",
    description:
      "Client, campaign, media, and delivery entities are backed by Mongo-aware repositories and API routes.",
  },
  {
    title: "Local media first",
    description:
      "Uploads are saved locally now so your team can start immediately, while the storage layer remains ready for a future cloud move.",
  },
];

export const contactCards = [
  {
    title: "Doctor-led dermatology care",
    description:
      "The current website identifies Dr. A. Suhasini as the skin specialist and cosmetologist, and that leadership is now reflected in the new dermatology-only brand story.",
  },
  {
    title: "Real clinic location",
    description:
      "The new site uses the existing Madhurawada, Visakhapatnam address and phone numbers so the new brand already points to the live business.",
  },
  {
    title: "Launch-ready for richer content",
    description:
      "Doctor credentials, awards, FAQs, testimonials, and treatment-specific media can now be expanded in place without restructuring the app.",
  },
];

export const faqItems = [
  {
    question: "What kinds of skin concerns does the clinic currently handle?",
    answer:
      "The current dermatology practice covers acne, pigmentation, hair clinic cases, skin and nail diseases, vitiligo, psoriasis, chemical peels, and punch-biopsy-led evaluation.",
  },
  {
    question: "Is the new website connected to the existing clinic details?",
    answer:
      "Yes. The new dermatology brand now uses the existing clinic address, contact numbers, email, and dermatologist profile from the current site.",
  },
  {
    question: "Will the admin side support WhatsApp posts to clients?",
    answer:
      "Yes. The current implementation stores clients, uploaded media, and campaign drafts so the next WhatsApp integration step can send those campaigns to opted-in patients.",
  },
];

export const jsonLdHospital = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: brand.name,
  description: brand.description,
  medicalSpecialty: "Dermatologic",
  telephone: brand.phoneDisplay,
  email: brand.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: brand.address,
    addressLocality: brand.city,
    addressRegion: brand.region,
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 10:00-21:00",
  url: brand.siteUrl,
};
