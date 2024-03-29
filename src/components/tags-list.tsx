import { Badge } from "./ui/badge";

export function splitTags(tags: string) {
  return tags.split(",").map((lang) => lang.trim());
}

export function TagsList({ tags }: { tags: string[] }) {
  return (
    <div>
      {tags?.map((lang: string) => (
        <Badge className="w-fit" key={lang}>
          {lang}
        </Badge>
      ))}
    </div>
  );
}
