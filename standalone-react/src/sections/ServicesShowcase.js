import React from "react";
import { services } from "../data/content";

export function ServicesShowcase() {
  return (
    <section className="section section--services">
      <header className="section__header">
        <span className="section__eyebrow">How we build</span>
        <h2>Velvet-glove sprints for brutal timelines.</h2>
        <p>
          Every engagement is anchored to a 48-hour launch window and expands with cross-functional pods that keep strategy, design, and engineering in
          lockstep.
        </p>
      </header>
      <div className="services-grid">
        {services.map((service) => (
          <article key={service.slug} className={`service-card service-card--${service.accent}`}>
            <div className="service-card__header">
              <h3>{service.name}</h3>
              <p>{service.teaser}</p>
            </div>
            <p className="service-card__description">{service.description}</p>
            <ul className="service-card__list">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ServicesShowcase;