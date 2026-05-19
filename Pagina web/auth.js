// Sistema de Autenticación con Aprobación - TOY SALE

class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('toyusers')) || {};
        this.pendingRequests = JSON.parse(localStorage.getItem('toypen')) || { logins: [], registers: [] };
        this.currentUser = JSON.parse(localStorage.getItem('toycurrent')) || null;
    }

    save() {
        localStorage.setItem('toyusers', JSON.stringify(this.users));
        localStorage.setItem('toypen', JSON.stringify(this.pendingRequests));
        localStorage.setItem('toycurrent', JSON.stringify(this.currentUser));
    }

    // Registrar nuevo usuario (requiere aprobación del admin)
    registerUser(username, email, password) {
        // Validaciones
        if (!username || username.length < 3) return { success: false, msg: '❌ Usuario debe tener mínimo 3 caracteres' };
        if (!email || !email.includes('@')) return { success: false, msg: '❌ Email inválido' };
        if (!password || password.length < 6) return { success: false, msg: '❌ Contraseña debe tener mínimo 6 caracteres' };
        
        if (this.users[username]) return { success: false, msg: '❌ Este usuario ya existe xd' };
        
        // Crear solicitud de registro
        const requestId = 'reg_' + Date.now();
        const request = {
            id: requestId,
            type: 'register',
            username,
            email,
            password,
            timestamp: new Date().toLocaleString('es-ES'),
            status: 'pending'
        };

        this.pendingRequests.registers.push(request);
        this.save();

        // Enviar notificación al admin
        this.sendAdminNotification('register', request);

        return { 
            success: true, 
            msg: `✅ Solicitud enviada a ${email}\n\n⏳ El administrador debe aprobar tu registro.\nRecibirás un correo de confirmación.` 
        };
    }

    // Iniciar sesión (requiere aprobación si es primera vez)
    loginUser(username, password) {
        if (!username || !password) return { success: false, msg: '❌ Usuario y contraseña requeridos' };

        // Verificar si el usuario existe y está aprobado
        if (this.users[username] && this.users[username].approved) {
            if (this.users[username].password === password) {
                this.currentUser = { username, email: this.users[username].email, loginTime: new Date().toLocaleString('es-ES') };
                this.save();
                return { success: true, msg: `✅ ¡Bienvenido ${username}!` };
            } else {
                return { success: false, msg: '❌ Contraseña incorrecta' };
            }
        }

        // Si no existe, crear solicitud de login
        const requestId = 'log_' + Date.now();
        const request = {
            id: requestId,
            type: 'login',
            username,
            password,
            timestamp: new Date().toLocaleString('es-ES'),
            status: 'pending'
        };

        this.pendingRequests.logins.push(request);
        this.save();

        this.sendAdminNotification('login', request);

        return { 
            success: true, 
            msg: `✅ Solicitud de acceso enviada\n\n⏳ El administrador debe aprobar tu acceso.\nRecibirás un correo de confirmación.` 
        };
    }

    // Logout
    logout() {
        this.currentUser = null;
        this.save();
        return { success: true, msg: '✅ Sesión cerrada' };
    }

    // Obtener usuario actual
    getCurrentUser() {
        return this.currentUser;
    }

    // Obtener todas las solicitudes pendientes
    getPendingRequests() {
        return this.pendingRequests;
    }

    // Aprobar una solicitud (solo para admin)
    approvePending(requestId, type) {
        const list = type === 'register' ? this.pendingRequests.registers : this.pendingRequests.logins;
        const index = list.findIndex(r => r.id === requestId);

        if (index === -1) return { success: false, msg: 'Solicitud no encontrada' };

        const request = list[index];

        if (type === 'register') {
            this.users[request.username] = {
                email: request.email,
                password: request.password,
                approved: true,
                approvedAt: new Date().toLocaleString('es-ES')
            };
        }

        request.status = 'approved';
        this.save();

        // Enviar confirmación al usuario
        this.sendUserConfirmation(request, type);

        return { success: true, msg: `✅ Solicitud aprobada para ${request.username}` };
    }

    // Rechazar una solicitud
    rejectPending(requestId, type) {
        const list = type === 'register' ? this.pendingRequests.registers : this.pendingRequests.logins;
        const index = list.findIndex(r => r.id === requestId);

        if (index === -1) return { success: false, msg: 'Solicitud no encontrada' };

        const request = list[index];
        request.status = 'rejected';
        this.save();

        return { success: true, msg: `✅ Solicitud rechazada` };
    }

    // Enviar notificación al admin
    sendAdminNotification(type, request) {
        // Simular envío de email (en producción usar EmailJS)
        console.log(`📧 Notificación al Admin:`, {
            to: 'tubacnojroaandyyovany@gmail.com',
            type: type,
            request: request,
            action: `Visita la página de admin para ${type === 'register' ? 'aprobar el registro' : 'aprobar el acceso'}`
        });

        // Aquí iría la integración real de EmailJS
        // emailjs.send(SERVICE_ID, TEMPLATE_ID, {...})
    }

    // Enviar confirmación al usuario
    sendUserConfirmation(request, type) {
        console.log(`📧 Confirmación al usuario:`, {
            to: request.email || request.username,
            message: `Tu ${type === 'register' ? 'registro' : 'acceso'} ha sido aprobado`
        });
    }
}

