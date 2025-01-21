# Profesional App Conductores

App para conductores de la empresa profesional Remis, para que los mismos compartan su ubicación en tiempo real y puedan ver el estado de su viaje

## Requisitos
   Node version > 19 
   npm version > 10

## Instalación

1. **Instalación de Android Studio**:
   - Descargar Android Studio desde la página oficial: https://developer.android.com/studio?hl=es-419.
   - Seguir las instrucciones de instalación según tu sistema operativo (Windows, Mac o Linux).
   - Durante la instalación, asegúrate de aceptar las configuraciones recomendadas y descargar los componentes necesarios para el desarrollo de aplicaciones Android.

2. **Configuración de variables de entorno ( Windows )**:
   - **Configuración de la variable `ANDROID_HOME`**:
      - Abrir el menú Inicio y busca "Variables de entorno".
      - Seleccionar "Editar las variables de entorno del sistema".
      - En la sección "Variables del sistema", click en "Nueva".
      - Ingresar `ANDROID_HOME` como nombre de la variable y la ruta donde se encuentra la carpeta `/Android/Sdk` como valor (por ejemplo, `C:\Users\[nombre_de_usuario]\AppData\Local\Android\Sdk`).
      - Click en "Aceptar" para guardar los cambios.

   - **Agregar `platform-tools` al `PATH`**:
      - En la misma ventana de variables de entorno, buscar la variable `Path` en la sección "Variables del sistema" y hacer click en "Editar".
      - Agrega al final de la lista la ruta completa de la carpeta `platform-tools` (por ejemplo, `%ANDROID_HOME%\platform-tools`).
      - Asegúrate de separarla de las rutas existentes con un punto y coma (`;`).
      - Haz clic en "Aceptar" para guardar los cambios.
        

3. **Creación de un emulador**:
   - Abrir Android Studio y buscar "Virtual Device Manager" en "More Actions".
   - Crear un nuevo dispositivo virtual, elegir el tipo de dispositivo y la versión del sistema operativo (por ejemplo, API 33 Android 13).
   - Finalizar la configuración y crear el emulador.

4. **Clonar el repositorio**:
      - `git clone https://github.com/marcesalas96/profesionalApp`

5. **Instalar dependencias**:
   - Utilizar `npm` o `yarn` para instalar las dependencias del proyecto.
   - Para el correcto funcionamiento es necesario instalar eas-cli de manera global
      -   `npm install -g eas-cli`
  
6. **Iniciar aplicacíon**
   - Para iniciar la aplicación con Expo Go, ejecutar `npx expo start` en la terminal.
   - Luego, al momento de aparecer en consola un `codigo QR` se puede utilizar la app `Expo Go` disponible para moviles en playstore o seleccionar el dispositivo virtual siguiendo las instrucciones en pantalla (para Android presionar `a`)
7. **Crear archivo APK**
   -   `eas build -p android --profile preview`
   -   Al momento de empezar la build, eas va a solicitar credenciales. User: marcesalas1996@gmail.com Password: marce282!
