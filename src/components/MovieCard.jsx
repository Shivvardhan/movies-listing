const MovieCard = ({ props }) => (
  <div className="bg-white rounded-lg shadow-md p-4 w-full sm:w-64">
    <img
      src={props.image?.original}
      alt={props.name}
      className="rounded-md mb-2 w-full"
    />
    <h2 className="text-lg font-semibold text-gray-800">{props.name}</h2>
    <p className="text-sm text-gray-600">⭐ {props.rating?.average || "N/A"}</p>
    <p className="text-sm text-gray-500">🎬 Premiered: {props.premiered}</p>
  </div>
);

export default MovieCard;
