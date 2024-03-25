import { getMap } from "../api/map";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MapDetails = () => {
  const [map, setMap] = useState(null);
  const { mapId } = useParams();

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const map = await getMap(mapId);
        setMap(map);
      } catch (error) {
        console.error("Failed to fetch map:", error);
      }
    };

    fetchMap();
  }, [mapId]);

  return (
    <div>
      <h1>Map Detail</h1>
      {map && (
        <div>
          <h2>{map.name}</h2>
          <p>{map.description}</p>
          <img
            src={`data:image/png;base64,${map.image}`}
            alt={map.name}
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export { MapDetails };
