import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Alessio Frediani",
};

const sections = [
  {
    title: "Titolare del trattamento",
    body: "Il titolare del trattamento dei dati è Alessio Frediani, con sede a Viareggio (LU). Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a alessio515globalenergy@gmail.com.",
  },
  {
    title: "Dati raccolti",
    body: "Raccogliamo esclusivamente i dati che inserisci volontariamente nei moduli del sito: nome, numero di telefono ed eventualmente l'indirizzo email. Non raccogliamo dati attraverso cookie di profilazione.",
  },
  {
    title: "Finalità del trattamento",
    body: "I dati vengono utilizzati unicamente per ricontattarti in merito all'opportunità presentata sul sito (ricontatto commerciale). Non vengono ceduti né venduti a terze parti.",
  },
  {
    title: "Base giuridica",
    body: "Il trattamento dei tuoi dati si fonda sul consenso che presti al momento dell'invio dei tuoi dati tramite il sito.",
  },
  {
    title: "Conservazione dei dati",
    body: "I dati vengono conservati per un periodo massimo di 12 mesi dall'ultimo contatto, salvo diversa richiesta da parte tua. Trascorso tale periodo, vengono cancellati.",
  },
  {
    title: "Diritti dell'utente",
    body: "In qualsiasi momento puoi esercitare i tuoi diritti: accesso ai dati, rettifica, cancellazione, portabilità e opposizione al trattamento. Per farlo, è sufficiente inviare una richiesta a alessio515globalenergy@gmail.com.",
  },
  {
    title: "Contatti",
    body: "Per qualsiasi domanda su questa Privacy Policy o sul trattamento dei tuoi dati, puoi contattarci all'indirizzo alessio515globalenergy@gmail.com.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#020b18] via-[#051525] to-[#0a1f35] font-sans text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="text-sm text-slate-400 transition-colors hover:text-amber-400"
        >
          ← Torna al sito
        </Link>

        <h1 className="mt-8 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Ultimo aggiornamento: giugno 2026
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-xl font-bold text-white sm:text-2xl">
                {section.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-300">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <Link
            href="/"
            className="text-sm text-slate-400 transition-colors hover:text-amber-400"
          >
            ← Torna al sito
          </Link>
        </div>
      </div>
    </div>
  );
}
