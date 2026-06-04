"use client";

export default function BackToTop() {
  return (
    <button
      type="button"
      className="w-full bg-[#232F3E] hover:bg-[#2e3d50] text-white text-sm py-3 transition text-center"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Back to top
    </button>
  );
}
