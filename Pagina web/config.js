// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_toy_sale';
const EMAILJS_TEMPLATE_LOGIN = 'template_login_approval';
const EMAILJS_TEMPLATE_REGISTER = 'template_register_approval';
const EMAILJS_PUBLIC_KEY = 'your_emailjs_public_key';

// Email del administrador
const ADMIN_EMAIL = 'tubacnojroaandyyovany@gmail.com';

// Almacenamiento local de solicitudes pendientes
const PENDING_REQUESTS = {
    logins: [],
    registers: []
};

// Inicializar EmailJS (debe ejecutarse una sola vez)
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
}
