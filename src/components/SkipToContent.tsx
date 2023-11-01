export default function SkipToContent() {
  return (
    <a
      href="#main"
      tabIndex={1}
      className="absolute -left-[100vw] top-1 focus:left-1 text-text-950"
    >
      Skip to Content
    </a>
  );
}
