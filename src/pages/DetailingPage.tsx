import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { SiteShell } from '@/components/SiteShell';
import { site } from '@/config/site';

type DetailForm = {
  vehicleType: string;
  make: string;
  model: string;
  color: string;
  exterior: string;
  rows: number;
  interiorService: string;
  leather: '' | 'yes' | 'no';
  protection: string;
  firstName: string;
  lastName: string;
  phone: string;
  notes: string;
};

const initialForm: DetailForm = {
  vehicleType: '',
  make: '',
  model: '',
  color: '',
  exterior: '',
  rows: 1,
  interiorService: '',
  leather: '',
  protection: '',
  firstName: '',
  lastName: '',
  phone: '',
  notes: '',
};

const money = (amount: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(amount);

function DetailConfigurator() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<DetailForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);

  const change = <K extends keyof DetailForm>(
    key: K,
    value: DetailForm[K],
  ) => setForm((current) => ({ ...current, [key]: value }));

  const total = useMemo(() => {
    const vehicle =
      site.vehicleTypes.find((item) => item.id === form.vehicleType)?.price ?? 0;
    const exterior =
      site.exteriorServices.find((item) => item.id === form.exterior)?.price ?? 0;
    const rows =
      site.interiorPrices.rows.find((item) => item.id === form.rows)?.price ?? 0;
    const service =
      site.interiorPrices.service.find((item) => item.id === form.interiorService)
        ?.price ?? 0;
    const leather = form.leather === 'yes' ? site.interiorPrices.leather : 0;
    const protection =
      form.leather === 'yes'
        ? site.interiorPrices.protection.find(
            (item) => item.id === form.protection,
          )?.price ?? 0
        : 0;
    return vehicle + exterior + rows + service + leather + protection;
  }, [form]);

  const selectedVehicle = site.vehicleTypes.find(
    (item) => item.id === form.vehicleType,
  );
  const selectedExterior = site.exteriorServices.find(
    (item) => item.id === form.exterior,
  );
  const selectedInterior = site.interiorPrices.service.find(
    (item) => item.id === form.interiorService,
  );
  const selectedProtection = site.interiorPrices.protection.find(
    (item) => item.id === form.protection,
  );
  const currentVehiclePrice = selectedVehicle?.price ?? 0;
  const currentRowsPrice =
    site.interiorPrices.rows.find((item) => item.id === form.rows)?.price ?? 0;
  const currentInteriorPrice = selectedInterior?.price ?? 0;
  const currentLeatherPrice =
    form.leather === 'yes' ? site.interiorPrices.leather : 0;
  const currentProtectionPrice =
    form.leather === 'yes' ? (selectedProtection?.price ?? 0) : 0;

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (step === 0 && !form.vehicleType) {
      nextErrors.vehicleType = 'Selecciona el tipo de vehículo.';
    }
    if (step === 1) {
      if (!form.make.trim()) nextErrors.make = 'Escribe la marca.';
      if (!form.model.trim()) nextErrors.model = 'Escribe el modelo.';
      if (!form.color.trim()) nextErrors.color = 'Escribe el color.';
    }
    if (step === 2 && !form.exterior) {
      nextErrors.exterior = 'Selecciona una opción para el exterior.';
    }
    if (step === 3) {
      if (!form.interiorService) {
        nextErrors.interiorService = 'Elige una opción para el interior.';
      } else if (
        form.interiorService === 'completo' &&
        form.leather === ''
      ) {
        nextErrors.leather = 'Indica si tu vehículo tiene interior de piel.';
      } else if (
        form.interiorService === 'completo' &&
        form.leather === 'yes' &&
        !form.protection
      ) {
        nextErrors.protection = 'Selecciona una protección para la piel.';
      }
    }
    if (step === 5) {
      if (!form.firstName.trim()) nextErrors.firstName = 'Escribe tu nombre.';
      if (!form.lastName.trim()) nextErrors.lastName = 'Escribe tu apellido.';
      if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
        nextErrors.phone = 'Ingresa un teléfono de 10 dígitos.';
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (validate()) {
      setStep((value) => Math.min(value + 1, site.detailSteps.length - 1));
      setErrors({});
    }
  };
  const previous = () => {
    setStep((value) => Math.max(value - 1, 0));
    setErrors({});
  };
  const chooseInterior = (id: string) => {
    change('interiorService', id);
    if (id === 'basico') {
      change('leather', 'no');
      change('protection', '');
    } else if (form.interiorService === 'basico') {
      change('leather', '');
    }
    setErrors({});
  };

  return (
    <SiteShell>
      <div className="shell">
        <header className="page-head">
          <div className="eyebrow">Configurador guiado · {site.detailSteps.length} pasos</div>
          <h1 className="serif">Un cuidado a la medida de tu auto.</h1>
          <p>
            Elige tus servicios, revisa el desglose y prepara tu solicitud. Tus
            selecciones se mantienen si vuelves a los pasos anteriores.
          </p>
        </header>
        <div className="config-layout">
          <section>
            <div
              className="stepper"
              aria-label={`Paso ${step + 1} de ${site.detailSteps.length}`}
            >
              {site.detailSteps.map((label, index) => (
                <div key={label} className="stepper-part">
                  <div
                    className={`step-item ${index === step ? 'active' : index < step ? 'complete' : ''}`}
                    aria-current={index === step ? 'step' : undefined}
                  >
                    <span className="step-dot">
                      {index < step ? <Check size={13} /> : index + 1}
                    </span>
                    <span>{label}</span>
                  </div>
                  {index < site.detailSteps.length - 1 && (
                    <div className="step-line" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
            <div className="form-card" key={step}>
              {!confirmed ? (
                <div className="animate-enter">
                  {step === 0 && (
                    <>
                      <h2>Tipo de vehículo</h2>
                      <p>Elige la categoría que mejor lo describe.</p>
                      <div className="option-grid vehicle-grid" role="group" aria-label="Tipo de vehículo">
                        {site.vehicleTypes.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            className={`option ${form.vehicleType === item.id ? 'selected' : ''}`}
                            aria-pressed={form.vehicleType === item.id}
                            onClick={() => change('vehicleType', item.id)}
                            data-testid={`choice-vehicle-${item.id}`}
                          >
                            {item.label}
                            <small>Estimación base · {money(item.price)}</small>
                          </button>
                        ))}
                      </div>
                      {errors.vehicleType && (
                        <div className="field-error" role="alert">{errors.vehicleType}</div>
                      )}
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <h2>Datos del vehículo</h2>
                      <p>Con esta información podemos orientar mejor la propuesta.</p>
                      <div className="field-grid">
                        <label>
                          <span className="field-label">{site.labels.vehicleMake}</span>
                          <input className="input" autoComplete="off" value={form.make} onChange={(event) => change('make', event.target.value)} aria-invalid={!!errors.make} placeholder="Ej. Toyota" data-testid="input-vehicle-make" />
                          {errors.make && <div className="field-error" role="alert">{errors.make}</div>}
                        </label>
                        <label>
                          <span className="field-label">{site.labels.vehicleModel}</span>
                          <input className="input" value={form.model} onChange={(event) => change('model', event.target.value)} aria-invalid={!!errors.model} placeholder="Ej. Corolla" data-testid="input-vehicle-model" />
                          {errors.model && <div className="field-error" role="alert">{errors.model}</div>}
                        </label>
                      </div>
                      <label>
                        <span className="field-label">{site.labels.vehicleColor}</span>
                        <input className="input" value={form.color} onChange={(event) => change('color', event.target.value)} aria-invalid={!!errors.color} placeholder="Ej. Gris plata" data-testid="input-vehicle-color" />
                        {errors.color && <div className="field-error" role="alert">{errors.color}</div>}
                      </label>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h2>Detallado exterior</h2>
                      <p>
                        Estas opciones son provisionales y se pueden actualizar
                        desde la configuración del sitio.
                      </p>
                      <div className="choice-list" role="group" aria-label="Tipo de servicio exterior">
                        {site.exteriorServices.map((item) => (
                          <button
                            type="button"
                            key={item.id}
                            className={`choice-row ${form.exterior === item.id ? 'selected' : ''}`}
                            aria-pressed={form.exterior === item.id}
                            onClick={() => change('exterior', item.id)}
                            data-testid={`choice-exterior-${item.id}`}
                          >
                            <span>
                              <strong>{item.label}</strong>
                              <span className="choice-description">{item.detail}</span>
                            </span>
                            <span className="choice-price">
                              {money(item.price)} {form.exterior === item.id ? '✓' : '+'}
                            </span>
                          </button>
                        ))}
                      </div>
                      {errors.exterior && (
                        <div className="field-error" role="alert">{errors.exterior}</div>
                      )}
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h2>Detallado interior</h2>
                      <p>El número de filas ayuda a calcular el tiempo y la estimación.</p>
                      <span className="field-label">¿Cuántas filas tiene tu vehículo?</span>
                      <div className="option-grid" role="group" aria-label="Número de filas">
                        {site.interiorPrices.rows.map((item) => (
                          <button
                            type="button"
                            key={item.id}
                            className={`option ${form.rows === item.id ? 'selected' : ''}`}
                            aria-pressed={form.rows === item.id}
                            onClick={() => change('rows', item.id)}
                            data-testid={`choice-rows-${item.id}`}
                          >
                            {item.label}
                            <small>+ {money(item.price)}</small>
                          </button>
                        ))}
                      </div>
                      <span className="field-label">Tipo de servicio</span>
                      <div className="choice-list" role="group" aria-label="Tipo de servicio interior">
                        {site.interiorPrices.service.map((item) => (
                          <button
                            type="button"
                            key={item.id}
                            className={`choice-row ${form.interiorService === item.id ? 'selected' : ''}`}
                            aria-pressed={form.interiorService === item.id}
                            onClick={() => chooseInterior(item.id)}
                            data-testid={`choice-interior-${item.id}`}
                          >
                            <span>
                              <strong>{item.label}</strong>
                              <span className="choice-description">{item.detail}</span>
                            </span>
                            <span className="choice-price">{money(item.price)}</span>
                          </button>
                        ))}
                      </div>
                      {errors.interiorService && (
                        <div className="field-error" role="alert">{errors.interiorService}</div>
                      )}
                      {form.interiorService === 'completo' && (
                        <>
                          <span className="field-label">¿Tu vehículo tiene asientos o interior de piel?</span>
                          <div className="option-grid" role="group" aria-label="Interior de piel">
                            {[
                              { value: 'yes' as const, label: 'Sí' },
                              { value: 'no' as const, label: 'No' },
                            ].map((option) => (
                              <button
                                type="button"
                                key={option.value}
                                className={`option ${form.leather === option.value ? 'selected' : ''}`}
                                aria-pressed={form.leather === option.value}
                                onClick={() => {
                                  change('leather', option.value);
                                  if (option.value === 'no') change('protection', '');
                                  setErrors({});
                                }}
                                data-testid={`choice-leather-${option.value}`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                          {errors.leather && (
                            <div className="field-error" role="alert">{errors.leather}</div>
                          )}
                          {form.leather === 'yes' && (
                            <>
                              <span className="field-label">¿Qué protección deseas para la piel?</span>
                              <div className="choice-list" role="group" aria-label="Protección para piel">
                                {site.interiorPrices.protection.map((item) => (
                                  <button
                                    type="button"
                                    key={item.id}
                                    className={`choice-row ${form.protection === item.id ? 'selected' : ''}`}
                                    aria-pressed={form.protection === item.id}
                                    onClick={() => change('protection', item.id)}
                                    data-testid={`choice-protection-${item.id}`}
                                  >
                                    <strong>{item.label}</strong>
                                    <span className="choice-price">{money(item.price)}</span>
                                  </button>
                                ))}
                              </div>
                              {errors.protection && (
                                <div className="field-error" role="alert">{errors.protection}</div>
                              )}
                              <p className="field-help">Opciones provisionales, editables por el negocio.</p>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <div className="eyebrow">Revisión antes de continuar</div>
                      <h2>Resumen de tu servicio</h2>
                      <p>Revisa tus selecciones. Puedes volver a cualquier paso para editarlas.</p>
                      <div className="review-list">
                        <section className="review-group">
                          <div className="review-heading">
                            <h3>Vehículo</h3>
                            <button type="button" onClick={() => setStep(0)}>Cambiar</button>
                          </div>
                          <div className="review-row"><span>Tipo</span><strong>{selectedVehicle?.label || 'Por seleccionar'}</strong></div>
                          <div className="review-row"><span>Marca y modelo</span><strong>{[form.make, form.model].filter(Boolean).join(' ') || 'Por indicar'}</strong></div>
                          <div className="review-row"><span>Color</span><strong>{form.color || 'Por indicar'}</strong></div>
                        </section>
                        <section className="review-group">
                          <div className="review-heading">
                            <h3>Servicio exterior</h3>
                            <button type="button" onClick={() => setStep(2)}>Cambiar</button>
                          </div>
                          <div className="review-row"><span>{selectedExterior?.label || 'Por seleccionar'}</span><strong>{money(selectedExterior?.price ?? 0)}</strong></div>
                        </section>
                        <section className="review-group">
                          <div className="review-heading">
                            <h3>Servicio interior</h3>
                            <button type="button" onClick={() => setStep(3)}>Cambiar</button>
                          </div>
                          <div className="review-row"><span>Servicio</span><strong>{selectedInterior?.label || 'Por seleccionar'}</strong></div>
                          <div className="review-row"><span>Filas</span><strong>{form.rows} {form.rows === 1 ? 'fila' : 'filas'}</strong></div>
                          {form.interiorService === 'completo' && (
                            <>
                              <div className="review-row"><span>Interior de piel</span><strong>{form.leather === 'yes' ? 'Sí' : 'No'}</strong></div>
                              {form.leather === 'yes' && (
                                <div className="review-row"><span>Protección</span><strong>{selectedProtection?.label || 'Por seleccionar'}</strong></div>
                              )}
                            </>
                          )}
                        </section>
                      </div>
                      <div className="review-total">
                        <span>Subtotal estimado</span>
                        <strong>{money(total)}</strong>
                      </div>
                      <div className="confirm-box">{site.estimateDisclaimer}</div>
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <h2>Datos de contacto</h2>
                      <p>Deja tus datos para preparar la solicitud de servicio.</p>
                      <div className="field-grid">
                        <label>
                          <span className="field-label">{site.labels.ownerFirstName}</span>
                          <input className="input" autoComplete="given-name" value={form.firstName} onChange={(event) => change('firstName', event.target.value)} aria-invalid={!!errors.firstName} placeholder="Tu nombre" data-testid="input-first-name" />
                          {errors.firstName && <div className="field-error" role="alert">{errors.firstName}</div>}
                        </label>
                        <label>
                          <span className="field-label">{site.labels.ownerLastName}</span>
                          <input className="input" autoComplete="family-name" value={form.lastName} onChange={(event) => change('lastName', event.target.value)} aria-invalid={!!errors.lastName} placeholder="Tu apellido" data-testid="input-last-name" />
                          {errors.lastName && <div className="field-error" role="alert">{errors.lastName}</div>}
                        </label>
                      </div>
                      <label>
                        <span className="field-label">{site.labels.phone}</span>
                        <input className="input" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => change('phone', event.target.value)} aria-invalid={!!errors.phone} placeholder={site.phonePlaceholder} data-testid="input-phone" />
                        {errors.phone && <div className="field-error" role="alert">{errors.phone}</div>}
                      </label>
                      <label>
                        <span className="field-label">Notas sobre el servicio</span>
                        <textarea className="textarea" value={form.notes} onChange={(event) => change('notes', event.target.value)} placeholder="¿Hay algo más que debamos considerar?" data-testid="input-detail-notes" />
                      </label>
                      <div className="confirm-box">{site.contactNote}</div>
                    </>
                  )}

                  <div className="form-actions">
                    {step > 0 ? (
                      <button className="button secondary" type="button" onClick={previous} data-testid="button-previous">
                        <ArrowLeft size={15} />Anterior
                      </button>
                    ) : <span />}
                    {step < 5 ? (
                      <button className="button" type="button" onClick={next} data-testid="button-next">
                        {step === 4 ? 'Continuar a contacto' : 'Continuar'}<ArrowRight size={15} />
                      </button>
                    ) : (
                      <button className="button" type="button" onClick={() => { if (validate()) setConfirmed(true); }} data-testid="button-confirm">
                        Confirmar demostración<Check size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="success-panel animate-enter" role="status">
                  <div className="success-icon"><Check size={23} /></div>
                  <div className="eyebrow">Demostración completada</div>
                  <h2 className="serif" style={{ marginTop: 15 }}>Tu propuesta está lista para revisar.</h2>
                  <p>No se envió ni guardó información. WhatsApp y correo aún no están conectados.</p>
                  <button className="button secondary" type="button" onClick={() => { setConfirmed(false); setStep(0); setForm(initialForm); }} data-testid="button-start-over">
                    Iniciar otra propuesta
                  </button>
                </div>
              )}
            </div>
          </section>
          <aside className="summary-card" aria-live="polite" data-testid="summary-detail">
            <div className="summary-kicker">Tu propuesta</div>
            <h3>{selectedVehicle?.label || 'Resumen del servicio'}{form.make ? ` · ${form.make}` : ''}</h3>
            {selectedVehicle ? (
              <>
                <div className="summary-line"><span>Tipo de vehículo</span><strong>{money(currentVehiclePrice)}</strong></div>
                {form.make && <div className="summary-line"><span>Vehículo</span><strong>{form.make} {form.model}</strong></div>}
                {selectedExterior && <div className="summary-line"><span>Exterior · {selectedExterior.label}</span><strong>{money(selectedExterior.price)}</strong></div>}
                {selectedInterior && <div className="summary-line"><span>{selectedInterior.label}</span><strong>{money(currentInteriorPrice)}</strong></div>}
                {selectedInterior && <div className="summary-line"><span>{form.rows} {form.rows === 1 ? 'fila' : 'filas'}</span><strong>{money(currentRowsPrice)}</strong></div>}
                {form.leather === 'yes' && (
                  <>
                    <div className="summary-line"><span>Cuidado de piel</span><strong>{money(currentLeatherPrice)}</strong></div>
                    {selectedProtection && <div className="summary-line"><span>{selectedProtection.label}</span><strong>{money(currentProtectionPrice)}</strong></div>}
                  </>
                )}
              </>
            ) : (
              <div className="summary-placeholder">Al elegir tu vehículo y servicios verás aquí el desglose.</div>
            )}
            <div className="summary-total"><span>Subtotal estimado</span><strong data-testid="text-subtotal">{money(total)}</strong></div>
            <p className="estimate-note"><ShieldCheck size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />{site.estimateDisclaimer}</p>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

export default function DetailingPage() {
  return <DetailConfigurator />;
}
