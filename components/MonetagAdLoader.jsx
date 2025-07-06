"use client";
import { useEffect } from "react";

const MonetagAdLoader = () => {
  useEffect(() => {
    const tagIds = [ "9534160","9532451"]; // ✅ Only safe, non-popup ads
    tagIds.forEach((id) => {
      const s = document.createElement("script");
      s.src = `https://vemtoutcheeg.com/400/${id}`;
      try {
        (document.body || document.documentElement).appendChild(s);
      } catch (e) {
        console.error(`Monetag tag ${id} failed`, e);
      }
    });
  }, []);

  return null;
};

export default MonetagAdLoader;


// only one ad working
// "use client";
// import { useEffect } from "react";

// const MonetagAdLoader = () => {
//   useEffect(() => {
//     const s = document.createElement("script");
//     s.src = "https://vemtoutcheeg.com/400/9532253";
//     try {
//       (document.body || document.documentElement).appendChild(s);
//     } catch (e) {
//       console.error("Monetag script failed", e);
//     }
//   }, []);

//   return null; // This component just loads the ad script
// };

// export default MonetagAdLoader;