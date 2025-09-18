import Head from "next/head";
import { useMemo, useRef, useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Check, ChevronRight, ChevronDown, Image as ImageIcon } from "lucide-react";
import Header from "../components/Header";

/**
 * Casting page – Polished UX
 * - Headless dropdown (no tiny/off-place native menus)
 * - Floating inputs/selects, robust validation, color-coded feedback
 * - Nude photography is opt-in (18+), explicit consent
 * - Multi-step wizard, sticky CTA, mobile-perfect
 * - Links field shows parsing rules + detected/ignored tokens
 */

type FieldStatus = "neutral" | "success" | "error";

type FormState = {
  fullName: string;
  email: string;
  dob: string;
  phone?: string;
  city: string;
  instagram?: string;
  portfolioUrl: string;
  heightCm?: string;
  chest?: string;
  waist?: string;
  hips?: string;
  dressSize?: string;
  shoeSize?: string;
  categories: string[];
  experience: "starter" | "intermediate" | "agency" ;
  availability: string;
  imageLinks: string;
  message?: string;
  isAdult: boolean;
  poshConsent: boolean;
  moods: string[];
  comfortLevels: string[];
  openToNude: boolean;
  nudePreference: "unspecified" | "no" | "implied" | "artistic";
  nudeConsent: boolean;
  privacyNotes?: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  dob: "",
  phone: "",
  city: "",
  instagram: "",
  portfolioUrl: "",
  heightCm: "",
  chest: "",
  waist: "",
  hips: "",
  dressSize: "",
  shoeSize: "",
  categories: [],
  experience: "starter",
  availability: "",
  imageLinks: "",
  message: "",
  isAdult: false,
  poshConsent: false,
  moods: [],
  comfortLevels: [],
  openToNude: false,
  nudePreference: "no", // OFF => "no"; ON => refined by dropdown
  nudeConsent: false,
  privacyNotes: "",
};

const BRAND = {
  name: "Alina Popova",
  domain: typeof window !== "undefined" ? window.location.origin : "https://example.com",
};

