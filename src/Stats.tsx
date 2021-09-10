/**
 * Stats component shows game progress and key metrics.
 * @returns
 */
function Stats() {
  return (
    <div className="flex items-center mx-10 my-6">
      <div className="rounded-full w-40 h-40 overflow-hidden">
        <img
          className="bg-gray-500 grayscale w-40 h-40"
          src="https://thispersondoesnotexist.com/image"
          alt="Avatar"
          width="180"
          height="180"
        />
      </div>
      <div className="mx-12">
        <span className="label">Cash</span>
        <h3 className="text-5xl">$10,231</h3>
      </div>
      <div className="mx-12">
        <span className="label">Net worth</span>
        <h3 className="text-5xl">$862,077</h3>
      </div>
      <div className="ml-12">
        <span className="label">Earnings per day</span>
        <h3 className="text-5xl">$410</h3>
      </div>
    </div>
  );
}

export default Stats;
