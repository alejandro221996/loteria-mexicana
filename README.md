# 🎰 Lotería Mexicana

Una aplicación web interactiva del tradicional juego de la Lotería Mexicana, construida con React, Vite y Tailwind CSS.

## 🚀 Características

- **54 cartas tradicionales** de la lotería mexicana con emojis
- **Modo automático** con velocidad configurable
- **Modo manual** para llamar cartas una por una
- **Síntesis de voz** para cantar las cartas
- **Interfaz moderna** con diseño minimalista
- **Progreso visual** del juego
- **Historial de cartas** llamadas
- **Controles intuitivos** para pausar, reiniciar y ajustar velocidad

## 🎮 Cómo Jugar

1. **Iniciar**: Presiona el botón "▶️ Iniciar" para comenzar el juego automático
2. **Pausar**: Usa "⏸️ Pausar" para detener el juego en cualquier momento
3. **Llamar Carta**: Presiona "🎯 Llamar Carta" para llamar una carta manualmente
4. **Reiniciar**: Usa "🔄 Reiniciar" para comenzar un nuevo juego
5. **Velocidad**: Ajusta la velocidad del juego automático (1s, 2s, 3s)
6. **Voz**: Activa/desactiva la síntesis de voz

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework de CSS utilitario
- **Web Speech API** - Síntesis de voz
- **JavaScript ES6+** - Funcionalidades modernas

## 📦 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar o descargar el proyecto**
```bash
cd loteria-mexicana
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

### Construir para producción
```bash
npm run build
```

### Previsualizar build de producción
```bash
npm run preview
```

## 🚀 Despliegue Gratuito

### Opción 1: Vercel (Recomendado)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Opción 2: Netlify
1. Ejecuta `npm run build`
2. Arrastra la carpeta `dist` a [Netlify](https://netlify.com)

### Opción 3: GitHub Pages
1. Sube tu código a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama y carpeta `dist`

### Opción 4: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Opción 5: Surge.sh
```bash
npm install -g surge
npm run build
surge dist
```

## 🎯 Reglas del Juego

La Lotería Mexicana es un juego de bingo tradicional mexicano donde:

- Se tienen 54 cartas únicas con imágenes características
- El "cantor" (en este caso, la aplicación) llama las cartas aleatoriamente
- Los jugadores marcan las cartas en sus tablas cuando son llamadas
- El objetivo es completar un patrón específico en la tabla (línea, diagonal, o tabla completa)

## 🎨 Diseño

- **Tema**: Minimalista con negros, grises y acentos dorados
- **Responsivo**: Funciona en dispositivos móviles y de escritorio
- **Accesible**: Interfaz clara y fácil de usar
- **Moderno**: Efectos visuales y transiciones suaves

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móviles (iOS, Android)
- ✅ Tablets y pantallas táctiles

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la aplicación, no dudes en:

1. Hacer un fork del proyecto
2. Crear una rama para tu feature
3. Hacer commit de tus cambios
4. Hacer push a la rama
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

¡Disfruta jugando la Lotería Mexicana! 🇲🇽🎰
