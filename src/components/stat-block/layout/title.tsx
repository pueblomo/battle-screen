import Divider from "@/components/stat-block/layout/divider.tsx";

export default function Title({ text }: { text: string }) {
  return (
    <div>
      <div
        className="text-red-800 text-left tracking-wider font-[--font-family-libre-baskerville] text-xl"
        style={{ fontVariant: "small-caps" }}
      >
        {text}
      </div>
      <Divider />
    </div>
  );
}
