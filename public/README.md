# MachinaFusion Static Assets

This directory contains the static asset files compiled and served at the root of the application by Vite.

## Adding the Custom Background Image

To display your exact custom bionic background image:
1. Drop your PNG image file directly inside this `/public` folder.
2. Rename the file to **`background.png`**.

The React application is pre-configured with high-performance loaders that will automatically detect and overlay your `background.png` with beautiful hardware-accelerated fade transitions. If `background.png` is not provided, the application gracefully drops back to rendering the clean, pixel-perfect vector representation in `/public/background.svg`.
