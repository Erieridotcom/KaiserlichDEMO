export const site = {
  brandLabel: 'Kaiserlich',
  tagline: 'Atención clara. Cuidado a detalle.',
  intro: 'Una experiencia de taller pensada para entender lo que tu vehículo necesita, explicarte cada opción y cuidar cada acabado.',
  phonePlaceholder: '10 dígitos',
  contactNote: 'Esta demostración no envía ni almacena tus datos. WhatsApp y correo aún no están conectados.',
  detailSteps: ['Vehículo', 'Datos', 'Exterior', 'Interior', 'Resumen', 'Contacto'],
  vehicleTypes: [
    { id: 'compacto', label: 'Compacto', price: 0 },
    { id: 'sedan', label: 'Sedán', price: 250 },
    { id: 'pickup', label: 'Pickup', price: 650 },
    { id: 'suv', label: 'SUV', price: 500 },
    { id: 'suv-grande', label: 'SUV grande', price: 850 },
  ],
  exteriorServices: [
    { id: 'basico', label: 'Básico', detail: 'Servicio exterior esencial · opción provisional', price: 480 },
    { id: 'cera', label: 'Cera', detail: 'Acabado con cera · opción provisional', price: 950 },
    { id: 'premium', label: 'Protección premium', detail: 'Protección avanzada · opción provisional', price: 1850 },
    { id: 'por-definir', label: 'Otro / Por definir', detail: 'La opción se confirmará con el taller', price: 0 },
  ],
  interiorPrices: {
    rows: [{ id: 1, label: '1 fila', price: 0 }, { id: 2, label: '2 filas', price: 350 }, { id: 3, label: '3 filas', price: 650 }],
    service: [
      { id: 'basico', label: 'Detallado interior básico', detail: 'Limpieza de mantenimiento · sin preguntas adicionales', price: 650 },
      { id: 'completo', label: 'Detallado interior completo', detail: 'Limpieza profunda de cabina y detalles', price: 1450 },
    ],
    leather: 550,
    protection: [
      { id: 'basica', label: 'Protección básica', price: 250 },
      { id: 'premium', label: 'Protección premium', price: 480 },
      { id: 'por-definir', label: 'Por definir', price: 0 },
    ],
  },
  labels: {
    vehicleMake: 'Marca', vehicleModel: 'Modelo', vehicleColor: 'Color',
    ownerFirstName: 'Nombre', ownerLastName: 'Apellido', phone: 'Teléfono',
  },
  currency: 'MXN',
  estimateDisclaimer: 'El precio mostrado es una estimación. La persona encargada confirmará el precio final después de revisar los detalles del vehículo y del servicio. Los importes son ficticios de demostración en MXN y se editan en src/config/site.ts.',
  repairDisclaimer: 'La información de este formulario solo se muestra en esta pantalla de demostración.',
  contactPlaceholders: {
    whatsapp: 'WhatsApp por configurar',
    email: 'Correo por definir',
    address: 'Dirección por agregar',
    hours: 'Horario por confirmar',
    instagram: 'Instagram por agregar',
    facebook: 'Facebook por agregar',
  },
};
