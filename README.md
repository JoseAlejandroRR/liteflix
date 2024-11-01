# Streaming Platform Prototype - Web Client

This project is the web client for the Streaming Platform developed with **ReactJS** and **TypeScript**. The goal is to provide an efficient and fluid user experience through a modern and responsive interface.

## Overview

The client application is built with **ReactJS**, using **Vite** for fast development and efficient packaging. The application is fully responsive and adapts to different screen sizes, optimizing performance on desktop and mobile devices.

### Technologies Used

- **ReactJS**: Main library for interface development.
- **TypeScript**: Provides static typing and development improvements.
- **Vite**: Fast and efficient build tool.
- **Ant Design**: UI component framework.
- **Axios**: Library for making HTTP requests.
- **React Hooks** and **React Context**: For state management and global communication.

> [!TIP]
> To work with this repo, I recommend using **Node v.20.3.0 LTS** or higher.

## Project Structure

```plaintext
/src
  /assets 
  /data    # Definición de contextos globales
	  /dto
	  /hooks
	  /security
	  services
  /ui
	  /components
	  /pages
/App.tsx
/router.tsx
```

## NPM Scripts 

```sh

npm run dev #start a local server in dev mode
npm run build # compile for production