export default function Loading() {
  return (
    <div className="wrap grid min-h-[50vh] place-items-center" role="status" aria-label="Carregando">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-lime" />
    </div>
  );
}
