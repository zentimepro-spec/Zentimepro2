"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { offerMessage, projects, whatsappLink } from "@/lib/studio";
import { Arrow } from "./Arrow";
import styles from "./studio.module.css";

export function MotionSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (!preference.matches)
          animation = node.animate([{ opacity: 0.65 }, { opacity: 1 }], {
            duration: 550,
            easing: "cubic-bezier(.2,.7,.2,1)",
          });
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    const stopMotion = () => {
      if (preference.matches) animation?.cancel();
    };
    preference.addEventListener("change", stopMotion);
    observer.observe(node);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener("change", stopMotion);
    };
  }, []);
  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}

export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let scrollFrame = 0;
    const updateDepth = () => {
      if (!visible || preference.matches) return;
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const progress = Math.min(
          Math.max(-rect.top / (rect.height + 100), 0),
          1,
        );
        node.style.setProperty("--scene-progress", String(progress));
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      node.toggleAttribute("data-running", visible);
      updateDepth();
    });
    observer.observe(node);
    window.addEventListener("scroll", updateDepth, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame.current);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", updateDepth);
    };
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (
      !window.matchMedia(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--pointer-x", `${x * 16}px`);
      ref.current?.style.setProperty("--pointer-y", `${y * 14}px`);
      ref.current?.style.setProperty("--tilt-x", `${-y * 6}deg`);
      ref.current?.style.setProperty("--tilt-y", `${x * 7}deg`);
    });
  }
  function reset() {
    cancelAnimationFrame(frame.current);
    for (const property of [
      "--pointer-x",
      "--pointer-y",
      "--tilt-x",
      "--tilt-y",
    ])
      ref.current?.style.removeProperty(property);
  }

  return (
    <div
      ref={ref}
      className={styles.heroStage}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className={styles.orbitScene}>
        <div className={styles.orbitGlow} aria-hidden="true" />
        <div className={styles.orbitRing} aria-hidden="true">
          <i />
        </div>
        <div className={styles.orbitRingInner} aria-hidden="true">
          <i />
        </div>
        <div className={styles.orbitEllipse} aria-hidden="true" />
        <div className={styles.logoCore}>
          <div className={styles.logoSymbol}>
            <Image
              src="/logooficial-cropped.png"
              alt="Símbolo oficial da Zen Time Pro"
              fill
              sizes="600px"
              preload
            />
          </div>
          <span>ZEN TIME PRO</span>
        </div>
        <span className={`${styles.orbitLabel} ${styles.orbitLabelTop}`}>
          Design + desenvolvimento
        </span>
        <span className={`${styles.orbitLabel} ${styles.orbitLabelBottom}`}>
          Da ideia à experiência.
        </span>
        <div className={styles.orbitProject} key={project.name}>
          <div className={styles.browserBar}>
            <span className={styles.windowDots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>{project.domain}</span>
          </div>
          <Image
            src={project.image}
            alt={`Prévia do projeto ${project.name}`}
            width={1343}
            height={582}
            sizes="(max-width: 760px) 65vw, 310px"
            preload={selected === 0}
          />
          <div className={styles.orbitProjectName}>
            <strong>{project.name}</strong>
            <span>
              {selected + 1} / {projects.length}
            </span>
          </div>
        </div>
        <div className={styles.orbitSaas}>
          <Image
            src="/zentable-logo.webp"
            alt="Zentable"
            width={600}
            height={200}
            sizes="110px"
          />
          <span>
            Nosso SaaS
            <br />
            <strong>Em breve</strong>
          </span>
        </div>
      </div>
      <div
        className={styles.orbitControls}
        role="group"
        aria-label="Escolha o projeto em destaque na abertura"
      >
        {projects.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {item.name === "TFA Viagens Company" ? "TFA" : item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectShowcase() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  return (
    <div className={styles.showcase} data-project={selected}>
      <div
        className={styles.projectButtons}
        role="group"
        aria-label="Escolha um projeto para conhecer"
      >
        {projects.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={selected === index}
            aria-controls="project-preview"
            onClick={() => setSelected(index)}
          >
            <span>{item.name}</span>
            <Arrow />
          </button>
        ))}
      </div>
      <div className={styles.projectPanel} id="project-preview">
        <div
          className={styles.projectDescription}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className={styles.eyebrow}>{project.category}</p>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <ul>
            {project.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a
            className={styles.projectVisit}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explorar projeto <Arrow />
            <span className={styles.srOnly}> (abre em nova aba)</span>
          </a>
          {selected === 2 && (
            <p className={styles.previewNote}>
              Prévia da página pública de acesso da equipe.
            </p>
          )}
          {selected === 3 && (
            <a className={styles.textLink} href="/#zentable">
              Experimentar a demonstração <Arrow down />
            </a>
          )}
        </div>
        <div className={styles.projectImage}>
          <div className={styles.projectWatermark} aria-hidden="true">
            {selected === 0
              ? "CARE"
              : selected === 1
                ? "MUSAS"
                : selected === 2
                  ? "TFA"
                  : "ZEN"}
          </div>
          <div className={styles.projectDevice} key={project.name}>
            <div className={styles.browserBar}>
              <span className={styles.windowDots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>{project.domain}</span>
              <Arrow />
            </div>
            <Image
              src={project.image}
              alt={`Página pública de ${project.name}`}
              width={1343}
              height={582}
              sizes="(max-width: 760px) 88vw, 58vw"
            />
          </div>
          <div className={styles.projectDeviceCaption}>
            <span>Design + experiência + desenvolvimento</span>
            <span>{String(selected + 1).padStart(2, "0")} / 04</span>
          </div>
        </div>
      </div>
      <div className={styles.projectFooter}>
        <span>Explore o próximo projeto</span>
        <div>
          <button
            type="button"
            aria-label="Projeto anterior"
            disabled={selected === 0}
            onClick={() => setSelected(selected - 1)}
          >
            <span className={styles.previousArrow}>
              <Arrow />
            </span>
          </button>
          <button
            type="button"
            aria-label="Próximo projeto"
            disabled={selected === projects.length - 1}
            onClick={() => setSelected(selected + 1)}
          >
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
}

const demoServices = [
  { name: "Corte de cabelo", duration: "45 min", professional: "Marina" },
  { name: "Manicure", duration: "60 min", professional: "Marina" },
  { name: "Barba", duration: "30 min", professional: "Lucas" },
];
const demoTimes = ["09:30", "13:00", "16:00"];

export function ZentableDemo() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const selectedService = demoServices[service];

  function restart() {
    setConfirmed(false);
    setTime(null);
    setStep(0);
  }

  return (
    <div className={styles.demo}>
      <div className={styles.demoTop}>
        <strong>
          Zentable <span>/ Experimente</span>
        </strong>
        <span className={styles.demoAvatar} aria-hidden="true">
          Z
        </span>
      </div>
      <div className={styles.demoProgress} aria-label="Etapas da demonstração">
        {["Serviço", "Horário", "Na agenda"].map((label, index) => (
          <span
            key={label}
            aria-current={step === index ? "step" : undefined}
            data-complete={step > index}
          >
            <i>{index + 1}</i>
            {label}
          </span>
        ))}
      </div>
      <div className={styles.demoPanel}>
        {step === 0 && (
          <div key="service" className={styles.demoStep}>
            <p className={styles.demoEyebrow}>
              Uma reserva começa com uma escolha
            </p>
            <h3>O que vamos agendar?</h3>
            <p className={styles.demoHelp}>
              Experimente como seu cliente escolhe um serviço.
            </p>
            <div
              className={styles.serviceChoices}
              role="group"
              aria-label="Escolha um serviço demonstrativo"
            >
              {demoServices.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-pressed={service === index}
                  onClick={() => {
                    setService(index);
                    setTime(null);
                  }}
                >
                  <span>
                    <strong>{item.name}</strong>
                    <small>
                      {item.duration} · {item.professional}
                    </small>
                  </span>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>
            <button
              className={styles.demoAction}
              type="button"
              onClick={() => setStep(1)}
            >
              Escolher horário <Arrow />
            </button>
          </div>
        )}
        {step === 1 && (
          <div key="time" className={styles.demoStep}>
            <button
              className={styles.demoBack}
              type="button"
              onClick={() => setStep(0)}
            >
              Voltar aos serviços
            </button>
            <p className={styles.demoEyebrow}>
              {selectedService.name} · {selectedService.professional}
            </p>
            <h3>Um horário para você.</h3>
            <p className={styles.demoHelp}>
              Terça-feira, 17 de novembro · agenda ilustrativa
            </p>
            <div
              className={styles.timeChoices}
              role="group"
              aria-label="Escolha um horário demonstrativo"
            >
              {demoTimes.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={time === item}
                  onClick={() => setTime(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className={styles.bookingSummary}>
              <span>Seu atendimento</span>
              <strong>{selectedService.name}</strong>
              <p>
                {time
                  ? `${time} · ${selectedService.duration} com ${selectedService.professional}`
                  : "Selecione um dos horários acima."}
              </p>
            </div>
            <button
              className={styles.demoAction}
              type="button"
              disabled={!time}
              onClick={() => {
                setConfirmed(true);
                setStep(2);
              }}
            >
              Simular agendamento <Arrow />
            </button>
          </div>
        )}
        {step === 2 && confirmed && (
          <div key="confirmed" className={styles.demoStep}>
            <p className={styles.demoEyebrow}>
              Do link do cliente à sua agenda
            </p>
            <h3>Pronto. Tudo no lugar.</h3>
            <p className={styles.demoHelp}>
              Veja como o atendimento aparece para o profissional.
            </p>
            <div className={styles.miniCalendar}>
              <div>
                <span>Terça, 17 de novembro</span>
                <strong>Agenda do dia</strong>
              </div>
              <div className={styles.calendarExisting}>
                <time>08:30</time>
                <span>
                  <strong>Beatriz</strong>
                  <small>Manicure · Marina</small>
                </span>
              </div>
              <div className={styles.newAppointment}>
                <time>{time}</time>
                <span>
                  <strong>Você · exemplo</strong>
                  <small>
                    {selectedService.name} · {selectedService.professional}
                  </small>
                </span>
                <span className={styles.confirmedTag}>Confirmado</span>
              </div>
              <div className={styles.calendarExisting}>
                <time>17:30</time>
                <span>
                  <strong>Rafael</strong>
                  <small>Corte de cabelo · Lucas</small>
                </span>
              </div>
            </div>
            <button
              className={styles.demoReset}
              type="button"
              onClick={restart}
            >
              Experimentar outro serviço <Arrow />
            </button>
          </div>
        )}
      </div>
      <p className={styles.demoDisclosure} role="status">
        Demonstração interativa com dados fictícios.
      </p>
    </div>
  );
}

export function ProcessSteps() {
  const [selected, setSelected] = useState(0);
  const steps = [
    {
      title: "Primeiro, sua ideia.",
      description:
        "Conte sobre seu negócio, seus serviços e o que você quer apresentar. A conversa começa direto com a gente, pelo WhatsApp.",
      detail: "Seu negócio + seu público + seu objetivo",
    },
    {
      title: "Depois, a direção.",
      description:
        "Organizamos conteúdo, identidade visual e estrutura. Escopo, prazo, ajustes e condições ficam alinhados na proposta.",
      detail: "Conteúdo + identidade + experiência",
    },
    {
      title: "Então, seu site no ar.",
      description:
        "Você acompanha a apresentação, combinamos os ajustes e preparamos a publicação do seu projeto.",
      detail: "Criação + revisão + publicação",
    },
  ];
  return (
    <div className={styles.processExplorer}>
      <div
        className={styles.processChoices}
        role="group"
        aria-label="Conheça as etapas do projeto"
      >
        {steps.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-pressed={selected === index}
            aria-controls="process-detail"
            onClick={() => setSelected(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.title}</strong>
            <Arrow />
          </button>
        ))}
      </div>
      <div
        className={styles.processDetail}
        id="process-detail"
        aria-live="polite"
      >
        <span className={styles.processGraphic} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <p className={styles.eyebrow}>Etapa {selected + 1} de 3</p>
        <h3>{steps[selected].title}</h3>
        <p>{steps[selected].description}</p>
        <span className={styles.processDetailFoot}>
          {steps[selected].detail}
        </span>
      </div>
    </div>
  );
}

export function MobileOffer() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contato");
    if (!hero || !contact) return;
    let heroVisible = true;
    let contactVisible = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === contact) contactVisible = entry.isIntersecting;
      }
      ref.current?.toggleAttribute(
        "data-visible",
        !heroVisible && !contactVisible,
      );
    });
    observer.observe(hero);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={styles.mobileOffer}>
      <span>
        Black Friday<strong>Seu site por R$ 297</strong>
      </span>
      <a
        href={whatsappLink(offerMessage)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Aproveitar <Arrow />
      </a>
    </div>
  );
}
