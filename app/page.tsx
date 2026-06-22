"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* ---------------- Countdown ---------------- */

function nextSundayMidnight(from: Date): Date {
  const target = new Date(from);
  // 0 = domenica. Giorni mancanti alla prossima domenica.
  const daysUntilSunday = (7 - target.getDay()) % 7;
  target.setDate(target.getDate() + daysUntilSunday);
  target.setHours(0, 0, 0, 0);
  // Se siamo già a/oltre la mezzanotte di domenica, vai alla settimana dopo.
  if (target.getTime() <= from.getTime()) {
    target.setDate(target.getDate() + 7);
  }
  return target;
}

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = Math.max(0, nextSundayMidnight(now).getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setTime(getTimeLeft()));
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const units = time
    ? [
        { value: pad(time.days), label: "GG" },
        { value: pad(time.hours), label: "ORE" },
        { value: pad(time.minutes), label: "MIN" },
        { value: pad(time.seconds), label: "SEC" },
      ]
    : [
        { value: "--", label: "GG" },
        { value: "--", label: "ORE" },
        { value: "--", label: "MIN" },
        { value: "--", label: "SEC" },
      ];

  return (
    <div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-amber-500/40 bg-black/30 px-6 py-5 backdrop-blur">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-amber-400">
        Selezione chiude tra
      </span>
      <div
        className="flex items-start gap-2 tabular-nums sm:gap-4"
        suppressHydrationWarning
      >
        {units.map((u, i) => (
          <div key={u.label} className="flex items-start gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl font-bold text-white sm:text-4xl">
                {u.value}
              </span>
              <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-widest text-slate-400">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="font-serif text-3xl font-bold text-amber-500/60 sm:text-4xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Dati ---------------- */

const avatars = [
  { src: "/team/alessio.png", alt: "Alessio" },
  { src: "/team/graziano.jpg", alt: "Graziano" },
  { src: "/team/raffaella.jpg", alt: "Raffaella" },
  { src: "/team/rosario.jpg", alt: "Rosario" },
];

const methodPoints = [
  {
    icon: "🎯",
    title: "Metodo replicabile",
    body: "Un percorso passo-passo, non improvvisazione.",
  },
  {
    icon: "📈",
    title: "Rendita progressiva",
    body: "Costruisci entrate che crescono nel tempo.",
  },
  {
    icon: "🤝",
    title: "Mentoring 1:1",
    body: "Ti seguo personalmente nei primi mesi.",
  },
];

const faqs = [
  {
    q: "Costa qualcosa per iniziare?",
    a: "No. Per iniziare non c'è nessun costo. Si parte dalle proprie bollette di luce e gas — una spesa che hai già ogni mese. Zero investimento iniziale.",
  },
  {
    q: "Devo vendere a sconosciuti?",
    a: "No. Non si parte vendendo a estranei. Si parte dalle proprie utenze e da persone che già conosci. Il modello è basato sulla condivisione, non sulla vendita porta a porta.",
  },
  {
    q: "È una catena di Sant'Antonio o una piramide?",
    a: "No. 5-15 Global Energy è la rete commerciale di Italia Gas e Luce, un fornitore di energia regolamentato da ARERA. Il guadagno deriva da utenze energetiche reali, non dal reclutamento di persone.",
  },
  {
    q: "Quanto tempo ci vuole per vedere i primi risultati?",
    a: "I primi guadagni immediati arrivano entro 7-10 giorni dalla prima utenza approvata. Le rendite mensili iniziano dopo 25-45 giorni, quando l'utenza entra in fornitura. I risultati dipendono dall'impegno di ciascuno.",
  },
  {
    q: "Cosa succede se decido di smettere?",
    a: "Puoi smettere quando vuoi. Le rendite sulle utenze già attive continuano finché i clienti restano con IGL. Non ci sono penali o costi di uscita.",
  },
];

const teamResults = [
  {
    src: "/team/graziano.jpg",
    alt: "Graziano Valitutto",
    name: "Graziano Valitutto",
    role: "Team Leader",
    earnings: "€17.603 generati",
  },
  {
    src: "/team/raffaella.jpg",
    alt: "Raffaella Trentacosti",
    name: "Raffaella Trentacosti",
    role: "Team Leader",
    earnings: "€8.913 generati",
  },
  {
    src: "/team/rosario.jpg",
    alt: "Rosario Di Domenico",
    name: "Rosario Di Domenico",
    role: "Team Leader",
    earnings: "€5.999 generati",
  },
];

/* ---------------- FAQ ---------------- */

function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-12 space-y-4">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-blue-900 bg-[#020d1a]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-semibold text-white sm:text-lg">
                {item.q}
              </span>
              <span
                aria-hidden
                className={`shrink-0 text-amber-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-base leading-relaxed text-slate-300">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Pagina ---------------- */

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-b from-[#020b18] via-[#051525] to-[#0a1f35] font-sans text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-600/20 blur-[130px]"
        />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-12 text-center md:py-16">
          {/* Badge */}
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-300">
            ⚡ Selezione collaboratori aperta
          </span>

          {/* Headline */}
          <h1 className="font-serif font-bold leading-none tracking-tight">
            <span className="block text-6xl text-white sm:text-7xl md:text-8xl">
              GUADAGNA
            </span>
            <span className="mt-2 block text-4xl italic text-amber-500 sm:text-5xl md:text-6xl">
              ogni settimana
            </span>
          </h1>

          {/* Sottotitolo */}
          <p className="mt-7 max-w-2xl text-pretty text-lg text-slate-300 sm:text-xl">
            Un metodo serio, non un guadagno passivo immediato. Selezioniamo solo
            chi è pronto a impegnarsi davvero.
          </p>

          {/* Blocco prezzo */}
          <div className="mt-10 flex flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Senza investire
            </span>
            <div className="relative mt-4 flex items-end gap-4">
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  Era
                </span>
                <span className="text-2xl font-medium text-slate-500 line-through">
                  100€
                </span>
              </div>
              <span className="font-serif text-7xl font-bold leading-none text-amber-500 sm:text-8xl">
                0€
              </span>
              <span className="absolute -right-4 -top-3 rotate-6 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-950 shadow-lg shadow-emerald-500/30">
                Free Access
              </span>
            </div>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Accesso limitato · No skill richieste
          </p>

          {/* CTA */}
          <a
            href="#form"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/70 bg-black/30 px-9 py-4 text-base font-semibold text-amber-300 backdrop-blur transition-colors hover:border-amber-400 hover:bg-amber-500 hover:text-neutral-950"
          >
            Inizia la selezione <span aria-hidden>→</span>
          </a>
          <p className="mt-4 text-sm text-slate-400">
            ⏱ 60 secondi · 3 domande · Nessun impegno
          </p>

          {/* Social proof */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex">
                {avatars.map((a) => (
                  <Image
                    key={a.src}
                    src={a.src}
                    alt={a.alt}
                    width={40}
                    height={40}
                    className="-ml-3 h-10 w-10 rounded-full border-2 border-blue-900 object-cover object-top first:ml-0"
                  />
                ))}
                <div className="-ml-3 flex h-10 items-center justify-center rounded-full border-2 border-blue-900 bg-slate-700 px-3 text-sm font-bold text-white">
                  +970
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400" aria-hidden>
                ★★★★★
              </span>
              <span className="text-sm font-semibold text-slate-200">
                4.9/5
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              970+ persone nella rete. Manchi solo tu.
            </p>
          </div>

          {/* Countdown */}
          <div className="mt-12">
            <Countdown />
          </div>
        </div>
      </section>

      {/* VIDEO BLOCCATO */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-blue-900 bg-[#020d1a] px-8 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-900 bg-white/5 text-2xl text-amber-400">
              ▶
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Il video di presentazione si sblocca dopo la selezione
            </h2>
            <p className="max-w-md text-sm text-slate-400">
              Compila il form per accedere al video e ai prossimi passi.
            </p>
            <a
              href="#form"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/70 bg-black/30 px-8 py-3.5 text-base font-semibold text-amber-300 backdrop-blur transition-colors hover:border-amber-400 hover:bg-amber-500 hover:text-neutral-950"
            >
              Guarda il video riservato <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CHI SONO */}
      <section className="border-t border-white/5">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-12 md:grid-cols-2 md:py-16">
          <div className="relative min-h-[400px] w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-white/5">
            <Image
              src="/team/alessio.png"
              alt="Alessio Frediani"
              width={500}
              height={600}
              className="h-full w-full rounded-2xl object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/80 px-5 py-4">
              <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
                Group Leader
              </span>
              <span className="mt-1 block font-bold text-white">
                €22.000+ di rendita negli ultimi 12 mesi
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              26 anni · Group Leader · 5-15 Global Energy Italia
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Chi sono
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-slate-300">
              Ho 26 anni, vengo da Viareggio e ho iniziato il mio percorso
              imprenditoriale ancora durante gli studi — prima con un&apos;attività
              e-commerce su Amazon, poi come Social Media Manager. Dal 2023 ho
              scelto il settore energetico: oggi gestisco una rete di oltre 970
              persone e ho generato più di €22.000 di rendita ricorrente. Non cerco
              tutti — cerco persone serie, disposte a costruire qualcosa di
              concreto.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300">
                €22.000+ di rendita generati
              </span>
              <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300">
                970+ persone nella rete
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* RISULTATI REALI DEL TEAM */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center rounded-full border border-blue-900 bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-slate-300">
              📈 Risultati reali · Ultimi 12 mesi
            </span>
            <h2 className="mt-6 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Guadagni reali del team
            </h2>
            <p className="mt-4 max-w-xl text-slate-400">
              Persone vere, risultati ottenuti con impegno e costanza.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {teamResults.map((member) => (
              <div
                key={member.name}
                className="overflow-hidden rounded-2xl border border-blue-900 bg-[#020d1a] transition-colors hover:border-amber-500/30"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={member.src}
                    alt={member.alt}
                    width={400}
                    height={533}
                    className="h-full w-full object-cover object-[50%_10%]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
                    {member.role}
                  </p>
                  <p className="mt-4 font-bold text-emerald-400">
                    {member.earnings}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-slate-500">
            I risultati indicati sono individuali e dipendono da impegno, costanza
            e tempo dedicato. Non costituiscono garanzia di guadagno.
          </p>
        </div>
      </section>

      {/* RISULTATI REALI DEL METODO */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Risultati reali del metodo
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
            Quello che ottieni con costanza e impegno.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {methodPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl border border-blue-900 bg-[#020d1a] p-8 transition-colors hover:border-amber-500/30"
              >
                <div className="text-3xl" aria-hidden>
                  {point.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {point.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-300">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Domande frequenti
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
            Le risposte alle domande che tutti si fanno.
          </p>
          <Faq />
        </div>
      </section>

      {/* CTA FINALE */}
      <section
        id="form"
        className="scroll-mt-8 border-t border-white/5 bg-gradient-to-br from-amber-500/15 via-blue-600/15 to-blue-900/20"
      >
        <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-12 text-center md:py-16">
          <h2 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            Pronto a scoprire come funziona?
          </h2>
          <p className="mt-4 text-slate-300">
            Guarda il video di presentazione e scopri se fa per te.
          </p>
          <a
            href="/grazie"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-10 py-4 text-base font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400"
          >
            Inizia adesso — è gratuito <span aria-hidden>→</span>
          </a>
          <p className="mt-4 text-sm text-slate-400">
            ⏱ Rispondo personalmente entro 24 ore
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-8 text-center text-sm text-slate-500">
          <span>
            © {new Date().getFullYear()} Alessio Frediani · Global Energy Italia
          </span>
          <a href="/privacy" className="text-slate-400 transition-colors hover:text-amber-400">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
