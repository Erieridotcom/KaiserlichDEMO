import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { SiteShell, PrimaryLink } from '@/components/SiteShell';
import { site } from '@/config/site';

const workImageBase = `${import.meta.env.BASE_URL}images/work/`;

export default function HomePage() {
  return (
    <SiteShell>
      <div className="shell">
        <section className="home-hero">
          <div className="hero-copy animate-enter">
            <div className="eyebrow">Cuidado automotriz, con claridad</div>
            <h1 className="serif">Que vuelva a sentirse <em>tuyo.</em></h1>
            <p>{site.intro}</p>
            <div className="hero-actions">
              <PrimaryLink href="/detallado">Configura tu servicio</PrimaryLink>
              <Link href="/restauracion-mecanica" className="button secondary">Restauración y mecánica <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="hero-visual animate-enter">
            <img className="hero-photo" src={`${workImageBase}hero-dark-sedan.webp`} alt="Sedán oscuro fotografiado en un taller" fetchPriority="high" />
            <span className="visual-index">KAISERLICH / TRABAJO REAL</span>
            <div className="visual-label"><strong>Atención para cada detalle.</strong><span>Una propuesta hecha para tu vehículo</span></div>
          </div>
        </section>
        <section className="service-section" id="servicios">
          <div className="section-heading">
            <div><div className="eyebrow">Elige por dónde empezar</div><h2 className="serif">Cuidado pensado para lo que necesitas.</h2></div>
            <p>Cuéntanos qué quieres mejorar. Puedes revisar las opciones con calma antes de confirmar.</p>
          </div>
          <div className="service-list">
            <Link href="/detallado" className="service-row" data-testid="link-service-exterior">
              <span className="service-num">01</span><h3>Detallado exterior</h3><p>Explora opciones provisionales de acabado y protección para la carrocería.</p><ArrowUpRight className="service-arrow" size={21} aria-hidden="true" />
            </Link>
            <Link href="/detallado" className="service-row" data-testid="link-service-interior">
              <span className="service-num">02</span><h3>Detallado interior</h3><p>Elige el nivel de limpieza, las filas y el cuidado de la piel.</p><ArrowUpRight className="service-arrow" size={21} aria-hidden="true" />
            </Link>
            <Link href="/restauracion-mecanica" className="service-row" data-testid="link-service-restoration">
              <span className="service-num">03</span><h3>Restauración</h3><p>Cuéntanos qué quieres recuperar y solicita una valoración personalizada.</p><ArrowUpRight className="service-arrow" size={21} aria-hidden="true" />
            </Link>
            <Link href="/restauracion-mecanica" className="service-row" data-testid="link-service-mechanics">
              <span className="service-num">04</span><h3>Mecánica</h3><p>Describe las fallas que notas para preparar una solicitud de cotización.</p><ArrowUpRight className="service-arrow" size={21} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section className="portfolio-section" id="trabajos">
          <div className="section-heading portfolio-heading">
            <div><div className="eyebrow">Autos atendidos</div><h2 className="serif">Cada auto tiene su carácter.</h2></div>
            <p>Una selección de vehículos atendidos en Kaiserlich, fotografiados en sus espacios reales.</p>
          </div>
          <figure className="portfolio-feature">
            <div className="work-photo-wrap">
              <img className="work-photo" src={`${workImageBase}red-suv.webp`} alt="SUV color vino fotografiada dentro de un taller" loading="lazy" decoding="async" />
              <span className="work-photo-index">01 / EXTERIOR</span>
            </div>
            <figcaption className="portfolio-feature-copy">
              <span className="work-kicker">Una presencia inconfundible</span>
              <h3 className="serif">SUV en tono vino.</h3>
              <p>Un trabajo real, contado por el auto y los detalles que lo hacen único.</p>
            </figcaption>
          </figure>
          <div className="portfolio-grid">
            <figure className="work-card">
              <img className="work-photo" src={`${workImageBase}white-suv.webp`} alt="SUV blanca de frente en un taller" loading="lazy" decoding="async" />
              <figcaption className="work-card-caption"><span>02 / EXTERIOR</span><strong>Una silueta elegante</strong></figcaption>
            </figure>
            <figure className="work-card">
              <img className="work-photo" src={`${workImageBase}black-sedan-outdoor.webp`} alt="Sedán negro fotografiado al aire libre" loading="lazy" decoding="async" />
              <figcaption className="work-card-caption"><span>03 / EXTERIOR</span><strong>Líneas y reflejos</strong></figcaption>
            </figure>
            <figure className="work-card">
              <img className="work-photo" src={`${workImageBase}light-leather-interior.webp`} alt="Interior de vehículo con asientos de piel clara" loading="lazy" decoding="async" />
              <figcaption className="work-card-caption"><span>04 / INTERIOR</span><strong>Calidez en cada detalle</strong></figcaption>
            </figure>
            <figure className="work-card work-card--portrait">
              <img className="work-photo" src={`${workImageBase}dark-interior.webp`} alt="Cabina de vehículo con volante y tablero en tonos oscuros" loading="lazy" decoding="async" />
              <figcaption className="work-card-caption"><span>05 / INTERIOR</span><strong>La cabina, de cerca</strong></figcaption>
            </figure>
          </div>
        </section>
      </div>
      <section className="process-section">
        <div className="shell">
          <div className="section-heading">
            <div><div className="eyebrow">Cómo funciona</div><h2 className="serif">Un proceso claro desde el primer paso.</h2></div>
            <p>La estimación es inicial. La persona encargada revisará el vehículo y el servicio, y te confirmará el precio final por WhatsApp cuando el taller configure su contacto.</p>
          </div>
          <div className="process-grid">
            {[
              ['01', 'Configura tu servicio', 'Selecciona las opciones que mejor describen lo que buscas.'],
              ['02', 'Cuéntanos de tu vehículo', 'Agrega modelo, color y los detalles que nos ayuden a entenderlo.'],
              ['03', 'Revisa la estimación', 'Consulta el desglose antes de preparar tu solicitud.'],
              ['04', 'Confirma los siguientes pasos', 'La persona encargada revisará tu solicitud y te confirmará la cotización y la agenda por WhatsApp.'],
            ].map(([number, title, description]) => (
              <article className="process-card" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="promise">
        <div className="shell promise-inner">
          <div>
            <div className="eyebrow">Una experiencia de taller</div>
            <h2 className="serif">Primero entendemos.<br />Después, cada decisión.</h2>
          </div>
          <div>
            <p>Una propuesta de cuidado respaldada por una revisión personalizada, productos seleccionados y procesos profesionales. El taller podrá completar aquí su experiencia y detalles de marca.</p>
            <div className="trust-grid">
              <div><strong>Experiencia</strong><span>Información del taller por agregar</span></div>
              <div><strong>Calidad</strong><span>Procesos y productos por confirmar</span></div>
              <div><strong>Atención personal</strong><span>Opciones explicadas con claridad</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="demo-note">
        <div className="shell"><p>Esta beta presenta el flujo completo. Las solicitudes aún no se envían ni se guardan; WhatsApp y correo están pendientes de configuración.</p></div>
      </section>
    </SiteShell>
  );
}
