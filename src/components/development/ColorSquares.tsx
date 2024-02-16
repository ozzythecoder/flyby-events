/**
 * If color palette debugging is needed
 */
export default function ColorSquares() {
  return (
    <div className="flex flex-row justify-center gap-4">
      <div className="w-60 h-60 bg-primary rounded-md"></div>
      <div className="flex flex-col justify-between items-center gap-4">
        <div className="w-60 flex-grow bg-secondary-500 rounded-md"></div>
        <div className="w-60 h-20 bg-accent-500 rounded-md"></div>
      </div>
    </div>
  );
}
