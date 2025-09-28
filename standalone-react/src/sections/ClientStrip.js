import React from "react";
import { clientLogos } from "../data/content";

export function ClientStrip() {
  return (
    <section className="section section--clients">
      <div className="section__label">Teams scaling with ACH</div>
      <div className="client-strip">
        {clientLogos.map((client) => (
          <a key={client.name} className="client-strip__item" href={client.url} target="_blank" rel="noreferrer">
            <img src={client.logo} alt={`${client.name} logo`} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}

export default ClientStrip;