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
  { initials: "MR", bg: "bg-amber-500" },
  { initials: "GL", bg: "bg-blue-500" },
  { initials: "SF", bg: "bg-emerald-500" },
  { initials: "AC", bg: "bg-purple-500" },
];

const steps = [
  {
    n: "1",
    title: "Attivi le tue utenze",
    body: "Sposti luce e gas con Italia Gas e Luce. Una spesa che hai già, a costo zero.",
  },
  {
    n: "2",
    title: "Costruisci una piccola rete",
    body: "Coinvolgi persone che fanno esattamente lo stesso: spostare una spesa che hanno già.",
  },
  {
    n: "3",
    title: "Percepisci ricorrenti mensili",
    body: "Ricevi commissioni ricorrenti automatiche finché le utenze restano attive.",
  },
];

const forYou = [
  "Per chi vuole un'entrata extra concreta",
  "Per chi ha almeno 3-4 ore a settimana",
  "Per chi vuole costruire qualcosa di replicabile",
];

const notForYou = [
  "Non è per chi cerca soldi facili",
  "Non è per chi non vuole coinvolgere nessuno",
  "Non è per chi vuole risultati senza impegno",
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

/* ---------------- Pagina ---------------- */

export default function Home() {
  return (
    <div className="w-full bg-gradient-to-b from-[#0a0f1e] via-[#11132e] to-[#1a1040] font-sans text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-indigo-600/20 blur-[130px]"
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
              <div className="flex -space-x-3">
                {avatars.map((a) => (
                  <div
                    key={a.initials}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#11132e] text-sm font-bold text-white ${a.bg}`}
                  >
                    {a.initials}
                  </div>
                ))}
                <div className="flex h-11 items-center justify-center rounded-full border-2 border-[#11132e] bg-slate-700 px-3 text-sm font-bold text-white">
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
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-indigo-400/30 bg-[#0d1117] px-8 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-indigo-400/40 bg-white/5 text-2xl text-amber-400">
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
              Inizia la selezione <span aria-hidden>→</span>
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
                €22.000+ negli ultimi 12 mesi
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
              Group Leader · 5-15 Global Energy Italia
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Chi sono
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-slate-300">
              Sono Alessio Frediani. Ho costruito una rete di oltre 970 persone
              partendo da zero, senza esperienza nel settore energia. Ho già
              generato più di €22.000 di commissioni. Non vendo nulla — seleziono
              le persone giuste e le accompagno passo dopo passo con un metodo che
              funziona davvero.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300">
                €22.000+ generati
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
            <span className="inline-flex items-center rounded-full border border-indigo-400/20 bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-slate-300">
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
                className="overflow-hidden rounded-2xl border border-indigo-400/15 bg-[#0d1117] transition-colors hover:border-amber-500/30"
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

      {/* COME FUNZIONA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Come <span className="italic text-amber-500">funziona</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
            Tre passi semplici. Nessuna vendita, nessun magazzino.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-indigo-400/15 bg-white/[0.03] p-8 transition-colors hover:border-amber-500/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 font-serif text-xl font-bold text-neutral-950">
                  {step.n}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-300">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PER CHI È / NON È */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            È adatto <span className="italic text-amber-500">a te?</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8">
              <h3 className="text-lg font-semibold text-emerald-400">
                Fa per te
              </h3>
              <ul className="mt-6 space-y-4">
                {forYou.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-200">
                    <span aria-hidden className="mt-0.5 font-bold text-emerald-400">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8">
              <h3 className="text-lg font-semibold text-red-400">
                Non fa per te
              </h3>
              <ul className="mt-6 space-y-4">
                {notForYou.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-200">
                    <span aria-hidden className="mt-0.5 font-bold text-red-400">
                      ✕
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section
        id="form"
        className="scroll-mt-8 border-t border-white/5 bg-gradient-to-br from-amber-500/15 via-indigo-600/15 to-indigo-900/20"
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
            Inizia la selezione <span aria-hidden>→</span>
          </a>
          <p className="mt-4 text-sm text-slate-400">
            ⏱ Rispondo personalmente entro 24 ore
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Alessio Frediani · Global Energy Italia
        </div>
      </footer>
    </div>
  );
}
