import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="shell error-page">
      <AlertCircle size={38} color="var(--red)" aria-hidden="true" />
      <h1>Página no encontrada</h1>
      <p>Revisa el enlace o regresa al inicio.</p>
      <a className="button" href="/">Volver al inicio</a>
    </div>
  );
}
