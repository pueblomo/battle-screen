interface PropertyLineProps {
    heading: string,
    description: string
}

export default function PropertyLine({heading, description}: PropertyLineProps) {
    return (
        <div className="flex text-left gap-1">
            <p className="font-bold text-[#922610] text-xs">
                {heading}
            </p>
            <p className="text-[#922610] text-xs">
                {description}
            </p>
        </div>
    )
}