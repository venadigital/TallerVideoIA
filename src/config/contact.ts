export const whatsappNumber = '573043787768'

export const whatsappMessage =
  'Hola Laura, quiero agendar el Taller Presencial Generación de Video con IA.'

export const whatsappUrl = `https://wa.me/${whatsappNumber}?${new URLSearchParams({
  text: whatsappMessage,
}).toString()}`
