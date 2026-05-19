# 🎁 Toy Sale & Jewelry - Sitio Web Completo

## 📁 Estructura de Archivos

```
Pagina web/
├── index.html          # Página de inicio (Inicio)
├── catalogo.html       # Página de catálogo de productos
├── premium.html        # Página de productos exclusivos/premium
├── ubicacion.html      # Página de ubicación y contacto
└── README.md          # Este archivo
```

## 🌐 Páginas Disponibles

### 1. **index.html** - Página Principal
- **Barra superior** con búsqueda y login
- **Hero section** atractivo con gradiente
- **Estadísticas** destacadas (productos, entrega, seguridad)
- **Categorías** con 4 opciones principales
- **Navegación cohesiva** a todas las otras páginas
- **Login/Registro** modal

### 2. **catalogo.html** - Catálogo Completo
- Listado completo de productos
- **Filtros por categoría**: Todos, Juguetes, Joyería, Sets
- Búsqueda de productos en tiempo real
- Tarjetas de productos con emojis
- Botón "Comprar" en cada producto
- Página responsive

### 3. **premium.html** - Exclusivos & Premium
- Diseño oscuro elegante con fondo degradado
- **6 productos exclusivos** con precios premium
- Información de stock limitado
- Botones "Reservar Ahora"
- Efectos hover mejorados
- Certificación y detalles de lujo

### 4. **ubicacion.html** - Visítanos & Contacto
- **Información de ubicación** (dirección, teléfono, horarios)
- Mapa placeholder (listo para integración de Google Maps)
- **Formulario de contacto** completo
- Modal de login
- Diseño moderno y responsive

## 🔗 Navegación entre Páginas

Todas las páginas están **totalmente conectadas**:
- El logo lleva siempre a `index.html`
- El menú de navegación permite ir a cualquier página
- Las categorías en inicio redirigen al catálogo con filtros
- Búsqueda global funciona en todas las páginas

## 🎨 Características de Diseño

✅ **Paleta de Colores Consistente**
- Amarillos premium (#FFD54F, #FFC107, #F57F17)
- Oro joyería (#D4AF37)
- Fondo claro (#FFFDE7)

✅ **Efectos Visuales**
- Hover animados en tarjetas
- Transiciones suaves (0.3s)
- Sombras realistas
- Gradientes elegantes

✅ **Responsive Design**
- Funciona en móvil, tablet y desktop
- Breakpoint en 768px
- Grillas flexibles

✅ **Interactividad**
- Modales de login/registro
- Filtros dinámicos
- Búsqueda funcional
- Botones con efectos

## 🚀 Cómo Usar

### Opción 1: Abrir en VS Code
1. Abre la carpeta en VS Code
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 2: Abrir en Navegador
1. Navega a: `c:\Users\ANDY TUBAC\Downloads\Pagina web\`
2. Double-click en `index.html`

### Opción 3: Servidor Local
```bash
# Si tienes Python instalado
python -m http.server 8000

# Luego abre: http://localhost:8000
```

## 📱 Testing de Responsive

1. Abre DevTools (F12)
2. Haz click en icono de móvil
3. Prueba con diferentes tamaños

## 🛠️ Personalización

### Cambiar Colores
- Abre cualquier `.html`
- Busca `:root` en `<style>`
- Modifica los valores de `--y-main`, `--y-gold`, etc.

### Agregar Productos
En `catalogo.html`, busca el array `const productos = [...]` y agrega:
```javascript
{ id: 10, nombre: "Mi Producto", precio: 99, cat: "juguetes", icon: "🎮" }
```

### Cambiar Información de Contacto
En `ubicacion.html`, modifica los `.info-item` con tus datos

## ✨ Funcionalidades Implementadas

✅ Navegación entre páginas  
✅ Filtrado de productos por categoría  
✅ Búsqueda de productos  
✅ Modales de login/registro  
✅ Formulario de contacto  
✅ Reserva de productos premium  
✅ Diseño responsive  
✅ Efectos hover profesionales  
✅ Paleta de colores coherente  

## 🔮 Mejoras Futuras (Opcionales)

- Integración con Google Maps API
- Base de datos real
- Sistema de carrito de compras
- Procesamiento de pagos
- Sistema de usuarios
- Galería de imágenes real
- Integración con redes sociales
- Newsletter

## 📞 Contacto & Soporte

**Email**: contacto@toysale-jewelry.com  
**Teléfono**: +1 800 555 TOYS (8697)  
**Dirección**: Avenida de la Imaginación #456, Ciudad Fantasía

---

**Creado**: 2026 | **Última actualización**: Abril 2026
