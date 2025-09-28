import React from "react";
import { testimonials } from "../data/content";

export function TestimonialsPanel() {
  return (
    <section className="section section--testimonials">
      <div className="testimonials">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="testimonial">
            <blockquote>“{testimonial.quote}”</blockquote>
            <figcaption>
              <span className="testimonial__name">{testimonial.name}</span>
              <span className="testimonial__meta">
                {testimonial.role}, {testimonial.company}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsPanel;