import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { site } from '@/config/site';

let scrollToSectionAfterNavigation: string | null = null;

export function SiteShell({ children }: { children: ReactNode }) {
  const [path, setPath] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const logoSrc = `${import.meta.env.BASE_URL}kaiserlich-logo.png`;

  useEffect(() => {
    const hashSection = window.location.hash.slice(1);
    const sectionId = scrollToSectionAfterNavigation || (
      hashSection === 'servicios' || hashSection === 'trabajos' ? hashSection : null
    );
    if (path !== '/' || !sectionId) return;

    scrollToSectionAfterNavigation = null;
    const frame = window.requestAnimationFrame(() => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      window.history.replaceState(null, '', `${import.meta.env.BASE_URL}#${sectionId}`);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [path]);

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    closeMenu();
    if (path === '/') {
      const section = document.getElementById(sectionId);
      if (!section) return;
      window.history.replaceState(null, '', `${import.meta.env.BASE_URL}#${sectionId}`);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    scrollToSectionAfterNavigation = sectionId;
    setPath('/');
  };

  return (
    <>
      <header className="shell topbar">
        <Link href="/" className="wordmark" aria-label={`${site.brandLabel}, inicio`}>
          <img className="brand-logo" src={logoSrc} alt="" />
        </Link>
        <button
          className="mobile-menu"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav id="primary-navigation" className={`navlinks ${menuOpen ? 'open' : ''}`} aria-label="Navegación principal">
          <Link href="/" aria-current={path === '/' ? 'page' : undefined} onClick={closeMenu}>Inicio</Link>
          <Link href="/detallado" aria-current={path === '/detallado' ? 'page' : undefined} onClick={closeMenu}>Detallado</Link>
          <Link href="/restauracion-mecanica" aria-current={path === '/restauracion-mecanica' ? 'page' : undefined} onClick={closeMenu}>Restauración y mecánica</Link>
          <a href={`${import.meta.env.BASE_URL}#trabajos`} onClick={(event) => handleSectionClick(event, 'trabajos')}>Trabajos</a>
          <a href={`${import.meta.env.BASE_URL}#servicios`} onClick={(event) => handleSectionClick(event, 'servicios')}>Servicios</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
          <Link href="/detallado" className="button" onClick={closeMenu}>Cotiza tu servicio<ArrowUpRight size={15} aria-hidden="true" /></Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="shell site-footer" id="contacto">
        <div className="footer-top">
          <div>
            <Link href="/" className="wordmark footer-wordmark" aria-label={`${site.brandLabel}, inicio`}>
              <img className="brand-logo" src={logoSrc} alt="" />
            </Link>
            <p>{site.tagline}</p>
            <p className="estimate-note">{site.estimateDisclaimer}</p>
          </div>
          <div className="footer-column">
            <strong>Servicios</strong>
            <Link href="/detallado">Detallado exterior e interior</Link>
            <Link href="/restauracion-mecanica">Restauración</Link>
            <Link href="/restauracion-mecanica">Mecánica</Link>
          </div>
          <div className="footer-column">
            <strong>Contacto y redes</strong>
            <span>{site.contactPlaceholders.whatsapp}</span>
            <span>{site.contactPlaceholders.email}</span>
            <span>{site.contactPlaceholders.address}</span>
            <span>{site.contactPlaceholders.hours}</span>
            <span>{site.contactPlaceholders.instagram} · {site.contactPlaceholders.facebook}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{site.tagline}</span><span>Propuesta de experiencia · versión beta</span>
        </div>
      </footer>
    </>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="button" data-testid={`link-${href.replace(/\//g, '') || 'home'}`}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>;
}
