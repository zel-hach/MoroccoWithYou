import React from "react";
import Discover, { type CatalogueTrip } from "./Discover";

const trips: CatalogueTrip[] = [
  {
    image: "/images/images (1).jpeg",
    category: "Classic",
    title: "Imperial cities loop",
    route: "Casablanca → Rabat → Fes → Meknes → Marrakech",
    duration: "10 days · 9 nights",
    pace: "Cultural · moderate walking",
    priceFrom: "$1,280",
    description:
      "Palaces, medinas, and artisan quarters—private transfers between cities, riads in the old towns, and guided visits where it matters.",
  },
  {
    image: "/images/merzouga.webp",
    category: "Desert",
    title: "Sahara & oases",
    route: "Marrakech → Aït Benhaddou → Todra → Merzouga",
    duration: "7 days · 6 nights",
    pace: "Road trip · one desert camp",
    priceFrom: "$980",
    description:
      "High Atlas crossing, palm gorges, and a night in Erg Chebbi—Berber hospitality and starry skies.",
  },
  {
    image: "/images/maroc.jpg",
    category: "North",
    title: "Blue city escape",
    route: "Tangier → Chefchaouen → Fes",
    duration: "6 days · 5 nights",
    pace: "Relaxed · photo‑friendly",
    priceFrom: "$720",
    description:
      "Rif mountains, blue lanes, and unhurried days—short hikes and café time balanced with Fes depth.",
  },
  {
    image: "/images/images.jpeg",
    category: "Atlantic",
    title: "Coast & surf week",
    route: "Essaouira → Taghazout → Agadir",
    duration: "8 days · 7 nights",
    pace: "Beach · optional lessons",
    priceFrom: "$890",
    description:
      "Atlantic breeze, seafood, argan country—flex days for surf, yoga, or simply slowing down.",
  },
  {
    image: "/images/vertical_520_780.png",
    category: "Mountains",
    title: "Atlas & valleys",
    route: "Marrakech → Imlil → Ourika → Oukaimeden",
    duration: "5 days · 4 nights",
      pace: "Active · altitude aware",
    priceFrom: "$650",
    description:
      "Valley trails, Berber villages, and recovery nights in characterful guesthouses.",
  },
  {
    image: "/images/marabout.jpg",
    category: "South",
    title: "Kasbahs & cinema road",
    route: "Marrakech → Ouarzazate → Dades → Merzouga",
    duration: "9 days · 8 nights",
    pace: "Scenic drives · photography",
    priceFrom: "$1,050",
    description:
      "Kasbahs, gorges, oases, and desert finale—paced for photos without marathon driving.",
  },
  {
    image: "/images/images (1).jpeg",
    category: "Heritage",
    title: "Roman footprint",
    route: "Fes → Volubilis → Meknes → Rabat",
    duration: "5 days · 4 nights",
    pace: "History · light hiking",
    priceFrom: "$590",
    description:
      "Volubilis mosaics, imperial gates, museums—depth over distance with expert storytelling.",
  },
  {
    image: "/images/merzouga.webp",
    category: "Express",
    title: "Weekend in Marrakech",
    route: "Marrakech & Atlas day trip",
    duration: "4 days · 3 nights",
    pace: "City break · flexible",
    priceFrom: "$420",
    description:
      "Souks, gardens, one Atlas or Ourika outing—compact and easy to pair with a short flight.",
  },
];

function Discovers() {
  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <div className="w-full space-y-3 px-1 sm:space-y-4">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          Trips and circuits
          <span className="mt-0.5 block text-transparent bg-clip-text bg-gradient-to-r from-[#9aea30] via-amber-300 to-emerald-300 sm:mt-1">
            prices and details per journey.
          </span>
        </h2>
        {/* <h1 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          Welcome to our environment where you can find the best trips and circuits.
        </h1> */}
      </div>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {trips.map((trip) => (
          <Discover key={trip.title} {...trip} />
        ))}
      </div>
    </div>
  );
}

export default Discovers;
