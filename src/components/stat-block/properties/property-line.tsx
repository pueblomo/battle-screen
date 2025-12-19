interface PropertyLineProps {
  heading: string;
  description: string;
}

export default function PropertyLine({
  heading,
  description,
}: PropertyLineProps) {
  return (
    <div className="text-left text-[#922610] text-xs">
      <span className="font-bold ">{heading}</span>
      <span> </span>
      <span>{description}</span>
    </div>
  );
}
