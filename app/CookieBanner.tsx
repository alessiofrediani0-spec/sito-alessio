"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  // Letto solo lato client dopo il mount: evita un mismatch di idratazione
  // (il server non ha accesso a localStorage).
  useEffect(() => {
    if (localStorage.getItem("cookieAccepted") !== "true") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-amber-500/40 bg-[#020d1a] px-6 py-5 text-center shadow-2xl sm:flex-row sm:text-left">
        <p className="text-sm text-slate-300">
          Questo sito non usa cookie di profilazione. Raccogliamo solo i dati che
          inserisci nel form.{" "}
          <a
            href="/privacy"
            className="font-semibold text-amber-400 underline-offset-2 hover:underline"
          >
            Leggi la nostra Privacy Policy.
          </a>
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-amber-400"
        >
          Ho capito
        </button>
      </div>
    </div>
  );
}
