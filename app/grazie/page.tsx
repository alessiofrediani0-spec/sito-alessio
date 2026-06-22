"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------- Quiz ---------------- */

type Option = { label: string; correct: boolean };

const question1: { prompt: string; options: Option[]; wrong: string } = {
  prompt: "Cosa serve per iniziare?",
  options: [
    { label: "Un investimento iniziale", correct: false },
    { label: "2 bollette: luce e gas", correct: true },
    { label: "Esperienza nel settore", correct: false },
  ],
  wrong: "Non è corretto. Guarda di nuovo il video con attenzione.",
};

const question2: { prompt: string; options: Option[]; wrong: string } = {
  prompt: "Quanto tempo serve per vedere i primi risultati?",
  options: [
    { label: "Pochi giorni, è guadagno immediato", correct: false },
    { label: "Serve impegno e costanza nel tempo", correct: true },
    { label: "Niente, i risultati arrivano da soli", correct: false },
  ],
  wrong: "Non è corretto. Questo non è uno schema di guadagno facile.",
};

const WHATSAPP_URL =
  "https://wa.me/393517093649?text=Ciao%20Alessio%2C%20ho%20guardato%20il%20video%20e%20voglio%20saperne%20di%20pi%C3%B9";

function Quiz() {
  const [step, setStep] = useState<1 | 2 | "final">(1);
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const current = step === 1 ? question1 : question2;

  function handleAnswer(index: number, option: Option) {
    setSelected(index);
    if (option.correct) {
      setError(null);
      setSelected(null);
      setStep(step === 1 ? 2 : "final");
    } else {
      setError(current.wrong);
    }
  }

  if (step === "final") {
    return (
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-emerald-400">
          Perfetto! Hai capito tutto.
        </h2>
        <p className="mt-4 text-slate-300">
          Sei pronto per il prossimo passo. Scrivimi su WhatsApp.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 px-6 py-4 text-base font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          Contattami su WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
        Domanda {step} di 2
      </span>
      <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight text-white">
        {current.prompt}
      </h2>

      <div className="mt-8 space-y-3">
        {current.options.map((option, index) => {
          const isSelected = selected === index;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => handleAnswer(index, option)}
              className={`w-full rounded-xl border px-5 py-4 text-left text-base font-medium transition-colors ${
                isSelected
                  ? "border-amber-500 bg-amber-500/10 text-white"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-amber-500/40"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------- Pagina di ringraziamento ---------------- */

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function Grazie() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const maxReachedRef = useRef(0);
  const draggingRef = useRef(false);

  const [quizOpen, setQuizOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [maxReached, setMaxReached] = useState(0);

  // Impedisce di saltare avanti nel video anche tramite i controlli nativi
  // o la tastiera: si può tornare indietro, ma non superare il punto massimo
  // già visto. (Doppia protezione, oltre ai controlli custom.)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeking = () => {
      if (video.currentTime > maxReachedRef.current + 0.5) {
        video.currentTime = maxReachedRef.current;
      }
    };

    video.addEventListener("seeking", handleSeeking);
    return () => {
      video.removeEventListener("seeking", handleSeeking);
    };
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }

  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video) return;
    if (video.currentTime > maxReachedRef.current) {
      maxReachedRef.current = video.currentTime;
      setMaxReached(video.currentTime);
    }
    setCurrentTime(video.currentTime);
  }

  // Calcola il tempo dalla posizione del puntatore, limitato a maxReached.
  function seekFromPointer(clientX: number) {
    const video = videoRef.current;
    const bar = barRef.current;
    if (!video || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const fraction = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const target = Math.min(fraction * duration, maxReachedRef.current);
    video.currentTime = target;
    setCurrentTime(target);
  }

  function handleBarPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    seekFromPointer(e.clientX);
  }

  function handleBarPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    seekFromPointer(e.clientX);
  }

  function handleBarPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  const progressPct = duration ? (currentTime / duration) * 100 : 0;
  const maxPct = duration ? (maxReached / duration) * 100 : 0;

  return (
    <div className="w-full bg-gradient-to-b from-[#0a0f1e] via-[#11132e] to-[#1a1040] font-sans text-slate-100">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-indigo-600/20 blur-[130px]"
        />
        <div
          aria-hidden
          className="absolute right-0 top-1/3 h-[26rem] w-[26rem] rounded-full bg-amber-500/10 blur-[120px]"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center md:py-28">
          {/* Badge */}
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
            ✅ Richiesta ricevuta
          </span>

          {/* Titolo */}
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Ottimo, ci siamo quasi.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg text-slate-300">
            Guarda il video qui sotto — ti spiega esattamente come funziona e
            cosa succede dopo.
          </p>

          {/* Video con controlli custom */}
          <div className="mx-auto mt-12 w-full max-w-3xl">
            <video
              ref={videoRef}
              src="/video/presentazione.mp4"
              playsInline
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onEnded={() => {
                setIsPlaying(false);
                setQuizOpen(true);
              }}
              className="w-full cursor-pointer rounded-t-2xl border border-indigo-800 bg-black"
            />

            {/* Controlli custom */}
            <div className="flex items-center gap-4 rounded-b-2xl border border-t-0 border-indigo-800 bg-black px-4 py-3">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausa" : "Play"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm text-neutral-950 transition-colors hover:bg-amber-400"
              >
                {isPlaying ? "⏸" : "▶"}
              </button>

              {/* Barra di progresso: clic/trascina solo fino a maxReached */}
              <div
                ref={barRef}
                onPointerDown={handleBarPointerDown}
                onPointerMove={handleBarPointerMove}
                onPointerUp={handleBarPointerUp}
                className="group relative h-2 flex-1 cursor-pointer touch-none rounded-full bg-slate-700"
              >
                {/* Limite massimo sbloccato */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-slate-600"
                  style={{ width: `${maxPct}%` }}
                />
                {/* Progresso corrente */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-amber-500"
                  style={{ width: `${progressPct}%` }}
                />
                <div
                  className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ left: `${progressPct}%` }}
                />
              </div>

              <span className="shrink-0 font-mono text-xs tabular-nums text-slate-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Card prossimo passo */}
          <div className="mt-12 w-full max-w-2xl rounded-2xl border border-amber-500/40 bg-black/30 p-8 text-left backdrop-blur">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
              Prossimo passo
            </h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              Ti contatterò entro 24 ore al numero che hai lasciato. Tieniti
              libero per una chiamata veloce di 20 minuti.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              ⏱ Rispondo entro 24 ore
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-slate-500">
          © 2026 Alessio Frediani · Global Energy Italia
        </div>
      </footer>

      {/* MODAL QUIZ */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-6 backdrop-blur">
          <div className="w-full max-w-lg rounded-2xl border border-indigo-400/40 bg-[#0d1117] p-8 shadow-2xl">
            <Quiz />
          </div>
        </div>
      )}
    </div>
  );
}
