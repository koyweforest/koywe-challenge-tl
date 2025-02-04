# 🏗️ Challenge Técnico: Diseño de Sistema de Cambio de Divisas

¡Bienvenido! Tu desafío es diseñar una solución de alto nivel para un sistema de cambio de divisas.

---

## 📚 Contexto

Una fintech necesita diseñar un sistema de cambio de divisas que:
- Maneja conversiones entre múltiples monedas (FIAT y Crypto)
- Procesa ~5,000 transacciones por hora
- Requiere precios en tiempo real
- Debe mantener histórico de tasas y transacciones
- Necesita alta disponibilidad (99.9%)

---

## 🎯 Entregables

### 1️⃣ Diagrama de Arquitectura
Dibuja un diagrama simple que muestre:
- Componentes principales del sistema
- Flujo de datos para una transacción
- Integraciones con proveedores de precios
- Sistema de almacenamiento

### 2️⃣ Explicación Breve
En 3-4 párrafos, explica:
- Las decisiones clave de tu diseño
- Cómo garantizarías la consistencia de los precios
- Un desafío técnico que anticipas y su solución

---

## 🛠️ Aspectos a Considerar

1. **Componentes Críticos**
   - Sistema de precios en tiempo real
   - Base de datos (transaccional e histórica)
   - Cache de tasas de cambio
   - API Gateway

2. **Puntos Clave**
   - Latencia en actualizaciones de precios
   - Consistencia de datos
   - Concurrencia en transacciones
   - Auditoría y trazabilidad

---

## 📊 Criterios de Evaluación

- Claridad del diseño (40%)
- Decisiones técnicas fundamentadas (40%)
- Identificación de puntos críticos (20%)

---

## 📝 Formato de Entrega

- Diagrama: Foto de whiteboard/papel o diagrama digital simple
- Explicación: Texto en Markdown

---

### 🚀 ¡Comienza!

> **Tip:** Enfócate en los aspectos críticos como la consistencia de precios y el manejo de concurrencia.