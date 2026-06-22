/* ---------------- Pagina di ringraziamento ---------------- */

export default function Grazie() {
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

          {/* Video */}
          <video
            src="/video/presentazione.mp4"
            controls
            playsInline
            className="mx-auto mt-12 w-full max-w-3xl rounded-2xl border border-indigo-800"
          />

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
    </div>
  );
}