// Crear instancia global
const auth = new AuthSystem();

// Función para mostrar modal de login/registro
function toggleAuthModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.toggle('active');
    }
}

// Función para cambiar entre tabs de login/registro
function switchAuthTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Procesar login
function handleLogin() {
    const username = document.getElementById('loginUser')?.value;
    const password = document.getElementById('loginPass')?.value;

    if (!username || !password) {
        showNotif('❌ Completa todos los campos');
        return;
    }

    const result = auth.loginUser(username, password);
    showNotif(result.msg);

    if (result.success) {
        setTimeout(() => {
            document.getElementById('loginModal').classList.remove('active');
            updateUserUI();
        }, 2000);
    }
}

// Procesar registro
function handleRegister() {
    const username = document.getElementById('regUser')?.value;
    const email = document.getElementById('regEmail')?.value;
    const password = document.getElementById('regPass')?.value;

    if (!username || !email || !password) {
        showNotif('❌ Completa todos los campos');
        return;
    }

    const result = auth.registerUser(username, email, password);
    showNotif(result.msg);

    if (result.success) {
        setTimeout(() => {
            document.getElementById('loginModal').classList.remove('active');
            document.getElementById('registerForm').reset();
        }, 2000);
    }
}

// Logout
function handleLogout() {
    auth.logout();
    showNotif('✅ Sesión cerrada');
    updateUserUI();
}

// Actualizar UI según estado de login
function updateUserUI() {
    const authButtons = document.querySelector('.auth-buttons');
    const user = auth.getCurrentUser();

    if (user) {
        authButtons.innerHTML = `
            <button onclick="handleLogout()" style="background: #F57F17; color: white;">Logout (${user.username})</button>
            <button onclick="location.href='admin.html'" style="background: var(--y-gold); color: black;">📊 Admin</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button onclick="toggleAuthModal()">Iniciar Sesión</button>
            <button onclick="toggleAuthModal()" style="background: var(--y-gold); color: black;">Registrarse</button>
        `;
    }
}

// Mostrar notificación
function showNotif(text) {
    let notif = document.getElementById('notif');
    if (!notif) {
        notif = document.createElement('div');
        notif.id = 'notif';
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #263238;
            color: #FFD54F;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-weight: bold;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notif);
    }
    notif.textContent = text;
    notif.style.display = 'block';
    setTimeout(() => notif.style.display = 'none', 4000);
}

// Inicializar UI al cargar
document.addEventListener('DOMContentLoaded', updateUserUI);
