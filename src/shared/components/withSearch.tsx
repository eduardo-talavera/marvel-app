'use client';

import React, { useState } from "react";

export function withSearch<T>(
  WrappedComponent: React.ComponentType<{ data: T[] }>,
  getLabel: (item: T) => string
) {
  return function WithSearchComponent({ data }: { data: T[] }) {
    const [query, setQuery] = useState("");

    const filtered = data.filter((item) =>
      getLabel(item).toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="p-4 space-y-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <WrappedComponent data={filtered} />
      </div>
    );
  };
}
