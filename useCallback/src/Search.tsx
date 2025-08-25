import { memo } from "react";

interface SearchProps {
  onChange: (text: string) => void;
}

function Search({ onChange }: SearchProps) {
  console.log("Search component rendered");
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default memo(Search);

//memo hook
// memo is used to optimize functional components by preventing unnecessary re-renders.
// memo is render the component only when its props change.
// This can improve performance in certain situations, especially when dealing with large lists or complex components.
