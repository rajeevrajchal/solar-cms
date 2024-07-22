import { useDebounce } from "@hook/utils/use-debounce";
import { Select } from "@mantine/core";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { map } from "lodash";
import { useState } from "react";
const provider = new OpenStreetMapProvider();

const LocationInput = () => {
  const [query, setQuery] = useState<string>("");
  const [locations, setLocations] = useState<any>([]);

  const handleChange = async (value: string) => {
    setQuery(value);
    const debouncedValue = useDebounce<string>(value, 500);
    const results = await provider.search({ query: debouncedValue });
    setLocations(
      map(results, (item: any) => ({
        lat: item?.raw.lat,
        lon: item?.raw.lon,
        name: item?.raw.name || item?.raw.display_name,
        type: item?.raw.addresstype,
        label: item?.raw.display_name || item?.raw.name,
        value: String(item?.raw?.place_id),
      }))
    );
  };

  return (
    <div>
      <Select
        searchable
        searchValue={query}
        data={locations}
        onSearchChange={(value) => handleChange(value)}
      />
    </div>
  );
};

export default LocationInput;
