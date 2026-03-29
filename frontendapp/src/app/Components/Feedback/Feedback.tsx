import React from 'react';

const feedbackItems = [
  {
    quote:
      "The itinerary felt personal—not generic. Desert camp and Chefchaouen were highlights we would not have planned alone.",
    name: "Maria L.",
    meta: "Barcelona · 10-day circuit",
  },
  {
    quote:
      "Clear communication, local guides who actually knew the medinas, and zero stress around transfers.",
    name: "James K.",
    meta: "London · Family trip",
  },
  {
    quote:
      "We asked for culture and food; they balanced riads, cooking class, and downtime by the coast perfectly.",
    name: "Amélie D.",
    meta: "Paris · Honeymoon",
  },
];

const Feedback = () => {
    return (
        <>
          <section
            id="feedback"
            className="scroll-mt-20 w-full space-y-6 px-3 py-4 sm:space-y-8 sm:px-4 sm:py-6"
          >
            <div className="mx-auto max-w-3xl space-y-2 text-center sm:space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What our guests say</h2>
            </div>
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {feedbackItems.map((item) => (
                <blockquote
                  key={item.name}
                  className="flex flex-col rounded-xl border border-white/10 bg-slate-950/60 p-4 backdrop-blur-sm sm:p-5"
                >
                  <span className="mb-2 font-serif text-3xl leading-none text-[#9aea30]/35" aria-hidden>
                    &ldquo;
                  </span>
                  <p className="flex-1 text-xs leading-relaxed text-slate-200 sm:text-sm">{item.quote}</p>
                  <footer className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm font-medium text-slate-50">{item.name}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{item.meta}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        </>
    );
}

export default Feedback;
