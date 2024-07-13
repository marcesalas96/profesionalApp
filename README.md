# Profesional App Conductores

App para conductores de la empresa profesional Remis, para que los mismos compartan su ubicación en tiempo real y puedan ver el estado de su viaje

## Instalación

1. **Instalación de Android Studio**:
   - Descarga Android Studio desde la página oficial: https://developer.android.com/studio?hl=es-419.
   - Sigue las instrucciones de instalación según tu sistema operativo (Windows, Mac o Linux).
   - Durante la instalación, asegúrate de aceptar las configuraciones recomendadas y descargar los componentes necesarios para el desarrollo de aplicaciones Android.

2. **Configuración de variables de entorno**:
   - En Windows: 
      - Configura la variable de entorno `ANDROID_HOME` con la ruta donde se encuentra la carpeta `/Android/Sdk`.
      - Agrega la ruta de las herramientas de plataforma (`platform-tools`) al `PATH`. Debería verse como `/Android/Sdk/platform-tools`.
      - Verifica que todo esté configurado correctamente ejecutando `adb --version` en una nueva PowerShell.

4. **Creación de un emulador**:
   - Abre Android Studio y busca "Virtual Device Manager" en "More Actions".
   - Crea un nuevo dispositivo virtual, elige el tipo de dispositivo y la versión del sistema operativo (por ejemplo, API 33 Android 13).
   - Finaliza la configuración y crea el emulador.

5. **Clonar el repositorio**:
      - `git clone https://github.com/marcesalas96/profesionalApp`

6. **Instalar dependencias**:
   - Utiliza `npm` o `yarn` para instalar las dependencias del proyecto.
  
7. **Iniciar aplicacíon**
   - Para iniciar la aplicación con Expo Go, ejecuta `npx expo start` en la terminal.
8. **Crear archivo APK**
   -   `npm install -g eas-cli`
   -   `eas build -p android --profile preview`
