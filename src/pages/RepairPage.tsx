import { useState, type FormEvent } from 'react';
import { ArrowLeft, Check, ClipboardCheck } from 'lucide-react';
import { SiteShell } from '@/components/SiteShell';
import { site } from '@/config/site';

type RepairForm = { make: string; model: string; year: string; color: string; vin: string; failure: string; budget: string; notes: string; firstName: string; lastName: string; phone: string };
const blank: RepairForm = { make: '', model: '', year: '', color: '', vin: '', failure: '', budget: '', notes: '', firstName: '', lastName: '', phone: '' };

export default function RepairPage() {
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (key: keyof RepairForm, value: string) => setForm((old) => ({ ...old, [key]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.make.trim()) next.make = 'Escribe la marca del vehículo.';
    if (!form.model.trim()) next.model = 'Escribe el modelo.';
    if (!form.failure.trim()) next.failure = 'Describe la falla o el trabajo que necesitas.';
    if (!form.firstName.trim()) next.firstName = 'Escribe tu nombre.';
    if (!form.lastName.trim()) next.lastName = 'Escribe tu apellido.';
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) next.phone = 'Ingresa un teléfono de 10 dígitos.';
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  };
  return (
    <SiteShell>
      <div className="shell">
        <header className="page-head">
          <div className="eyebrow">Restauración y mecánica</div>
          <h1 className="serif">Cuéntanos qué le pasa.</h1>
          <p>Comparte lo que sabes del vehículo y el trabajo que imaginas. No necesitas tener un diagnóstico para empezar.</p>
        </header>
        <div className="repair-layout">
          <section className="form-card">
            {!done ? <form onSubmit={submit} noValidate>
              <h2>Datos para preparar una valoración</h2><p>Los campos marcados son necesarios para esta demostración.</p>
              <div className="field-grid">
                <label><span className="field-label">{site.labels.vehicleMake} *</span><input className="input" value={form.make} onChange={(e) => set('make', e.target.value)} aria-invalid={!!errors.make} placeholder="Ej. Honda" data-testid="input-repair-make" />{errors.make && <div className="field-error">{errors.make}</div>}</label>
                <label><span className="field-label">{site.labels.vehicleModel} *</span><input className="input" value={form.model} onChange={(e) => set('model', e.target.value)} aria-invalid={!!errors.model} placeholder="Ej. Civic" data-testid="input-repair-model" />{errors.model && <div className="field-error">{errors.model}</div>}</label>
                <label><span className="field-label">Año</span><input className="input" inputMode="numeric" value={form.year} onChange={(e) => set('year', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="Ej. 2018" data-testid="input-repair-year" /></label>
                <label><span className="field-label">{site.labels.vehicleColor}</span><input className="input" value={form.color} onChange={(e) => set('color', e.target.value)} placeholder="Ej. Azul oscuro" data-testid="input-repair-color" /></label>
              </div>
              <label><span className="field-label">VIN (opcional)</span><input className="input" value={form.vin} onChange={(e) => set('vin', e.target.value)} placeholder="Número de identificación del vehículo" data-testid="input-repair-vin" /><span className="field-help">El VIN suele encontrarse en el tablero o en la tarjeta de circulación.</span></label>
              <label><span className="field-label">Falla o trabajo solicitado *</span><textarea className="textarea" value={form.failure} onChange={(e) => set('failure', e.target.value)} aria-invalid={!!errors.failure} placeholder="Describe los síntomas, sonidos o restauración que buscas." data-testid="input-repair-failure" />{errors.failure && <div className="field-error">{errors.failure}</div>}</label>
               <label><span className="field-label">Presupuesto aproximado</span><input className="input" value={form.budget} onChange={(e) => set('budget', e.target.value)} placeholder="Ej. $10,000 MXN o por definir" data-testid="input-repair-budget" /></label>
              <label><span className="field-label">Notas adicionales</span><textarea className="textarea" value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Historial, piezas o detalles que consideres útiles." data-testid="input-repair-notes" /></label>
              <div style={{ marginTop: 28, paddingTop: 18, borderTop: '1px solid #eeece8' }}><h2 style={{ fontSize: 20 }}>Cómo contactarte</h2>
                <div className="field-grid">
                  <label><span className="field-label">{site.labels.ownerFirstName} *</span><input className="input" autoComplete="given-name" value={form.firstName} onChange={(e) => set('firstName', e.target.value)} aria-invalid={!!errors.firstName} placeholder="Tu nombre" data-testid="input-repair-first-name" />{errors.firstName && <div className="field-error">{errors.firstName}</div>}</label>
                  <label><span className="field-label">{site.labels.ownerLastName} *</span><input className="input" autoComplete="family-name" value={form.lastName} onChange={(e) => set('lastName', e.target.value)} aria-invalid={!!errors.lastName} placeholder="Tu apellido" data-testid="input-repair-last-name" />{errors.lastName && <div className="field-error">{errors.lastName}</div>}</label>
                </div>
                <label><span className="field-label">{site.labels.phone} *</span><input className="input" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} placeholder={site.phonePlaceholder} data-testid="input-repair-phone" />{errors.phone && <div className="field-error">{errors.phone}</div>}</label>
              </div>
              <div className="confirm-box">{site.repairDisclaimer} No se enviará un mensaje ni se realizará contacto.</div>
              <div className="form-actions" style={{ justifyContent: 'flex-end' }}><button className="button" type="submit" data-testid="button-repair-submit">Revisar demostración<ClipboardCheck size={16} /></button></div>
            </form> : <div className="success-panel animate-enter" role="status">
              <div className="success-icon"><Check size={23} /></div><div className="eyebrow">Demostración completada</div>
              <h2 className="serif" style={{ marginTop: 15 }}>La información quedó en esta pantalla.</h2>
              <p>Este formulario no envía datos ni confirma una recepción. WhatsApp y correo todavía no están conectados.</p>
              <button type="button" className="button secondary" onClick={() => { setDone(false); setForm(blank); }} data-testid="button-repair-reset"><ArrowLeft size={15} />Volver al formulario</button>
            </div>}
          </section>
          <aside className="repair-aside">
            <div className="eyebrow">Un primer paso</div><h2 className="serif">Una buena valoración empieza por escuchar.</h2>
            <p>Describe lo que notas con tus propias palabras. Si todavía no conoces la causa, no necesitas adivinarla.</p>
            <div className="aside-rule" /><small>{site.repairDisclaimer} Los rangos de presupuesto son orientativos y no constituyen una cotización.</small>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
