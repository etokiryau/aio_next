import { FC } from "react";

interface IProps {
    width?: number,
    height?: number
}

const MailIcon: FC<IProps> = ({ width = 14, height = 12 }) => {

    return (
        <svg width={width} height={height} viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.334 0.666992H1.66732C0.933984 0.666992 0.340651 1.26699 0.340651 2.00033L0.333984 10.0003C0.333984 10.7337 0.933984 11.3337 1.66732 11.3337H12.334C13.0673 11.3337 13.6673 10.7337 13.6673 10.0003V2.00033C13.6673 1.26699 13.0673 0.666992 12.334 0.666992ZM12.334 3.33366L7.00065 6.66699L1.66732 3.33366V2.00033L7.00065 5.33366L12.334 2.00033V3.33366Z" fill="#3D3D3D"/>
        </svg>
    )
}

export default MailIcon;