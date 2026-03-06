/** Tag used to display product categories/tags. */

interface TagProps {
  children: React.ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full bg-gray-100 px-3 py-1 text-caption text-gray-600">
      {children}
    </span>
  );
}
