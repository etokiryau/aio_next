import { FC } from "react"

interface ILikeIcon {
    fill: boolean
};

const LikeIcon: FC<ILikeIcon> = ({ fill }) => {

    return (
        <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill={fill ? "" : "none"}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.0066 18.5L3.09482 10.6696C-1.74854 5.97141 5.3712 -3.04918 12.0066 4.24873C18.642 -3.04918 25.7295 6.00273 20.9184 10.6696L12.0066 18.5Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default LikeIcon;