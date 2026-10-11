import { type ReactNode, useEffect } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import HomePage from '@/pages/HomePage';
import DetailingPage from '@/pages/DetailingPage';
import RepairPage from '@/pages/RepairPage';
import { site } from '@/config/site';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

function Router() {
  const [location] = useLocation();
  useEffect(() => {
    const pageTitle = location === '/detallado'
      ? `Detallado automotriz | ${site.brandLabel}`
      : location === '/restauracion-mecanica'
        ? `Restauración y mecánica | ${site.brandLabel}`
        : location === '/'
          ? `${site.brandLabel} | Cuidado automotriz`
          : `Página no encontrada | ${site.brandLabel}`;
    document.title = pageTitle;
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content =
      location === '/detallado'
        ? 'Configura una estimación provisional de detallado exterior e interior para tu vehículo.'
        : location === '/restauracion-mecanica'
          ? 'Describe las fallas o el trabajo que necesita tu vehículo y prepara una solicitud de cotización.'
          : site.intro;
  }, [location]);
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/detallado" component={DetailingPage} />
        <Route path="/restauracion-mecanica" component={RepairPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;
