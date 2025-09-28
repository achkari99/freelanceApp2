import React from "react";

export function HeadlineBlock({ visible = false, onPrimaryClick, onSecondaryClick }) {
  return (
    <div className={`headline-block ${visible ? "headline-block--visible" : ""}`}>
      <span className="headline-block__eyebrow">ACH prototype studio</span>
      <h1 className="headline-block__title">Your idea, our prototype in 48 hours.</h1>
      <div className="headline-block__actions">
        <button type="button" className="headline-block__button headline-block__button--primary" onClick={onPrimaryClick}>
          Start your prototype for free
        </button>
        <button type="button" className="headline-block__button headline-block__button--ghost" onClick={onSecondaryClick}>
          Explore what we build
        </button>
      </div>
    </div>
  );
}

export default HeadlineBlock;