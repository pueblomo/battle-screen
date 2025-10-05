export default function Divider() {
    return (
        <div>
            <svg
                className={`block w-full h-[5px] text-[#922610]`}
                viewBox="0 0 400 5"
                preserveAspectRatio="none"
            >
                <polyline
                    points="0,2.5 400,2.5 0,2.5 400,2.5"
                    fill="#922610"
                    stroke="#922610"
                    strokeWidth={1}
                />
            </svg>
        </div>
    )
}