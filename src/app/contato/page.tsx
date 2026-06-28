import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contato para sites, CRM e sistemas web",
  description:
    "Fale com a Zen Time Pro para solicitar proposta de site, landing page, CRM comercial ou sistema web personalizado.",
  path: "/contato",
});

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="mb-14 space-y-6">
        <Reveal delay={40}>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Contato</p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="max-w-4xl text-4xl font-semibold text-white sm:text-6xl">
            Vamos entender seu momento e desenhar a melhor proxima entrega.
          </h1>
        </Reveal>
        <Reveal delay={190}>
          <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Se voce quer elevar a imagem da empresa, organizar o comercial ou estruturar um site, CRM ou sistema, podemos
            comecar por um diagnostico inicial objetivo.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <p className="max-w-3xl text-sm leading-7 text-slate-400">
            Atendemos empresas em Sao Paulo e em todo o Brasil com foco em criacao de sites, landing pages, CRM comercial e sistemas web.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal
          delay={80}
          as="section"
          className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl lg:p-10"
        >
          <div className="mb-8 flex flex-wrap gap-3">
            {[
              "Resposta inicial rapida",
              "Leitura comercial do seu contexto",
              "Direcao clara para o proximo passo",
            ].map((item, index) => (
              <Reveal
                key={item}
                delay={180 + index * 70}
                variant="scale"
                className="rounded-full border border-cyan-400/15 bg-cyan-500/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-200"
              >
                {item}
              </Reveal>
            ))}
          </div>
          <ContactForm />
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal
            delay={140}
            variant="right"
            as="section"
            className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_45%),rgba(255,255,255,0.04)] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Fale direto</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Atendimento rapido por WhatsApp ou email.</h2>
            <div className="mt-8 space-y-4">
              <div className="rounded-[1.4rem] border border-white/10 bg-[#081120]/70 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">WhatsApp</p>
                <p className="mt-2 text-lg font-medium text-white">+55 (11) 99165-0950</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-[#081120]/70 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
                <p className="mt-2 text-lg font-medium text-white">zentimepro@gmail.com</p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={220}
            variant="right"
            as="section"
            className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">O que acontece depois</p>
            <div className="mt-6 space-y-4">
              {[
                "Entendemos sua necessidade e o nivel de urgencia.",
                "Indicamos o melhor formato de entrega para o momento.",
                "Se fizer sentido, avancamos com proposta e escopo inicial.",
              ].map((step, index) => (
                <Reveal key={step} delay={280 + index * 80} variant="left" className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-slate-300">{step}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
