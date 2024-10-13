"use client";

import "@maptiler/sdk/dist/maptiler-sdk.css";
import React, { useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";

const FooterMap: React.FC = () => {
  useEffect(() => {
    // Asigna el API Key de MapTiler desde las variables de entorno
    maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || '';

    const map = new maptilersdk.Map({
      container: "map", // ID del contenedor
      style: "https://api.maptiler.com/maps/streets-v2/style.json?key=" + process.env.NEXT_PUBLIC_MAPTILER_API_KEY,
      center: [-71.50709194779972, 7.619515587273558], // Coordenadas [lng, lat]
      zoom: 18.2, // Nivel de zoom inicial
    });

    const uwu = new maptilersdk.Marker()
        .setLngLat([-71.50709194779972, 7.619515587273558])
        .addTo(map)

    return () => {
      map.remove(); // Limpia el mapa al desmontar el componente
    };
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "350px",  // Establece un ancho fijo
        height: "250px", // Establece una altura fija
      }}
    />
  );
};

export default FooterMap;