const MOOD_OPTIONS = [
  { key: "beauty",      label: "Clean Beauty",           img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=750&fit=crop&auto=format&q=80" },
  { key: "catalogue",   label: "Catalogue / Lookbook",      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=750&fit=crop&auto=format&q=80" },
  { key: "editorial",   label: "Editorial",              img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=750&fit=crop&auto=format&q=80" },
  { key: "lifestyle",   label: "Lifestyle",              img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=750&fit=crop&auto=format&q=80" },
  { key: "traditional", label: "Traditional",       img: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ac?w=600&h=750&fit=crop&auto=format&q=80" },
  { key: "fitness",     label: "Fitness",   img: "https://images.unsplash.com/photo-1541534401786-2077edd4fdef?w=600&h=750&fit=crop&auto=format&q=80" },
] as const;

/* Validation helpers */
const emailOk = (v: string) => /.+@.+\..+/.test(v.trim());
const urlOk = (v: string) => /^https?:\/\/.+/.test(v.trim());
const phoneOk = (v?: string) => !v || /[0-9+()\-\s]{7,}/.test(v);

const ageFromDob = (iso: string) => {
  if (!iso) return 0;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
};

/** Split raw text into tokens by comma, space, or newline. */
function splitLinkTokens(raw: string) {
  const tokens = (raw || "")
    .split(/[\s,]+/g)       // spaces, tabs, newlines, commas
    .map((s) => s.trim())
    .filter(Boolean);

  const valid = tokens.filter((t) => /^https?:\/\//i.test(t));
  const deduped = Array.from(new Set(valid));
  const invalid = tokens.filter((t) => !/^https?:\/\//i.test(t));

  return { valid: deduped, invalid, all: tokens };
}

/* UI helpers */
function fieldClass(status: FieldStatus) {
  const base = "w-full border bg-white text-sm text-slate-900 outline-none transition rounded-xl pl-3 pr-9 pt-[1.65rem] pb-2";
  if (status === "error") return `${base} border-rose-400 bg-rose-50/40 focus:border-rose-500 focus:ring-2 focus:ring-rose-100`;
  if (status === "success") return `${base} border-emerald-400 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100`;
  return `${base} border-black/10 focus:border-black/30 focus:ring-2 focus:ring-black/10`;
}

function statusFrom(valid?: boolean, touched?: boolean): FieldStatus {
  if (!touched) return "neutral";
  if (valid) return "success";
  return "error";
}

function RightIcon({ status }: { status: FieldStatus }) {
  const common = "pointer-events-none absolute right-3 inset-y-0 my-auto h-5 w-5 z-10";
  if (status === "success") {
    return <CheckCircle2 className={`${common} text-emerald-600/90`} strokeWidth={2.25} aria-hidden />;
  }
  if (status === "error") {
    return <AlertCircle className={`${common} text-rose-500`} strokeWidth={2.25} aria-hidden />;
  }
  return null;
}

export default function CastingPage() {
  const [data, setData] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  // Wizard state
  const [step, setStep] = useState(0);
  const TOTAL_STEPS = 7;
  const STEP_LABELS = ["Basics","Portfolio","Measures","Categories","Comfort","Links","Review"] as const;
  const [maxStep, setMaxStep] = useState(0);
  const [justSaved, setJustSaved] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const policiesRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const [isHeroInView, setIsHeroInView] = useState(true);
  const [isFormInView, setIsFormInView] = useState(false);
  const [isFooterInView, setIsFooterInView] = useState(false);

  const endpoint = process.env.NEXT_PUBLIC_CASTING_ENDPOINT || "";
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const LOCAL_KEY = "ap_casting_form_v2";

  // Derived helpers
  const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const pageUrl = useMemo(() => (typeof window !== "undefined" ? window.location.href : ""), []);
  const referrer = useMemo(() => (typeof document !== "undefined" ? document.referrer : ""), []);
  const ua = useMemo(() => (typeof navigator !== "undefined" ? navigator.userAgent : ""), []);

  const ALL_LEVELS = [
    "Casual/Street",
    "Formal",
    "Swimwear",
    "Lingerie",
    "Implied Nude",
    "Artistic Nude (non-sexual)",
  ] as const;

  const visibleComfortLevels = useMemo(
    () => (data.openToNude ? ALL_LEVELS : ALL_LEVELS.filter((l) => !l.includes("Nude"))),
    [data.openToNude]
  );

  // Link parsing (now shows rules + invalid tokens)
  const linkParse = useMemo(() => splitLinkTokens(data.imageLinks), [data.imageLinks]);
  const parsedLinks = useMemo(() => linkParse.valid.slice(0, 12), [linkParse.valid]);
  const invalidTokens = useMemo(() => linkParse.invalid.slice(0, 12), [linkParse.invalid]);

  // Required progress
  const requiredFilled = useMemo(() => {
    const dobOk = !!data.dob && ageFromDob(data.dob) >= 18;
    const req = [
      data.fullName.trim(),
      data.email.trim(),
      data.city.trim(),
      // portfolioUrl is optional
      data.availability.trim(),
      data.imageLinks.trim(),
      dobOk ? "ok" : "",
      data.poshConsent ? "ok" : "",
      (!data.openToNude || data.nudeConsent) ? "ok" : "",
    ];
    return req.filter(Boolean).length;
  }, [data]);
  const totalRequired = 8;
  const progress = Math.round((requiredFilled / totalRequired) * 100);

  // Validations
  const linksCount = parsedLinks.length;
  const linksValid = linksCount >= 3 && linksCount <= 6;
  const validations = {
    dob: { valid: !!data.dob && ageFromDob(data.dob) >= 18, message: "Enter your DOB (18+ only)" },
    fullName: { valid: data.fullName.trim().length > 1, message: "Enter your full name" },
    email: { valid: emailOk(data.email), message: "Enter a valid email" },
    phone: { valid: phoneOk(data.phone), message: "Enter a valid number or leave blank" },
    city: { valid: data.city.trim().length > 1, message: "Enter your city" },
    portfolioUrl: { valid: !data.portfolioUrl || urlOk(data.portfolioUrl), message: "Optional — add https:// if you have a link" },
    availability: { valid: data.availability.trim().length > 1, message: "Add dates or a window" },
    imageLinks: { valid: !!data.imageLinks.trim() && linksValid, message: linksValid ? "" : "Add 3–6 public links" },
    isAdult: { valid: data.isAdult, message: "Must be 18+" },
    poshConsent: { valid: data.poshConsent, message: "Agree to our safe, respectful code of conduct" },
    nudeConsent: { valid: !data.openToNude || data.nudeConsent, message: "Confirm consent for nude levels" },
  } as const;

  const statuses = {
    dob: statusFrom(validations.dob.valid, touched.dob),
    fullName: statusFrom(validations.fullName.valid, touched.fullName),
    email: statusFrom(validations.email.valid, touched.email),
    phone: statusFrom(validations.phone.valid, touched.phone),
    city: statusFrom(validations.city.valid, touched.city),
    portfolioUrl: data.portfolioUrl ? statusFrom(validations.portfolioUrl.valid, touched.portfolioUrl) : (touched.portfolioUrl ? "neutral" : "neutral"),
    availability: statusFrom(validations.availability.valid, touched.availability),
    imageLinks: statusFrom(validations.imageLinks.valid, touched.imageLinks),
  } as const;

  const errorItems = useMemo(() => {
    const items: { id: string; label: string; message: string }[] = [];
    if (!validations.dob.valid) items.push({ id: "dob", label: "Date of birth", message: validations.dob.message });
    if (!validations.fullName.valid) items.push({ id: "fullName", label: "Full name", message: validations.fullName.message });
    if (!validations.email.valid) items.push({ id: "email", label: "Email", message: validations.email.message });
    if (!validations.city.valid) items.push({ id: "city", label: "City", message: validations.city.message });
    if (!validations.portfolioUrl.valid) items.push({ id: "portfolioUrl", label: "Portfolio link", message: validations.portfolioUrl.message });
    if (!validations.availability.valid) items.push({ id: "availability", label: "Availability window", message: validations.availability.message });
    if (!validations.imageLinks.valid) items.push({ id: "imageLinks", label: "Image links", message: validations.imageLinks.message || "Add 3–6 public image links" });
    if (!validations.poshConsent.valid) items.push({ id: "poshConsent", label: "Conduct consent", message: validations.poshConsent.message });
    if (data.openToNude && !validations.nudeConsent.valid) items.push({ id: "nudeConsent", label: "Nude consent", message: validations.nudeConsent.message });
    return items;
  }, [validations, data.openToNude]);

  const fieldsForStep = (s: number): string[] => {
    switch (s) {
      case 0: return ["fullName", "city", "email", "dob"];
      case 1: return ["portfolioUrl", "availability", "phone", "experience"];
      case 2: return ["heightCm", "chest", "waist", "hips"];
      case 3: return ["categories", "moods", "dressSize", "shoeSize"];
      case 4: {
        const arr = ["openToNude", "comfortLevels", "nudePreference"] as string[];
        if (data.openToNude) arr.push("nudeConsent");
        return arr;
      }
      case 5: {
        const arr = ["imageLinks", "message"] as string[];
        if (data.openToNude) arr.push("privacyNotes");
        return arr;
      }
      case 6: return ["poshConsent"];
      default: return [];
    }
  };

  const stepErrors = useMemo(() => {
    const fieldIds = new Set(fieldsForStep(step));
    return errorItems.filter((e) => fieldIds.has(e.id));
  }, [errorItems, step, data.openToNude]);

  const canProceedStep = useMemo(() => {
    const ids = new Set(fieldsForStep(step));
    const isOk = (id: string) => {
      switch (id) {
        case 'fullName': return validations.fullName.valid;
        case 'email': return validations.email.valid;
        case 'phone': return validations.phone.valid;
        case 'city': return validations.city.valid;
        case 'portfolioUrl': return validations.portfolioUrl.valid;
        case 'availability': return validations.availability.valid;
        case 'imageLinks': return validations.imageLinks.valid;
        case 'isAdult': return validations.isAdult.valid;
        case 'poshConsent': return validations.poshConsent.valid;
        case 'nudeConsent': return validations.nudeConsent.valid;
        default: return true;
      }
    };
    return Array.from(ids).every(isOk);
  }, [step, validations, data.openToNude]);

  const isValid =
    validations.dob.valid &&
    validations.fullName.valid &&
    validations.email.valid &&
    validations.phone.valid &&
    validations.city.valid &&
    validations.portfolioUrl.valid &&
    validations.availability.valid &&
    validations.imageLinks.valid &&
    validations.poshConsent.valid &&
    validations.nudeConsent.valid;

  // Autosave / restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setData({
          ...initialState,
          ...saved,
          moods: Array.isArray(saved?.moods) ? saved.moods : [],
          comfortLevels: Array.isArray(saved?.comfortLevels) ? saved.comfortLevels : [],
          openToNude: !!saved?.openToNude,
          nudeConsent: !!saved?.openToNude && !!saved?.nudeConsent,
          // sanitize: if toggle is ON and saved preference is "no", switch to "unspecified"
          nudePreference: (["unspecified", "no", "implied", "artistic"] as const).includes(saved?.nudePreference)
            ? (saved?.openToNude && saved?.nudePreference === "no" ? "unspecified" : saved.nudePreference)
            : "no",
          privacyNotes: typeof saved?.privacyNotes === "string" ? saved.privacyNotes : "",
        });
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // WhatsApp handoff
  const waHref = useMemo(() => {
    if (!waNumber) return "";
    const lines = [
      `Casting Application — ${BRAND.name}`,
      `Name: ${data.fullName}`,
      `City: ${data.city}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : "",
      data.instagram ? `Instagram: ${data.instagram}` : "",
      `Portfolio: ${data.portfolioUrl}`,
      `Categories: ${data.categories.join(", ") || "(not specified)"}`,
      `Experience: ${data.experience}`,
      `Comfort: ${((data.comfortLevels ?? []).join(", ") || "(not specified)")}`,
      `Nudity: ${
        data.openToNude
          ? (({unspecified:"Unspecified", implied:"Implied", artistic:"Artistic"} as const)[data.nudePreference] || "Yes")
          : "No"
      }`,
      data.openToNude && data.privacyNotes ? `Privacy notes: ${data.privacyNotes}` : "",
      data.heightCm ? `Height: ${data.heightCm} cm` : "",
      [data.chest, data.waist, data.hips].some(Boolean)
        ? `Sizes (C-W-H): ${data.chest || "?"}-${data.waist || "?"}-${data.hips || "?"}`
        : "",
      data.dressSize ? `Dress Size: ${data.dressSize}` : "",
      data.shoeSize ? `Shoe: ${data.shoeSize}` : "",
      `Availability: ${data.availability}`,
      `Image links: ${parsedLinks.join(" | ")}`,
      data.message ? `Message: ${data.message}` : "",
      data.moods?.length ? `Moods: ${data.moods.join(", ")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(lines)}`;
  }, [data, parsedLinks, waNumber]);

  const goNext = () => {
    const ids = fieldsForStep(step);
    setTouched((t) => ({ ...t, ...Object.fromEntries(ids.map((k) => [k, true])) }));
    if (stepErrors.length > 0 || !canProceedStep) {
      setError("invalid");
      requestAnimationFrame(() => {
        if (stepErrors.length) focusField(stepErrors[0].id);
      });
      return;
    }
    setError(null);
    setMaxStep((m) => Math.max(m, step + 1));
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    setJustSaved(false);
  };
  const goBack = () => { setStep((s) => Math.max(s - 1, 0)); setJustSaved(false); };
  const goToStep = (i: number) => {
    if (submitted) return; // lock navigation once submitted
    if (i <= maxStep) { setStep(i); setJustSaved(false); }
  };
  const saveAndExit = () => { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(data)); } catch {} setJustSaved(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const focusField = (id: string) => {
    const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    if (el) {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-attn");
      window.setTimeout(() => el.classList.remove("ring-attn"), 1200);
    }
  };

  const handleKeyNav = (ev: React.KeyboardEvent) => {
    const tag = (ev.target as HTMLElement)?.tagName?.toLowerCase();
    const isTextArea = tag === 'textarea';
    if (ev.key === 'Enter' && !ev.shiftKey && !isTextArea) {
      ev.preventDefault();
      if (step < TOTAL_STEPS - 1) goNext();
    } else if (ev.key === 'Enter' && ev.shiftKey) {
      ev.preventDefault();
      if (step > 0) goBack();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = (e.target as any);

    if (name === "dob") {
      const nextDob = value;
      const isAdult = ageFromDob(nextDob) >= 18;
      setData((s) => ({
        ...s,
        dob: nextDob,
        isAdult,
        ...(isAdult ? {} : { openToNude: false, nudePreference: "no", nudeConsent: false, comfortLevels: (s.comfortLevels || []).filter((l) => !l.includes("Nude")), privacyNotes: "" })
      }));
      return;
    }

    if (name === "categories") {
      setData((s) => {
        const next = new Set(s.categories);
        if (checked) next.add(value);
        else next.delete(value);
        return { ...s, categories: Array.from(next) };
      });
      return;
    }

    if (name === "moods") {
      setData((s) => {
        const base = Array.isArray(s.moods) ? s.moods : [];
        const next = new Set(base);
        if (checked) next.add(value); else next.delete(value);
        return { ...s, moods: Array.from(next) };
      });
      return;
    }

    if (name === "openToNude") {
      const on = Boolean(checked);
      setData((s) => {
        const next: FormState = {
          ...s,
          openToNude: on,
          // when turning on, default to "unspecified" if previous was "no"
          nudePreference: on ? (s.nudePreference === "no" ? "unspecified" : s.nudePreference) : "no",
          nudeConsent: on ? s.nudeConsent : false,
          comfortLevels: on ? s.comfortLevels : (s.comfortLevels || []).filter((l) => !l.includes("Nude")),
          privacyNotes: on ? s.privacyNotes : "",
        };
        return next;
      });
      return;
    }

    if (type === "checkbox") setData((s) => ({ ...s, [name]: checked }));
    else setData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSummary(true);
    setTouched({
      fullName: true,
      email: true,
      city: true,
      portfolioUrl: true,
      availability: true,
      imageLinks: true,
      dob: true,
      poshConsent: true,
      phone: true,
      ...(data.openToNude ? { nudeConsent: true } : {}),
    });

    if (!isValid) {
      setError("invalid");
      requestAnimationFrame(() => {
        if (errorItems.length) focusField(errorItems[0].id);
      });
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const payload = {
        ...data,
        parsedLinks,
        source: "casting_page",
        page: pageUrl,
        referrer,
        timezone: tz,
        userAgent: ua,
        timestamp: new Date().toISOString(),
      };
      if (endpoint) {
        const isAppsScript = /script\.google\.com/.test(endpoint);
        const res = await fetch(endpoint, {
          method: "POST",
          headers: isAppsScript
            ? { "Content-Type": "text/plain;charset=utf-8" }
            : { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!isAppsScript && !res.ok) throw new Error(`Submission failed (${res.status})`);
        if (isAppsScript) {
          try {
            const j = await res.json();
            if (!j?.ok) throw new Error("Apps Script reported failure");
          } catch {
            // If non-JSON, assume success for simple CORS mode
          }
        }
      }
      setSubmitted(true);
      setData(initialState);
      localStorage.removeItem(LOCAL_KEY);
      setTouched({});
      setStep(0);
      setMaxStep(0);
      setShowSummary(false);
      setJustSaved(false);
      setError(null);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setError("We couldn't submit to the server. You can still send via WhatsApp below.");
    } finally {
      setSubmitting(false);
    }
  };

  // JSON-LD
  const jobPostingJson = useMemo(() => {
    const now = new Date();
    const valid = new Date(now);
    valid.setDate(valid.getDate() + 30);
    const toIso = (d: Date) => d.toISOString().slice(0, 16);
    const json = {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      title: "Models (Fashion/Commercial) — Alina Popova",
      description:
        "Casting professional adult models (18+) for fashion, commercial, and e-commerce shoots. Paid day rates. Usage: Brand web & social. Safe, respectful set. All looks welcome.",
      datePosted: now.toISOString().slice(0, 10),
      validThrough: `${toIso(valid)}`,
      employmentType: ["CONTRACTOR", "PART_TIME"],
      directApply: true,
      hiringOrganization: {
        "@type": "Organization",
        name: BRAND.name,
        sameAs: BRAND.domain,
        logo: `${BRAND.domain}/logo.png`,
      },
      jobLocationType: "ON_SITE",
      applicantLocationRequirements: { "@type": "Country", name: "India" },
      jobLocation: [
        { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "MH", addressCountry: "IN" } },
        { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "KA", addressCountry: "IN" } },
      ],
      baseSalary: { "@type": "MonetaryAmount", currency: "INR", value: { "@type": "QuantitativeValue", minValue: 3000, maxValue: 20000, unitText: "DAY" } },
      applicantInstructions: "Apply via the form on this page with your portfolio/Instagram and 3–6 image links.",
      url: `${BRAND.domain}/casting`,
    } as const;
    return JSON.stringify(json);
  }, []);

  // Sticky CTA visibility (mobile)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const opts: IntersectionObserverInit = { threshold: 0.12 };
    const heroObs = new IntersectionObserver(([e]) => setIsHeroInView(!!e?.isIntersecting), opts);
    const formObs = new IntersectionObserver(([e]) => setIsFormInView(!!e?.isIntersecting), opts);
    const footerObs = new IntersectionObserver(([e]) => setIsFooterInView(!!e?.isIntersecting), { threshold: 0.2 });

    if (heroRef.current) heroObs.observe(heroRef.current);
    if (formRef.current) formObs.observe(formRef.current);
    if (footerRef.current) footerObs.observe(footerRef.current);

    return () => { heroObs.disconnect(); formObs.disconnect(); footerObs.disconnect(); };
  }, []);

  const Accent = { gradient: "from-[#003459] via-[#007EA7] to-[#00a8e8]" } as const;

  const CTAButton = ({
    children, type = "button", onClick, disabled = false, variant = "primary",
  }: { children: React.ReactNode; type?: "button" | "submit"; onClick?: () => void; disabled?: boolean; variant?: "primary" | "ghost"; }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        variant === "primary"
          ? "cta inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-white min-w-[160px] disabled:opacity-60 disabled:cursor-not-allowed"
          : "cta-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 min-w-[160px] disabled:opacity-60 disabled:cursor-not-allowed"
      }
    >
      <span className="font-medium">{children}</span>
      <ChevronRight className="h-4 w-4" aria-hidden />
    </button>
  );

  return (
    <>
      <Head>
        <title>Casting — {BRAND.name}</title>
        <meta
          name="description"
          content="Professional model casting for fashion, commercial, and e-commerce shoots. Paid projects. Safe, respectful. Apply with portfolio and image links."
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jobPostingJson }} />
      </Head>
      <Header />
      {/* Spacer to push content below fixed header */}
      <div className="h-16 md:h-20" aria-hidden />

      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className={`absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-tr ${Accent.gradient} blur-3xl opacity-30 animate-[spin_25s_linear_infinite]`} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to bottom, #ffffff, #f8fafc)", opacity: 1 }} />
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 40 40\\'><g fill=\\'none\\' stroke=\\'%23000\\' stroke-opacity=\\'0.15\\' stroke-width=\\'0.5\\'><path d=\\'M0 20h40M20 0v40\\'/></g></svg>')" }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs uppercase tracking-wide backdrop-blur">
              <span className={`inline-block h-2 w-2 rounded-full bg-gradient-to-r ${Accent.gradient}`} />
              Casting Call • India
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">Become a Star — Fashion, Commercial & E-com</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">Bring your modeling vision to life. Paid day rates • Web & Social usage • Safe, respectful, India-compliant sets • All looks welcome.</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <CTAButton onClick={scrollToForm}>Apply Now</CTAButton>
              {waNumber && (
                <a href={waHref} target="_blank" rel="noreferrer" className="cta-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium min-w-[160px]">
                  Quick Apply on WhatsApp
                </a>
              )}
            </div>
            <p className="mt-3 text-xs text-slate-500">You’ll get a response within 1 business day.</p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            {/* overflow-visible on mobile prevents clipped dropdowns */}
            <div className="overflow-visible md:overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
              {/* Progress bar */}
              <div className={`h-1 w-full bg-gradient-to-r from-emerald-500 via-[#00a8e8] to-emerald-500`} style={{ width: `${Math.max(6, Math.round(((step + 1) / TOTAL_STEPS) * 100))}%` }} />
              <div className="p-6">
                <h2 className="text-2xl font-semibold">Apply for Casting</h2>
                <p className="mt-2 text-sm text-slate-600">Please complete all required fields. Share 3–6 public links to recent images (Drive/portfolio/IG posts).</p>

                {submitted && (
                  <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900" role="status" aria-live="polite">
                    <p className="font-medium">Application received.</p>
                    <p className="text-sm">We’ll review and get back within 1 business day.</p>
                  </div>
                )}

                {error && showSummary && (
                  <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-900" role="alert" aria-live="assertive">
                    <p className="font-medium">
                      We found {stepErrors.length} {stepErrors.length === 1 ? "issue" : "issues"} to review
                    </p>
                    <ul className="mt-2 space-y-2 text-sm">
                      {stepErrors.map((it) => (
                        <li key={it.id} className="flex items-start justify-between gap-3">
                          <span>
                            <span className="font-medium">{it.label}:</span> {it.message}
                          </span>
                          <button
                            type="button"
                            onClick={() => focusField(it.id)}
                            className="shrink-0 rounded-md border border-black/10 bg-white/70 px-2 py-1 text-xs text-slate-800 hover:bg-white"
                          >
                            Go to
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyNav} className="mt-6 grid grid-cols-1 gap-6">
                  {/* Step header */}
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <div>Step {step + 1} of {TOTAL_STEPS}</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                        <span key={i} className={`h-1.5 w-6 rounded-full transition-all ${i <= step ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                      ))}
                    </div>
                  </div>

                  {/* Stepper nav */}
                  <nav className="mt-5 mb-4 overflow-x-auto py-1.5">
                    <ol className="flex items-center gap-2 text-xs">
                      {STEP_LABELS.map((lbl, i) => {
                        const done = i < step;
                        const active = i === step;
                        const reachable = i <= maxStep && !submitted;
                        return (
                          <li key={lbl}>
                            <button
                              type="button"
                              onClick={() => reachable && goToStep(i)}
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition ${
                                active ? 'bg-emerald-600 text-white' : done ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-white text-slate-700 ring-1 ring-black/10'
                              } ${!reachable ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-sm'}`}
                              aria-current={active ? 'step' : undefined}
                            >
                              <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${active ? 'bg-white/20' : done ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                              </span>
                              <span className="whitespace-nowrap">{lbl}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </nav>

                  <div key={step} className="animate-step space-y-6">
                  {/* STEP 1: Basics */}
                  {step === 0 && (
                    <>
                      <SectionTitle>Basics</SectionTitle>
                      <div className="grid gap-5 md:grid-cols-2">
                        <FloatingInput name="fullName" label="Full name" value={data.fullName} onChange={handleChange} onBlur={() => setTouched((t)=>({...t, fullName: true}))} placeholder="Your legal name" status={statuses.fullName} errorMessage={touched.fullName && !validations.fullName.valid ? validations.fullName.message : undefined} required />
                        <FloatingInput name="city" label="City" value={data.city} onChange={handleChange} onBlur={() => setTouched((t)=>({...t, city: true}))} placeholder="Mumbai / Bengaluru / Ahmedabad" status={statuses.city} errorMessage={touched.city && !validations.city.valid ? validations.city.message : undefined} required />
                      </div>
                      <div className="grid gap-5 md:grid-cols-2">
                        <FloatingInput name="email" type="email" label="Email" value={data.email} onChange={handleChange} onBlur={() => setTouched((t)=>({...t, email: true}))} placeholder="name@example.com" status={statuses.email} errorMessage={touched.email && !validations.email.valid ? validations.email.message : undefined} required />
                        <FloatingInput name="dob" type="date" label="Date of birth" value={data.dob} onChange={handleChange} onBlur={() => setTouched((t)=>({...t, dob: true}))} placeholder="" status={statuses.dob} errorMessage={touched.dob && !validations.dob.valid ? validations.dob.message : undefined} required />
                      </div>
                    </>
                  )}

                  {/* STEP 2: Portfolio & Availability */}
                  {step === 1 && (
                    <>
                      <SectionTitle>Portfolio & Availability</SectionTitle>
                      <div className="grid gap-5 md:grid-cols-2">
                        <FloatingInput
                          name="portfolioUrl"
                          label="Portfolio link (optional)"
                          value={data.portfolioUrl}
                          onChange={handleChange}
                          onBlur={() => setTouched((t)=>({...t, portfolioUrl: true}))}
                          placeholder="https://..."
                          status={statuses.portfolioUrl}
                          hint={
                            !data.portfolioUrl
                              ? "Optional — if you don't have a site, just paste image links in the next step"
                              : (!urlOk(data.portfolioUrl) ? "Add https://" : "Looks good")
                          }
                          errorMessage={touched.portfolioUrl && !!data.portfolioUrl && !validations.portfolioUrl.valid ? validations.portfolioUrl.message : undefined}
                        />
                        <FloatingInput name="availability" label="Availability window" value={data.availability} onChange={handleChange} onBlur={() => setTouched((t)=>({...t, availability: true}))} placeholder="e.g., 28–30 Sept, flexible" status={statuses.availability} errorMessage={touched.availability && !validations.availability.valid ? validations.availability.message : undefined} required />
                      </div>
                      <div className="grid gap-5 md:grid-cols-2">
                        <FloatingInput name="phone" label="Phone" value={data.phone || ''} onChange={handleChange} onBlur={() => setTouched((t)=>({...t, phone: true}))} placeholder="Optional" status={statuses.phone} errorMessage={touched.phone && !validations.phone.valid ? validations.phone.message : undefined} />
                        <FloatingSelect
                          name="experience"
                          label="Experience level"
                          value={data.experience}
                          onChange={handleChange}
                          options={[
                            { value: "starter",      label: "Starter / New Face" },
                            { value: "intermediate", label: "Intermediate / E-com" },
                            { value: "agency",       label: "Agency / Represented" },
                          ]}
                        />
                      </div>
                    </>
                  )}

                  {/* STEP 3: Measurements */}
                  {step === 2 && (
                    <>
                      <SectionTitle>Measurements (optional)</SectionTitle>
                      <div className="grid gap-5 md:grid-cols-4">
                        <FloatingInput name="heightCm" label="Height (cm)" value={data.heightCm || ''} onChange={handleChange} placeholder="170" status="neutral" />
                        <FloatingInput name="chest" label="Chest" value={data.chest || ''} onChange={handleChange} placeholder="34" status="neutral" />
                        <FloatingInput name="waist" label="Waist" value={data.waist || ''} onChange={handleChange} placeholder="26" status="neutral" />
                        <FloatingInput name="hips" label="Hips" value={data.hips || ''} onChange={handleChange} placeholder="36" status="neutral" />
                      </div>
                    </>
                  )}

                  {/* STEP 4: Categories & Moods */}
                  {step === 3 && (
                    <>
                      <SectionTitle>Categories & Moods</SectionTitle>
                      <div>
                        <div className="mb-2 text-sm font-medium">Categories (select all that apply)</div>
                        <div className="flex flex-wrap gap-2">
                          {['Fashion','Commercial','E-commerce','UGC / Reels'].map((c) => (
                            <Pill
                              key={c}
                              value={c}
                              checked={(data.categories || []).includes(c)}
                              onChange={() => setData((s) => ({
                                ...s,
                                categories: (s.categories || []).includes(c)
                                  ? (s.categories || []).filter((x) => x !== c)
                                  : [...(s.categories || []), c],
                              }))}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 mt-3 text-sm font-medium">Moods (optional)</div>
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                          {MOOD_OPTIONS.map((m) => (
                            <MoodTile
                              key={m.key}
                              label={m.label}
                              img={m.img}
                              selected={(data.moods ?? []).includes(m.key)}
                              onToggle={() => setData((s) => {
                                const cur = Array.isArray(s.moods) ? s.moods : [];
                                return { ...s, moods: cur.includes(m.key) ? cur.filter((x) => x !== m.key) : [...cur, m.key] };
                              })}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-5 md:grid-cols-2">
                        <FloatingInput name="dressSize" label="Dress Size" value={data.dressSize || ''} onChange={handleChange} placeholder="" status="neutral" />
                        <FloatingInput name="shoeSize" label="Shoe" value={data.shoeSize || ''} onChange={handleChange} placeholder="" status="neutral" />
                      </div>
                    </>
                  )}

                  {/* STEP 5: Wardrobe Comfort & Nude */}
                  {step === 4 && (
                    <>
                      <SectionTitle>Wardrobe Comfort & Nude Photography</SectionTitle>
                      <div className="flex items-center justify-between rounded-xl border border-black/10 bg-white p-3 sm:p-4">
                        <div className="pr-4">
                          <div className="text-sm font-medium">Nude photography (optional)</div>
                          <p className="text-xs text-slate-500">Enable only if comfortable. <strong>18+ required</strong>. Non-sexual, India-compliant content only.</p>
                          {!data.isAdult && <p className="mt-1 text-[11px] text-rose-600">Add your Date of Birth in <strong>Basics</strong> to enable this (18+ only).</p>}
                        </div>
                        <Switch
                          checked={data.openToNude}
                          onToggle={() => {
                            if (!data.isAdult) {
                              setTouched((t) => ({ ...t, dob: true }));
                              setError('You must be 18+. Please add your Date of Birth in Basics.');
                              const el = document.getElementById('dob');
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              return;
                            }
                            handleChange({ target: { name: 'openToNude', checked: !data.openToNude, type: 'checkbox', value: '' } } as any);
                          }}
                          highlight={!data.isAdult}
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <div className="mb-2 mt-1 text-sm font-medium">Comfort levels (select all that apply)</div>
                          <p className="-mt-1 mb-2 text-xs text-slate-500">Choose only what you’re comfortable with.</p>
                          <div className="flex flex-wrap gap-x-2.5 gap-y-3">
                            {visibleComfortLevels.map((c) => (
                              <Pill
                                key={c}
                                value={c}
                                checked={(data.comfortLevels ?? []).includes(c)}
                                onChange={() => setData((s) => {
                                  const cur = Array.isArray(s.comfortLevels) ? s.comfortLevels : [];
                                  return { ...s, comfortLevels: cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c] };
                                })}
                              />
                            ))}
                          </div>
                        </div>

                        {data.openToNude && (
                          <div>
                            <FloatingSelect
                              name="nudePreference"
                              label="Nudity preference (India-compliant)"
                              value={data.nudePreference}
                              onChange={handleChange}
                              hint="18+ only • non-sexual content • closed set available • usage only with written consent."
                              options={[
                                { value: "implied",     label: "Implied nude (covered)" },
                                { value: "artistic",    label: "Artistic nude (non-sexual)" },
                                { value: "unspecified", label: "Prefer not to say" },
                              ]}
                            />
                            <label className="mt-3 flex items-start gap-3 text-sm">
                              <input type="checkbox" name="nudeConsent" checked={data.nudeConsent} onChange={handleChange} className="mt-1 h-4 w-4 rounded border-black/20" required={data.openToNude} />
                              <span>I confirm I’m <strong>18+</strong> and I consent to the selected non-sexual nudity levels.</span>
                            </label>
                          </div>
                        )}
                      </div>

                      {data.openToNude && (data.nudePreference === 'implied' || data.nudePreference === 'artistic' || (data.comfortLevels || []).some((l) => l.includes('Nude'))) && (
                        <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-900">
                          <p><strong>Safety & legal (India):</strong> 18+ only; non-sexual content; no obscene/illegal material; closed set on request; usage per written consent.</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* STEP 6: Links & Notes */}
                  {step === 5 && (
                    <>
                      <SectionTitle>Image Links & Notes</SectionTitle>
                      <FloatingInput
                        name="instagram"
                        label="Instagram (optional)"
                        value={data.instagram || ''}
                        onChange={handleChange}
                        placeholder="@username or link"
                        status="neutral"
                        hint={!data.instagram ? 'Optional' : (data.instagram.startsWith('@') || data.instagram.startsWith('http')) ? 'Looks good' : 'Start with @username or https://...'}
                      />
                      <FloatingTextarea
                        name="imageLinks"
                        label="Paste 3–6 public links (Drive/portfolio/IG posts)"
                        value={data.imageLinks}
                        onChange={handleChange}
                        onBlur={() => setTouched((t)=>({...t, imageLinks: true}))}
                        placeholder={`https://drive.google.com/...\nhttps://yourportfolio.com/...\nhttps://www.instagram.com/p/...`}
                        status={statuses.imageLinks}
                        errorMessage={touched.imageLinks && !validations.imageLinks.valid ? validations.imageLinks.message : undefined}
                        hint="Use commas, spaces, or new lines. Only http(s) links are counted. Duplicates are ignored."
                        required
                      />

                      {/* Detected links (chips) */}
                      {parsedLinks.length > 0 && (
                        <div className="-mt-2 flex flex-wrap items-center gap-2" aria-live="polite">
                          {parsedLinks.map((l, i) => (
                            <a key={i} href={l} target="_blank" rel="noreferrer" className="group inline-flex max-w-full items-center gap-2 truncate rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs text-slate-700 transition hover:shadow-sm">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                              <span className="truncate">{l}</span>
                            </a>
                          ))}
                          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] ${linksValid ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'}`}>{parsedLinks.length} detected</span>
                        </div>
                      )}

                      {/* Ignored tokens (help user fix) */}
                      {invalidTokens.length > 0 && (
                        <div className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-[12px] text-amber-900 ring-1 ring-amber-200">
                          <strong className="mr-1">Ignored:</strong>
                          {invalidTokens.slice(0, 6).join(", ")}
                          {invalidTokens.length > 6 ? "…" : ""}
                          <span className="ml-2 text-amber-800/80">(must start with http:// or https://)</span>
                        </div>
                      )}

                      {data.openToNude && (
                        <FloatingTextarea
                          name="privacyNotes"
                          label="Boundaries / privacy notes (optional)"
                          value={data.privacyNotes || ''}
                          onChange={handleChange}
                          placeholder=" "
                          hint="Closed set, no BTS, specific boundaries"
                          status="neutral"
                        />
                      )}
                      <FloatingTextarea
                        name="message"
                        label="Anything we should know (optional)"
                        value={data.message || ''}
                        onChange={handleChange}
                        placeholder=" "
                        hint="Conflicts, travel, special skills"
                        maxLength={280}
                        status="neutral"
                      />
                      <div className="-mt-2 text-right text-[11px] text-slate-500">{(data.message || '').length}/280</div>
                    </>
                  )}

                  {/* STEP 7: Policies & Review */}
                  {step === 6 && (
                    <>
                      <SectionTitle>Policies & Review</SectionTitle>
                      <div ref={policiesRef} className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[12px] ring-1 ${data.isAdult ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-rose-50 text-rose-700 ring-rose-200'}`}>
                            {data.isAdult ? '18+ verified from DOB' : 'Under 18 — not eligible'}
                          </span>
                          {data.dob && <span className="text-xs text-slate-500">DOB: {data.dob}</span>}
                        </div>
                        <label className="flex items-start gap-3 text-sm">
                          <input type="checkbox" name="poshConsent" checked={data.poshConsent} onChange={handleChange} className="mt-1 h-4 w-4 rounded border-black/20" required />
                          <span>I agree to a <strong>professional, respectful</strong> working environment and the code of conduct on set.</span>
                        </label>
                      </div>
                      <div className="mt-4 rounded-xl border border-black/10 bg-white p-4 text-sm text-slate-700">
                        <div className="font-medium mb-2">Quick review</div>
                        <ul className="grid grid-cols-1 gap-y-1 md:grid-cols-2">
                          <li><strong>Name:</strong> {data.fullName || '—'}</li>
                          <li><strong>City:</strong> {data.city || '—'}</li>
                          <li><strong>Email:</strong> {data.email || '—'}</li>
                          <li><strong>Age:</strong> {data.dob ? `${ageFromDob(data.dob)} (${data.dob})` : '—'}</li>
                          <li><strong>Portfolio:</strong> {data.portfolioUrl || '—'}</li>
                          <li><strong>Availability:</strong> {data.availability || '—'}</li>
                          <li><strong>Categories:</strong> {(data.categories || []).join(', ') || '—'}</li>
                          <li><strong>Comfort:</strong> {(data.comfortLevels || []).join(', ') || '—'}</li>
                          <li>
                            <strong>Nude:</strong>{" "}
                            {data.openToNude
                              ? ({ unspecified: "Yes — Unspecified", implied: "Yes — Implied", artistic: "Yes — Artistic" } as const)[data.nudePreference] || "Yes"
                              : "No"}
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                  </div>

                  {/* Wizard actions */}
                  <div className="flex flex-col items-center justify-between gap-3 pt-2 md:flex-row">
                    <div className="order-2 flex items-center gap-2 md:order-1">
                      <button type="button" onClick={goBack} disabled={submitted || step === 0} className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-slate-700 disabled:opacity-50 hover:shadow-sm">Back</button>
                      <button type="button" onClick={saveAndExit} disabled={submitted} className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-slate-700 hover:shadow-sm">Save & Exit</button>
                    </div>

                    <div className="order-1 flex items-center gap-3 md:order-2">
                      {step < TOTAL_STEPS - 1 ? (
                        <CTAButton type="button" onClick={goNext} disabled={!canProceedStep}>{`Next · ${STEP_LABELS[step + 1]}`}</CTAButton>
                      ) : (
                        <CTAButton type="submit" disabled={!isValid || submitting}>{submitting ? 'Submitting…' : 'Submit application'}</CTAButton>
                      )}
                    </div>
                  </div>

                  {justSaved && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900 text-sm" role="status" aria-live="polite">
                      Progress saved locally. You can close this tab and continue later on this device.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 pb-16">
          <div className="rounded-2xl border border-black/5 bg-gradient-to-b from-white to-slate-50 p-6 text-center text-sm text-slate-600">
            <p>Shortlisted talent will receive a call sheet with styling, MUA/H schedule, location, and payment terms. Chaperones are welcome.</p>
          </div>
          {/* sentinel for sticky CTA hide */}
          <div ref={footerRef} className="h-2 w-full" />
        </div>
      </section>

      {/* Success overlay modal */}
      {submitted && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-6" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-7 w-7" aria-hidden />
            </div>
            <h3 className="text-lg font-semibold">Application submitted</h3>
            <p className="mt-1 text-sm text-slate-600">We’ll review and get back within 1 business day.</p>
            <div className="mt-5 flex items-center justify-center gap-2">
              {waNumber && (
                <a href={waHref} target="_blank" rel="noreferrer" className="cta-ghost inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm">
                  Share more on WhatsApp
                </a>
              )}
              <button type="button" onClick={() => setSubmitted(false)} className="cta inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm text-white">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky mobile CTA — only when hero & form & footer are not visible */}
      {(!isHeroInView && !isFormInView && !isFooterInView) && (
        <div
          className="md:hidden fixed left-1/2 z-40 -translate-x-1/2"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
        >
          <CTAButton onClick={scrollToForm}>Apply Now</CTAButton>
        </div>
      )}

      {/* Global styles */}
      <style jsx global>{`
        .fi { position: relative; }
        .fi > input, .fi > textarea, .fi > select { width: 100%; }
        .fi > input::placeholder, .fi > textarea::placeholder { color: transparent; opacity: 0; }
        .fi > label {
          position: absolute; left: 12px; top: 10px; font-size: 12px; line-height: 1;
          color: #64748b; pointer-events: none; transform-origin: left top; transition: all .16s ease;
          padding: 2px 6px; border-radius: 8px; background: #ffffff;
        }
        .fi > input:placeholder-shown + label, .fi > textarea:placeholder-shown + label { top: 12px; font-size: 14px; color: #94a3b8; }
        .fi > input:focus + label, .fi > textarea:focus + label,
        .fi > input:not(:placeholder-shown) + label, .fi > textarea:not(:placeholder-shown) + label { top: 8px; font-size: 12px; color: #475569; }

        /* Select (native) – hidden arrow if used anywhere else */
        .fi > select { -webkit-appearance: none; -moz-appearance: none; appearance: none; background-image: none; }

        /* Always-floated label for headless select */
        .fi.fi-select > label {
          top: 8px;
          font-size: 12px;
          color: #475569;
          background: #ffffff;
          padding: 2px 6px;
          border-radius: 8px;
        }

        .fi .hint { margin-top: 4px; font-size: 12px; color: #64748b; }
        .fi .error { margin-top: 4px; font-size: 12px; color: #e11d48; }

        /* Multi-line clamp for labels (no plugin required) */
        .clamp-2{
          display:-webkit-box;
          -webkit-line-clamp:2;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }

        .cta {
          position: relative;
          background: linear-gradient(90deg, #003459, #007EA7, #00a8e8);
          color: #fff;
          box-shadow: 0 10px 18px rgba(0,56,84,.18), 0 6px 10px rgba(0,0,0,.06);
          transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease;
          border-radius: 9999px;
        }
        .cta::after { content: ""; position: absolute; inset: 0; border-radius: 9999px; box-shadow: inset 0 1px 0 rgba(255,255,255,.38); pointer-events: none; }
        .cta:hover { transform: translateY(-1px); }
        .cta:active { transform: translateY(0); }
        .cta:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(0,168,232,.35), 0 10px 18px rgba(0,56,84,.18), 0 6px 10px rgba(0,0,0,.06); }

        .cta-ghost {
          position: relative;
          color: #0f172a; background: #ffffff; border: 1px solid rgba(2,6,23,.08);
          box-shadow: 0 1px 2px rgba(0,0,0,.06);
          transition: transform .15s ease, box-shadow .15s ease;
          border-radius: 9999px;
        }
        .cta-ghost:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(0,0,0,.08); }
        .cta-ghost:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(0,168,232,.2); }
        .ring-attn { box-shadow: 0 0 0 4px rgba(234, 88, 12, .25) !important; border-color: #f97316 !important; }

        @keyframes stepfade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-step { animation: stepfade .22s ease-out; }
        @media (prefers-reduced-motion: reduce) { .animate-step { animation: none; } }
      `}</style>
    </>
  );
}

/* Small components */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 pt-4">
      <div className="h-0.5 w-6 rounded bg-slate-200" />
      <h3 className="text-sm font-semibold tracking-wide text-slate-700">{children}</h3>
    </div>
  );
}

function FloatingInput({ name, label, value, onChange, onBlur, placeholder, required, type, hint, status, errorMessage }: any) {
  return (
    <div className="fi">
      <div className="relative">
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder || " "}
          required={required}
          type={type || "text"}
          className={fieldClass(status) + " peer"}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={errorMessage ? `${name}-error` : undefined}
        />
        <RightIcon status={status} />
      </div>
      <label htmlFor={name}>{label}{required && <span className="text-rose-500"> *</span>}</label>
      {hint && <p className="hint">{hint}</p>}
      {errorMessage && <p id={`${name}-error`} className="error">{errorMessage}</p>}
    </div>
  );
}

function FloatingTextarea({ name, label, value, onChange, onBlur, placeholder, required, maxLength, status, errorMessage, hint }: any) {
  return (
    <div className="fi">
      <div className="relative">
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder || " "}
          required={required}
          maxLength={maxLength}
          className={fieldClass(status) + " peer min-h-[110px]"}
          aria-invalid={status === 'error' || undefined}
          aria-describedby={errorMessage ? `${name}-error` : undefined}
        />
        <RightIcon status={status} />
      </div>
      <label htmlFor={name}>{label}{required && <span className="text-rose-500"> *</span>}</label>
      {errorMessage && <p id={`${name}-error`} className="error">{errorMessage}</p>}
      {hint && !errorMessage && <p className="hint">{hint}</p>}
    </div>
  );
}

/** Headless Floating Select — mobile-perfect dropdown (no OS popup) */
function FloatingSelect({
  name,
  label,
  value,
  onChange,
  required,
  status = "neutral",
  errorMessage,
  hint,
  options,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
  required?: boolean;
  status?: FieldStatus;
  errorMessage?: string;
  hint?: string;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() =>
    Math.max(0, options.findIndex((o) => o.value === value))
  );
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const i = options.findIndex((o) => o.value === value);
    if (i >= 0) setActive(i);
  }, [value, options]);

  // Close on outside click / ESC
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return;
      if (listRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const tone =
    status === "error"
      ? "text-rose-500"
      : status === "success"
      ? "text-emerald-600/90"
      : "text-slate-500";

  const selected = options.find((o) => o.value === value) || options[0];

  function commit(nextVal: string) {
    onChange({ target: { name, value: nextVal, type: "select-one" } } as any);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      commit(options[active]?.value ?? value);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className="fi fi-select">
      <div className="relative">
        <button
          ref={btnRef}
          type="button"
          role="combobox"
          aria-controls={`${name}-listbox`}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-required={required || undefined}
          aria-invalid={status === "error" || undefined}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKeyDown}
          className={
            fieldClass(status) +
            " flex items-center justify-between h-12 leading-[1.15] text-left pr-10 cursor-pointer"
          }
        >
          <span className="truncate">{selected?.label ?? ""}</span>
          <ChevronDown
            className={`pointer-events-none absolute right-3 inset-y-0 my-auto h-4 w-4 ${tone} z-10 ${
              open ? "rotate-180 transition-transform" : ""
            }`}
            aria-hidden
          />
        </button>

        {open && (
          <ul
            ref={listRef}
            id={`${name}-listbox`}
            role="listbox"
            aria-activedescendant={`${name}-opt-${active}`}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-72 overflow-auto rounded-xl border border-black/10 bg-white shadow-lg focus:outline-none"
          >
            {options.map((o, i) => {
              const isSel = o.value === value;
              const isAct = i === active;
              return (
                <li
                  id={`${name}-opt-${i}`}
                  key={o.value}
                  role="option"
                  aria-selected={isSel}
                  className={`flex cursor-pointer items-center justify-between px-3 py-2.5 text-base md:text-sm ${
                    isAct ? "bg-slate-50" : ""
                  } ${isSel ? "font-medium text-slate-900" : "text-slate-700"}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => commit(o.value)}
                >
                  <span className="truncate">{o.label}</span>
                  {isSel ? <Check className="ml-3 h-4 w-4 text-emerald-600" aria-hidden /> : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <label htmlFor={name}>
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </label>
      {errorMessage && (
        <p id={`${name}-error`} className="error">
          {errorMessage}
        </p>
      )}
      {hint && !errorMessage && <p className="hint">{hint}</p>}
    </div>
  );
}

/* MoodTile + Pill + Switch */
function MoodTile({ label, img, selected, onToggle }: { label: string; img: string; selected: boolean; onToggle: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group relative overflow-hidden rounded-xl ring-1 transition ${selected ? 'ring-emerald-500 shadow' : 'ring-black/10 hover:shadow-sm'}`}
      aria-pressed={selected}
      title={label}
    >
      {/* Aspect ratio wrapper (4:3) */}
      <div className="relative w-full pb-[75%] bg-slate-100">
        {/* Skeleton while loading */}
        {!loaded && !failed && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 to-slate-200" />
        )}

        {/* Image or fallback */}
        {!failed ? (
          <img
            src={img}
            alt={label}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-emerald-50 to-slate-100">
            <ImageIcon className="h-8 w-8 text-slate-400" aria-hidden />
          </div>
        )}
      </div>

      {/* Label bar */}
      <div className={`absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2 text-[13px] leading-snug ${selected ? 'bg-emerald-600/90 text-white' : 'bg-black/60 text-white'}`}>
        <span className="clamp-2 pr-2">{label}</span>
        <span className={`ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${selected ? 'bg-white text-emerald-700' : 'bg-white/90 text-slate-900'}`}>✓</span>
      </div>
    </button>
  );
}

function Pill({ value, checked, onChange }: { value: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`select-none rounded-full px-3 py-1.5 text-sm transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-300/50 ${
        checked
          ? "bg-emerald-700 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white ring-1 ring-emerald-700/40 shadow"
          : "border border-black/10 bg-white text-slate-800 hover:shadow-sm"
      }`}
      aria-pressed={checked}
    >
      {value}
    </button>
  );
}

function Switch({ checked, onToggle, highlight = false }: { checked: boolean; onToggle: () => void; highlight?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className={`relative inline-flex h-7 w-12 sm:h-9 sm:w-16 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-out
        ${checked ? 'bg-emerald-600' : 'bg-slate-300'}
        ${highlight ? 'ring-2 ring-rose-300' : ''}
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/40`}
    >
      <span
        className={`absolute top-1 rounded-full bg-white shadow transition-all duration-200
          ${checked ? 'right-1 left-auto' : 'left-1'}
          h-5 w-5 sm:h-7 sm:w-7`}
      />
    </button>
  );
}
